"""
将答题卡功能移植到 4 个风格版本。
- 共享 HTML + JS
- 4 套定制 CSS（每版匹配各自设计语言）
- 修改 .main margin-right
"""

import os

DIR = r"C:\Users\ASUS\Desktop\计组"

# ============== 共享 HTML ==============
SHEET_HTML = """  <aside class="answer-sheet">
    <div class="sheet-header">
      <h3>// 答题卡 Answer Sheet</h3>
    </div>
    <div class="sheet-toolbar" id="sheet-toolbar">
      <button class="chip active" data-type="all">全部</button>
      <button class="chip" data-type="单选题">单选</button>
      <button class="chip" data-type="填空题">填空</button>
      <button class="chip" data-type="判断题">判断</button>
      <button class="chip" data-type="简答题">简答</button>
    </div>
    <div class="sheet-grid" id="sheet-grid"></div>
    <div class="sheet-legend">
      <span><i class="lg-empty"></i>未答</span>
      <span><i class="lg-correct"></i>正确</span>
      <span><i class="lg-wrong"></i>错误</span>
    </div>
  </aside>
"""

# ============== 共享 JS ==============
SHEET_JS = r"""
// ============================================
// ANSWER SHEET
// ============================================
function renderAnswerSheet() {
  const grid = document.getElementById('sheet-grid');
  if (!grid) return;

  const groups = {};
  questions.forEach(q => {
    if (!groups[q.type]) groups[q.type] = [];
    groups[q.type].push(q);
  });

  const typeOrder = ['单选题', '填空题', '判断题', '简答题'];
  let html = '';
  typeOrder.forEach(type => {
    if (!groups[type] || groups[type].length === 0) return;
    html += `<div class="sheet-section-header" data-type="${type}">${type}<span class="sec-count">×${groups[type].length}</span></div>`;
    html += groups[type].map(q => {
      const state = progress[q.id];
      let cls = 'sheet-tile empty';
      if (state?.result === 'correct') cls = 'sheet-tile correct';
      else if (state?.result === 'wrong') cls = 'sheet-tile wrong';
      return `<div class="${cls}" data-id="${q.id}" data-type="${q.type}" onclick="goToQuestion(${q.id})" title="#${q.id} · ${q.type}">${String(q.id).padStart(3, '0')}</div>`;
    }).join('');
  });
  grid.innerHTML = html;
}

function updateSheet() {
  const tiles = document.querySelectorAll('.sheet-tile');
  tiles.forEach(t => {
    const id = parseInt(t.dataset.id);
    const state = progress[id];
    t.classList.remove('empty', 'correct', 'wrong', 'essay');
    if (state?.result === 'correct') t.classList.add('correct');
    else if (state?.result === 'wrong') t.classList.add('wrong');
    else t.classList.add('empty');
  });
}

function highlightCurrentTile() {
  const cur = filteredIds[currentIndex];
  if (cur === undefined) return;
  document.querySelectorAll('.sheet-tile.current').forEach(t => t.classList.remove('current'));
  const tile = document.querySelector(`.sheet-tile[data-id="${cur}"]`);
  if (tile) {
    tile.classList.add('current');
    tile.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

document.querySelectorAll('#sheet-toolbar .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#sheet-toolbar .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const type = chip.dataset.type;
    document.querySelectorAll('.sheet-tile').forEach(t => {
      const hide = type !== 'all' && t.dataset.type !== type;
      t.classList.toggle('hidden-tile', hide);
    });
    document.querySelectorAll('.sheet-section-header').forEach(h => {
      const hide = type !== 'all' && h.dataset.type !== type;
      h.classList.toggle('hidden-tile', hide);
    });
  });
});

"""

# ============== 4 套 CSS ==============

