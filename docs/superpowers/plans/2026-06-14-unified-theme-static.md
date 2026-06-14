# 计组练习统一版（静态 HTML 方案）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 5 个独立 HTML 文件（原版 + 4 风格版）合并为一个支持运行时切换主题的统一版，保留原 5 个文件不变。

**Architecture:** 单 HTML 文件 `计组练习_统一版.html`，所有 5 套主题的 CSS 用 `[data-theme="x"]` 属性选择器作用域。默认主题 = 原版（紫色），其他 4 主题为覆盖样式。运行时切换 = 改 `<body data-theme="...">` + localStorage 持久化。零构建、零服务、file:// 双击即用。

**Tech Stack:** 纯 HTML + CSS + JavaScript（vanilla ES2020），5 套 Google Fonts（CDN），localStorage，attribute selector。

**Spec:** `docs/superpowers/specs/2026-06-14-unified-theme-static-design.md`

---

## File Structure

### 新建
- `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` — 唯一新建文件，含所有 5 套主题

### 不变
- `C:\Users\ASUS\Desktop\计组\计组练习.html`
- `C:\Users\ASUS\Desktop\计组\计组练习_极简线性图标风.html`
- `C:\Users\ASUS\Desktop\计组\计组练习_新粗野线条.html`
- `C:\Users\ASUS\Desktop\计组\计组练习_手绘线稿.html`
- `C:\Users\ASUS\Desktop\计组\计组练习_细线极简留白.html`

---

## Task 1: 创建新文件骨架

**Files:**
- Create: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html`

- [ ] **Step 1: 复制原版紫文件作为基础**

```bash
cp "C:/Users/ASUS/Desktop/计组/计组练习.html" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

- [ ] **Step 2: 验证复制成功**

```bash
ls -la "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：文件存在，大小 ~141KB。

- [ ] **Step 3: 在浏览器中打开新文件**

```bash
start "" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：原版紫色界面正常显示，350 题可作答。

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 创建统一版基础文件（拷贝原版紫色）"
```

---

## Task 2: 替换 5 套 Google Fonts 链接

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html:8`

- [ ] **Step 1: 找到原版字体的 link 标签（line 8）**

定位：`grep -n "fonts.googleapis" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"`

预期返回：第 8 行有原版的字体链接（含 Inter, JetBrains Mono, Noto Sans SC）。

- [ ] **Step 2: 替换为合并的 5 套字体链接**

将原 line 8 整行替换为：

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Patrick+Hand&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 3: 验证替换**

```bash
grep -c "Caveat" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
grep -c "Fraunces" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
grep -c "Space+Grotesk" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：每条都返回 ≥1。

- [ ] **Step 4: 在浏览器刷新页面**

预期：所有字体在 Network 面板可见，无 CORS 报错。

- [ ] **Step 5: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 合并 5 套 Google Fonts 单链接"
```

---

## Task 3: 注入 4 套主题的 CSS 变量（仅 token 层）

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` (在 `</style>` 前注入新 CSS)

- [ ] **Step 1: 定位 `</style>` 位置**

```bash
grep -n "</style>" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期返回：第 N 行（接近 745）。

- [ ] **Step 2: 在 `</style>` 前插入 4 套主题的 token 覆盖**

通过 Edit 工具，将 `</style>` 替换为新增内容 + `</style>`。新增内容：

