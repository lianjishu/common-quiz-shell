# 计算机组成原理 · 模拟题练习

一个 350 题的计算机组成原理练习应用，**5 套视觉主题可在运行时随时切换**。同一份题库，两种使用方式：

| 形态 | 路径 | 适合 |
|---|---|---|
| **HTTP 浏览器版** | `web/` | 任何能跑 Python 的环境，零安装 |
| **桌面应用版** | `native/` | Mac / Windows / Linux 原生 Electron 应用，支持热重载与自动更新 |

> 浏览器版是纯静态页面：HTML + CSS + JS + 一份 `questions.js`。Python 只用来跑 `http.server` 起一个本地服务，**不依赖任何 Python 库**。

---

## 快速开始

### 浏览器版

**Windows** — 双击 `web/start.bat`，浏览器自动打开 `http://localhost:8000/index.html`。

**macOS / Linux**：
```sh
cd web
./start.sh
```

> 需要 Python 3.x（任意版本）。按 `Ctrl+C` 停止服务。

### 桌面版（Electron）

```sh
cd native
npm install
```

| 场景 | 命令 | 说明 |
|---|---|---|
| 开发（热重载） | `npm run dev` | 启动 Electron；改 `src/main/*.js` / `src/renderer/` / `assets/` 自动重启 + 刷新（`src/main/index.js` 顶部调 `electron-reload` 库实现）。排查 reload 自身问题可设 `ELECTRON_DISABLE_RELOAD=1 npm run dev` 跳过 |
| 打包 Windows | `npm run build:win` | NSIS 安装包 + 便携版 + zip，产物在 `native/dist/` |
| 打包 macOS | `npm run build:mac` | `.dmg` |
| 打包 Linux | `npm run build:linux` | `.AppImage` |
| 发布到 Gitee | `npm run release` | 构建 + 上传 `dist/` 到 Gitee Release，触发已安装用户的更新提示 |

发布命令需要 `GITEE_TOKEN`（Gitee 私人令牌，需要 `projects` 权限）：

```sh
GITEE_TOKEN=xxx npm run release
# 也支持：TAG=stable / SKIP_BUILD=1 / REPO_OWNER / REPO_NAME
```

桌面版功能：

- 原生菜单栏：**文件 / 主题 / 视图 / 帮助**（已中文化；`视图` 含 Reload / DevTools / 缩放 / 全屏；`帮助` 含"当前版本 vX.Y.Z"信息行 + "检查更新" + "关于"）
- 窗口位置 / 大小 / 最大化状态自动记忆（关闭后下次打开还原）
- 主题切换：`主题` 菜单 5 套主题 / 浏览器版顶部按钮切换，效果一致，IPC 桥接
- 开发期热重载（仅 dev 模式，发布构建自动剔除；`ELECTRON_DISABLE_RELOAD=1` 可临时关闭）
- 自动更新：启动后拉 Gitee Release，发现新版本弹 toast，含**版本号自检**避免同版本误报；菜单"检查更新"主动触发，结果以原生对话框反馈
- Windows / macOS / Linux 跨平台打包

---

## 主题预览

5 套主题，浏览器版用页面顶部按钮切换，桌面版用 `Theme` 菜单切换，效果一致。选择持久化到 `localStorage.quiz-theme`（默认 `style4` 细线极简留白）。

| 主题 | 风格 | 主色 |
|---|---|---|
| **极光紫** `default` | 现代渐变 + 圆角卡片 | `#7C3AED` |
| **极简线性** `style1` | 蓝调极简，无圆角无阴影 | `#2563EB` |
| **新粗野线条** `style2` | 粗黑边框 + 硬阴影 neo-brutalist | `#FFE066` |
| **手绘线稿** `style3` | 波浪边框 + 手写体（Caveat / Patrick Hand） | `#D97706` |
| **细线极简留白** `style4` | 衬线字体（Fraunces）+ 大留白 | `#0F766E` |

---

## 文件结构

