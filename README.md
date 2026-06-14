# 计算机组成原理 · 模拟题练习

一个 350 题的计算机组成原理练习应用，**支持 5 套视觉主题运行时切换**。

提供两种使用方式：
1. **HTTP 浏览器版** — `unified/`（任何能跑 Python 的环境）
2. **桌面应用版** — `electron/`（Mac/Win/Linux 原生应用）

## 快速开始

### Windows
双击 `unified/start.bat`，浏览器自动打开 `http://localhost:8000/index.html`

### macOS / Linux
```sh
cd unified
./start.sh
```

> 需要 Python 3.x（任意版本均可）。按 `Ctrl+C` 停止服务。

### 桌面版（Electron）

```sh
cd electron
npm install
npm run dev          # 开发者模式
npm run build:win    # 打包 Windows 安装包
npm run build:mac    # 打包 macOS .dmg
npm run build:linux  # 打包 Linux AppImage
```

功能：
- 原生菜单栏（**File / Edit / Theme / View / Help**）
- 窗口大小/位置自动记忆
- 主题菜单快捷切换
- 标准键盘快捷键

---

## 主题预览

点击页面顶部的 **主题名按钮**（如「极光紫」）即可切换：

| 主题 | 风格 | 主色 |
|------|------|------|
| **极光紫** | 现代渐变，圆角卡片 | `#7C3AED` |
| **极简线性** | 蓝调极简，无圆角无阴影 | `#2563EB` |
| **新粗野线条** | 粗黑边框 + 硬阴影，neo-brutalist | `#FFE066` |
| **手绘线稿** | 波浪边框 + 手写体（Caveat / Patrick Hand） | `#D97706` |
| **细线极简留白** | 衬线字体（Fraunces）+ 大留白 | `#0F766E` |

主题选择自动保存到 localStorage，刷新后保留。

---

## 文件结构

```
计组/
├── README.md              本文档
├── .gitignore
├── view-in-detail.html    题目详情参考视图
├── unified/               HTTP 浏览器版（多主题服务器版）
│   ├── index.html         入口 HTML
│   ├── start.bat / .sh    启动脚本
│   ├── theme-default.css  极光紫
│   ├── theme-style1.css   极简线性
│   ├── theme-style2.css   新粗野线条
│   ├── theme-style3.css   手绘线稿
│   ├── theme-style4.css   细线极简留白
│   ├── theme.js           主题切换逻辑
│   ├── app.js             应用主逻辑
│   └── questions.js       350 题数据
├── electron/              桌面应用版（Electron）
│   ├── main.js            主进程
│   ├── preload.js         预加载脚本
│   ├── menu.js            原生菜单
│   ├── window-state.js    窗口位置持久化
│   ├── package.json       npm + electron-builder 配置
│   ├── unified/           复制的网页内容（独立可分发）
│   └── .gitignore
└── originals/             源文件存档（5 个原版 HTML + 构建脚本 + 题库文本）
```

---

## 功能

- **350 题**：单选题 199 + 填空题 107 + 判断题 30 + 简答题 14
- **4 种题型**：单选 / 填空 / 判断 / 简答
- **答题卡**：右侧 5×70 网格，点击跳转
- **类型筛选**：sidebar 按钮按题型过滤
- **错题回顾**：单独筛选错题
- **统计面板**：已做 / 正确 / 错误 / 正确率
- **进度保存**：localStorage 持久化答题进度
- **键盘快捷键**：
  - `←` `→` 切换题目
  - `Enter` 下一题 / 提交
  - `Space` 显示简答答案
  - `1-4` 选择单选选项
- **随机顺序** + **重置进度**

---

## 开发说明

### 技术栈

- 纯 HTML + CSS + JavaScript（vanilla ES2020），无构建工具
- Google Fonts CDN（5 套字体）
- localStorage 持久化
- Python `http.server` 提供 HTTP 服务

### 如何添加新主题

1. 复制 `unified/theme-style1.css` 为 `theme-style5.css`
2. 修改 `:root` CSS 变量和组件样式
3. 编辑 `unified/index.html`，在 `<link id="theme-link">` 无需修改（JS 会动态改 href）
4. 编辑 `unified/theme.js`，在 `THEMES` 数组添加新主题配置：
   ```js
   { key: 'style5', name: '新主题名', file: 'theme-style5.css' }
   ```

### 如何更新题库

350 题数据在 `unified/questions.js` 的 `MARKDOWN_DATA` 数组中。
每题结构：
```js
{ id: 1, type: "单选题", points: 0.2, question: "...", answer: "A", options: ["A. ...", "B. ...", ...] }
```

填空题用 `blanks` 数组代替 `options`：
```js
{ id: 200, type: "填空题", points: 0.1, question: "...", answer: "(1) 32; (2) 64", blanks: ["32", "64", "80"] }
```

### 主题切换实现

`unified/index.html` 用单个 `<link id="theme-link">`，`theme.js` 通过修改 `link.href` 加载对应 CSS 并加上 `?v=时间戳` 防止浏览器缓存。主题偏好存到 `localStorage.quiz-theme`。

---

## License

Personal study project. 题库内容来自公开教材整理。