```css
/* ============== Theme Tokens (5 themes) ============== */
[data-theme="default"] {/* inherits :root */}

[data-theme="style1"] {
  --bg-deep: #FFFFFF;
  --bg-main: #FAFAFA;
  --bg-card: #FFFFFF;
  --bg-card-hover: #F9FAFB;
  --bg-input: #FAFAFA;
  --accent: #2563EB;
  --accent-dim: #1D4ED8;
  --accent-glow: rgba(37,99,235,0.08);
  --error: #DC2626;
  --error-dim: #B91C1C;
  --error-glow: rgba(220,38,38,0.08);
  --text: #111827;
  --text-secondary: #6B7280;
  --text-dim: #9CA3AF;
  --border: #E5E7EB;
  --border-accent: rgba(37,99,235,0.25);
}

[data-theme="style2"] {
  --bg-deep: #FFF8E7;
  --bg-main: #FFF8E7;
  --bg-card: #FFFFFF;
  --bg-card-hover: #FFEFD5;
  --bg-input: #FFF8E7;
  --accent: #FFE066;
  --accent-dim: #FAB005;
  --accent-glow: rgba(255,224,102,0.3);
  --error: #E03131;
  --error-dim: #C92A2A;
  --error-glow: rgba(224,49,49,0.1);
  --text: #000000;
  --text-secondary: #1A1A1A;
  --text-dim: #4A4A4A;
  --border: #000000;
  --border-accent: rgba(0,0,0,0.3);
}

[data-theme="style3"] {
  --bg-deep: #F5F1E8;
  --bg-main: #FBF7EC;
  --bg-card: #FBF7EC;
  --bg-card-hover: #F0E8D5;
  --bg-input: #FBF7EC;
  --accent: #D97706;
  --accent-dim: #B45309;
  --accent-glow: rgba(217,119,6,0.1);
  --error: #B91C1C;
  --error-dim: #991B1B;
  --error-glow: rgba(185,28,28,0.1);
  --text: #2B2417;
  --text-secondary: #5C4F3A;
  --text-dim: #8B7E68;
  --border: #2B2417;
  --border-accent: rgba(43,36,23,0.3);
}

[data-theme="style4"] {
  --bg-deep: #FAFAF9;
  --bg-main: #FAFAF9;
  --bg-card: #FFFFFF;
  --bg-card-hover: #F5F5F4;
  --bg-input: #FFFFFF;
  --accent: #0F766E;
  --accent-dim: #115E59;
  --accent-glow: rgba(15,118,110,0.08);
  --error: #991B1B;
  --error-dim: #7F1D1D;
  --error-glow: rgba(153,27,27,0.06);
  --text: #1C1917;
  --text-secondary: #44403C;
  --text-dim: #78716C;
  --border: #E7E5E4;
  --border-accent: rgba(15,118,110,0.2);
}

```

- [ ] **Step 3: 验证插入成功**

```bash
grep -c 'data-theme="style' "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：返回 4（每个主题一个）。

- [ ] **Step 4: 浏览器临时测试（用 DevTools）**

打开 DevTools Console，运行：
```js
document.body.dataset.theme = 'style1';
```

预期：界面颜色变化（蓝调）。

- [ ] **Step 5: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 注入 4 套主题的 token CSS 变量"
```

---

## Task 4: 注入 4 套主题的组件样式覆盖

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` (在 Task 3 插入的 CSS 之后)

- [ ] **Step 1: 在 Task 3 的 CSS 之后，继续追加组件覆盖**

通过 Edit 工具，在 `</style>` 前继续追加（接在 Task 3 后面）：

```css
/* ============== Style 1: 极简线性图标风 覆盖 ============== */
[data-theme="style1"] .question-card {
  border-radius: 12px; box-shadow: none; border: 1px solid var(--border);
}
[data-theme="style1"] .option {
  border-radius: 8px; border: 1px solid var(--border);
}
[data-theme="style1"] .btn {
  border-radius: 6px;
}
[data-theme="style1"] .shuffle-btn {
  border-radius: 6px;
}