```
计组/
├── README.md
├── 项目结构与打包指南.md    详细打包 / 调试 / 发布流程
├── .gitignore
│
├── web/                    HTTP 浏览器版（纯静态）
│   ├── index.html          入口 HTML（含 <link id="theme-link">）
│   ├── start.bat / .sh     跨平台启动脚本（python -m http.server 8000）
│   ├── theme-default.css   极光紫
│   ├── theme-style1.css    极简线性
│   ├── theme-style2.css    新粗野线条
│   ├── theme-style3.css    手绘线稿
│   ├── theme-style4.css    细线极简留白
│   ├── theme.js            主题切换逻辑（THEMES 数组 / applyTheme / popover）
│   ├── app.js              应用主逻辑（题库渲染 / 答题卡 / 统计）
│   └── questions.js        350 题数据（MARKDOWN_DATA 数组）
│
├── native/                 Electron 桌面版
│   ├── package.json        npm + electron-builder + electron-updater 配置
│   ├── package-lock.json
│   ├── assets/             图标（icon.ico / icon.png / 32-256px PNG）
│   ├── build/
│   │   └── publish-gitee.js    Gitee Release 自动发布脚本
│   ├── dist/                   打包产物（gitignore，electron-builder 输出）
│   ├── node_modules/
│   └── src/
│       ├── main/               主进程
│       │   ├── index.js        入口 + 窗口创建 + 热重载 + 更新器初始化
│       │   ├── menu.js         原生菜单（含 Theme 子菜单）
│       │   ├── preload.js      contextBridge：onSwitchTheme / updater IPC
│       │   └── window-state.js 窗口位置 / 大小持久化
│       └── renderer/           渲染进程
│           ├── index.html      入口
│           ├── app.js          主逻辑
│           ├── questions.js    题库（与 web/ 同源）
│           ├── theme.js        主题切换（含 electronAPI.onSwitchTheme 桥接）
│           ├── updater.js      更新 toast UI
│           └── theme-*.css     5 套主题
│
└── backup/                 历史存档（不参与发布 / 不打包）
    ├── 计组练习.html
    ├── 计组练习_极简线性图标风.html
    ├── 计组练习_新粗野线条.html
    ├── 计组练习_手绘线稿.html
    ├── 计组练习_细线极简留白.html
    ├── MARKDOWN_DATA.txt        350 题原始 Markdown 源
    ├── 题目汇总.md              Markdown 整理版
    ├── build.py                 历史构建脚本
    ├── sheet_port.py            题库从 Google Sheets 导入脚本
    └── view-in-detail.html      单题详情参考视图
```

---

## 功能

- **350 题**：单选题 199 + 填空题 107 + 判断题 30 + 简答题 14
- **4 种题型**：单选 / 填空 / 判断 / 简答
- **答题卡**：右侧 5 列网格，按题型分组（每题型内重新编号），点击跳转
- **类型筛选**：sidebar 按钮按题型过滤
- **错题回顾**：单独筛选错题
- **统计面板**：已做 / 正确 / 错误 / 正确率
- **两侧栏独立收起/展开**：左右栏各自可折叠，偏好持久化到 `localStorage`，收起后无 margin / shadow 残影
- **填空题显示答案**：Space 键（或界面按钮）揭示填空答案（与简答题交互对齐）
- **题目文本可选中**：复制题干不再被拦截
- **进度保存**：`localStorage` 持久化答题进度
- **主题切换**：5 套主题运行时切换，偏好持久化
- **桌面版自动更新**：启动后调 `electron-updater` 拉 Gitee Release，含版本号自检避免同版本误报；未发布 release 时的 404 仅记日志，不弹窗
- **键盘快捷键**：
  - `←` `→` 切换题目
  - `Enter` 下一题 / 提交
  - `Space` 显示答案（简答 / 填空）
  - `1-4` 选择单选选项
- **随机顺序** + **重置进度**

---

## 开发说明

### 技术栈

| 层 | 浏览器版 | 桌面版 |
|---|---|---|
| 运行时 | 浏览器原生 ES2020 | Electron 31 |
| 主题 | 单 `<link>` 切换 CSS | 同一机制 + IPC 桥接菜单 |
| 持久化 | `localStorage` | `localStorage` + 窗口状态 JSON |
| 打包 | — | `electron-builder`（NSIS / dmg / AppImage） |
| 自动更新 | — | `electron-updater`（generic provider 指向 Gitee Release） |
| 日志 | — | `electron-log` 写文件 |
| 热重载 | — | `electron-reload`（仅 dev，生产构建剔除） |

### 桌面版关键流程

**热重载** — `src/main/index.js` 顶部：

```js
if (process.env.NODE_ENV !== 'production' && !process.env.ELECTRON_DISABLE_RELOAD) {
  try {
    require('electron-reload')(
      [
        path.join(__dirname, 'index.js'),
        path.join(__dirname, 'preload.js'),
        path.join(__dirname, 'menu.js'),
        path.join(__dirname, 'window-state.js'),
        path.join(__dirname, '..', 'renderer'),
        path.join(__dirname, '..', 'assets')
      ],
      {
        awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 },
        ignored: [/node_modules/, /\.git/, /dist/, /\.log$/, /window-state\.json$/]
      }
    );
  } catch (e) {
    console.warn('[dev] electron-reload skipped:', e.message);
  }
}
```

`npm run dev` 跑的就是这段。改主进程任意文件或 `src/renderer/` 任意文件，dev 进程自动重启 + 窗口刷新。设 `ELECTRON_DISABLE_RELOAD=1` 可临时关闭热重载；try/catch 防 electron-reload 安装失败硬崩。

**主题桥接** — `src/main/menu.js` 的 `Theme` 子菜单：

```js
{ label: '极光紫', click: () => win.webContents.send('switch-theme', 'default') }
// ... style1 ~ style4
```

`src/main/preload.js` 用 `contextBridge` 暴露：