# Style 1: 极简线性图标风
CSS_STYLE_1 = r"""
/* Answer Sheet (right sidebar) */
.answer-sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 320px;
  background: var(--paper); border-left: 1px solid var(--border);
  padding: 20px 14px; display: flex; flex-direction: column; gap: 14px;
  z-index: 100;
}
.sheet-header h3 {
  font-family: var(--mono); font-size: 11px; color: var(--accent);
  letter-spacing: 1.5px; text-transform: uppercase;
  padding-bottom: 8px; border-bottom: 1px solid var(--border);
}
.sheet-section-header {
  grid-column: 1 / -1; font-size: 11px; color: var(--text-2);
  font-weight: 500; letter-spacing: 0.02em;
  padding: 14px 2px 6px; display: flex; align-items: baseline; gap: 6px;
}
.sheet-section-header:first-child { padding-top: 4px; }
.sheet-section-header .sec-count { font-family: var(--mono); font-size: 10px; color: var(--text-dim); }
.sheet-section-header.hidden-tile { display: none; }

.sheet-toolbar { display: flex; gap: 4px; flex-wrap: wrap; padding-bottom: 10px; border-bottom: 1px dashed var(--border); }
.chip { padding: 4px 10px; background: transparent; border: 1px solid var(--border); border-radius: 6px; color: var(--text-2); font-size: 11px; font-family: var(--sans); cursor: pointer; transition: all 0.15s; }
.chip:hover { border-color: var(--border-strong); color: var(--text); }
.chip.active { background: var(--text); border-color: var(--text); color: var(--paper); font-weight: 500; }

.sheet-grid { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 4px 2px; }
.sheet-tile { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 11px; font-weight: 500; border-radius: 6px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s; position: relative; user-select: none; }
.sheet-tile.empty { background: var(--bg-soft); border: 1px dashed var(--border); color: var(--text-dim); }
.sheet-tile.correct { background: var(--correct-soft); border: 1px solid var(--correct); color: var(--correct); font-weight: 600; }
.sheet-tile.wrong { background: var(--wrong-soft); border: 1px solid var(--wrong); color: var(--wrong); font-weight: 600; }
.sheet-tile.current { background: var(--text); border: 2px solid var(--text); color: var(--paper); transform: scale(1.08); box-shadow: 0 0 0 3px rgba(17,24,39,0.18); z-index: 2; }
.sheet-tile.hidden-tile { opacity: 0.18; pointer-events: none; filter: grayscale(1); }
.sheet-tile:hover:not(.current):not(.hidden-tile) { border-color: var(--accent); transform: translateY(-1px); box-shadow: 0 2px 6px rgba(37,99,235,0.15); }
.sheet-tile.correct::after, .sheet-tile.wrong::after, .sheet-tile.current::after { content: ''; position: absolute; bottom: 3px; right: 3px; width: 4px; height: 4px; border-radius: 50%; background: currentColor; }
.sheet-tile.empty::after { display: none; }

.sheet-legend { display: flex; gap: 10px; font-size: 10px; color: var(--text-dim); padding-top: 8px; border-top: 1px dashed var(--border); flex-wrap: wrap; }
.sheet-legend span { display: flex; align-items: center; gap: 4px; }
.sheet-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; }
.sheet-legend i.lg-empty { background: var(--bg-soft); border: 1px dashed var(--border); }
.sheet-legend i.lg-correct { background: var(--correct); }
.sheet-legend i.lg-wrong { background: var(--wrong); }

@media (max-width: 1100px) { .answer-sheet { display: none; } .main { margin-right: 0 !important; } }
"""

# Style 2: 新粗野线条
CSS_STYLE_2 = r"""
/* Answer Sheet (right sidebar) */
.answer-sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 340px;
  background: var(--paper); border-left: 3px solid var(--ink);
  padding: 20px 14px; display: flex; flex-direction: column; gap: 14px;
  z-index: 100; box-shadow: -6px 0 0 var(--ink);
}
.sheet-header h3 {
  font-family: var(--display); font-size: 12px; color: var(--ink);
  font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 6px 10px; background: var(--accent); border: 3px solid var(--ink);
  box-shadow: 4px 4px 0 var(--red);
}
.sheet-section-header {
  grid-column: 1 / -1; font-family: var(--display); font-size: 14px; font-weight: 700;
  color: var(--ink); text-transform: uppercase; letter-spacing: 0.05em;
  padding: 14px 2px 6px; display: flex; align-items: baseline; gap: 6px;
  border-bottom: 2px dashed var(--ink);
}
.sheet-section-header:first-child { padding-top: 4px; }
.sheet-section-header .sec-count { font-family: var(--mono); font-size: 11px; color: var(--ink); }
.sheet-section-header.hidden-tile { display: none; }

.sheet-toolbar { display: flex; gap: 4px; flex-wrap: wrap; padding-bottom: 10px; }
.chip { padding: 5px 10px; background: var(--paper); border: 3px solid var(--ink); color: var(--ink); font-size: 11px; font-family: var(--display); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; box-shadow: 3px 3px 0 var(--ink); transition: all 0.08s; }
.chip:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 var(--ink); }
.chip.active { background: var(--accent); transform: translate(1px, 1px); box-shadow: 1px 1px 0 var(--ink); }

.sheet-grid { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; padding: 4px 2px; }
.sheet-tile { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.08s; position: relative; user-select: none; border: 3px solid var(--ink); }
.sheet-tile.empty { background: var(--bg); color: var(--ink); border-style: dashed; }
.sheet-tile.correct { background: var(--green); color: var(--ink); box-shadow: 3px 3px 0 var(--ink); }
.sheet-tile.wrong { background: var(--pink); color: var(--ink); box-shadow: 3px 3px 0 var(--ink); }
.sheet-tile.current { background: var(--accent); color: var(--ink); transform: scale(1.1); box-shadow: 5px 5px 0 var(--ink); z-index: 2; }
.sheet-tile.hidden-tile { opacity: 0.18; pointer-events: none; filter: grayscale(1); }
.sheet-tile:hover:not(.current):not(.hidden-tile) { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--ink); }
.sheet-tile.correct::after, .sheet-tile.wrong::after, .sheet-tile.current::after { content: ''; position: absolute; bottom: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: var(--ink); }
.sheet-tile.empty::after { display: none; }

.sheet-legend { display: flex; gap: 10px; font-size: 10px; color: var(--ink); padding-top: 8px; font-family: var(--display); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.sheet-legend span { display: flex; align-items: center; gap: 4px; }
.sheet-legend i { display: inline-block; width: 12px; height: 12px; border: 2px solid var(--ink); }
.sheet-legend i.lg-empty { background: var(--bg); border-style: dashed; }
.sheet-legend i.lg-correct { background: var(--green); }
.sheet-legend i.lg-wrong { background: var(--pink); }

@media (max-width: 1100px) { .answer-sheet { display: none; } .main { margin-right: 0 !important; } }
"""