/* ============== Style 2: 新粗野线条 覆盖 ============== */
[data-theme="style2"] .question-card {
  border-radius: 0; border: 3px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
}
[data-theme="style2"] .option {
  border-radius: 0; border: 3px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
}
[data-theme="style2"] .btn {
  border-radius: 0; border: 3px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;
}
[data-theme="style2"] .shuffle-btn {
  border-radius: 0; border: 3px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;
}
[data-theme="style2"] .btn-primary { background: var(--accent); }
[data-theme="style2"] .sidebar {
  border-right: 3px solid var(--ink);
}
[data-theme="style2"] .sidebar h1 {
  border-bottom: 3px solid var(--ink);
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
}
[data-theme="style2"] .stats h3 {
  border-bottom: 2px solid var(--ink);
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
}
[data-theme="style2"] .filter-btn {
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.04em;
}
[data-theme="style2"] .feedback {
  border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
  border-radius: 0; font-weight: 700;
}
[data-theme="style2"] .kbd {
  background: var(--bg-card); border: 2px solid var(--ink);
  border-radius: 0;
}
[data-theme="style2"] .stats-btn {
  border-radius: 0; border: 2px solid var(--ink);
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.04em;
}

/* ============== Style 3: 手绘线稿 覆盖 ============== */
[data-theme="style3"] body {
  font-family: 'Patrick Hand', cursive;
  font-size: 17px;
}
[data-theme="style3"] .question-card {
  border-radius: 10px 26px 10px 26px / 26px 10px 26px 10px;
  border: 2.5px solid var(--ink);
  box-shadow: 4px 6px 0 rgba(43,36,23,0.18);
}
[data-theme="style3"] .option {
  border-radius: 6px 18px 6px 18px / 18px 6px 18px 6px;
  border: 2.5px solid var(--ink);
}
[data-theme="style3"] .option:nth-child(even) {
  border-radius: 18px 6px 18px 6px / 6px 18px 6px 18px;
}
[data-theme="style3"] .btn {
  border-radius: 8px 18px 8px 18px;
  border: 2.5px solid var(--ink);
  font-family: 'Caveat', cursive; font-size: 19px; font-weight: 700;
}
[data-theme="style3"] .shuffle-btn {
  border-radius: 8px 18px 8px 18px;
  border: 2.5px solid var(--ink);
  font-family: 'Caveat', cursive; font-size: 19px;
}
[data-theme="style3"] .sidebar {
  border-right: 2.5px solid var(--ink);
  border-radius: 6px 22px 8px 26px;
}
[data-theme="style3"] .sidebar h1 {
  font-family: 'Caveat', cursive; font-size: 26px;
}
[data-theme="style3"] .stats h3 {
  font-family: 'Caveat', cursive; font-size: 22px;
}
[data-theme="style3"] .filter-btn {
  font-family: 'Patrick Hand', cursive;
}
[data-theme="style3"] .stats-btn {
  border-radius: 8px 14px 8px 14px;
  border: 2.5px solid var(--ink);
}
[data-theme="style3"] .feedback {
  border: 2.5px dashed var(--correct);
  border-radius: 16px 4px 16px 4px;
}
[data-theme="style3"] .kbd {
  border: 2px solid var(--ink);
  border-radius: 8px 4px 8px 4px;
}
[data-theme="style3"] .blank-input {
  border: 2.5px solid var(--ink);
  border-radius: 14px 4px 14px 4px;
}