```js
contextBridge.exposeInMainWorld('electronAPI', {
  onSwitchTheme: (cb) => ipcRenderer.on('switch-theme', (_, key) => cb(key)),
  // updater
  checkForUpdates: () => ipcRenderer.send('updater:check'),
  downloadUpdate:  () => ipcRenderer.send('updater:download'),
  quitAndInstall:  () => ipcRenderer.send('updater:install'),
  onUpdaterStatus: (cb) => ipcRenderer.on('updater:status', (_, p) => cb(p)),
});
```

`src/renderer/theme.js` 检测到 `window.electronAPI.onSwitchTheme` 就订阅它，复用浏览器版的 `applyTheme(key)`：

```js
if (window.electronAPI && window.electronAPI.onSwitchTheme) {
  window.electronAPI.onSwitchTheme((key) => applyTheme(key));
}
```

**自动更新** — `src/main/index.js`：

1. **版本自检** — `isNewerVersion(remote, local)`（`src/main/index.js:45-55`）逐段比较版本号，避免 `electron-updater` 同版本误报
2. 启动时 `did-finish-load` 触发 `autoUpdater.checkForUpdates()`（仅 `app.isPackaged`）
3. 各阶段事件通过 `webContents.send('updater:status', ...)` 推渲染进程；菜单检查期间用 `menuCheckInProgress` 抑制重复 `available` toast
4. **菜单"检查更新"** — 主动调用 `runUpdateCheck(win, { silent: false })`，三态分支严格区分：
   - 新版本 → 原生对话框询问"下载 / 稍后"
   - 已是最新 → 对话框显示 `当前版本: v{local} / Gitee 最新版本: v{remote}`
   - 检查失败 → 对话框显示真实错误（不再谎报"已是最新"）
5. `src/renderer/updater.js` 收到后用 toast 通知自动更新进度

`autoUpdater` 拉 `package.json → build.publish.url` 指向的 Gitee Release（`https://gitee.com/yake2024/computer-organization-quiz/releases/download/latest/`）。

**填空题显示答案** — `src/renderer/app.js`：

`showAnswer()` 统一处理两种类型：
- 简答题：替换 `essay-answer` 占位为标准答案文本
- 填空题：把所有 `blank-answer` 节点标 `data-revealed="true"`，CSS 切换为可见答案样式

Space 键触发，与简答题一致。

**Gitee 发布** — `build/publish-gitee.js`：

1. `spawn('npx', ['electron-builder', '--win', '--publish', 'never'])` 构建 Windows 安装包
2. 收集 `dist/` 下 `*.exe` / `*.blockmap` / `latest*.yml`
3. 找到 tag 为 `latest`（或 `TAG` 环境变量）的 Gitee Release；不存在则创建
4. **先清空 Release 现有附件**（避免历史残留堆积），再上传新文件
5. 已安装用户启动时由 `electron-updater` 检测到新版本

`SKIP_BUILD=1` 可跳过构建只重传；`TAG=stable` 可自定义 release tag。

### 浏览器版主题切换实现

`web/index.html` 用单个 `<link id="theme-link">`：

```html
<link rel="stylesheet" href="theme-style4.css" id="theme-link">
```

`web/theme.js` 通过 `THEMES` 数组维护主题表，`applyTheme(key)` 改 `link.href = theme.file + '?v=' + Date.now()` 强制绕过缓存，并写 `localStorage[KEY_THEME]`（`KEY_THEME = 'quiz-theme'`）。

桌面版的 `src/renderer/theme.js` 是同一份逻辑的副本，附加了 `electronAPI.onSwitchTheme` 桥接。

### 如何添加新主题

1. 复制 `web/theme-style1.css` 为 `theme-style5.css`，修改 `:root` CSS 变量和组件样式
2. 把同一份 `theme-style5.css` 复制到 `native/src/renderer/theme-style5.css`
3. 无需修改 `web/index.html` 或 `native/src/renderer/index.html`（`<link id="theme-link">` 由 JS 动态改 `href` 加载对应 CSS）
4. 在 `web/theme.js` 和 `native/src/renderer/theme.js` 的 `THEMES` 数组都追加一项：
   ```js
   { key: 'style5', name: '新主题名', file: 'theme-style5.css' }
   ```
5. （仅桌面版）在 `native/src/main/menu.js` 的 `Theme` 子菜单追加一项：
   ```js
   { label: '新主题名', click: () => win.webContents.send('switch-theme', 'style5') }
   ```

### 如何更新题库

题库数据在 `web/questions.js` 和 `native/src/renderer/questions.js`（两份要同步）。每题结构：

```js
{ id: 1, type: "单选题", points: 0.2, question: "...", answer: "A", options: ["A. ...", "B. ..."] }
```

填空题用 `blanks` 数组代替 `options`：

```js
{ id: 200, type: "填空题", points: 0.1, question: "...", answer: "(1) 32; (2) 64", blanks: ["32", "64", "80"] }
```

原始 Markdown 源在 `backup/MARKDOWN_DATA.txt`，可作为新题起点。

---

## License

Personal study project. 题库内容来自公开教材整理。
