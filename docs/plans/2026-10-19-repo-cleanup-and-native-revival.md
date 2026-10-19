# 仓库整理与桌面版复活 · 实施计划

- 日期:2026-10-19
- 基线提交:`a2e943a` feat: 外壳通用化为多科目架构,接入 JavaWeb 195 题
- 目标:清掉 2106 KB 冗余、让 Electron 桌面版真正接入新外壳、加一致性校验防止结构腐化

---

## 0. 现状结论

工作区 2886 KB,其中 **2106 KB(73%)是冗余**。Web 侧(`index.html` + `shared/` + `subjects/` + `tools/`)本身是干净的零构建架构;问题全部出在上一笔通用化重构**做了一半**:

| 问题 | 位置 | 体积 | 性质 |
|---|---|---|---|
| 外壳已分叉 | `native/src/renderer/` | 224 KB | 5 个 CSS 与 `shared/` **逐字节相同**;`app.js` 落后 9 KB;`questions.js` 是旧数据(110 KB vs 现役 265 KB) |
| 重构做一半 | `native/src/renderer/index.html` | — | 硬编码「计组·模拟题」的单科目页,仍 `<script src="updater.js">`;而 `4baa7ba` 声称已移除 updater,实际只改了 `subjects/` 侧 |
| 桌面菜单已死 | `shared/app.js` | — | **零处** `electronAPI` 引用 → 菜单「主题」IPC 无人接收,通用化后即失效 |
| 一次性生成物 | `backup/` | 1882 KB | 5 份设计稿 + `view-in-detail.html`(880 KB)+ `build.py`(源路径 `C:\Users\ASUS\Desktop\计组\计组练习.html` 已不存在,**不可复现**) |
| 陈旧忽略项 | `.gitignore:6` | — | 忽略 `项目结构与打包指南.md`,该文件不存在 |

---

## 1. 已确认的决策

| 决策项 | 选择 |
|---|---|
| `native/` 桌面版 | **复活到新外壳** |
| `backup/` | **移出仓库,本地留存** |
| git 历史 | **不动**(`.git` 保持 4344 KB) |
| 工程化力度 | **删冗余 + 一致性校验脚本** |

---

## 2. 目标结构

```
common-quiz-shell/
├── index.html                     科目首页
├── shared/                        唯一外壳(所有科目共用,仅此一份)
│   ├── app.js  theme.js  theme-*.css
├── subjects/
│   ├── registry.js                科目注册表
│   ├── computer-organization/     index.html + config.js + questions.js
│   └── javaweb/                   index.html + config.js + questions.js
├── tools/
│   ├── convert_javaweb.py         题源 → questions.js(强校验)
│   ├── javaweb_briefs.json        195 条简版解析(脚本输入)
│   └── check_consistency.py       ★ 新增:结构与数据一致性校验
├── javaweb-final-exam/            exam.md + answers.md(转换脚本输入)
├── src/main/                      ★ 由 native/src/main 提升到仓库根
│   ├── index.js  menu.js  preload.js  window-state.js
├── assets/                        ★ 由 native/assets 提升到仓库根(图标)
├── scripts/
│   ├── ensure-electron.js         ★ 由 native/scripts 提升
│   └── publish-gitee.js           ★ 由 native/build 提升
├── package.json                   ★ 由 native/package.json 提升到根
├── docs/plans/
├── start.bat  start.sh  README.md  .gitignore
```

**消除的目录**:`backup/`(移出)、`native/`(解散并入根)、`docs` 之外无新增顶层目录。

**为什么把 Electron 提升到根**:`native/package.json` 的 `build.files` 只能打包**包目录之内**的路径(第 23-28 行只含 `src/main` `src/renderer` `assets`)。想让桌面版加载仓库根的 `index.html` + `shared/` + `subjects/`,若保留 `native/` 边界只能靠「构建时复制外壳」——那正好重新制造出这次要消灭的分叉。提升到根之后,**「外壳只有一份」由结构保证,而不是靠约定**,这类漂移不可能再复发。

---

## 3. 实施步骤

### 阶段 0 · 安全网(先做)