/* ============== Style 4: 细线极简留白 覆盖 ============== */
[data-theme="style4"] .question-card {
  border-radius: 0; border: none;
  border-top: 1px solid var(--line-2, var(--border));
  border-bottom: 1px solid var(--line-2, var(--border));
  box-shadow: none; background: transparent;
}
[data-theme="style4"] .option {
  border-radius: 0; border: none;
  border-bottom: 1px solid var(--line, var(--border));
  background: transparent;
}
[data-theme="style4"] .option:hover {
  padding-left: 8px;
}
[data-theme="style4"] .btn {
  border-radius: 0; border: none;
  background: transparent; padding: 8px 0;
}
[data-theme="style4"] .btn-primary {
  color: var(--accent);
}
[data-theme="style4"] .shuffle-btn {
  border-radius: 0; border: none;
  background: transparent;
}
[data-theme="style4"] .sidebar {
  border-right: 1px solid var(--line-2, var(--border));
}
[data-theme="style4"] .sidebar h1 {
  font-family: 'Fraunces', serif; font-weight: 500; font-size: 24px;
  letter-spacing: -0.01em;
}
[data-theme="style4"] .stats h3 {
  font-family: 'Fraunces', serif; font-style: italic;
  font-weight: 500; font-size: 13px;
}
[data-theme="style4"] .stats {
  border-top: 1px solid var(--line, var(--border));
  background: transparent; border: none;
}
[data-theme="style4"] .filter-btn {
  font-family: 'Fraunces', serif; font-style: italic;
}
[data-theme="style4"] .stats-btn {
  border: none; background: transparent;
  font-family: 'Fraunces', serif; font-style: italic;
  text-decoration: underline; text-decoration-color: var(--line-2, var(--border));
}
[data-theme="style4"] .stats-actions {
  border-top: 1px solid var(--line, var(--border));
}
[data-theme="style4"] .feedback {
  border-radius: 0; border: none;
  border-left: 1px solid var(--ink);
  background: transparent;
  font-family: 'Fraunces', serif; font-style: italic;
}
[data-theme="style4"] .kbd {
  border-radius: 0; border: 1px solid var(--line-2, var(--border));
  background: transparent;
}
[data-theme="style4"] .blank-input {
  border-radius: 0; border: none;
  border-bottom: 1px solid var(--line, var(--border));
  background: transparent;
}

```

- [ ] **Step 2: 验证插入成功**

```bash
grep -c 'data-theme="style' "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：返回 ≥ 200（很多覆盖规则）。

- [ ] **Step 3: 浏览器切换测试**

```js
document.body.dataset.theme = 'style1';
document.body.dataset.theme = 'style2';
document.body.dataset.theme = 'style3';
document.body.dataset.theme = 'style4';
```

预期：每次切换视觉变化明显，但保留统一的基础结构。

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 注入 4 套主题的组件样式覆盖"
```

---

## Task 5: 调整 5 套主题的侧栏宽度

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` 的 `.sidebar` 样式

- [ ] **Step 1: 找到 `.sidebar` 当前定义**

```bash
grep -n "^\.sidebar {" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期返回原版的 `.sidebar` 定义（含 `width: 260px;`）。

- [ ] **Step 2: 在原版定义后追加各主题宽度覆盖**

将原版 `.sidebar` 整块（包含 `width: 260px;`）的紧接下一行追加（用 Edit 工具）：

```css
/* 主题宽度覆盖 */
[data-theme="style1"] .sidebar { width: 260px; }
[data-theme="style2"] .sidebar { width: 276px; }
[data-theme="style3"] .sidebar { width: 286px; }
[data-theme="style4"] .sidebar { width: 240px; }
[data-theme="style1"] .main { margin-left: 260px; }
[data-theme="style2"] .main { margin-left: 276px; }
[data-theme="style3"] .main { margin-left: 286px; }
[data-theme="style4"] .main { margin-left: 240px; }
```

- [ ] **Step 3: 浏览器验证**

切换每个主题，确认侧栏宽度正确：
- style1: 260px
- style2: 276px（更宽，含 3px 边框）
- style3: 286px
- style4: 240px

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 主题对应的侧栏宽度调整"
```

---

