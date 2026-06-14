"""
构建 4 个风格的完整版本。
- 提取原文件 line 818 (MARKDOWN_DATA)
- 提取原文件 body + script (lines 748-1275, 去掉 MARKDOWN_DATA 行)
- 对每种风格, 替换 CSS (lines 10-745)
"""

import os
import re

SRC = r"C:\Users\ASUS\Desktop\计组\计组练习.html"
OUT_DIR = r"C:\Users\ASUS\Desktop\计组"

with open(SRC, "r", encoding="utf-8") as f:
    lines = f.readlines()

# 提取 MARKDOWN_DATA (line 818, 0-indexed 817)
markdown_data_line = lines[817]
assert markdown_data_line.startswith("const MARKDOWN_DATA"), f"line 818 should be MARKDOWN_DATA, got: {markdown_data_line[:80]}"

# 提取 head 起始部分 (lines 1-9, 0-indexed 0-8): <!DOCTYPE> 到 <style> 开始
# 行号: 1=DOCTYPE, 2=<html>, 3=<head>, 4=<meta charset>, 5=<meta viewport>, 6=<title>,
#       7=<link preconnect>, 8=<link fonts>, 9=<style>
# 我们保留 lines 1-8 (0-indexed 0-7), 然后为每个风格替换 line 8 (字体链接)

# 提取 body + script (lines 749-end, 0-indexed 748-)
# 但 line 818 (0-indexed 817) 是 MARKDOWN_DATA, 需要替换为风格特定的引入方式
# 实际上 MARKDOWN_DATA 内容是不变的, 我们直接保留即可

# 让我们把原文件分成几段:
# [0:8]   - 头部 (DOCTYPE, html, head meta, viewport, title, preconnect, 原字体link) -- 我们会替换最后这个 link
# [9:746] - 原 CSS (替换为新 CSS)
# [746:748] - </style></head>
# [748:817] - body + 脚本开头 (保留)
# [817:818] - MARKDOWN_DATA 行 (保留)
# [818:]   - 剩余脚本 + body 关闭 (保留)

# 简单做法: 把原文件作为基础, 只替换 CSS 块 (lines 10-746, 即 0-indexed 9-745)

# 提取 CSS 模板占位符:
# lines[0:8] = DOCTYPE through 原字体 link
# lines[8] = "<style>"
# lines[9:746] = CSS 内容
# lines[746] = "</style>"
# lines[747] = "</head>"
# ...

# 输出新文件结构:
# lines[0:7]   (head 起始, 但替换 line 7 (0-indexed) 的字体 link 为风格特定)
# <style>{STYLE_CSS}</style>
# lines[746:]   (</style> 之后的所有, 即 </head> + body + script)

# 但 line 746 是 </style>, 我们已经自己写了 </style>, 所以从 lines[747] 开始
prefix = "".join(lines[0:8])  # lines 1-8, 含原字体 link
# 我们会替换第 7 行 (0-indexed, 即 line 8) 的字体 link
# 但更简单的是直接给出 head 完整结构
suffix = "".join(lines[746:])  # lines 747-1275, 即 </style></head> + body + script

# 注意: suffix 以 </style> 开头, 我们需要去掉这一行
suffix_lines = lines[746:]
# 第 747 行是 </style>, 第 748 行是 </head>
# 我们保留 lines[747:] (0-indexed)
suffix_clean = "".join(suffix_lines[1:])

print(f"prefix 长度: {len(prefix)} chars")
print(f"markdown_data 长度: {len(markdown_data_line)} chars")
print(f"suffix_clean 长度: {len(suffix_clean)} chars")
print(f"原文件总长度: {sum(len(l) for l in lines)} chars")
print(f"重构后总长度预估: {len(prefix) + len(suffix_clean) + 100} chars (CSS 约替换)")


# ============ 字体定义 ============
FONTS = {
    "style1": '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">',
    "style2": '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">',
    "style3": '<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">',
    "style4": '<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">',
}

