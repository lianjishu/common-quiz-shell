#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""校验仓库结构与题库数据的一致性。

这个脚本存在的理由:外壳(app.js / theme.js / theme-*.css)必须**全仓库只有一份**。
通用化重构之前,Electron 的 src/renderer/ 曾手工复制了整套外壳并逐渐分叉,
菜单「主题」因此静默失效。任何新增的副本都会被第 6 项拦下。

校验项:
    1. registry 登记的每个科目都有对应目录
    2. 每个科目目录都在 registry 中登记(反向,防止建了目录忘了注册)
    3. config.id == 目录名(存储前缀依赖它)
    4. config.total == questions.js 实际题数
    5. questions.js 内题目 id 无重复
    6. shared/ 之外不存在外壳副本(app.js / theme.js / theme-*.css)
    7. 每个科目目录都具备 index.html + config.js + questions.js
    8. 题目 type 均在 config.types 声明范围内
    9. README 架构图提到了每个科目目录

用法:
    python tools/check_consistency.py           # 全部校验
    python tools/check_consistency.py -v        # 额外打印每科统计

退出码: 0 = 全过,1 = 有失败项。
"""
import re
import sys
from pathlib import Path

# Windows 控制台默认 GBK,强制 UTF-8 + 替换兜底,避免因符号编码直接崩溃
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass

ROOT = Path(__file__).resolve().parent.parent
SUBJECTS_DIR = ROOT / "subjects"
REGISTRY_JS = SUBJECTS_DIR / "registry.js"
README = ROOT / "README.md"

# 外壳文件名 —— 第 6 项据此在 shared/ 之外搜寻副本
SHELL_FILES = {"app.js", "theme.js"}
SHELL_CSS_RE = re.compile(r"^theme-[\w-]+\.css$")

REQUIRED_SUBJECT_FILES = ["index.html", "config.js", "questions.js"]

REGISTRY_ARRAY_RE = re.compile(r"QUIZ_REGISTRY\s*=\s*\[(.*?)\]", re.S)
STRING_RE = re.compile(r"['\"]([^'\"]+)['\"]")
CONFIG_ID_RE = re.compile(r"\bid\s*:\s*['\"]([^'\"]+)['\"]")
CONFIG_TOTAL_RE = re.compile(r"\btotal\s*:\s*(\d+)")
CONFIG_TYPES_RE = re.compile(r"\btypes\s*:\s*\[(.*?)\]", re.S)
# questions.js 里 "id" 紧邻 "type",据此成对提取,避免误匹配 analysis 中的同名字段
QUESTION_RE = re.compile(r'"id"\s*:\s*(\d+)\s*,\s*"type"\s*:\s*"([^"]+)"')

# 跳过这些目录(不入库 / 非源码)
SKIP_DIRS = {".git", "node_modules", "dist", "__pycache__", ".zcode", ".claude"}

failures: list = []
VERBOSE = "-v" in sys.argv


def fail(check: str, detail: str) -> None:
    failures.append(f"[{check}] {detail}")
    print(f"  [FAIL] {check}: {detail}")


def ok(check: str, detail: str = "") -> None:
    suffix = f" -- {detail}" if detail else ""
    print(f"  [ OK ] {check}{suffix}")


def parse_registry() -> list:
    m = REGISTRY_ARRAY_RE.search(REGISTRY_JS.read_text(encoding="utf-8"))
    if not m:
        raise SystemExit(f"无法在 {REGISTRY_JS} 中解析 window.QUIZ_REGISTRY")
    return STRING_RE.findall(m.group(1))


def parse_config(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    mid = CONFIG_ID_RE.search(text)
    mtotal = CONFIG_TOTAL_RE.search(text)
    mtypes = CONFIG_TYPES_RE.search(text)
    return {
        "id": mid.group(1) if mid else None,
        "total": int(mtotal.group(1)) if mtotal else None,
        "types": STRING_RE.findall(mtypes.group(1)) if mtypes else [],
    }


def parse_questions(path: Path) -> list:
    return [(int(i), t) for i, t in QUESTION_RE.findall(path.read_text(encoding="utf-8"))]


def iter_candidate_files():
    """遍历仓库内所有 js/css 文件(跳过不入库目录)。"""
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if SKIP_DIRS & set(path.relative_to(ROOT).parts):
            continue
        if path.suffix not in {".js", ".css"}:
            continue
        yield path


def main() -> int:
    registry = parse_registry()
    questions: dict = {}
    configs: dict = {}

    print("1. registry -> 目录")
    for sid in registry:
        if (SUBJECTS_DIR / sid).is_dir():
            ok("1", sid)
        else:
            fail("1", f"registry 登记了 '{sid}',但 subjects/{sid}/ 不存在")

    print("\n2. 目录 -> registry(反向)")
    if SUBJECTS_DIR.is_dir():
        for d in sorted(p for p in SUBJECTS_DIR.iterdir() if p.is_dir()):
            if d.name in registry:
                ok("2", d.name)
            else:
                fail("2", f"subjects/{d.name}/ 未在 registry.js 中登记,首页不会出现")

    print("\n3. config.id == 目录名")
    for sid in registry:
        cfg_path = SUBJECTS_DIR / sid / "config.js"
        if not cfg_path.is_file():
            fail("3", f"{sid} 缺少 config.js")
            continue
        cfg = parse_config(cfg_path)
        configs[sid] = cfg
        if cfg["id"] == sid:
            ok("3", sid)
        else:
            fail("3", f"{sid}: config.id = {cfg['id']!r},应与目录名一致")

    print("\n4. config.total == 实际题数")
    for sid in registry:
        q_path = SUBJECTS_DIR / sid / "questions.js"
        if not q_path.is_file() or sid not in configs:
            fail("4", f"{sid} 缺少 questions.js 或 config.js")
            continue
        qs = parse_questions(q_path)
        questions[sid] = qs
        if configs[sid]["total"] == len(qs):
            ok("4", f"{sid} = {len(qs)} 题")
        else:
            fail("4", f"{sid}: config.total = {configs[sid]['total']},实际解析到 {len(qs)} 题")

    print("\n5. 题目 id 唯一")
    for sid, qs in questions.items():
        seen, dupes = set(), set()
        for qid, _ in qs:
            if qid in seen:
                dupes.add(qid)
            seen.add(qid)
        if dupes:
            fail("5", f"{sid}: 重复 id {sorted(dupes)}")
        else:
            ok("5", f"{sid} 共 {len(qs)} 个唯一 id")

    print("\n6. shared/ 之外无外壳副本")
    dups = []
    for path in iter_candidate_files():
        rel = path.relative_to(ROOT)
        if rel.parts and rel.parts[0] == "shared":
            continue
        if path.name in SHELL_FILES or (path.suffix == ".css" and SHELL_CSS_RE.match(path.name)):
            dups.append(str(rel).replace("\\", "/"))
    if dups:
        for d in sorted(dups):
            fail("6", f"发现外壳副本 {d} -- 外壳只能存在于 shared/,删除它并改用 shared/")
    else:
        ok("6", "未发现副本")

    print("\n7. 科目目录文件完整")
    for sid in registry:
        missing = [f for f in REQUIRED_SUBJECT_FILES if not (SUBJECTS_DIR / sid / f).is_file()]
        if missing:
            fail("7", f"{sid} 缺少 {', '.join(missing)}")
        else:
            ok("7", sid)

    print("\n8. 题目 type 属于 config.types")
    for sid, qs in questions.items():
        allowed = set(configs[sid]["types"])
        bad = sorted({t for _, t in qs} - allowed)
        if bad:
            fail("8", f"{sid}: 出现未声明题型 {bad},config.types = {sorted(allowed)}")
        else:
            ok("8", f"{sid} {sorted(allowed)}")

    print("\n9. README 覆盖所有科目")
    readme = README.read_text(encoding="utf-8") if README.is_file() else ""
    for sid in registry:
        if sid in readme:
            ok("9", sid)
        else:
            fail("9", f"README 未提到 subjects/{sid}/")

    if VERBOSE:
        print("\n-- 统计 --")
        total = 0
        for sid in registry:
            qs = questions.get(sid, [])
            total += len(qs)
            by_type: dict = {}
            for _, t in qs:
                by_type[t] = by_type.get(t, 0) + 1
            dist = "  ".join(f"{k} {v}" for k, v in sorted(by_type.items()))
            print(f"  {sid:<24} {len(qs):>4} 题   {dist}")
        print(f"  {'合计':<24} {total:>4} 题")

    print()
    if failures:
        print(f"共 {len(failures)} 项失败:")
        for f in failures:
            print(f"    {f}")
        return 1
    print("全部通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