## Task 6: 主题切换器 CSS

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` 的 CSS（紧接侧栏宽度覆盖后）

- [ ] **Step 1: 追加主题切换器样式**

通过 Edit 工具，在 `</style>` 前追加：

```css
/* ============== Theme Switcher ============== */
.theme-switcher { position: relative; }
.theme-trigger {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 8px;
  color: var(--text-secondary); font-size: 13px;
  font-family: var(--sans); cursor: pointer; transition: all 0.2s;
  white-space: nowrap;
}
.theme-trigger:hover { border-color: var(--accent); color: var(--text); }
.theme-trigger .theme-dot {
  display: inline-block; width: 12px; height: 12px;
  border-radius: 3px; background: var(--accent);
  transition: background 0.2s;
}
.theme-trigger .theme-caret {
  font-size: 10px; opacity: 0.6;
}
.theme-popover {
  position: absolute; top: calc(100% + 6px); right: 0;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 220px; padding: 6px; z-index: 200;
  display: none;
}
.theme-popover.open { display: block; }
.theme-option {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; border: none; background: transparent;
  border-radius: 6px; color: var(--text);
  font-size: 13px; font-family: var(--sans); cursor: pointer;
  width: 100%; text-align: left; transition: background 0.15s;
}
.theme-option:hover { background: var(--bg-card-hover); }
.theme-option.active { background: var(--accent-glow); }
.theme-option .opt-swatch {
  width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0;
  border: 1px solid var(--border);
}
.theme-option .opt-name { flex: 1; }
.theme-option .opt-check {
  font-size: 14px; color: var(--accent); visibility: hidden;
}
.theme-option.active .opt-check { visibility: visible; }

```

- [ ] **Step 2: 验证插入成功**

```bash
grep -c "theme-popover" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：返回 ≥3（多次出现）。

- [ ] **Step 3: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 主题切换器 CSS"
```

---

## Task 7: 主题切换器 HTML

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` 的 top-bar（在 shuffle-btn 旁）

- [ ] **Step 1: 定位 top-bar 区域**

```bash
grep -n "shuffle-btn" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html" | head -5
```

预期：找到 shuffle-btn 位置。

- [ ] **Step 2: 在 shuffle-btn 之后插入主题切换器 HTML**

找到 `</div>` 结束 top-bar 前的 shuffle-btn 之后（一般紧接着），用 Edit 工具插入：

```html
<div class="theme-switcher">
  <button class="theme-trigger" id="theme-trigger" type="button" aria-label="切换主题">
    <span class="theme-dot" id="theme-dot"></span>
    <span class="theme-label" id="theme-label">原版</span>
    <span class="theme-caret">▾</span>
  </button>
  <div class="theme-popover" id="theme-popover" role="menu">
    <!-- 主题选项由 JS 渲染 -->
  </div>
</div>
```

- [ ] **Step 3: 验证 HTML 插入**

```bash
grep -c "theme-trigger" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：返回 ≥1。

- [ ] **Step 4: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 主题切换器 HTML 容器"
```

---

## Task 8: 主题切换器 JS（核心逻辑）

**Files:**
- Modify: `C:\Users\ASUS\Desktop\计组\计组练习_统一版.html` 的 script 块（在 INIT 前）

- [ ] **Step 1: 定位 INIT 块**

```bash
grep -n "^// INIT" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：找到 INIT 注释行。

- [ ] **Step 2: 在 INIT 前插入主题切换器 JS**

通过 Edit 工具，将 `// INIT` 替换为：

```js
// ============================================
// THEME SWITCHER
// ============================================
const THEMES = [
  { key: 'default', name: '原版',          swatch: '#7C3AED' },
  { key: 'style1',  name: '极简线性',      swatch: '#2563EB' },
  { key: 'style2',  name: '新粗野线条',    swatch: '#FFE066' },
  { key: 'style3',  name: '手绘线稿',      swatch: '#D97706' },
  { key: 'style4',  name: '细线极简留白',  swatch: '#0F766E' },
];
const KEY_THEME = 'quiz-theme';

function applyTheme(key) {
  const theme = THEMES.find(t => t.key === key);
  if (!theme) return;
  document.body.dataset.theme = key;
  document.getElementById('theme-label').textContent = theme.name;
  document.getElementById('theme-dot').style.background = theme.swatch;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === key);
  });
  localStorage.setItem(KEY_THEME, key);
}

function renderThemeOptions() {
  const popover = document.getElementById('theme-popover');
  popover.innerHTML = THEMES.map(t => `
    <button class="theme-option" data-theme="${t.key}" role="menuitem" type="button">
      <span class="opt-swatch" style="background:${t.swatch}"></span>
      <span class="opt-name">${t.name}</span>
      <span class="opt-check">✓</span>
    </button>
  `).join('');
  popover.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme(btn.dataset.theme);
      popover.classList.remove('open');
    });
  });
}

function initTheme() {
  const saved = localStorage.getItem(KEY_THEME) || 'default';
  renderThemeOptions();
  applyTheme(saved);

  document.getElementById('theme-trigger').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('theme-popover').classList.toggle('open');
  });

  document.addEventListener('click', () => {
    document.getElementById('theme-popover').classList.remove('open');
  });
}

```