# Style 3: 手绘线稿
CSS_STYLE_3 = r"""
/* Answer Sheet (right sidebar) */
.answer-sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 320px;
  background: var(--paper-2); border: 2.5px solid var(--ink);
  border-radius: 6px 22px 8px 26px / 22px 8px 26px 6px;
  padding: 20px 14px; display: flex; flex-direction: column; gap: 12px;
  z-index: 100; transform: rotate(-0.4deg); box-shadow: 4px 5px 0 rgba(43,36,23,0.18);
  margin: 16px 16px 16px 0;
}
.sheet-header h3 {
  font-family: var(--display); font-size: 28px; font-weight: 700;
  color: var(--orange); margin: 0; line-height: 1;
  text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--orange);
  text-underline-offset: 5px;
}
.sheet-section-header {
  grid-column: 1 / -1; font-family: var(--display); font-size: 22px; font-weight: 700;
  color: var(--ink); padding: 12px 2px 4px; display: flex; align-items: baseline; gap: 6px;
}
.sheet-section-header:nth-child(odd) { transform: rotate(0.3deg); }
.sheet-section-header:nth-child(even) { transform: rotate(-0.3deg); }
.sheet-section-header:first-child { padding-top: 4px; }
.sheet-section-header .sec-count { font-family: var(--sans); font-size: 14px; color: var(--ink-2); }
.sheet-section-header.hidden-tile { display: none; }

.sheet-toolbar { display: flex; gap: 4px; flex-wrap: wrap; padding-bottom: 8px; }
.chip { padding: 4px 12px; background: var(--paper-2); border: 2.5px solid var(--ink); border-radius: 4px 14px 4px 14px; color: var(--ink); font-size: 14px; font-family: var(--sans); cursor: pointer; transition: all 0.12s; box-shadow: 2px 2px 0 rgba(43,36,23,0.2); }
.chip:hover { transform: translate(-1px, -1px) rotate(-1deg); box-shadow: 3px 3px 0 rgba(43,36,23,0.25); }
.chip.active { background: var(--orange-soft); }

.sheet-grid { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 4px 2px; }
.sheet-tile { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.12s; position: relative; user-select: none; border: 2.5px solid var(--ink); border-radius: 6px 18px 6px 18px; background: var(--paper-2); }
.sheet-tile:nth-child(even) { border-radius: 18px 6px 18px 6px; }
.sheet-tile.empty { color: var(--ink-2); border-style: dashed; }
.sheet-tile.correct { background: var(--correct-soft); border-color: var(--correct); color: var(--correct); }
.sheet-tile.wrong { background: var(--wrong-soft); border-color: var(--wrong); color: var(--wrong); }
.sheet-tile.current { background: var(--orange); border-color: var(--ink); color: var(--paper); transform: scale(1.1); z-index: 2; box-shadow: 3px 3px 0 rgba(43,36,23,0.3); }
.sheet-tile.hidden-tile { opacity: 0.18; pointer-events: none; filter: grayscale(1); }
.sheet-tile:hover:not(.current):not(.hidden-tile) { transform: rotate(0deg) scale(1.05); }
.sheet-tile.correct::after, .sheet-tile.wrong::after { content: ''; position: absolute; bottom: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.sheet-tile.current::after { content: ''; position: absolute; bottom: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: var(--paper); }
.sheet-tile.empty::after { display: none; }

.sheet-legend { display: flex; gap: 10px; font-size: 12px; color: var(--ink-2); padding-top: 6px; flex-wrap: wrap; }
.sheet-legend span { display: flex; align-items: center; gap: 4px; }
.sheet-legend i { display: inline-block; width: 12px; height: 12px; border: 2px solid var(--ink); border-radius: 4px; }
.sheet-legend i.lg-empty { background: var(--paper-2); border-style: dashed; }
.sheet-legend i.lg-correct { background: var(--correct-soft); border-color: var(--correct); }
.sheet-legend i.lg-wrong { background: var(--wrong-soft); border-color: var(--wrong); }

@media (max-width: 1100px) { .answer-sheet { display: none; } .main { margin-right: 0 !important; } }
"""

