# 计组练习统一版（HTTP 静态服务器方案）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 5 个独立 HTML 文件（原版 + 4 风格版）合并为一个支持运行时切换主题的统一版，启动通过 `python -m http.server` 静态服务器。

**Architecture:** 与静态方案相同的单 HTML 文件 + CSS 属性选择器作用域。差异在于交付 2 个启动脚本（`start.bat` / `start.sh`），用户通过 `http://localhost:8000` 而非 `file://` 访问。HTTP 协议带来更宽松的 CORS、字体缓存、Service Worker 可能性。

**Tech Stack:** 纯 HTML + CSS + JavaScript（vanilla ES2020），5 套 Google Fonts（CDN），localStorage，attribute selector，Python `http.server`。

**Spec:** `docs/superpowers/specs/2026-06-14-unified-theme-design.md`

---

## 与静态方案的关系

本计划的 **Task 1-9 与静态方案完全相同**（同一个文件、同一套 CSS、同一套 JS、同一套验证）。**仅 Task 10-12 不同**（启动脚本 + 服务器验证）。

**实施路径**：
- 优先完成静态方案 Task 1-9（已记录在 `docs/superpowers/plans/2026-06-14-unified-theme-static.md`）
- 然后追加本计划的 Task 10-12

**DRY 原则**：HTML 文件本体不变，启动方式由脚本决定。

---

## File Structure

### 新建
- `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` — 与静态方案完全相同
- `C:\Users\ASUS\Desktop\计组\start.bat` — **本方案新增**，Windows 启动脚本
- `C:\Users\ASUS\Desktop\计组\start.sh` — **本方案新增**，macOS/Linux 启动脚本

### 不变
- 5 个原文件（同静态方案）

---

## Task 1-9: 复用静态方案的任务

**前置：完成 `docs/superpowers/plans/2026-06-14-unified-theme-static.md` 的 Task 1-9**

- [ ] **Step 1: 确认静态方案 Task 1-9 已完成**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git log --oneline | head -10
```

预期：能看到 Task 1-9 的所有 commit（创建文件、字体、token、组件覆盖、宽度、切换器 CSS/HTML/JS）。

- [ ] **Step 2: 验证统一版文件存在且大小 < 350KB**

```bash
ls -la "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：文件存在，< 350KB。

---

## Task 10: 创建 start.bat（Windows 启动脚本）

**Files:**
- Create: `C:\Users\ASUS\Desktop\计组\start.bat`

- [ ] **Step 1: 创建 start.bat 文件**

用 Write 工具创建，内容：

```bat
@echo off
chcp 65001 >nul
title 计组练习 统一版 - 本地服务器

echo.
echo ============================================
echo   计组练习统一版 - 本地服务器
echo ============================================
echo.
echo   服务地址: http://localhost:8000/
echo   统一版入口: http://localhost:8000/计组练习_统一版.html
echo.
echo   按 Ctrl+C 停止服务
echo ============================================
echo.

REM 检查 Python 是否可用
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python
    echo.
    echo 请先安装 Python：
    echo   1. 访问 https://www.python.org/downloads/
    echo   2. 下载并安装 Python 3.x
    echo   3. 安装时勾选 "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

REM 自动打开浏览器
start "" "http://localhost:8000/计组练习_统一版.html"

REM 启动 HTTP 服务
python -m http.server 8000

```

- [ ] **Step 2: 验证文件创建成功**

```bash
ls -la "C:/Users/ASUS/Desktop/计组/start.bat"
```

预期：文件存在。

- [ ] **Step 3: 验证脚本语法（用 echo 模拟）**

```bash
type "C:/Users/ASUS/Desktop/计组/start.bat"
```

预期：能看到所有内容。

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add start.bat && git commit -m "feat: Windows 启动脚本 start.bat"
```

---

## Task 11: 创建 start.sh（macOS/Linux 启动脚本）

**Files:**
- Create: `C:\Users\ASUS\Desktop\计组\start.sh`

- [ ] **Step 1: 创建 start.sh 文件**

用 Write 工具创建，内容：

```sh
#!/bin/sh

