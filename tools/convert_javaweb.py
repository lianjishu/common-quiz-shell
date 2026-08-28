#!/usr/bin/env python3
"""把 javaweb-final-exam/exam.md + answers.md 转换为 subjects/javaweb/questions.js。

- 题型:判断题(true/false → 对/错)、单选题、多选题(答案字母按序组合)
- 解析:合并 tools/javaweb_briefs.json(id → 一句话简版解析)为 analysis.brief
- 强校验:各节题数、答案完整性、选项字母合法性、解析覆盖率;任一不满足即报错退出

用法:
    python tools/convert_javaweb.py            # 校验并生成 questions.js
    python tools/convert_javaweb.py --briefs-optional   # 允许缺简版解析(调试用)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXAM_MD = ROOT / "javaweb-final-exam" / "exam.md"
ANSWERS_MD = ROOT / "javaweb-final-exam" / "answers.md"
BRIEFS_JSON = ROOT / "tools" / "javaweb_briefs.json"
OUT_JS = ROOT / "subjects" / "javaweb" / "questions.js"

SECTION_RE = re.compile(r"^##\s*[一二三四五六七八九十]+、(判断题|单选题|多选题)（共\s*(\d+)\s*题，([\d.]+)\s*分）")
Q_START_RE = re.compile(r"^(\d+)\.\s*(.*)$")
OPTION_RE = re.compile(r"^\s*-\s*([A-Z])\s*[.、．]\s*(.*)$")
ANSWER_RE = re.compile(r"^(?P<num>\d+)\..*?（\s*(?P<ans>[^（）]*?)\s*）\s*$")


def parse_exam(path: Path) -> dict:
    """返回 {题型: [ {id, question, options?} ]}"""
    sections: dict[str, list] = {}
    section_meta: dict[str, tuple] = {}
    cur_type, cur = None, None
    cur_q = None

    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        m = SECTION_RE.match(line)
        if m:
            cur_type, cur = m.group(1), []
            sections[cur_type] = cur
            section_meta[cur_type] = (int(m.group(2)), float(m.group(3)))
            cur_q = None
            continue
        if cur_type is None or line.strip() in ("", "---") or line.startswith("#"):
            continue

        qm = Q_START_RE.match(line)
        om = OPTION_RE.match(line)
        if qm:
            cur_q = {"id": int(qm.group(1)), "question": qm.group(2).strip(), "options": []}
            cur.append(cur_q)
        elif om and cur_q is not None:
            cur_q["options"].append((om.group(1), om.group(2).strip()))
        elif cur_q is not None and line.strip():
            # 续行:拼到题干或最后一个选项
            if cur_q["options"]:
                letter, text = cur_q["options"][-1]
                cur_q["options"][-1] = (letter, (text + line.strip()).strip())
            else:
                cur_q["question"] = (cur_q["question"] + line.strip()).strip()

    return sections, section_meta


def parse_answers(path: Path) -> dict:
    """返回 {题号: 原始答案串}"""
    answers: dict[int, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        m = ANSWER_RE.match(raw.strip())
        if m:
            answers[int(m.group("num"))] = m.group("ans")
    return answers


def normalize_answer(qtype: str, raw: str) -> str:
    if qtype == "判断题":
        low = raw.strip().lower()
        if low == "true":
            return "对"
        if low == "false":
            return "错"
        raise ValueError(f"判断题答案无法识别: {raw!r}")
    letters = re.findall(r"[A-Z]", raw.upper())
    if not letters:
        raise ValueError(f"选择题答案无法识别: {raw!r}")
    return "".join(letters)  # 保持出现顺序


def build_questions(sections, section_meta, answers) -> list:
    questions = []
    for qtype, items in sections.items():
        count, points_total = section_meta[qtype]
        if len(items) != count:
            raise ValueError(f"{qtype} 题数不符: 声明 {count}, 实际 {len(items)}")
        points = round(points_total / count, 2)
        for item in items:
            q = {
                "id": item["id"],
                "type": qtype,
                "points": points,
                "question": item["question"],
            }
            if qtype in ("单选题", "多选题"):
                if len(item["options"]) < 2:
                    raise ValueError(f"题 {item['id']} 选项不足: {item['options']}")
                letters = [l for l, _ in item["options"]]
                if len(set(letters)) != len(letters):
                    raise ValueError(f"题 {item['id']} 选项字母重复: {letters}")
                q["options"] = [f"{l}. {t}" for l, t in item["options"]]
                if qtype == "单选题" and len(letters) > 0 and not item["options"]:
                    pass
            if item["id"] not in answers:
                raise ValueError(f"题 {item['id']} 缺少答案")
            q["answer"] = normalize_answer(qtype, answers[item["id"]])

            if qtype == "单选题" and not re.fullmatch(r"[A-Z]", q["answer"]):
                raise ValueError(f"题 {item['id']} 单选答案非法: {q['answer']!r}")
            if qtype == "多选题" and len(q["answer"]) < 2:
                raise ValueError(f"题 {item['id']} 多选答案少于两项: {q['answer']!r}")
            if qtype in ("单选题", "多选题"):
                opt_letters = {l for l, _ in item["options"]}
                bad = set(q["answer"]) - opt_letters
                if bad:
                    raise ValueError(f"题 {item['id']} 答案字母 {bad} 不在选项 {sorted(opt_letters)} 中")

            questions.append(q)
    return questions


def merge_briefs(questions: list, optional: bool) -> None:
    if not BRIEFS_JSON.exists():
        if optional:
            print("[warn] 未找到 javaweb_briefs.json,跳过简版解析")
            return
        raise SystemExit(f"缺少 {BRIEFS_JSON},请先撰写 195 条简版解析")
    briefs = json.loads(BRIEFS_JSON.read_text(encoding="utf-8"))
    missing = [q["id"] for q in questions if str(q["id"]) not in briefs and q["id"] not in briefs]
    if missing and not optional:
        raise SystemExit(f"简版解析缺 {len(missing)} 条: 题号 {missing[:10]}{'...' if len(missing) > 10 else ''}")
    for q in questions:
        brief = briefs.get(str(q["id"]), briefs.get(q["id"]))
        if brief:
            q["analysis"] = {"brief": brief}
    covered = sum(1 for q in questions if "analysis" in q)
    print(f"[ok] 简版解析覆盖 {covered}/{len(questions)}")


def main() -> None:
    optional = "--briefs-optional" in sys.argv
    sections, section_meta = parse_exam(EXAM_MD)
    answers = parse_answers(ANSWERS_MD)
    questions = build_questions(sections, section_meta, answers)

    total = sum(len(v) for v in sections.values())
    if len(questions) != total:
        raise SystemExit(f"题目总数不符: {len(questions)} != {total}")
    ids = [q["id"] for q in questions]
    if len(set(ids)) != len(ids):
        raise SystemExit("题目 id 存在重复")
    if ids != sorted(ids):
        print("[warn] 题号非连续升序,按原顺序保留")

    merge_briefs(questions, optional)
    questions.sort(key=lambda q: q["id"])

    points_sum = round(sum(q["points"] for q in questions), 2)
    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    header = (
        "// 本文件由 tools/convert_javaweb.py 自动生成,请勿手工编辑。\n"
        "// 数据来源: javaweb-final-exam/exam.md + answers.md(简版解析见 tools/javaweb_briefs.json)\n"
        "window.QUIZ_QUESTIONS = "
    )
    body = json.dumps(questions, ensure_ascii=False, indent=2)
    OUT_JS.write_text(header + body + ";\n", encoding="utf-8", newline="\n")

    stats = {t: len(v) for t, v in sections.items()}
    print(f"[ok] 生成 {OUT_JS.relative_to(ROOT)}")
    print(f"[ok] 共 {len(questions)} 题 {stats},分值合计 {points_sum}(多选为均值折算)")


if __name__ == "__main__":
    main()