# Style 4: 细线极简留白
CSS_STYLE_4 = r"""
/* Answer Sheet (right sidebar) */
.answer-sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 280px;
  background: transparent; border-left: 1px solid var(--line-2);
  padding: 56px 28px 28px 24px; display: flex; flex-direction: column; gap: 14px;
  z-index: 100;
}
.sheet-header h3 {
  font-family: var(--display); font-size: 12px; color: var(--ink-2);
  font-style: italic; font-weight: 400; letter-spacing: 0.2em;
  text-transform: uppercase;
  padding-bottom: 12px; border-bottom: 1px solid var(--line);
}
.sheet-section-header {
  grid-column: 1 / -1; font-family: var(--display); font-size: 13px;
  color: var(--ink); font-style: italic; letter-spacing: 0.02em;
  padding: 18px 0 6px; display: flex; align-items: baseline; gap: 8px;
  border-bottom: 1px solid var(--line);
}
.sheet-section-header:first-child { padding-top: 4px; }
.sheet-section-header::before { content: '//'; color: var(--ink-2); font-style: italic; margin-right: 2px; }
.sheet-section-header .sec-count { font-size: 11px; color: var(--ink-2); margin-left: auto; }
.sheet-section-header.hidden-tile { display: none; }

.sheet-toolbar { display: flex; gap: 4px; flex-wrap: wrap; padding-bottom: 4px; }
.chip { padding: 4px 12px; background: transparent; border: 1px solid var(--line-2); border-radius: 999px; color: var(--ink-2); font-size: 11px; font-family: var(--sans); cursor: pointer; transition: all 0.15s; }
.chip:hover { border-color: var(--accent); color: var(--accent); }
.chip.active { border-color: var(--accent); color: var(--accent); font-weight: 500; }

.sheet-grid { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; padding: 0; }
.sheet-tile { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 13px; cursor: pointer; transition: all 0.18s; position: relative; user-select: none; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); }
.sheet-tile.empty { color: var(--ink-2); }
.sheet-tile.correct { color: var(--correct); border-bottom-color: var(--correct); font-weight: 500; }
.sheet-tile.wrong { color: var(--wrong); border-bottom-color: var(--wrong); }
.sheet-tile.current { background: var(--ink); color: var(--bg); font-weight: 500; transform: scale(1.08); z-index: 2; }
.sheet-tile.hidden-tile { opacity: 0.15; pointer-events: none; }
.sheet-tile:hover:not(.current):not(.hidden-tile) { background: var(--hover); }

.sheet-legend { display: flex; gap: 12px; font-size: 11px; color: var(--ink-2); padding-top: 12px; border-top: 1px solid var(--line); flex-wrap: wrap; font-family: var(--display); font-style: italic; }
.sheet-legend span { display: flex; align-items: center; gap: 4px; }
.sheet-legend i { display: inline-block; width: 10px; height: 10px; border: 1px solid var(--line-2); }
.sheet-legend i.lg-empty { border-style: dashed; }
.sheet-legend i.lg-correct { background: var(--correct); border-color: var(--correct); }
.sheet-legend i.lg-wrong { background: var(--wrong); border-color: var(--wrong); }

@media (max-width: 1100px) { .answer-sheet { display: none; } .main { margin-right: 0 !important; } }
"""


