# 计组练习统一版（多主题切换）设计

**日期**：2026-06-14
**目标文件**：`C:\Users\ASUS\Desktop\计组\计组练习_统一版.html`（新增第 6 个文件）

## Context

当前目录已有 5 个独立 HTML 文件，结构、JS、350 题数据完全相同，仅 CSS 与字体链接不同：

| 文件 | 主题 |
|---|---|
| `计组练习.html` | 原版（紫色 `#7C3AED`） |
| `计组练习_极简线性图标风.html` | Style 1（蓝 `#2563EB`） |
| `计组练习_新粗野线条.html` | Style 2（黄 `#FFE066`） |
| `计组练习_手绘线稿.html` | Style 3（橙 `#D97706`） |
| `计组练习_细线极简留白.html` | Style 4（青 `#0F766E`） |

**约束**：
- 保留原 5 个文件不变
- 新增第 6 个统一版，支持运行时切换主题
- 无构建工具、零 npm 依赖、`file://` 双击直接打开
- 5 套 Google Fonts 全量预加载

## Tech Stack

**纯 HTML + CSS + JavaScript，无构建**。

理由：
1. **匹配现有工作流**：5 个原文件都是 `file://` 双击即用，引入 Vite/PostCSS 会破坏此便利
2. **CSS 隔离的最低成本方案**：`[data-theme="x"]` 属性选择器是 CSS 作用域的天然工具，零运行时开销
3. **可逆性高**：单文件 → 多文件迁移容易，反之难
4. **CSS 体量可控**：5 × ~3.5KB 主题 CSS + ~50KB 通用 CSS = ~70KB CSS，可接受

不引入：React/Vue/Lit、Web Components、Shadow DOM、iframe、Tailwind、PostCSS、Vite、Webpack。

## 架构