# 头部基础 (不含字体 link)
HEAD_BASE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>计算机组成原理 · 模拟题练习</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{font_link}
<style>
{css}
</style>
</head>
'''


# ============ 4 套 CSS ============

CSS_STYLE_1 = r"""
:root {
  --bg: #FFFFFF;
  --bg-soft: #FAFAFA;
  --paper: #FFFFFF;
  --text: #111827;
  --text-2: #6B7280;
  --text-dim: #9CA3AF;
  --border: #E5E7EB;
  --border-strong: #D1D5DB;
  --accent: #2563EB;
  --correct: #059669;
  --correct-soft: #ECFDF5;
  --wrong: #DC2626;
  --wrong-soft: #FEF2F2;
  --hover: #F9FAFB;
  --radius: 8px;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --sans: 'Inter', 'Noto Sans SC', -apple-system, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: var(--sans); background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
body::after { content:''; position: fixed; inset: 0; background: radial-gradient(ellipse at 20% 0%, rgba(37,99,235,0.03), transparent 50%); pointer-events: none; z-index: -1; }

.app { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: 260px; background: var(--paper); border-right: 1px solid var(--border);
  padding: 24px 16px; display: flex; flex-direction: column; gap: 4px;
  position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; z-index: 100;
}
.sidebar h1 {
  font-family: var(--mono); font-size: 13px; font-weight: 600; color: var(--text);
  letter-spacing: 0.04em; padding: 8px 12px; margin-bottom: 16px;
  border-bottom: 1px solid var(--border); line-height: 1.6;
}
.sidebar h1 span { display: block; font-size: 11px; color: var(--text-dim); font-weight: 400; letter-spacing: 0; margin-top: 4px; }

.filter-btn {
  display: flex; align-items: center; gap: 10px; padding: 9px 12px;
  background: transparent; border: 1px solid transparent; border-radius: 6px;
  color: var(--text-2); font-size: 14px; font-family: var(--sans); cursor: pointer; transition: all 0.15s;
}
.filter-btn:hover { background: var(--hover); color: var(--text); }
.filter-btn.active { background: var(--hover); border-color: var(--border-strong); color: var(--text); font-weight: 500; }
.filter-btn .count { margin-left: auto; font-family: var(--mono); font-size: 12px; color: var(--text-dim); }
.filter-btn.active .count { color: var(--text); }

.sidebar-divider { height: 1px; background: var(--border); margin: 12px 0; }

.stats {
  margin-top: auto; padding: 16px; background: var(--paper); border-radius: var(--radius);
  border: 1px solid var(--border);
}
.stats h3 { font-family: var(--mono); font-size: 11px; color: var(--text-dim); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 13px; }
.stat-row .label { color: var(--text-2); }
.stat-row .value { font-family: var(--mono); font-weight: 500; color: var(--text); }
.stat-row .value.correct { color: var(--correct); }
.stat-row .value.wrong { color: var(--wrong); }

.stats-actions { display: flex; gap: 8px; margin-top: 12px; }
.stats-btn { flex: 1; padding: 6px 0; background: transparent; border: 1px solid var(--border); border-radius: 6px; color: var(--text-2); font-size: 11px; font-family: var(--sans); cursor: pointer; transition: all 0.15s; }
.stats-btn:hover { border-color: var(--border-strong); color: var(--text); }
.stats-btn.danger:hover { border-color: var(--wrong); color: var(--wrong); }

/* Main */
.main { flex: 1; margin-left: 260px; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }

/* Top bar */
.top-bar { width: 100%; max-width: 780px; display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.progress-info { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 12px; color: var(--text-2); }
.progress-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--text); border-radius: 2px; transition: width 0.4s ease; }
.shuffle-btn { padding: 8px 14px; background: var(--paper); border: 1px solid var(--border); border-radius: 6px; color: var(--text-2); font-size: 13px; font-family: var(--sans); cursor: pointer; transition: all 0.15s; white-space: nowrap; }
.shuffle-btn:hover { border-color: var(--border-strong); color: var(--text); }
.shuffle-btn.active { background: var(--hover); border-color: var(--text); color: var(--text); }

/* Question card */
.question-card {
  width: 100%; max-width: 780px; background: var(--paper);
  border: 1px solid var(--border); border-radius: 12px;
  padding: 36px 40px; position: relative; animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

.q-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.q-number { font-family: var(--mono); font-size: 12px; color: var(--text-2); padding: 4px 10px; border: 1px solid var(--border); border-radius: 4px; }
.q-type { font-size: 12px; color: var(--text-2); padding: 4px 10px; border: 1px solid var(--border); border-radius: 4px; }
.q-points { font-family: var(--mono); font-size: 12px; color: var(--text-dim); margin-left: auto; }

.q-text { font-size: 16px; line-height: 1.8; color: var(--text); margin-bottom: 28px; white-space: pre-wrap; }

/* Options */
.options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
.option {
  display: flex; align-items: flex-start; gap: 14px; padding: 14px 18px;
  background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius);
  cursor: pointer; transition: all 0.15s; user-select: none;
}
.option:hover:not(.disabled) { border-color: var(--text-2); background: var(--hover); }
.option .opt-letter {
  width: 22px; height: 22px; border: 1px solid var(--text-2); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-weight: 600; font-size: 11px; color: var(--text);
  min-width: 22px; flex-shrink: 0; transition: all 0.15s;
}
.option .opt-text { font-size: 15px; line-height: 1.6; color: var(--text-2); transition: color 0.15s; flex: 1; }
.option.selected { border-color: var(--text); background: var(--hover); }
.option.selected .opt-letter { background: var(--text); color: var(--paper); border-color: var(--text); }
.option.selected .opt-text { color: var(--text); }
.option.correct { border-color: var(--correct); background: var(--correct-soft); }
.option.correct .opt-letter { background: var(--correct); color: white; border-color: var(--correct); }
.option.correct .opt-text { color: var(--correct); }
.option.wrong { border-color: var(--wrong); background: var(--wrong-soft); }
.option.wrong .opt-letter { background: var(--wrong); color: white; border-color: var(--wrong); }
.option.wrong .opt-text { color: var(--wrong); }
.option.disabled { cursor: default; opacity: 0.7; }
.option.disabled.correct, .option.disabled.wrong { opacity: 1; }

/* Judge */
.judge-btns { display: flex; gap: 12px; margin-bottom: 28px; }
.judge-btn {
  flex: 1; padding: 20px; background: var(--bg-soft); border: 1px solid var(--border);
  border-radius: var(--radius); cursor: pointer; transition: all 0.15s;
  text-align: center; font-size: 16px; font-weight: 500; color: var(--text-2); font-family: var(--sans);
}
.judge-btn:hover:not(.disabled) { border-color: var(--text-2); background: var(--hover); }
.judge-btn.selected-correct { border-color: var(--correct); background: var(--correct-soft); color: var(--correct); }
.judge-btn.selected-wrong { border-color: var(--wrong); background: var(--wrong-soft); color: var(--wrong); }
.judge-btn.disabled { cursor: default; opacity: 0.5; }
.judge-btn.disabled.selected-correct, .judge-btn.disabled.selected-wrong { opacity: 1; }

/* Blanks */
.blanks { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.blank-row { display: flex; align-items: center; gap: 12px; }
.blank-label { font-family: var(--mono); font-size: 13px; color: var(--text-dim); min-width: 32px; }
.blank-input {
  flex: 1; padding: 10px 14px; background: var(--bg-soft); border: 1px solid var(--border);
  border-radius: 6px; color: var(--text); font-size: 15px; font-family: var(--sans);
  outline: none; transition: border-color 0.15s;
}
.blank-input:focus { border-color: var(--text); }
.blank-input.correct { border-color: var(--correct); background: var(--correct-soft); }
.blank-input.wrong { border-color: var(--wrong); background: var(--wrong-soft); }
.blank-input:disabled { opacity: 0.7; cursor: default; }
.blank-answer { font-family: var(--mono); font-size: 13px; color: var(--correct); margin-top: 4px; display: none; }
.blank-answer.show { display: block; }

/* Essay */
.essay-area { margin-bottom: 28px; }
.essay-textarea {
  width: 100%; min-height: 120px; padding: 14px;
  background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--text); font-size: 15px; font-family: var(--sans); line-height: 1.7;
  resize: vertical; outline: none; transition: border-color 0.15s;
}
.essay-textarea:focus { border-color: var(--text); }
.essay-answer { margin-top: 16px; padding: 16px; background: var(--correct-soft); border: 1px solid var(--correct); border-radius: var(--radius); display: none; }
.essay-answer.show { display: block; }
.essay-answer h4 { font-family: var(--mono); font-size: 12px; color: var(--correct); letter-spacing: 0.06em; margin-bottom: 10px; }
.essay-answer p { font-size: 14px; line-height: 1.8; color: var(--text); white-space: pre-wrap; }

/* Feedback */
.feedback { padding: 14px 18px; border-radius: var(--radius); font-size: 14px; font-weight: 500; display: none; margin-bottom: 20px; animation: fadeIn 0.2s ease; }
.feedback.show { display: flex; align-items: center; gap: 10px; }
.feedback.correct { background: var(--correct-soft); border: 1px solid var(--correct); color: var(--correct); }
.feedback.wrong { background: var(--wrong-soft); border: 1px solid var(--wrong); color: var(--wrong); }

/* Actions */
.actions { display: flex; gap: 8px; justify-content: flex-end; }
.btn { padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 500; font-family: var(--sans); cursor: pointer; transition: all 0.15s; border: 1px solid transparent; }
.btn-primary { background: var(--text); color: var(--paper); border-color: var(--text); }
.btn-primary:hover { background: #000; }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text-2); }
.btn-secondary:hover { border-color: var(--border-strong); color: var(--text); }

/* Empty / Hints */
.empty-state { text-align: center; padding: 80px 40px; color: var(--text-dim); }
.empty-state .icon { font-size: 36px; margin-bottom: 16px; opacity: 0.4; }
.empty-state p { font-size: 15px; line-height: 1.8; }

.kbd-hints { display: flex; gap: 16px; justify-content: center; margin-top: 24px; font-size: 12px; color: var(--text-dim); }
.kbd-hints span { display: flex; align-items: center; gap: 4px; }
kbd { font-family: var(--mono); font-size: 11px; padding: 2px 6px; background: var(--bg-soft); border: 1px solid var(--border); border-radius: 4px; color: var(--text-2); }

@media (max-width: 768px) {
  .sidebar { width: 100%; position: relative; flex-direction: row; flex-wrap: wrap; padding: 12px; gap: 4px; }
  .sidebar h1 { width: 100%; font-size: 12px; margin-bottom: 8px; padding: 4px 8px; }
  .sidebar h1 span { display: none; }
  .filter-btn { padding: 6px 10px; font-size: 12px; }
  .stats { display: none; } .sidebar-divider { display: none; }
  .main { margin-left: 0; padding: 16px; }
  .question-card { padding: 20px; }
  .kbd-hints { display: none; }
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }
"""

CSS_STYLE_2 = r"""
:root {
  --bg: #FFF8E7;
  --paper: #FFFFFF;
  --ink: #000000;
  --accent: #FFE066;
  --red: #FF6B6B;
  --blue: #4DABF7;
  --green: #51CF66;
  --pink: #FFA8A8;
  --correct: #2F9E44;
  --wrong: #E03131;
  --correct-soft: #D3F9D8;
  --wrong-soft: #FFE3E3;
  --mono: ui-monospace, 'JetBrains Mono', monospace;
  --sans: 'Inter', 'Noto Sans SC', sans-serif;
  --display: 'Space Grotesk', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: var(--sans); background: var(--bg); color: var(--ink); min-height: 100vh; overflow-x: hidden; }
body::after {
  content: ''; position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 24px 24px; background-position: -1px -1px;
  pointer-events: none; z-index: -1;
}

.app { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: 260px; background: var(--paper); border: 3px solid var(--ink);
  margin: 16px 0 16px 16px; box-shadow: 6px 6px 0 var(--ink);
  padding: 20px 14px; display: flex; flex-direction: column; gap: 4px;
  position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; z-index: 100;
}
.sidebar h1 {
  font-family: var(--display); font-size: 14px; font-weight: 700; color: var(--ink);
  letter-spacing: 0.04em; padding: 8px 12px; margin-bottom: 16px;
  border-bottom: 3px solid var(--ink); line-height: 1.6;
}
.sidebar h1 span { display: block; font-size: 11px; color: var(--ink); opacity: 0.6; font-weight: 500; letter-spacing: 0; margin-top: 4px; }

.filter-btn {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: transparent; border: 2px solid transparent; color: var(--ink);
  font-size: 13px; font-family: var(--display); font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; transition: all 0.08s;
}
.filter-btn:hover { background: rgba(0,0,0,0.05); }
.filter-btn.active { background: var(--accent); border: 2px solid var(--ink); box-shadow: 3px 3px 0 var(--ink); }
.filter-btn .count { margin-left: auto; font-family: var(--mono); font-size: 12px; font-weight: 700; }
.filter-btn.active .count { color: var(--ink); }

.sidebar-divider { height: 3px; background: var(--ink); margin: 12px 0; }

.stats {
  margin-top: auto; padding: 14px; background: var(--paper);
  border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
}
.stats h3 { font-family: var(--display); font-size: 11px; color: var(--ink); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; border-bottom: 2px solid var(--ink); padding-bottom: 6px; font-weight: 700; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 13px; font-weight: 600; }
.stat-row .label { color: var(--ink); }
.stat-row .value { font-family: var(--mono); font-weight: 700; color: var(--ink); }
.stat-row .value.correct { color: var(--correct); }
.stat-row .value.wrong { color: var(--wrong); }

.stats-actions { display: flex; gap: 8px; margin-top: 12px; }
.stats-btn { flex: 1; padding: 7px 0; background: var(--paper); border: 2px solid var(--ink); color: var(--ink); font-size: 11px; font-family: var(--display); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; transition: all 0.08s; box-shadow: 2px 2px 0 var(--ink); }
.stats-btn:hover { transform: translate(-1px,-1px); box-shadow: 3px 3px 0 var(--ink); }
.stats-btn:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 var(--ink); }
.stats-btn.danger:hover { background: var(--red); color: var(--paper); }

/* Main */
.main { flex: 1; margin-left: 276px; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }

/* Top bar */
.top-bar { width: 100%; max-width: 780px; display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.progress-info { display: flex; justify-content: space-between; font-family: var(--display); font-size: 13px; color: var(--ink); font-weight: 700; }
.progress-bar { height: 18px; background: var(--paper); border: 3px solid var(--ink); position: relative; overflow: hidden; }
.progress-fill {
  height: 100%; background: var(--accent);
  background-image: repeating-linear-gradient(45deg, var(--accent), var(--accent) 8px, var(--ink) 8px, var(--ink) 9px);
  transition: width 0.4s ease;
}
.shuffle-btn {
  padding: 10px 16px; background: var(--paper); border: 3px solid var(--ink); color: var(--ink);
  font-size: 13px; font-family: var(--display); font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.05em; cursor: pointer; box-shadow: 4px 4px 0 var(--ink); transition: all 0.08s;
}
.shuffle-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.shuffle-btn:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--ink); }
.shuffle-btn.active { background: var(--accent); }

/* Question card */
.question-card {
  width: 100%; max-width: 780px; background: var(--paper);
  border: 3px solid var(--ink); box-shadow: 8px 8px 0 var(--ink);
  padding: 32px 36px; position: relative; animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

.q-header { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; }
.q-number { font-family: var(--display); font-size: 12px; font-weight: 700; color: var(--paper); background: var(--ink); padding: 5px 12px; border: 2px solid var(--ink); letter-spacing: 0.04em; }
.q-type { font-family: var(--display); font-size: 12px; font-weight: 700; color: var(--ink); padding: 5px 12px; background: var(--accent); border: 2px solid var(--ink); box-shadow: 3px 3px 0 var(--red); letter-spacing: 0.05em; text-transform: uppercase; }
.q-points { font-family: var(--mono); font-size: 12px; font-weight: 700; color: var(--ink); margin-left: auto; padding: 5px 10px; border: 2px solid var(--ink); }

.q-text { font-family: var(--display); font-size: 17px; font-weight: 700; line-height: 1.5; color: var(--ink); margin-bottom: 28px; white-space: pre-wrap; }

/* Options */
.options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.option {
  display: flex; align-items: flex-start; gap: 14px; padding: 14px 18px;
  background: var(--paper); border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
  cursor: pointer; transition: all 0.08s; user-select: none; font-weight: 500;
}
.option:hover:not(.disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.option:active:not(.disabled) { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--ink); }
.option .opt-letter {
  width: 30px; height: 30px; border: 3px solid var(--ink); background: var(--paper); color: var(--ink);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--display); font-weight: 700; font-size: 14px; min-width: 30px; flex-shrink: 0;
  transition: all 0.08s;
}
.option .opt-text { font-size: 15px; line-height: 1.5; color: var(--ink); flex: 1; padding-top: 3px; }
.option.selected { background: var(--accent); }
.option.selected .opt-letter { background: var(--ink); color: var(--accent); }
.option.correct { background: var(--green); }
.option.correct .opt-letter { background: var(--ink); color: var(--green); }
.option.correct .opt-text { color: var(--ink); }
.option.wrong { background: var(--pink); }
.option.wrong .opt-letter { background: var(--ink); color: var(--pink); }
.option.wrong .opt-text { color: var(--ink); }
.option.disabled { cursor: default; }
.option.disabled.correct, .option.disabled.wrong { }

/* Judge */
.judge-btns { display: flex; gap: 14px; margin-bottom: 28px; }
.judge-btn {
  flex: 1; padding: 20px; background: var(--paper); border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
  cursor: pointer; transition: all 0.08s; text-align: center;
  font-size: 18px; font-weight: 700; color: var(--ink); font-family: var(--display);
  text-transform: uppercase; letter-spacing: 0.05em;
}
.judge-btn:hover:not(.disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.judge-btn:active:not(.disabled) { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--ink); }
.judge-btn.selected-correct { background: var(--green); }
.judge-btn.selected-wrong { background: var(--pink); }
.judge-btn.disabled { cursor: default; }

/* Blanks */
.blanks { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
.blank-row { display: flex; align-items: center; gap: 12px; }
.blank-label { font-family: var(--display); font-size: 13px; font-weight: 700; color: var(--ink); min-width: 32px; padding: 4px 10px; background: var(--accent); border: 2px solid var(--ink); }
.blank-input {
  flex: 1; padding: 10px 14px; background: var(--paper); border: 3px solid var(--ink);
  color: var(--ink); font-size: 15px; font-family: var(--sans); font-weight: 500;
  outline: none; transition: all 0.08s;
}
.blank-input:focus { background: var(--accent); }
.blank-input.correct { background: var(--green); }
.blank-input.wrong { background: var(--pink); }
.blank-input:disabled { cursor: default; }
.blank-answer { font-family: var(--mono); font-size: 13px; font-weight: 700; color: var(--ink); margin-top: 4px; display: none; padding: 4px 10px; background: var(--green); border: 2px solid var(--ink); }
.blank-answer.show { display: block; }

/* Essay */
.essay-area { margin-bottom: 28px; }
.essay-textarea {
  width: 100%; min-height: 120px; padding: 14px; background: var(--paper);
  border: 3px solid var(--ink); color: var(--ink); font-size: 15px; font-family: var(--sans);
  font-weight: 500; line-height: 1.7; resize: vertical; outline: none;
}
.essay-textarea:focus { background: var(--accent); }
.essay-answer { margin-top: 16px; padding: 16px; background: var(--green); border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink); display: none; }
.essay-answer.show { display: block; }
.essay-answer h4 { font-family: var(--display); font-size: 12px; font-weight: 700; color: var(--ink); letter-spacing: 0.06em; margin-bottom: 10px; text-transform: uppercase; }
.essay-answer p { font-size: 14px; line-height: 1.7; color: var(--ink); white-space: pre-wrap; font-weight: 500; }

/* Feedback */
.feedback { padding: 14px 18px; border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink); font-size: 14px; font-weight: 700; display: none; margin-bottom: 20px; animation: fadeIn 0.2s ease; font-family: var(--display); text-transform: uppercase; letter-spacing: 0.03em; }
.feedback.show { display: flex; align-items: center; gap: 10px; }
.feedback.correct { background: var(--green); color: var(--ink); }
.feedback.wrong { background: var(--pink); color: var(--ink); }

/* Actions */
.actions { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
.btn {
  padding: 12px 24px; font-family: var(--display); font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer;
  border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
  transition: all 0.08s; background: var(--paper); color: var(--ink);
}
.btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.btn:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--ink); }
.btn-primary { background: var(--accent); }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn-secondary { background: var(--paper); }

/* Empty / Hints */
.empty-state { text-align: center; padding: 80px 40px; color: var(--ink); }
.empty-state .icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; font-family: var(--display); font-weight: 700; }
.empty-state p { font-size: 15px; line-height: 1.8; font-weight: 500; }

.kbd-hints { display: flex; gap: 16px; justify-content: center; margin-top: 24px; font-size: 12px; color: var(--ink); font-family: var(--display); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.kbd-hints span { display: flex; align-items: center; gap: 4px; }
kbd { font-family: var(--mono); font-size: 11px; font-weight: 700; padding: 3px 8px; background: var(--accent); border: 2px solid var(--ink); color: var(--ink); }

@media (max-width: 768px) {
  .sidebar { width: calc(100% - 16px); position: relative; margin: 8px; flex-direction: row; flex-wrap: wrap; padding: 12px; gap: 4px; }
  .sidebar h1 { width: 100%; font-size: 12px; margin-bottom: 8px; padding: 4px 8px; }
  .sidebar h1 span { display: none; }
  .filter-btn { padding: 6px 10px; font-size: 11px; }
  .stats { display: none; } .sidebar-divider { display: none; }
  .main { margin-left: 0; padding: 16px; }
  .question-card { padding: 20px; box-shadow: 5px 5px 0 var(--ink); }
  .kbd-hints { display: none; }
}
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--ink); }
"""


CSS_STYLE_3 = r"""
:root {
  --paper: #F5F1E8;
  --paper-2: #FBF7EC;
  --ink: #2B2417;
  --ink-2: #5C4F3A;
  --orange: #D97706;
  --orange-soft: #FEF3C7;
  --correct: #65A30D;
  --correct-soft: #ECFCCB;
  --wrong: #B91C1C;
  --wrong-soft: #FEE2E2;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --sans: 'Patrick Hand', 'Inter', 'Noto Sans SC', sans-serif;
  --display: 'Caveat', cursive;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: var(--sans); background: var(--paper); color: var(--ink); min-height: 100vh; overflow-x: hidden; font-size: 17px; }
body::after {
  content: ''; position: fixed; inset: 0;
  background-image: repeating-linear-gradient(transparent 0 31px, rgba(43,36,23,0.05) 31px 32px);
  pointer-events: none; z-index: -1;
}

.app { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: 270px; background: var(--paper-2);
  border: 2.5px solid var(--ink); border-radius: 6px 22px 8px 26px / 22px 8px 26px 6px;
  margin: 16px 0 16px 16px; padding: 20px 14px;
  display: flex; flex-direction: column; gap: 4px;
  position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; z-index: 100;
  transform: rotate(-0.4deg);
  box-shadow: 4px 5px 0 rgba(43,36,23,0.18);
}
.sidebar h1 {
  font-family: var(--display); font-size: 26px; font-weight: 700; color: var(--orange);
  padding: 4px 8px; margin-bottom: 18px; line-height: 1.3;
  text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--orange);
  text-underline-offset: 5px;
}
.sidebar h1 span { display: block; font-size: 16px; color: var(--ink-2); font-family: var(--sans); text-decoration: none; font-weight: 400; margin-top: 4px; }

.filter-btn {
  display: flex; align-items: center; gap: 8px; padding: 8px 12px;
  background: transparent; border: 2px solid transparent;
  border-radius: 4px 14px 4px 14px; color: var(--ink-2);
  font-size: 17px; font-family: var(--sans); cursor: pointer; transition: all 0.12s;
}
.filter-btn::before { content: '✦'; color: var(--orange); font-family: var(--display); font-size: 18px; }
.filter-btn:hover { background: rgba(217,119,6,0.08); color: var(--ink); }
.filter-btn.active { background: var(--orange-soft); border: 2px solid var(--ink); color: var(--ink); font-weight: 700; }
.filter-btn .count { margin-left: auto; font-family: var(--mono); font-size: 13px; }
.filter-btn.active .count { color: var(--ink); }

.sidebar-divider { height: 0; border-top: 2px dashed var(--ink-2); margin: 14px 0; opacity: 0.5; }

.stats {
  margin-top: auto; padding: 14px; background: var(--paper-2);
  border: 2.5px solid var(--ink); border-radius: 18px 6px 22px 6px / 6px 22px 6px 18px;
  transform: rotate(0.3deg);
}
.stats h3 { font-family: var(--display); font-size: 22px; color: var(--orange); margin-bottom: 12px; font-weight: 700; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; font-size: 16px; }
.stat-row .label { color: var(--ink-2); }
.stat-row .value { font-family: var(--mono); font-weight: 700; color: var(--ink); }
.stat-row .value.correct { color: var(--correct); }
.stat-row .value.wrong { color: var(--wrong); }

.stats-actions { display: flex; gap: 8px; margin-top: 14px; }
.stats-btn { flex: 1; padding: 7px 0; background: var(--paper-2); border: 2.5px solid var(--ink); border-radius: 8px 14px 8px 14px; color: var(--ink); font-size: 14px; font-family: var(--sans); cursor: pointer; transition: all 0.12s; box-shadow: 2px 2px 0 rgba(43,36,23,0.2); }
.stats-btn:hover { transform: translate(-1px,-1px) rotate(-1deg); }
.stats-btn.danger:hover { background: var(--wrong-soft); }

/* Main */
.main { flex: 1; margin-left: 286px; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }

/* Top bar */
.top-bar { width: 100%; max-width: 780px; display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
.progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.progress-info { display: flex; justify-content: space-between; font-size: 15px; color: var(--ink-2); font-family: var(--display); font-size: 20px; font-weight: 700; }
.progress-bar { height: 16px; background: var(--paper-2); border: 2.5px solid var(--ink); border-radius: 4px 14px 4px 14px; position: relative; overflow: hidden; }
.progress-fill {
  height: 100%; background: var(--orange);
  background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px 6px);
  transition: width 0.4s ease;
}
.shuffle-btn {
  padding: 9px 16px; background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 8px 14px 8px 14px; color: var(--ink); font-size: 17px; font-family: var(--sans);
  cursor: pointer; transition: all 0.12s; box-shadow: 3px 3px 0 rgba(43,36,23,0.2);
}
.shuffle-btn:hover { transform: translate(-1px,-1px) rotate(-2deg); box-shadow: 4px 4px 0 rgba(43,36,23,0.25); }
.shuffle-btn.active { background: var(--orange-soft); }

/* Question card */
.question-card {
  width: 100%; max-width: 780px; background: var(--paper-2);
  border: 2.5px solid var(--ink); border-radius: 10px 26px 10px 26px / 26px 10px 26px 10px;
  padding: 32px 36px; position: relative; animation: fadeIn 0.3s ease;
  transform: rotate(0.3deg); box-shadow: 4px 6px 0 rgba(43,36,23,0.18);
}
@keyframes fadeIn { from { opacity: 0; transform: rotate(0.3deg) translateY(12px); } to { opacity: 1; transform: rotate(0.3deg) translateY(0); } }

.q-header { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; }
.q-number { font-family: var(--display); font-size: 18px; font-weight: 700; color: var(--ink); padding: 2px 14px; border: 2.5px solid var(--ink); border-radius: 16px 4px 16px 4px; background: var(--paper); transform: rotate(-1.5deg); display: inline-block; }
.q-type { font-family: var(--display); font-size: 18px; font-weight: 700; color: var(--ink); padding: 2px 14px; border: 2.5px solid var(--ink); border-radius: 4px 16px 4px 16px; background: var(--orange-soft); transform: rotate(1.5deg); display: inline-block; }
.q-points { font-family: var(--mono); font-size: 14px; color: var(--ink-2); margin-left: auto; padding: 2px 10px; }

.q-text { font-family: var(--display); font-size: 28px; font-weight: 700; line-height: 1.3; color: var(--ink); margin-bottom: 28px; white-space: pre-wrap; }

/* Options */
.options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.option {
  display: flex; align-items: flex-start; gap: 14px; padding: 12px 18px;
  background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 6px 18px 6px 18px / 18px 6px 18px 6px;
  cursor: pointer; transition: all 0.12s; user-select: none; font-size: 17px;
}
.option:nth-child(even) { border-radius: 18px 6px 18px 6px / 6px 18px 6px 18px; transform: rotate(0.3deg); }
.option:nth-child(odd) { transform: rotate(-0.2deg); }
.option:hover:not(.disabled) { transform: rotate(0deg) scale(1.01); box-shadow: 3px 3px 0 rgba(43,36,23,0.2); }
.option .opt-letter {
  width: 30px; height: 30px; border: 2.5px solid var(--ink); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--display); font-weight: 700; font-size: 20px; color: var(--ink);
  min-width: 30px; flex-shrink: 0; background: var(--paper);
}
.option .opt-text { font-size: 17px; line-height: 1.5; color: var(--ink); flex: 1; padding-top: 2px; }
.option.selected { background: var(--orange-soft); }
.option.correct { background: var(--correct-soft); border-color: var(--correct); }
.option.correct .opt-letter { background: var(--correct); color: white; border-color: var(--correct); }
.option.correct .opt-text { color: var(--correct); font-weight: 700; }
.option.wrong { background: var(--wrong-soft); border-color: var(--wrong); }
.option.wrong .opt-letter { background: var(--wrong); color: white; border-color: var(--wrong); }
.option.wrong .opt-text { color: var(--wrong); font-weight: 700; }
.option.disabled { cursor: default; }

/* Judge */
.judge-btns { display: flex; gap: 16px; margin-bottom: 28px; }
.judge-btn {
  flex: 1; padding: 18px; background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 18px 6px 18px 6px / 6px 18px 6px 18px; cursor: pointer; transition: all 0.12s;
  text-align: center; font-size: 22px; font-weight: 700; color: var(--ink); font-family: var(--display);
}
.judge-btn:nth-child(2) { border-radius: 6px 18px 6px 18px / 18px 6px 18px 6px; transform: rotate(0.5deg); }
.judge-btn:nth-child(1) { transform: rotate(-0.3deg); }
.judge-btn:hover:not(.disabled) { transform: rotate(0deg) scale(1.02); box-shadow: 3px 3px 0 rgba(43,36,23,0.2); }
.judge-btn.selected-correct { background: var(--correct-soft); border-color: var(--correct); color: var(--correct); }
.judge-btn.selected-wrong { background: var(--wrong-soft); border-color: var(--wrong); color: var(--wrong); }
.judge-btn.disabled { cursor: default; }

/* Blanks */
.blanks { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
.blank-row { display: flex; align-items: center; gap: 12px; }
.blank-label { font-family: var(--display); font-size: 20px; font-weight: 700; color: var(--ink); min-width: 36px; padding: 2px 8px; }
.blank-input {
  flex: 1; padding: 10px 16px; background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 14px 4px 14px 4px; color: var(--ink); font-size: 17px;
  font-family: var(--sans); outline: none; transition: all 0.12s;
}
.blank-input:focus { background: var(--orange-soft); }
.blank-input.correct { background: var(--correct-soft); border-color: var(--correct); }
.blank-input.wrong { background: var(--wrong-soft); border-color: var(--wrong); }
.blank-input:disabled { cursor: default; }
.blank-answer { font-family: var(--display); font-size: 18px; font-weight: 700; color: var(--correct); margin-top: 4px; display: none; padding: 2px 12px; }
.blank-answer.show { display: block; }

/* Essay */
.essay-area { margin-bottom: 28px; }
.essay-textarea {
  width: 100%; min-height: 130px; padding: 14px; background: var(--paper-2);
  border: 2.5px solid var(--ink); border-radius: 16px 4px 16px 4px;
  color: var(--ink); font-size: 17px; font-family: var(--sans); line-height: 1.7;
  resize: vertical; outline: none;
}
.essay-textarea:focus { background: var(--orange-soft); }
.essay-answer { margin-top: 16px; padding: 14px; background: var(--correct-soft); border: 2.5px dashed var(--correct); border-radius: 16px 4px 16px 4px; display: none; }
.essay-answer.show { display: block; }
.essay-answer h4 { font-family: var(--display); font-size: 22px; font-weight: 700; color: var(--correct); margin-bottom: 8px; }
.essay-answer p { font-size: 17px; line-height: 1.7; color: var(--ink); white-space: pre-wrap; }

/* Feedback */
.feedback { padding: 14px 18px; background: var(--correct-soft); border: 2.5px dashed var(--correct); border-radius: 16px 4px 16px 4px; font-size: 17px; font-weight: 700; display: none; margin-bottom: 20px; animation: fadeIn 0.2s ease; color: var(--ink); }
.feedback.show { display: flex; align-items: center; gap: 10px; }
.feedback.correct { background: var(--correct-soft); border-color: var(--correct); color: var(--ink); }
.feedback.wrong { background: var(--wrong-soft); border-color: var(--wrong); color: var(--ink); }
.feedback strong { font-family: var(--display); font-size: 22px; }

/* Actions */
.actions { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
.btn {
  padding: 11px 24px; background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 10px 18px 10px 18px; color: var(--ink); font-size: 19px; font-weight: 700;
  font-family: var(--display); cursor: pointer; box-shadow: 3px 3px 0 rgba(43,36,23,0.2);
  transition: all 0.12s;
}
.btn:hover { transform: translate(-2px,-2px) rotate(-1deg); box-shadow: 5px 5px 0 rgba(43,36,23,0.25); }
.btn-primary { background: var(--orange); }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn-secondary { background: var(--paper-2); }

/* Empty / Hints */
.empty-state { text-align: center; padding: 80px 40px; color: var(--ink-2); }
.empty-state .icon { font-family: var(--display); font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
.empty-state p { font-size: 17px; line-height: 1.8; }

.kbd-hints { display: flex; gap: 16px; justify-content: center; margin-top: 24px; font-size: 14px; color: var(--ink-2); flex-wrap: wrap; }
.kbd-hints span { display: flex; align-items: center; gap: 4px; }
kbd { font-family: var(--mono); font-size: 12px; padding: 2px 8px; background: var(--orange-soft); border: 2px solid var(--ink); border-radius: 8px 4px 8px 4px; color: var(--ink); font-weight: 700; }

@media (max-width: 768px) {
  .sidebar { width: calc(100% - 16px); position: relative; margin: 8px; flex-direction: row; flex-wrap: wrap; padding: 12px; gap: 4px; transform: none; }
  .sidebar h1 { width: 100%; font-size: 22px; margin-bottom: 8px; padding: 4px 8px; }
  .sidebar h1 span { display: none; }
  .filter-btn { padding: 6px 10px; font-size: 15px; }
  .stats { display: none; } .sidebar-divider { display: none; }
  .main { margin-left: 0; padding: 16px; }
  .question-card { padding: 20px; transform: none; }
  .q-text { font-size: 22px; }
  .kbd-hints { display: none; }
}
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--paper); }
::-webkit-scrollbar-thumb { background: var(--ink-2); border-radius: 4px; }
"""


CSS_STYLE_4 = r"""
:root {
  --bg: #FAFAF9;
  --paper: #FFFFFF;
  --ink: #1C1917;
  --ink-2: #78716C;
  --line: #E7E5E4;
  --line-2: #D6D3D1;
  --accent: #0F766E;
  --correct: #166534;
  --correct-soft: #F0FDF4;
  --wrong: #991B1B;
  --wrong-soft: #FEF2F2;
  --hover: #F5F5F4;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --sans: 'Inter', 'Noto Sans SC', sans-serif;
  --display: 'Fraunces', 'Times New Roman', serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: var(--sans); background: var(--bg); color: var(--ink); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; line-height: 1.7; }

.app { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: 240px; padding: 32px 24px 32px 32px;
  display: flex; flex-direction: column; gap: 2px;
  position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; z-index: 100;
  border-right: 1px solid var(--line-2);
}
.sidebar h1 {
  font-family: var(--display); font-size: 24px; font-weight: 500; color: var(--ink);
  padding: 0 0 16px 0; margin-bottom: 24px;
  border-bottom: 1px solid var(--line-2); line-height: 1.3; letter-spacing: -0.01em;
}
.sidebar h1 span { display: block; font-family: var(--sans); font-size: 12px; color: var(--ink-2); font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 6px; font-style: italic; }

.filter-btn {
  display: flex; align-items: baseline; gap: 8px; padding: 11px 0;
  background: transparent; border: none; color: var(--ink-2);
  font-size: 14px; font-family: var(--sans); cursor: pointer; transition: color 0.2s;
  position: relative; letter-spacing: 0.01em;
}
.filter-btn:hover { color: var(--ink); }
.filter-btn.active { color: var(--ink); font-weight: 500; }
.filter-btn.active::before { content: ''; position: absolute; left: -32px; top: 50%; transform: translateY(-50%); width: 24px; height: 1px; background: var(--ink); }
.filter-btn .count { margin-left: auto; font-family: var(--mono); font-size: 12px; color: var(--ink-2); font-style: italic; }
.filter-btn.active .count { color: var(--ink); }

.sidebar-divider { height: 1px; background: var(--line-2); margin: 16px 0; }

.stats { margin-top: auto; padding: 16px 0 0 0; border-top: 1px solid var(--line-2); }
.stats h3 { font-family: var(--display); font-size: 13px; font-style: italic; color: var(--ink-2); margin-bottom: 16px; font-weight: 500; }
.stat-row { display: flex; justify-content: space-between; align-items: baseline; padding: 5px 0; font-size: 13px; }
.stat-row .label { color: var(--ink-2); font-family: var(--display); font-style: italic; font-size: 13px; }
.stat-row .value { font-family: var(--mono); font-weight: 500; color: var(--ink); font-size: 13px; }
.stat-row .value.correct { color: var(--correct); }
.stat-row .value.wrong { color: var(--wrong); }

.stats-actions { display: flex; gap: 24px; margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--line); }
.stats-btn { padding: 0; background: transparent; border: none; color: var(--ink-2); font-size: 12px; font-family: var(--display); font-style: italic; cursor: pointer; transition: color 0.2s; position: relative; letter-spacing: 0.02em; }
.stats-btn::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: var(--ink-2); transform: scaleX(0); transition: transform 0.2s; transform-origin: left; }
.stats-btn:hover { color: var(--ink); }
.stats-btn:hover::after { transform: scaleX(1); background: var(--ink); }
.stats-btn.danger:hover { color: var(--wrong); }
.stats-btn.danger:hover::after { background: var(--wrong); }

/* Main */
.main { flex: 1; margin-left: 240px; padding: 56px 64px; display: flex; flex-direction: column; align-items: center; }

/* Top bar */
.top-bar { width: 100%; max-width: 760px; display: flex; align-items: center; gap: 24px; margin-bottom: 56px; }
.progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.progress-info { display: flex; justify-content: space-between; font-family: var(--display); font-size: 13px; font-style: italic; color: var(--ink-2); }
.progress-bar { height: 1px; background: var(--line); position: relative; }
.progress-fill { position: absolute; left: 0; top: 0; height: 1px; background: var(--ink); transition: width 0.4s ease; }
.shuffle-btn { padding: 0; background: transparent; border: none; color: var(--ink-2); font-size: 13px; font-family: var(--display); font-style: italic; cursor: pointer; position: relative; letter-spacing: 0.02em; }
.shuffle-btn::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: var(--ink-2); transform: scaleX(0); transition: transform 0.2s; transform-origin: left; }
.shuffle-btn:hover { color: var(--ink); }
.shuffle-btn:hover::after { transform: scaleX(1); background: var(--ink); }
.shuffle-btn.active { color: var(--ink); }
.shuffle-btn.active::after { transform: scaleX(1); background: var(--ink); }

/* Question card */
.question-card { width: 100%; max-width: 760px; background: transparent; padding: 0; position: relative; animation: fadeIn 0.4s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.q-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
.q-number { font-family: var(--display); font-size: 13px; font-style: italic; color: var(--ink-2); letter-spacing: 0.06em; }
.q-type { font-family: var(--display); font-size: 13px; font-style: italic; color: var(--ink-2); }
.q-points { font-family: var(--mono); font-size: 12px; color: var(--ink-2); margin-left: auto; font-style: italic; }

.q-text { font-family: var(--display); font-size: 30px; font-weight: 400; line-height: 1.35; color: var(--ink); margin-bottom: 56px; white-space: pre-wrap; letter-spacing: -0.015em; }

/* Options */
.options { border-top: 1px solid var(--line); display: flex; flex-direction: column; }
.option {
  display: flex; align-items: baseline; gap: 24px; padding: 22px 0;
  background: transparent; cursor: pointer; transition: all 0.2s ease;
  user-select: none; border-bottom: 1px solid var(--line);
}
.option:hover { padding-left: 8px; color: var(--ink); }
.option .opt-letter {
  font-family: var(--display); font-size: 15px; color: var(--ink-2); font-style: italic;
  min-width: 24px; flex-shrink: 0; transition: color 0.2s;
}
.option .opt-text { font-size: 16px; line-height: 1.6; color: var(--ink); flex: 1; transition: color 0.2s; }
.option.selected .opt-letter { color: var(--ink); font-weight: 500; }
.option.correct .opt-letter { color: var(--correct); }
.option.correct .opt-text { color: var(--correct); }
.option.correct::after { content: '— Correct'; font-family: var(--display); font-style: italic; font-size: 13px; color: var(--correct); }
.option.wrong .opt-letter { color: var(--wrong); }
.option.wrong .opt-text { color: var(--wrong); }
.option.wrong::after { content: '— Incorrect'; font-family: var(--display); font-style: italic; font-size: 13px; color: var(--wrong); }
.option.disabled { cursor: default; }

/* Judge */
.judge-btns { display: flex; gap: 0; margin-bottom: 32px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.judge-btn {
  flex: 1; padding: 22px 0; background: transparent; border: none; border-right: 1px solid var(--line);
  cursor: pointer; transition: all 0.2s; text-align: center;
  font-size: 16px; font-family: var(--display); color: var(--ink-2); font-style: italic;
  letter-spacing: 0.04em;
}
.judge-btn:last-child { border-right: none; }
.judge-btn:hover:not(.disabled) { color: var(--ink); background: var(--hover); }
.judge-btn.selected-correct { color: var(--correct); font-weight: 500; }
.judge-btn.selected-wrong { color: var(--wrong); font-weight: 500; }
.judge-btn.disabled { cursor: default; }

/* Blanks */
.blanks { display: flex; flex-direction: column; gap: 0; margin-bottom: 32px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.blank-row { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.blank-row:last-child { border-bottom: none; }
.blank-label { font-family: var(--display); font-size: 14px; font-style: italic; color: var(--ink-2); min-width: 32px; }
.blank-input {
  flex: 1; padding: 6px 0; background: transparent; border: none; border-bottom: 1px solid var(--line);
  color: var(--ink); font-size: 16px; font-family: var(--display); outline: none; transition: border-color 0.2s;
}
.blank-input:focus { border-bottom-color: var(--ink); }
.blank-input.correct { border-bottom-color: var(--correct); color: var(--correct); }
.blank-input.wrong { border-bottom-color: var(--wrong); color: var(--wrong); }
.blank-input:disabled { cursor: default; opacity: 0.7; }
.blank-answer { font-family: var(--display); font-size: 13px; font-style: italic; color: var(--correct); display: none; padding-left: 16px; }
.blank-answer.show { display: inline; }

/* Essay */
.essay-area { margin-bottom: 32px; }
.essay-textarea {
  width: 100%; min-height: 140px; padding: 16px 0;
  background: transparent; border: none; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  color: var(--ink); font-size: 16px; font-family: var(--display); line-height: 1.7;
  resize: vertical; outline: none;
}
.essay-textarea:focus { border-top-color: var(--ink); border-bottom-color: var(--ink); }
.essay-answer { margin-top: 24px; padding: 0 0 0 20px; border-left: 1px solid var(--line-2); display: none; }
.essay-answer.show { display: block; }
.essay-answer h4 { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-2); margin-bottom: 12px; }
.essay-answer p { font-size: 16px; line-height: 1.7; color: var(--ink); white-space: pre-wrap; font-family: var(--display); }

/* Feedback */
.feedback { padding: 16px 0 16px 20px; border-left: 1px solid var(--line-2); font-family: var(--display); font-style: italic; font-size: 15px; color: var(--ink-2); display: none; margin-bottom: 24px; animation: fadeIn 0.2s ease; line-height: 1.6; }
.feedback.show { display: block; }
.feedback.correct { color: var(--correct); border-color: var(--correct); }
.feedback.wrong { color: var(--wrong); border-color: var(--wrong); }
.feedback strong { font-style: normal; font-family: var(--sans); font-weight: 500; letter-spacing: 0.04em; font-size: 11px; text-transform: uppercase; margin-right: 8px; }

/* Actions */
.actions { display: flex; gap: 32px; justify-content: space-between; margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line); }
.btn { padding: 0; background: transparent; border: none; color: var(--ink); font-size: 14px; font-weight: 500; cursor: pointer; font-family: var(--display); letter-spacing: 0.02em; position: relative; }
.btn::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px; background: var(--ink); transform: scaleX(0); transition: transform 0.2s; transform-origin: left; }
.btn:hover::after { transform: scaleX(1); }
.btn-primary { color: var(--ink); }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn-primary:disabled::after { display: none; }
.btn-secondary { color: var(--ink-2); }
.btn-secondary:hover { color: var(--ink); }

/* Empty / Hints */
.empty-state { text-align: center; padding: 120px 40px; color: var(--ink-2); }
.empty-state .icon { font-family: var(--display); font-style: italic; font-size: 32px; margin-bottom: 20px; opacity: 0.4; }
.empty-state p { font-size: 16px; line-height: 1.7; font-family: var(--display); font-style: italic; }

.kbd-hints { display: flex; gap: 24px; justify-content: center; margin-top: 32px; font-size: 12px; color: var(--ink-2); font-family: var(--display); font-style: italic; }
.kbd-hints span { display: flex; align-items: center; gap: 6px; }
kbd { font-family: var(--mono); font-size: 11px; padding: 1px 6px; background: transparent; border: 1px solid var(--line-2); color: var(--ink-2); }

@media (max-width: 768px) {
  .sidebar { width: 100%; position: relative; padding: 16px; flex-direction: row; flex-wrap: wrap; gap: 8px; border-right: none; border-bottom: 1px solid var(--line-2); }
  .sidebar h1 { width: 100%; font-size: 18px; padding: 0 0 8px 0; margin-bottom: 8px; }
  .sidebar h1 span { display: none; }
  .filter-btn { padding: 6px 10px; font-size: 12px; }
  .filter-btn.active::before { display: none; }
  .stats { display: none; } .sidebar-divider { display: none; }
  .main { margin-left: 0; padding: 24px 20px; }
  .q-text { font-size: 22px; margin-bottom: 32px; }
  .kbd-hints { display: none; }
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--line-2); }
::-webkit-scrollbar-thumb:hover { background: var(--ink-2); }
"""


# ============ 构建并写入 4 个文件 ============

styles = [
    ("style1", "计组练习_线条版1.html", CSS_STYLE_1, "极简线性图标风"),
    ("style2", "计组练习_线条版2.html", CSS_STYLE_2, "新粗野线条风"),
    ("style3", "计组练习_线条版3.html", CSS_STYLE_3, "手绘线稿风"),
    ("style4", "计组练习_线条版4.html", CSS_STYLE_4, "细线极简留白风"),
]

for key, fname, css, label in styles:
    head = HEAD_BASE.format(font_link=FONTS[key], css=css)
    body_and_js = suffix_clean
    full = head + body_and_js
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full)
    size = os.path.getsize(out_path)
    print(f"[OK] {fname} ({label}): {size:,} bytes")

print("\nDone!")