# ============== 移植目标文件配置 ==============
TARGETS = [
    ("计组练习_极简线性图标风.html", CSS_STYLE_1, 320, "260px", 260),
    ("计组练习_新粗野线条.html",       CSS_STYLE_2, 340, "276px", 276),
    ("计组练习_手绘线稿.html",         CSS_STYLE_3, 320, "286px", 286),
    ("计组练习_细线极简留白.html",     CSS_STYLE_4, 280, "240px", 240),
]


def patch_file(filename, css, width, old_margin_left, margin_left_int):
    path = os.path.join(DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # 1. Insert CSS before </style>
    if "</style>" not in text:
        raise RuntimeError(f"{filename}: missing </style>")
    text = text.replace("</style>", css + "\n</style>", 1)

    # 2. Insert HTML between </main> and </div>
    marker = "  </main>\n</div>"
    if marker not in text:
        raise RuntimeError(f"{filename}: cannot find </main>\\n</div> marker")
    text = text.replace(marker, "  </main>\n\n" + SHEET_HTML + "</div>", 1)

    # 3. Add margin-right to .main (handle both single-line and multi-line forms)
    old_single = f".main {{ flex: 1; margin-left: {old_margin_left}; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }}"
    new_single = f".main {{ flex: 1; margin-left: {old_margin_left}; margin-right: {width}px; padding: 32px 48px; display: flex; flex-direction: column; align-items: center; }}"
    old_single_alt = f".main {{ flex: 1; margin-left: {old_margin_left}; padding: 56px 64px; display: flex; flex-direction: column; align-items: center; }}"
    new_single_alt = f".main {{ flex: 1; margin-left: {old_margin_left}; margin-right: {width}px; padding: 56px 64px; display: flex; flex-direction: column; align-items: center; }}"

    if old_single in text:
        text = text.replace(old_single, new_single, 1)
    elif old_single_alt in text:
        text = text.replace(old_single_alt, new_single_alt, 1)
    else:
        # Fallback: multi-line form
        old_multi = f".main {{\n  flex: 1;\n  margin-left: {old_margin_left};\n  padding: 32px 48px;"
        new_multi = f".main {{\n  flex: 1;\n  margin-left: {old_margin_left};\n  margin-right: {width}px;\n  padding: 32px 48px;"
        if "padding: 56px 64px" in text:
            old_multi = f".main {{\n  flex: 1;\n  margin-left: {old_margin_left};\n  padding: 56px 64px;"
            new_multi = f".main {{\n  flex: 1;\n  margin-left: {old_margin_left};\n  margin-right: {width}px;\n  padding: 56px 64px;"
        if old_multi in text:
            text = text.replace(old_multi, new_multi, 1)
        else:
            raise RuntimeError(f"{filename}: cannot find .main block to patch margin")

    # 4. Insert JS sheet block before // INIT
    if "// INIT" not in text:
        raise RuntimeError(f"{filename}: missing // INIT")
    text = text.replace("// INIT", SHEET_JS + "// INIT", 1)

    # 5. Hook into renderQuestion: add highlightCurrentTile() after updateSidebar()
    text = text.replace(
        "  card.innerHTML = html;\n  updateProgress();\n  updateSidebar();",
        "  card.innerHTML = html;\n  updateProgress();\n  updateSidebar();\n  highlightCurrentTile();",
        1
    )

    # 6. Hook into updateSidebar: add updateSheet() at end (before final })
    text = text.replace(
        "  document.querySelectorAll('.filter-btn').forEach(btn => {\n    btn.classList.toggle('active', btn.dataset.filter === currentFilter);\n  });\n}",
        "  document.querySelectorAll('.filter-btn').forEach(btn => {\n    btn.classList.toggle('active', btn.dataset.filter === currentFilter);\n  });\n  updateSheet();\n}",
        1
    )

    # 7. Add init call renderAnswerSheet() before updateSidebar()
    # INIT block looks like:
    # // INIT
    # updateSidebar();
    # renderQuestion();
    text = text.replace(
        "// INIT\nupdateSidebar();",
        "// INIT\nrenderAnswerSheet();\nupdateSidebar();",
        1
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"[OK] {filename}: +{len(css)} chars CSS, +{len(SHEET_HTML)} chars HTML, +{len(SHEET_JS)} chars JS, margin-right: {width}px")


for filename, css, width, old_margin_left, _ in TARGETS:
    patch_file(filename, css, width, old_margin_left, _)

print("\nDone!")