echo
echo "============================================"
echo "  计组练习统一版 - 本地服务器"
echo "============================================"
echo
echo "  服务地址: http://localhost:8000/"
echo "  统一版入口: http://localhost:8000/计组练习_统一版.html"
echo
echo "  按 Ctrl+C 停止服务"
echo "============================================"
echo

# 检查 Python 是否可用
if ! command -v python3 >/dev/null 2>&1; then
    if ! command -v python >/dev/null 2>&1; then
        echo "[错误] 未检测到 Python"
        echo
        echo "请先安装 Python 3："
        echo "  macOS:   brew install python3"
        echo "  Ubuntu:  sudo apt install python3"
        echo "  Windows: 请使用 start.bat 或安装 Python"
        exit 1
    fi
    PYTHON=python
else
    PYTHON=python3
fi

# 自动打开浏览器（macOS 用 open，Linux 用 xdg-open）
URL="http://localhost:8000/计组练习_统一版.html"
if command -v open >/dev/null 2>&1; then
    open "$URL" &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL" &
fi

# 启动 HTTP 服务
$PYTHON -m http.server 8000

```

- [ ] **Step 2: 验证文件创建成功**

```bash
ls -la "C:/Users/ASUS/Desktop/计组/start.sh"
```

预期：文件存在。

- [ ] **Step 3: 添加可执行权限（仅 Linux/macOS 需要）**

```bash
chmod +x "C:/Users/ASUS/Desktop/计组/start.sh"
```

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add start.sh && git commit -m "feat: macOS/Linux 启动脚本 start.sh"
```

---

## Task 12: 端到端服务器验证

**Files:** (无，仅验证)

- [ ] **Step 1: Windows 验证（双击 start.bat）**

- 双击 `start.bat`
- 预期：浏览器自动打开 `http://localhost:8000/计组练习_统一版.html`
- 预期：黑色终端窗口显示 `Serving HTTP on 0.0.0.0 port 8000`

- [ ] **Step 2: 主题切换测试（HTTP 协议下）**

依次切换 5 个主题：
- 字体加载（HTTP/2 多路复用，应该秒开）
- 视觉与对应独立文件一致
- 切换无延迟

- [ ] **Step 3: localStorage 持久化**

- 刷新页面 → 主题保留
- 关闭浏览器再开 → 主题保留
- 在 DevTools Application 标签看 `quiz-theme` key 存在

- [ ] **Step 4: 字体缓存验证**

DevTools Network 标签 → 字体（woff2）→ 第一次显示 from disk cache 或 304，验证浏览器已缓存

- [ ] **Step 5: macOS/Linux 验证（./start.sh）**

```bash
cd "C:/Users/ASUS/Desktop/计组" && ./start.sh
```

预期：终端显示启动信息，浏览器自动打开统一版。

- [ ] **Step 6: 同时启动 5 个独立文件 + 1 统一版（独立性测试）**

```bash
# 终端 1：开统一版
./start.sh

# 浏览器 1：访问 http://localhost:8000/计组练习_统一版.html
# 浏览器 2：访问 http://localhost:8000/计组练习.html （原版）
# 浏览器 3：访问 http://localhost:8000/计组练习_极简线性图标风.html
# 等等
```

预期：每个文件独立工作，互不干扰。

- [ ] **Step 7: 验证 5 主题跨 HTTP 正常工作**

在统一版中切换到 Style 2（新粗野），刷新后保留。

- [ ] **Step 8: 验证原 5 个文件仍可独立 file:// 打开**

双击 `计组练习.html` → 仍能用（即使走 file:// 也能用，只是字体 CORS 警告）。

- [ ] **Step 9: 最终提交（如有微调）**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add -A && git commit -m "feat: 服务方案完成（统一版 + 启动脚本）" --allow-empty
```

---

## Self-Review Checklist

- [ ] 静态方案 Task 1-9 已完成
- [ ] start.bat 存在且能启动服务
- [ ] start.sh 存在且有可执行权限
- [ ] 双击 start.bat 浏览器自动打开统一版
- [ ] `./start.sh` 启动后浏览器自动打开统一版
- [ ] 5 主题切换、持久化、字体缓存全部正常
- [ ] 原 5 个独立文件可独立工作
- [ ] 6 个文件（5 原 + 1 统一）功能互不干扰
- [ ] 所有 commit 信息清晰