1. 确认工作区干净:`git status --short` 应为空。
2. 把 `backup/` 复制到仓库外(建议 `E:\Projects\projects\_archive\common-quiz-shell-backup-20260828\`),复制后**逐文件校验 SHA256 一致**,确认无误再进入阶段 1。
3. 记录基线:`git rev-parse HEAD` 存下,便于回滚。

### 阶段 1 · 提升 Electron 到仓库根

用 `git mv` 保留历史:

```powershell
git mv native/src/main src
git mv native/assets assets
git mv native/scripts/ensure-electron.js scripts-tmp/ensure-electron.js   # 占位,下一步归位
git mv native/build/publish-gitee.js scripts-tmp/publish-gitee.js
git mv native/package.json package.json
git mv native/package-lock.json package-lock.json
git mv native/.gitignore .gitignore.native   # 内容并入根 .gitignore 后删除
```

随后删除已空的 `native/` 树(含 `src/renderer/` 全部 224 KB 与 `updater.js`),把 `scripts-tmp/` 两个脚本归位为 `scripts/`。

`scripts/publish-gitee.js` 与 `scripts/ensure-electron.js` **无需改代码**:二者都用 `__dirname/..` 定位,提升后自动指向仓库根(`DIST` = 根 `dist/`,`node_modules` = 根 `node_modules/`)。

### 阶段 2 · 接入新外壳(核心)

**`package.json`**

- `main`: `src/main/index.js`
- `build.files`: `["index.html", "shared/**/*", "subjects/**/*", "src/main/**/*", "assets/**/*", "package.json"]`
- `description`: 改为多科目描述
- `scripts.postinstall`: `node scripts/ensure-electron.js`
- **保持不变**:`name` / `appId` / `productName` / `build.publish.url` —— 见第 5 节决策点

**`src/main/index.js`**(4 处)

| 行 | 现状 | 改为 |
|---|---|---|
| 132 | `path.join(__dirname,'..','assets','icon.png')` | `path.join(__dirname,'..','..','assets','icon.png')` |
| 131 | `title: '计组练习'` | `title: '复习题库'` |
| 141 | `loadFile(...'renderer','index.html')` | `loadFile(path.join(__dirname,'..','..','index.html'))` |
| 9-21 | reload 监听 main/assets | 增加根 `index.html`、`shared/`、`subjects/`;`ignored` 补 `node_modules` |

**`shared/theme.js`**(补回桌面版主题桥接,新增 ~4 行)

在 `initTheme()` 调用之后追加:

```js
// Electron:菜单「主题」→ IPC → 切换主题(浏览器环境无此 API,自动跳过)
if (window.electronAPI && window.electronAPI.onSwitchTheme) {
  window.electronAPI.onSwitchTheme(applyTheme);
}
```

`applyTheme` 是顶层函数声明,已挂在 `window` 上,可直接作回调传入。

**已知冗余(保留,不做清理)**:删掉 `updater.js` 后,`preload.js` 的 `checkForUpdates`/`downloadUpdate`/`quitAndInstall`/`onUpdaterStatus` 与 `registerUpdaterIPC()` 的 renderer 推送已无消费者。保留它们成本近零且便于将来恢复 in-app 更新提示;计划中显式标注为「已知冗余」,避免下次误判为遗漏。

### 阶段 3 · 清冗余

1. 删除 `backup/`(已在阶段 0 备份到仓库外)。
2. 根 `.gitignore` 合并 `native/.gitignore` 全部 6 类条目(**不要漏掉 Electron 特有的后三项**):

   | 条目 | 来源 | 说明 |
   |---|---|---|
   | `node_modules/` `dist/` | native | 提升到根后路径变化,必须跟上 |
   | `*.log` | native | electron-log 产物 |
   | `dev-app-update.yml` | native | **更新调试产物,极易误提交** |
   | `node` `npm` `*@*.*.*` | native | npx 占位 stub(PATH 缺 node/npm 时 npx 在 cwd 创建的空文件),踩过坑才加的 |
   | `.claude/` `__pycache__/` `*.pyc` `.DS_Store` `Thumbs.db` `.zcode/` | 原生根 | 保留 |

   同时**删除陈旧项** `项目结构与打包指南.md`(文件已不存在)。

### 阶段 4 · 一致性校验脚本

新增 `tools/check_consistency.py`(纯标准库,零依赖,与 `convert_javaweb.py` 同风格)。校验项:

| # | 校验 | 当前预期 |
|---|---|---|
| 1 | `registry.js` 的每个 id 都有对应 `subjects/<id>/` 目录 | ✅ 通过 |
| 2 | 每个 `subjects/<id>/` 目录都在 registry 中登记(反向) | ✅ 通过 |
| 3 | `config.js` 的 `id` == 目录名 | ✅ 通过 |
| 4 | `config.total` == `questions.js` 实际题数 | ✅ 350 / 195 通过 |
| 5 | `questions.js` 内 `id` 无重复 | ✅ 通过 |
| 6 | 每题 `type` ∈ `config.types` | ✅ 通过 |
| 7 | **`shared/` 之外不存在 `app.js` / `theme.js` / `theme-*.css` 副本**(防分叉复发) | ✅ 通过(阶段 1 后) |
| 8 | README「如何添加新科目」提到的目录均真实存在 | ✅ 通过 |

退出码 0 = 全过,1 = 有失败项;输出每项 `PASS`/`FAIL` + 定位信息。

接入方式:在 `package.json` 加 `"check": "python tools/check_consistency.py"`。

### 阶段 5 · 文档与验证

1. README 更新:架构图换成新结构;「桌面版(native/)— 已冻结」章节改写为「桌面版」并说明 `npm run dev` / `npm run build`;第 10 行「零构建、零依赖」需微调措辞(浏览器运行仍是零依赖,仓库多了 Electron 开发依赖)。
2. 跑 `python tools/check_consistency.py`。
3. 跑 `python tools/convert_javaweb.py` 确认转换链路仍幂等(题目数 195 不变)。
4. `npm install && npm run dev` 启动桌面版,人工确认:首页出现两个科目卡片 → 进入任一科目 → 菜单「主题」五项可切换 → 切到另一科目 → 进度互相独立。
5. `npm run build:win` 确认打包产物内含 `index.html` / `shared/` / `subjects/`。

---

## 4. 风险与回滚

| 风险 | 应对 |
|---|---|
| `file://` 下首页动态注入 `<script>`(`index.html:95` `loadScript`) | Electron Chromium 支持,阶段 5 第 4 步实测;失败则改为静态注入 |
| `shared/theme.js` 的 `?v=Date.now()` 缓存击穿 | asar 内无影响,沿用现状 |
| 自动更新通道断裂 | 见第 5 节;`appId`/`publish.url` 不变即连续 |
| `electron-reload` 监听范围变大导致频繁重载 | `ignored` 补 `node_modules`,实测确认 |
| 历史 commit hash | **不变**(`git mv` 保留历史,不做 filter-repo) |

**回滚**:阶段 1-3 为纯移动/删除,任一步失败可 `git reset --hard a2e943a` 全量回退;`backup/` 已在本仓库外,不受影响。

---

## 5. 已决策:应用身份改名 quiz-shell

原身份 `name` / `appId`(`com.yake.computer-organization-quiz`)/ `productName`(`Computer Organization Quiz`)名不副实 —— 应用已是多科目题库。

原本担心改名会断掉自动更新通道的连续性,但**该应用尚无推广、没有已安装用户**,破坏性成本为零,故决定一并改掉:

| 项 | 旧 | 新 |
|---|---|---|
| `name` | `computer-organization-quiz` | `quiz-shell` |
| `appId` | `com.yake.computer-organization-quiz` | `com.yake.quiz-shell` |
| `productName` | `Computer Organization Quiz` | `QuizShell` |
| `version` | `1.2.2` | `1.3.0` |
| Gitee 仓库 | `yake2024/computer-organization-quiz` | `yake2024/quiz-shell`(**需在 Gitee 网页端手动改**) |
| `publish.url` / 菜单「关于」 | 旧地址 | 新地址 |

顺带修掉一处既有不一致:`package-lock.json` 的 `name`/`version` 还停留在 `1.0.1`,与 `package.json` 不同步,已一并对齐。

> **依赖**:Gitee 仓库改名前,`npm run release` 会指向不存在的地址而失败。`npm run dev` 与 `npm run build:*` 不受影响。

---

## 6. 提交拆分建议

遵循仓库现有 Conventional Commits 风格:

```
1. chore: backup/ 移出仓库(本地留存)
2. refactor: Electron 提升到仓库根,接入多科目外壳
3. fix: 恢复桌面版主题菜单 IPC 桥接(通用化后失效)
4. feat: 新增 tools/check_consistency.py 结构与数据一致性校验
5. docs: README 对齐新结构与桌面版说明
```

> 是否要按此拆成 5 个提交,还是合并成 1 个大的 `refactor`,执行前告诉我。