后接 `// INIT`。

- [ ] **Step 3: 在 INIT 块加入 initTheme() 调用**

找到 INIT 块中的 `updateSidebar();`（位于 `renderQuestion();` 之前），在其前插入 `initTheme();`。

```js
// INIT
initTheme();
updateSidebar();
renderQuestion();
```

- [ ] **Step 4: 验证 JS 插入**

```bash
grep -c "initTheme" "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：返回 ≥2（定义 + 调用）。

- [ ] **Step 5: 浏览器手动测试**

1. 刷新页面
2. 点击 top-bar 右侧的主题按钮
3. 浮层出现，列出 5 个主题
4. 点击「极简线性」→ 界面切换
5. 刷新 → 主题保留

- [ ] **Step 6: 提交**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add 计组练习_统一版.html && git commit -m "feat: 主题切换器 JS（5 主题配置 + 持久化）"
```

---

## Task 9: 端到端验证

**Files:** (无，仅验证)

- [ ] **Step 1: 验证默认主题**

打开 `计组练习_统一版.html`，确认默认显示原版紫色界面。

- [ ] **Step 2: 验证 5 主题切换**

依次切换 5 个主题，每个主题：
- 视觉与对应独立文件（极简线性/新粗野/手绘线稿/细线极简留白）**像素级一致**
- 主题切换器色块正确
- 当前主题打勾 ✓

- [ ] **Step 3: 验证持久化**

刷新页面，确认主题保留。
关闭浏览器再打开，确认主题仍保留。

- [ ] **Step 4: 验证 350 题功能**

- 单选/填空/判断/简答 4 种题型都正常作答
- 答题后正确/错误状态显示
- 答题卡右侧栏 5×70 网格渲染
- 答题卡 chip 筛选工作
- 答题卡点击 tile 跳转

- [ ] **Step 5: 验证键盘快捷键**

- ← → 切换题目
- Enter 下一题/提交
- Space 显示简答答案
- 1-4 选择单选选项

- [ ] **Step 6: 验证统计和进度**

- 统计面板数字实时更新
- 进度条更新
- 随机顺序工作
- 重置进度工作

- [ ] **Step 7: 验证响应式**

调整浏览器宽度到 1100px 以下，确认答题卡隐藏。

- [ ] **Step 8: 验证文件大小**

```bash
ls -la "C:/Users/ASUS/Desktop/计组/计组练习_统一版.html"
```

预期：< 350KB。

- [ ] **Step 9: 验证原文件未变**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git status
```

预期：原 5 个文件未出现 modified。

- [ ] **Step 10: 最终提交（如有微调）**

```bash
cd "C:/Users/ASUS/Desktop/计组" && git add -A && git commit -m "feat: 统一版完成（原文件保留）" --allow-empty
```

---

## Self-Review Checklist

完成后逐项确认：

- [ ] 5 套主题都能切换
- [ ] 切换无闪烁
- [ ] 刷新后主题保留
- [ ] localStorage `quiz-theme` 已写入
- [ ] 原 350 题功能全部正常
- [ ] 答题卡、键盘快捷键、统计面板、错题回顾全部正常
- [ ] 1100px 以下答题卡自动隐藏
- [ ] 文件大小 < 350KB
- [ ] 原 5 个文件未被修改
- [ ] 所有 commit 信息清晰