### 单一 HTML 文件结构

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta>...</meta>
  <title>...</title>
  
  <!-- 5 套 Google Fonts 链接（全部预加载） -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Caveat...&family=Fraunces...&family=Inter...&family=JetBrains+Mono...&family=Noto+Sans+SC...&family=Patrick+Hand...&family=Space+Grotesk..." rel="stylesheet">
  
  <style>
    :root {
      /* 默认主题（原版紫色）的 CSS 变量 */
      --bg-deep: #FAF5FF;
      --accent: #7C3AED;
      ...
    }
    [data-theme="style1"] { --accent: #2563EB; ... }
    [data-theme="style2"] { --accent: #FFE066; ... }
    [data-theme="style3"] { --accent: #D97706; ... }
    [data-theme="style4"] { --accent: #0F766E; ... }
    
    /* 组件基础样式 = 默认主题（无作用域） */
    .sidebar { ... }
    .btn { ... }
    .question-card { ... }
    .answer-sheet { ... }
    .sheet-tile { ... }
    /* 答题卡等所有 5 文件共有的组件 */
    
    /* 各主题覆盖（仅限需要差异化的部分） */
    [data-theme="style1"] .sidebar { background: var(--bg); ... }
    [data-theme="style2"] .sidebar { border: 3px solid #000; ... }
    ...
    
    /* 主题切换器样式 */
    .theme-switcher { ... }
    .theme-popover { ... }
  </style>
</head>
<body data-theme="default">
  <div class="app">
    <aside class="sidebar">...</aside>
    <main class="main">
      <div class="top-bar">
        <div class="progress-wrap">...</div>
        <button class="shuffle-btn">Shuffle</button>
        <div class="theme-switcher">
          <button class="theme-trigger" id="theme-trigger">
            <span class="theme-dot" id="theme-dot"></span>
            <span class="theme-label" id="theme-label">原版</span>
            <span class="theme-caret">▾</span>
          </button>
          <div class="theme-popover" id="theme-popover">
            <button data-theme="default">原版</button>
            <button data-theme="style1">极简线性</button>
            <button data-theme="style2">新粗野线条</button>
            <button data-theme="style3">手绘线稿</button>
            <button data-theme="style4">细线极简留白</button>
          </div>
        </div>
      </div>
      <div class="question-card" id="question-card">...</div>
    </main>
    <aside class="answer-sheet">...</aside>
  </div>
  
  <script>
    const MARKDOWN_DATA = [...];
    // 全部原 JS（renderQuestion, selectChoice, updateSidebar, goToQuestion, renderAnswerSheet, updateSheet, highlightCurrentTile, chip 过滤, 键盘快捷键, etc.）
    // + 新增主题切换逻辑
  </script>
</body>
</html>
```

## 主题清单

```js
const THEMES = [
  { key: 'default', name: '原版',          swatch: '#7C3AED', font: 'Inter + Noto Sans SC' },
  { key: 'style1',  name: '极简线性',      swatch: '#2563EB', font: 'Inter' },
  { key: 'style2',  name: '新粗野线条',    swatch: '#FFE066', font: 'Space Grotesk' },
  { key: 'style3',  name: '手绘线稿',      swatch: '#D97706', font: 'Caveat + Patrick Hand' },
  { key: 'style4',  name: '细线极简留白',  swatch: '#0F766E', font: 'Fraunces' },
];
```

## 主题切换器 UI

**位置**：top-bar 右上角，紧邻 Shuffle 按钮。

**触发按钮**：
```
[● 原版 ▾]
```
- 左侧 12×12 色块（圆角方块，主题 swatch 色）
- 中间主题名（13px，与 Shuffle 同字号）
- 右侧下拉箭头
- 边框 1px `--border`，与 Shuffle 一致

**弹出浮层**（点击触发按钮后）：
```
┌─────────────────────┐
│ ●  原版           ✓ │   <- 当前主题
│ ●  极简线性         │
│ ●  新粗野线条       │
│ ●  手绘线稿         │
│ ●  细线极简留白     │
└─────────────────────┘
```
- 5 行选项，每行：12×12 色块 + 主题名 + 当前主题打勾
- 浮层 absolute 定位，固定宽度 220px
- 阴影 `0 4px 12px rgba(0,0,0,0.1)`
- 点击外部区域关闭
- 点击行 → 应用主题 + 关闭浮层
- 键盘交互不在 MVP 范围：浮层用鼠标操作即可（避免引入额外焦点管理复杂度）

## 状态管理

```js
const KEY_THEME = 'quiz-theme';

function applyTheme(key) {
  const theme = THEMES.find(t => t.key === key);
  if (!theme) return;
  document.body.dataset.theme = key;
  document.getElementById('theme-label').textContent = theme.name;
  document.getElementById('theme-dot').style.background = theme.swatch;
  document.querySelectorAll('.theme-popover [data-theme]').forEach(btn => {
    const indicator = btn.querySelector('.check');
    if (indicator) indicator.style.visibility = btn.dataset.theme === key ? 'visible' : 'hidden';
  });
  localStorage.setItem(KEY_THEME, key);
}

function initTheme() {
  const saved = localStorage.getItem(KEY_THEME) || 'default';
  applyTheme(saved);
  
  // 触发按钮
  document.getElementById('theme-trigger').addEventListener('click', (e) => {
    e.stopPropagation();
    const popover = document.getElementById('theme-popover');
    popover.classList.toggle('open');
  });
  
  // 浮层选项点击
  document.querySelectorAll('.theme-popover [data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      document.getElementById('theme-popover').classList.remove('open');
    });
  });
  
  // 点击外部关闭
  document.addEventListener('click', () => {
    document.getElementById('theme-popover').classList.remove('open');
  });
}
```

## CSS 作用域策略

**默认主题 = 原版**（无前缀），其他 4 主题用 `[data-theme="styleN"]` 前缀。

具体策略：

### Token 差异
所有 `--bg-*` / `--accent` / `--correct` / `--wrong` / `--text-*` / `--border` 等 CSS 变量在 `:root` 和 `[data-theme="styleN"]` 中分别定义。

### 布局差异
```css
/* 默认（原版） */
.sidebar { width: 260px; }
.main { margin-left: 260px; margin-right: 320px; }

/* 各主题覆盖 */
[data-theme="style1"] .sidebar { width: 260px; }
[data-theme="style2"] .sidebar { width: 276px; }
[data-theme="style3"] .sidebar { width: 286px; }
[data-theme="style4"] .sidebar { width: 240px; }

[data-theme="style1"] .main { margin-left: 260px; }
[data-theme="style2"] .main { margin-left: 276px; }
[data-theme="style3"] .main { margin-left: 286px; }
[data-theme="style4"] .main { margin-left: 240px; }
```

### 视觉差异（边框、圆角、阴影、字体）
各主题的 `.btn`、`.question-card`、`.option`、`.answer-sheet`、`.sheet-tile` 等组件的视觉差异，全部用 `[data-theme="styleN"] .x` 覆盖。

## 与现有 5 个文件的关系

**保留所有 5 个原文件不变**，统一版作为第 6 个独立文件添加。

迁移策略：
- 不删除、不修改任何原文件
- 用户可继续使用原 5 文件
- 统一版可作为"演示/分发"用途

## 字体加载

5 套 Google Fonts 在 `<head>` 中**全部加载**（不预加载，按需靠浏览器优化）：

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Patrick+Hand&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

权衡：
- 全量加载 = 切换主题时字体已就绪，零延迟
- 浪费一点初始带宽（5 套字体总和 ~200KB）
- 符合用户"全量预加载"的明确选择

## Verification

完成后逐项验证：

1. **加载**：双击 `计组练习_统一版.html`，页面正常打开
2. **默认主题**：默认显示原版（紫色）界面
3. **主题切换**：点击切换器，选择「极简线性」→ 界面立即变为 Style 1 外观
4. **其他主题**：依次切换 4 风格，视觉与对应独立文件**像素级一致**
5. **持久化**：刷新页面后主题保留
6. **跨会话**：关闭浏览器再打开，主题仍保留
7. **原功能保留**：
   - 350 道题目完整加载
   - 答题卡右侧栏正常显示
   - 键盘快捷键（← → Enter Space 1-4）正常
   - 错题回顾、统计面板、随机顺序、重置进度都工作
   - localStorage `quiz-progress` 数据不丢
8. **切换器交互**：
   - 点击外部关闭浮层
   - 当前主题打勾 ✓
   - 色块正确反映主题色
9. **响应式**：1100px 以下隐藏答题卡
10. **文件大小**：< 350KB

## 不做的事

- 不删除/修改原 5 个文件
- 不引入构建工具
- 不拆分多文件
- 不改 350 题数据
- 不加新快捷键（除主题切换器已有的 ↑↓ 可选）
- 不做暗色模式（用户未要求）
- 不做主题预览缩略图
- 不做主题导出/分享
- 不动 localStorage key `quiz-progress`

## 风险与权衡

| 风险 | 缓解 |
|---|---|
| 单一 CSS 块过大，编辑冲突 | 用清晰的 `/* === style1 === */` 分隔注释 |
| 5 套字体全量加载拖慢首屏 | 浏览器自动 font-display: swap + CDN 缓存 |
| 主题切换瞬时闪烁 | 字体已加载、CSS 同步切换，无网络请求 |
| 5 套 Google Fonts 链接超长 | 单个 link URL ~600 字符，可接受 |
| 与原文件题库数据漂移 | 用同一份 MARKDOWN_DATA 来源（5 个独立文件的数据相同） |

## 文件清单

| 文件 | 状态 |
|---|---|
| 计组练习_统一版.html | **新建** |
| 计组练习.html | 不变 |
| 计组练习_极简线性图标风.html | 不变 |
| 计组练习_新粗野线条.html | 不变 |
| 计组练习_手绘线稿.html | 不变 |
| 计组练习_细线极简留白.html | 不变 |
| docs/superpowers/specs/2026-06-14-unified-theme-design.md | 本文档（新建） |

## Aesthetic Anchor

**统一版不是 5 个文件的简单拼贴**。5 套主题共享同一个语义骨架（答题卡、统计、题目），但视觉**完全是各自的设计语言**。主题切换器自身采用克制的"色块 + 名称"形式，不喧宾夺主，让被切换的主题成为视觉主角。
