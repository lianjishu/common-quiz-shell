# 复习题库 · 通用刷题外壳

一个**多科目刷题应用**:科目首页 + 每科目一个子页面,所有科目共用同一份外壳(布局 + 5 套可切换主题)。新科目只需一个数据文件 + 一份配置即可接入,外壳与主题无需任何改动。

| 科目 | 题量 | 题型 | 入口 |
|---|---|---|---|
| 计算机组成原理 | 350 | 单选 / 填空 / 判断 / 简答 | `subjects/computer-organization/` |
| JavaWeb 期末 | 195 | 单选 / 多选 / 判断 | `subjects/javaweb/` |

> **浏览器运行零依赖**:纯静态页面,HTML + CSS + 原生 JS,无构建步骤、无 npm 运行时依赖。Python 只用来跑 `http.server` 起本地服务。
> 仓库同时包含一个 Electron 桌面版(可选),其依赖均为 devDependencies / 桌面端专用,不影响 Web 版。

---

## 快速开始

**Windows** — 双击 `start.bat`,浏览器自动打开 `http://localhost:8000/`(科目首页)。

**macOS / Linux**:

```sh
./start.sh
```

> 需要 Python 3.x(任意版本)。按 `Ctrl+C` 停止服务。

---

## 架构

```
index.html                  科目首页:卡片列出各科目,显示各科进度与正确率
├── shared/                 通用外壳(全仓库只有这一份,所有科目共用)
│   ├── app.js              外壳逻辑:布局生成 / 题型渲染 / 判分 / 答题卡 / 快捷键
│   ├── theme.js            主题切换(SHARED_BASE 前缀,跨目录生效;含 Electron IPC 桥接)
│   └── theme-*.css         5 套主题
├── subjects/
│   ├── registry.js         科目注册表:新科目在这里加一行 id
│   ├── computer-organization/
│   │   ├── index.html      薄入口页(~20 行,所有科目几乎一样)
│   │   ├── config.js       科目配置(名称 / 题型 / 存储前缀)
│   │   └── questions.js    题库数据
│   └── javaweb/            同上
├── tools/
│   ├── convert_javaweb.py  exam.md + answers.md → questions.js 转换脚本(含强校验)
│   ├── javaweb_briefs.json 195 条简版解析(id → 一句话考点)
│   └── check_consistency.py 结构与数据一致性校验(见下)
├── javaweb-final-exam/     javaweb 题源(exam.md + answers.md,转换脚本的输入)
├── src/main/               Electron 主进程(可选桌面版)
├── assets/                 应用图标
└── scripts/                ensure-electron.js / publish-gitee.js(桌面版构建发布)
```

**隔离规则**:做题进度按科目存储在 `localStorage["quiz:<科目id>:progress"]`,互不干扰;主题与侧栏折叠偏好是全局的(属外壳)。计组首次启动会自动把旧版无前缀的 `quiz-progress` 迁移到新 key。

---

## 功能

- **多科目**:首页选科目进入刷题,进度分科目记忆
- **5 种题型**:单选 / 多选 / 判断 / 填空 / 简答,按科目配置启用
  - 多选题:点击(或数字键)勾选多个选项,「提交答案」后统一切换判分,选项全对才算正确
- **答题卡**:右侧网格,按题型分组,点击跳转
- **类型筛选 + 错题回顾 + 统计面板**(已做 / 正确 / 错误 / 正确率)
- **解析**:答完题自动展示;支持完整解析(采分点 / 详解 / 干扰项 / 速记)或简版一句话解析(`analysis.brief`)
- **两侧栏独立收起/展开**,偏好持久化
- **进度保存**:`localStorage` 持久化,按科目隔离
- **主题切换**:5 套主题运行时切换,全局生效
- **键盘快捷键**:
  - `←` `→` 切换题目;`Enter` 下一题 / 提交
  - `1-4` 选择单选选项;`1-9` 勾选多选选项(再按取消,`Enter` 提交)
  - `Space` 显示答案(简答)

---

## 主题预览

5 套主题,页面顶部按钮切换,选择持久化到 `localStorage.quiz-theme`(默认 `style4` 细线极简留白)。所有科目共用同一主题。

| 主题 | 风格 | 主色 |
|---|---|---|
| **极光紫** `default` | 现代渐变 + 圆角卡片 | `#7C3AED` |
| **极简线性** `style1` | 蓝调极简,无圆角无阴影 | `#2563EB` |
| **新粗野线条** `style2` | 粗黑边框 + 硬阴影 neo-brutalist | `#FFE066` |
| **手绘线稿** `style3` | 波浪边框 + 手写体(Caveat / Patrick Hand) | `#D97706` |
| **细线极简留白** `style4` | 衬线字体(Fraunces)+ 大留白 | `#0F766E` |

---

## 如何添加新科目

以「操作系统」为例,四步:

1. **准备数据** — `subjects/os/questions.js`:
   ```js
   window.QUIZ_QUESTIONS = [
     { id: 1, type: "单选题", points: 2, question: "…", answer: "A",
       options: ["A. …", "B. …", "C. …", "D. …"],
       analysis: { brief: "考点:…" } }   // analysis 可选
   ];
   ```
2. **写配置** — `subjects/os/config.js`:
   ```js
   window.QUIZ_SUBJECT = {
     id: 'os',                      // 同时是目录名与存储前缀
     name: '操作系统',
     subtitle: '期末复习',
     types: ['单选题', '判断题'],    // 决定筛选按钮与答题卡分组
     total: 120,                    // 首页进度展示用
   };
   ```
3. **复制入口页** — 抄任意科目的 `index.html`,改 `<title>` 即可,其余不用动(外壳 DOM 由 `shared/app.js` 按配置生成)。
4. **注册** — 在 `subjects/registry.js` 数组里加 `'os'`。刷新首页即出现。

### 题库 schema

| 字段 | 适用题型 | 说明 |
|---|---|---|
| `id` | 全部 | 数字,全局唯一,答题卡显示三位编号 |
| `type` | 全部 | `单选题` / `多选题` / `判断题` / `填空题` / `简答题` |
| `points` | 全部 | 分值,仅展示 |
| `question` | 全部 | 题干(纯文本,含 `(  )` 占位符) |
| `options` | 单选 / 多选 | `["A. 文本", …]`,字母必须在前(格式 `X. 文本`) |
| `answer` | 单选 `"A"`;多选 `"ACD"`;判断 `"对"/"错"`;填空 `"(1) 32; (2) 64"`;简答为参考答案全文 |
| `blanks` | 填空 | 每空正确答案数组 |
| `analysis` | 全部,可选 | `{ tag, keypoints, detail, distractors, brief }`,只写 `brief` 即为简版解析 |

### javaweb 题库转换

原始题源在 `javaweb-final-exam/`(整理好的 `exam.md` + `answers.md`)。转换命令:

```sh
python tools/convert_javaweb.py
```

脚本解析两份 Markdown 并**强校验**(各节题数 60/103/32、答案完整性、选项字母合法、解析全覆盖 195/195),合并 `tools/javaweb_briefs.json` 的简版解析后生成 `subjects/javaweb/questions.js`。多选题分值为节均值折算(0.58/题),仅展示用。修改了原始 md 或解析后重跑即可。

---

## 结构校验

```sh
python tools/check_consistency.py        # 或 npm run check
```

9 项检查:registry 与目录双向一致、`config.id` 与目录名一致、`config.total` 与实际题数一致、题目 id 唯一、题目题型在 `config.types` 内、科目目录文件完整、README 覆盖所有科目。

其中**第 6 项(外壳唯一性)**尤其重要:`shared/` 之外不允许存在 `app.js` / `theme.js` / `theme-*.css`。通用化重构之前,Electron 的 `src/renderer/` 手工复制过整套外壳并逐渐分叉,导致菜单「主题」静默失效。任何新增副本都会被这项拦下。

退出码 0 = 全过,1 = 有失败项。

---

## 桌面版(Electron)

桌面版已接入同一套外壳 —— 它直接加载仓库根的 `index.html`,与 Web 版**共用** `shared/` 和 `subjects/`,不存在第二份副本。

```sh
npm install          # 安装 Electron(仅桌面版需要)
npm run dev          # 开发模式,带热重载
npm run build:win    # 打包 Windows(nsis + portable + zip)
npm run release      # 打包并推送到 Gitee Release(自动更新源)
```

`src/main/` 提供仓库里 Web 版没有的能力:Gitee 自动更新、主题/视图菜单、窗口位置记忆、Ctrl+滚轮缩放。菜单「主题」通过 `preload.js` 的 IPC 桥接到 `shared/theme.js`(浏览器环境下该桥接自动跳过)。

> `appId` 与 `publish.url` 保持不变,以延续已发布版本的自动更新通道。

---

## License

Personal study project. 题库内容来自公开教材与课程资料整理。
