// ============================================
// 通用刷题外壳 (shared shell)
// 由科目入口页提供:
//   window.QUIZ_SUBJECT  — 科目配置(config.js)
//   window.QUIZ_QUESTIONS — 题库数组(questions.js)
// 布局 DOM 由本文件按配置生成,题型渲染/判分/进度按 config.types 驱动。
// ============================================
const cfg = window.QUIZ_SUBJECT;
const questions = window.QUIZ_QUESTIONS || [];

// ============================================
// STATE
// ============================================
const PROGRESS_KEY = 'quiz:' + cfg.id + ':progress';
let currentFilter = '全部';
let filteredIds = questions.map(q => q.id);
let currentIndex = 0;
let shuffled = false;
let answered = false;
let multiSelected = new Set(); // 多选题未提交前的勾选

function migrateLegacyProgress() {
  if (!cfg.legacyProgressKey) return;
  if (localStorage.getItem(PROGRESS_KEY)) return;
  const legacy = localStorage.getItem(cfg.legacyProgressKey);
  if (legacy) localStorage.setItem(PROGRESS_KEY, legacy);
}

let progress = {};

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function currentQuestion() {
  return filteredIds.length > 0 ? getQuestionById(filteredIds[currentIndex]) : null;
}

// ============================================
// SHELL DOM(按配置生成三栏布局)
// ============================================
function shellChromeCss() {
  return `
  .theme-switcher { position: relative; }
  .theme-trigger {
    display: inline-block;
    padding: 0; background: transparent;
    border: none; border-radius: 0;
    color: var(--ink-2, #78716c); font-size: 13px;
    font-family: 'Fraunces','Times New Roman',serif; font-style: italic;
    cursor: pointer; transition: color 0.2s;
    white-space: nowrap; letter-spacing: 0.01em;
  }
  .theme-trigger:hover { color: var(--ink, #1c1917); }
  .theme-popover {
    position: absolute; top: calc(100% + 8px); right: 0;
    background: var(--bg, #FAFAF9); border: none; border-radius: 0;
    box-shadow: none; border-top: 1px solid var(--line, #e7e5e4);
    min-width: 200px; padding: 0; z-index: 200;
    display: none;
  }
  .theme-popover.open { display: block; }
  .theme-option {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 0; border: none; background: transparent;
    border-radius: 0; color: var(--ink-2, #78716c);
    font-size: 13px; font-family: 'Fraunces','Times New Roman',serif;
    font-style: italic; cursor: pointer;
    width: 100%; text-align: left; transition: color 0.15s, padding-left 0.15s;
    position: relative; letter-spacing: 0.01em;
  }
  .theme-option:hover { color: var(--ink, #1c1917); padding-left: 8px; }
  .theme-option.active { color: var(--ink, #1c1917); }
  .theme-option .opt-name { flex: 1; }
  .theme-option .opt-check {
    font-size: 13px; color: var(--ink, #1c1917); visibility: hidden;
    font-family: 'Fraunces','Times New Roman',serif; font-style: italic;
  }
  .theme-option.active .opt-check { visibility: visible; }
  body { -webkit-user-select: none; user-select: none; }
  `;
}

function kbdHintsHtml() {
  const t = new Set(cfg.types);
  const hints = [];
  if (t.has('单选题')) hints.push('<span><kbd>1</kbd>-<kbd>4</kbd> 选择选项</span>');
  if (t.has('多选题')) hints.push('<span><kbd>1</kbd>-<kbd>9</kbd> 勾选选项</span>');
  if (t.has('填空题')) hints.push('<span><kbd>Enter</kbd> 提交填空</span>');
  if (t.has('简答题')) hints.push('<span><kbd>Space</kbd> 显示答案</span>');
  hints.push('<span><kbd>Enter</kbd>/<kbd>←</kbd><kbd>→</kbd> 翻题</span>');
  return `<div class="kbd-hints">${hints.join('')}</div>`;
}

function buildShell() {
  const filterBtns = cfg.types.map(t =>
    `<button class="filter-btn" data-filter="${t}">${t} <span class="count" id="count-${t}"></span></button>`
  ).join('\n    ');

  document.body.innerHTML = `
    <style>${shellChromeCss()}</style>
    <button class="side-toggle side-toggle-left" id="side-toggle-left" type="button" aria-label="切换左侧栏"></button>
    <div class="app">
      <aside class="sidebar">
        <h1>
          ${cfg.name}
          <span>${cfg.subtitle || ''}</span>
        </h1>
        <button class="filter-btn active" data-filter="全部">全部 <span class="count" id="count-all"></span></button>
        ${filterBtns}
        <div class="sidebar-divider"></div>
        <button class="filter-btn" data-filter="错题">错题回顾 <span class="count" id="count-wrong"></span></button>
        <div class="stats">
          <h3>// 统计</h3>
          <div class="stat-row">
            <span class="label">已做</span>
            <span class="value" id="stat-done">0 / 0</span>
          </div>
          <div class="stat-row">
            <span class="label">正确</span>
            <span class="value correct" id="stat-correct">0</span>
          </div>
          <div class="stat-row">
            <span class="label">错误</span>
            <span class="value wrong" id="stat-wrong">0</span>
          </div>
          <div class="stat-row">
            <span class="label">正确率</span>
            <span class="value" id="stat-rate">--%</span>
          </div>
          <div class="stats-actions">
            <button class="stats-btn" onclick="shuffleToggle()">随机顺序</button>
            <button class="stats-btn danger" onclick="resetProgress()">重置进度</button>
          </div>
        </div>
      </aside>

      <main class="main">
        <div class="top-bar">
          <div class="progress-wrap">
            <div class="progress-info">
              <span id="progress-text">第 1 题</span>
              <span id="progress-pct">0%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill" style="width:0%"></div>
            </div>
          </div>
          <button class="shuffle-btn" id="shuffle-btn" onclick="shuffleToggle()">Shuffle</button>
          <div class="theme-switcher">
            <button class="theme-trigger" id="theme-trigger" type="button" aria-label="切换主题">
              <span class="theme-label" id="theme-label"></span>
            </button>
            <div class="theme-popover" id="theme-popover" role="menu">
              <!-- 主题选项由 theme.js 渲染 -->
            </div>
          </div>
        </div>

        <div class="question-card" id="question-card">
          <!-- Rendered by JS -->
        </div>

        ${kbdHintsHtml()}
      </main>

      <aside class="answer-sheet">
        <div class="sheet-header">
          <h3>// 答题卡 Answer Sheet</h3>
        </div>
        <div class="sheet-grid" id="sheet-grid"></div>
        <div class="sheet-legend">
          <span><i class="lg-empty"></i>未答</span>
          <span><i class="lg-correct"></i>正确</span>
          <span><i class="lg-wrong"></i>错误</span>
        </div>
      </aside>
    </div>
    <button class="side-toggle side-toggle-right" id="side-toggle-right" type="button" aria-label="切换右侧栏"></button>
  `;
}

// ============================================
// FILTERING
// ============================================
function applyFilter(filter) {
  currentFilter = filter;
  answered = false;

  if (filter === '全部') {
    filteredIds = questions.map(q => q.id);
  } else if (filter === '错题') {
    filteredIds = questions.filter(q => progress[q.id]?.result === 'wrong').map(q => q.id);
  } else {
    filteredIds = questions.filter(q => q.type === filter).map(q => q.id);
  }

  if (shuffled) {
    filteredIds = shuffle([...filteredIds]);
  }

  currentIndex = 0;
  updateSidebar();
  renderQuestion();
}

// ============================================
// SHUFFLE
// ============================================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleToggle() {
  shuffled = !shuffled;
  document.getElementById('shuffle-btn').classList.toggle('active', shuffled);

  if (shuffled) {
    filteredIds = shuffle([...filteredIds]);
  } else {
    applyFilter(currentFilter);
    return;
  }

  currentIndex = 0;
  answered = false;
  renderQuestion();
}

// ============================================
// RENDERING
// ============================================
function getQuestionById(id) {
  return questions.find(q => q.id === id);
}

// ============================================
// ANALYSIS (解析) 渲染
// analysis 字段可选;仅 brief 时展示为速记框,不含大标题
// ============================================
function renderAnalysis(q) {
  if (!q.analysis) return '';
  const a = q.analysis;
  const hasBody = a.keypoints || a.detail || a.distractors;
  return `
    <div class="analysis" style="margin-top: 12px; padding: 14px 16px; background: rgba(37,99,235,0.05); border-left: 3px solid #2563EB; border-radius: 6px; font-size: 14px; line-height: 1.7; color: var(--text, #222);">
      ${hasBody ? `<h4 style="color: #2563EB; font-size: 13px; margin: 0 0 10px 0; font-weight: 600; letter-spacing: 0.5px;">// 解析</h4>` : ''}
      ${a.keypoints ? `<div style="margin: 8px 0;"><strong style="color:#2563EB">📋 采分点:</strong><br>${escapeHtml(a.keypoints).replace(/\n/g, '<br>')}</div>` : ''}
      ${a.detail ? `<div class="analysis-detail">${escapeHtml(a.detail).replace(/\n/g, '<br>')}</div>` : ''}
      ${a.distractors ? `<div style="margin: 10px 0 4px;"><strong style="color:#dc2626">❌ 干扰项:</strong><ul style="margin: 4px 0 4px 20px; padding: 0;">${a.distractors.map(d => `<li style="margin: 2px 0;">${escapeHtml(d)}</li>`).join('')}</ul></div>` : ''}
      ${a.brief ? `<div style="margin: 10px 0 0; padding: 8px 12px; background: rgba(245,158,11,0.1); border-radius: 4px; color: #b45309;"><strong>💡 速记:</strong> ${escapeHtml(a.brief).replace(/\n/g, '<br>')}</div>` : ''}
      ${a.tag ? `<div style="margin-top: 10px; font-size: 12px; opacity: 0.65; color: var(--text-2, #666);"># ${escapeHtml(a.tag)}</div>` : ''}
    </div>
  `;
}

function shouldShowAnalysis(q) {
  if (!q.analysis) return false;
  if (q.type === '简答题') {
    // 由 showEssayAnswer() 控制 essay-answer 的 show,analysis 在内部自动跟随
    return true;
  }
  // 其他题型:答完题后显示
  return progress[q.id] !== undefined;
}

function renderQuestion() {
  const card = document.getElementById('question-card');

  if (filteredIds.length === 0) {
    card.innerHTML = `
      <div class="empty-state">
        <div class="icon">_(._.)_</div>
        <p>${currentFilter === '错题' ? '还没有错题，继续加油！' : '该分类下没有题目'}</p>
      </div>
    `;
    updateProgress();
    return;
  }

  const q = getQuestionById(filteredIds[currentIndex]);
  if (!q) return;

  answered = progress[q.id] !== undefined;
  if (!answered && q.type === '多选题') multiSelected = new Set();

  let html = `
    <div class="q-header">
      <span class="q-number">#${q.id}</span>
      <span class="q-type">${q.type}</span>
      <span class="q-points">${q.points}分</span>
    </div>
    <div class="q-text">${escapeHtml(q.question)}</div>
  `;

  if (q.type === '单选题') {
    html += renderChoiceOptions(q);
  } else if (q.type === '多选题') {
    html += renderMultiOptions(q);
  } else if (q.type === '判断题') {
    html += renderJudgeButtons(q);
  } else if (q.type === '填空题') {
    html += renderBlanks(q);
  } else if (q.type === '简答题') {
    html += renderEssay(q);
  }

  // 解析:答完题后显示(简答在 essay-answer 内,其他在内容下方)
  if (q.type !== '简答题' && shouldShowAnalysis(q)) {
    html += renderAnalysis(q);
  }

  html += `<div class="feedback" id="feedback"></div>`;

  html += `
    <div class="actions">
      ${q.type === '简答题' ? `<button class="btn btn-primary" onclick="showEssayAnswer()">显示答案</button>` : ''}
      <button class="btn btn-secondary" onclick="prevQuestion()" ${currentIndex === 0 ? 'disabled' : ''}>上一题</button>
      <button class="btn btn-primary" id="next-btn" onclick="nextQuestion()">
        ${currentIndex < filteredIds.length - 1 ? '下一题' : '完成'}
      </button>
    </div>
  `;

  card.innerHTML = html;
  updateProgress();
  updateSidebar();
  highlightCurrentTile();

  // Restore answered state
  if (answered && q.type !== '简答题') {
    showFeedback(q);
  }
}

function renderChoiceOptions(q) {
  const state = progress[q.id];
  let html = '<div class="options">';

  q.options.forEach((opt, i) => {
    const letter = opt.charAt(0);
    const text = opt.substring(3);
    let cls = 'option';

    if (state !== undefined) {
      cls += ' disabled';
      if (letter === q.answer) cls += ' correct';
      if (state.userAnswer === letter && state.userAnswer !== q.answer) cls += ' wrong';
    }

    html += `
      <div class="${cls}" data-letter="${letter}" onclick="selectChoice('${letter}')">
        <span class="opt-letter">${letter}</span>
        <span class="opt-text">${escapeHtml(text)}</span>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

function renderMultiOptions(q) {
  const state = progress[q.id];
  const answerLetters = q.answer.replace(/\s/g, '').split('');
  let html = '<div class="options multi">';

  q.options.forEach(opt => {
    const letter = opt.charAt(0);
    const text = opt.substring(3);
    let cls = 'option';

    if (state !== undefined) {
      const picked = state.userAnswer || [];
      cls += ' disabled';
      if (answerLetters.includes(letter)) cls += ' correct';
      if (picked.includes(letter) && !answerLetters.includes(letter)) cls += ' wrong';
    } else if (multiSelected.has(letter)) {
      cls += ' selected';
    }

    html += `
      <div class="${cls}" data-letter="${letter}" onclick="toggleMulti('${letter}')">
        <span class="opt-letter">${letter}</span>
        <span class="opt-text">${escapeHtml(text)}</span>
      </div>
    `;
  });

  html += '</div>';

  if (state === undefined) {
    html += `<button class="btn btn-primary" style="margin-bottom:20px" onclick="submitMulti()">提交答案</button>`;
  }

  return html;
}

function renderJudgeButtons(q) {
  const state = progress[q.id];
  let html = '<div class="judge-btns">';

  ['对', '错'].forEach(label => {
    let cls = 'judge-btn';

    if (state !== undefined) {
      cls += ' disabled';
      if (label === q.answer) cls += ' selected-correct';
      if (state.userAnswer === label && state.userAnswer !== q.answer) cls += ' selected-wrong';
    }

    html += `<button class="${cls}" onclick="selectJudge('${label}')">${label}</button>`;
  });

  html += '</div>';
  return html;
}

function renderBlanks(q) {
  const state = progress[q.id];
  const blankCount = q.blanks ? q.blanks.length : (q.answer.match(/\(\d+\)/g) || []).length || 1;
  let html = '<div class="blanks">';

  for (let i = 0; i < blankCount; i++) {
    const userVal = state && state.userAnswer ? state.userAnswer[i] || '' : '';
    const correctVal = q.blanks && q.blanks[i] ? q.blanks[i] : '';
    let inputCls = 'blank-input';

    if (state !== undefined) {
      inputCls += ' disabled';
      // Simple match check
      const isCorrect = fuzzyMatch(userVal, correctVal);
      inputCls += isCorrect ? ' correct' : ' wrong';
    }

    html += `
      <div class="blank-row">
        <span class="blank-label">(${i + 1})</span>
        <div style="flex:1">
          <input type="text" class="${inputCls}" value="${escapeHtml(userVal)}"
                 data-index="${i}" placeholder="输入答案..." ${state !== undefined ? 'disabled' : ''}>
          ${state !== undefined ? `<div class="blank-answer show">正确答案: ${escapeHtml(correctVal)}</div>` : ''}
        </div>
      </div>
    `;
  }

  html += '</div>';

  if (state === undefined) {
    html += `<button class="btn btn-primary" style="margin-bottom:20px" onclick="submitBlanks()">提交答案</button>`;
  }

  return html;
}

function renderEssay(q) {
  const state = progress[q.id];
  let html = '<div class="essay-area">';

  html += `
    <textarea class="essay-textarea" placeholder="写下你的答案..." ${state !== undefined ? 'disabled' : ''}>${state && state.userAnswer ? state.userAnswer : ''}</textarea>
    <div class="essay-answer" id="essay-answer">
      <h4>// 参考答案</h4>
      <p>${escapeHtml(q.answer)}</p>
      ${q.analysis ? renderAnalysis(q) : ''}
    </div>
  </div>`;

  return html;
}

function showFeedback(q) {
  const fb = document.getElementById('feedback');
  if (!fb) return;

  const state = progress[q.id];
  if (!state) return;

  if (q.type === '单选题' || q.type === '判断题') {
    if (state.result === 'correct') {
      fb.className = 'feedback show correct';
      fb.innerHTML = '&#10003; 回答正确！';
    } else {
      fb.className = 'feedback show wrong';
      fb.innerHTML = `&#10007; 回答错误 — 正确答案: <strong>${q.answer}</strong>`;
    }
  } else if (q.type === '多选题') {
    const picked = (state.userAnswer || []).join('') || '（未选）';
    if (state.result === 'correct') {
      fb.className = 'feedback show correct';
      fb.innerHTML = `&#10003; 回答正确！(${picked})`;
    } else {
      fb.className = 'feedback show wrong';
      fb.innerHTML = `&#10007; 回答错误 — 你选了 <strong>${picked}</strong>,正确答案: <strong>${q.answer}</strong>`;
    }
  } else if (q.type === '填空题') {
    const allCorrect = state.userAnswer.every((ans, i) => fuzzyMatch(ans, q.blanks[i]));
    if (allCorrect) {
      fb.className = 'feedback show correct';
      fb.innerHTML = '&#10003; 全部正确！';
    } else {
      fb.className = 'feedback show wrong';
      fb.innerHTML = '&#10007; 部分回答有误，请查看下方正确答案';
    }
  }
}

// ============================================
// ANSWER HANDLING
// ============================================
function selectChoice(letter) {
  if (answered) return;
  const q = currentQuestion();
  if (!q || q.type !== '单选题') return;

  answered = true;
  const isCorrect = letter === q.answer;
  progress[q.id] = { userAnswer: letter, result: isCorrect ? 'correct' : 'wrong' };
  saveProgress();
  renderQuestion();
}

function toggleMulti(letter) {
  if (answered) return;
  const q = currentQuestion();
  if (!q || q.type !== '多选题') return;
  if (!q.options.some(opt => opt.charAt(0) === letter)) return;

  if (multiSelected.has(letter)) multiSelected.delete(letter);
  else multiSelected.add(letter);

  const el = document.querySelector(`.option[data-letter="${letter}"]`);
  if (el) el.classList.toggle('selected', multiSelected.has(letter));
}

function submitMulti() {
  const q = currentQuestion();
  if (!q || q.type !== '多选题' || answered) return;

  const picked = [...multiSelected].sort().join('');
  const isCorrect = picked === q.answer.replace(/\s/g, '');
  answered = true;
  progress[q.id] = { userAnswer: picked.split(''), result: isCorrect ? 'correct' : 'wrong' };
  saveProgress();
  renderQuestion();
}

function selectJudge(label) {
  if (answered) return;
  const q = currentQuestion();
  if (!q || q.type !== '判断题') return;

  answered = true;
  const isCorrect = label === q.answer;
  progress[q.id] = { userAnswer: label, result: isCorrect ? 'correct' : 'wrong' };
  saveProgress();
  renderQuestion();
}

function submitBlanks() {
  const q = currentQuestion();
  if (!q || q.type !== '填空题') return;

  const inputs = document.querySelectorAll('.blank-input');
  const answers = [];
  inputs.forEach(inp => answers.push(inp.value.trim()));

  answered = true;
  progress[q.id] = { userAnswer: answers };
  saveProgress();
  renderQuestion();
}

function showEssayAnswer() {
  const el = document.getElementById('essay-answer');
  if (el) {
    el.classList.toggle('show');
  }

  const q = currentQuestion();
  if (q && !progress[q.id]) {
    const textarea = document.querySelector('.essay-textarea');
    progress[q.id] = { userAnswer: textarea ? textarea.value : '', result: 'essay' };
    saveProgress();
    updateSidebar();
  }
}

// ============================================
// NAVIGATION
// ============================================
function nextQuestion() {
  if (currentIndex < filteredIds.length - 1) {
    currentIndex++;
    answered = progress[filteredIds[currentIndex]] !== undefined;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    answered = progress[filteredIds[currentIndex]] !== undefined;
    renderQuestion();
  }
}

function goToQuestion(id) {
  const idx = filteredIds.indexOf(id);
  if (idx >= 0) {
    currentIndex = idx;
    answered = progress[filteredIds[currentIndex]] !== undefined;
    renderQuestion();
  }
}

// ============================================
// UTILITIES
// ============================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function fuzzyMatch(userAns, correctAns) {
  if (!userAns || !correctAns) return false;
  const normalize = s => s.replace(/[\s,，。、;；:：()（）\[\]【】""'']/g, '').toLowerCase();
  return normalize(userAns) === normalize(correctAns);
}

function updateProgress() {
  const total = filteredIds.length;
  const done = filteredIds.filter(id => progress[id] !== undefined).length;
  const pct = total > 0 ? Math.round((currentIndex + 1) / total * 100) : 0;
  const donePct = total > 0 ? Math.round(done / total * 100) : 0;

  document.getElementById('progress-text').textContent = `第 ${currentIndex + 1} 题 / ${total}`;
  document.getElementById('progress-pct').textContent = `${donePct}% 已做`;
  document.getElementById('progress-fill').style.width = `${donePct}%`;
}

function updateSidebar() {
  // Counts
  document.getElementById('count-all').textContent = questions.length;
  cfg.types.forEach(type => {
    const el = document.getElementById('count-' + type);
    if (el) el.textContent = questions.filter(q => q.type === type).length;
  });
  document.getElementById('count-wrong').textContent =
    questions.filter(q => progress[q.id]?.result === 'wrong').length;

  // Stats
  const answeredIds = Object.keys(progress).map(Number);
  const correctCount = answeredIds.filter(id => progress[id].result === 'correct').length;
  const wrongCount = answeredIds.filter(id => progress[id].result === 'wrong').length;
  const totalDone = correctCount + wrongCount;
  const rate = totalDone > 0 ? Math.round(correctCount / totalDone * 100) : 0;

  document.getElementById('stat-done').textContent = `${answeredIds.length} / ${questions.length}`;
  document.getElementById('stat-correct').textContent = correctCount;
  document.getElementById('stat-wrong').textContent = wrongCount;
  document.getElementById('stat-rate').textContent = totalDone > 0 ? `${rate}%` : '--%';

  // Active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });

  // Answer sheet
  updateSheet();
}

function resetProgress() {
  if (confirm(`确定要重置「${cfg.name}」的做题进度吗？此操作不可撤销。`)) {
    progress = {};
    saveProgress();
    answered = false;
    renderQuestion();
    updateSidebar();
  }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const q = currentQuestion();
  if (e.key >= '1' && e.key <= '9' && q && !answered) {
    const idx = parseInt(e.key, 10) - 1;
    if (q.type === '单选题' && q.options[idx]) {
      selectChoice(q.options[idx].charAt(0));
    } else if (q.type === '多选题' && q.options[idx]) {
      toggleMulti(q.options[idx].charAt(0));
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (q && !answered && q.type === '填空题') {
      submitBlanks();
    } else if (q && !answered && q.type === '多选题') {
      submitMulti();
    } else {
      nextQuestion();
    }
  } else if (e.key === ' ' && q && q.type === '简答题') {
    e.preventDefault();
    showEssayAnswer();
  } else if (e.key === 'ArrowLeft') {
    prevQuestion();
  } else if (e.key === 'ArrowRight') {
    nextQuestion();
  }
});

// ============================================
// SIDEBAR FILTER CLICKS
// ============================================
function wireFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });
}

// ============================================
// SIDEBAR TOGGLE
// ============================================
function setSidebarState(side, state) {
  const key = 'sidebar' + side[0].toUpperCase() + side.slice(1);
  document.body.dataset[key] = state;
  localStorage.setItem('sidebar-' + side, state);
}

function initSidebarToggle() {
  ['left', 'right'].forEach(side => {
    const btn = document.getElementById('side-toggle-' + side);
    if (!btn) return;
    const saved = localStorage.getItem('sidebar-' + side) ||
                  (side === 'right' ? 'closed' : 'open');
    setSidebarState(side, saved);
    btn.addEventListener('click', () => {
      const cur = document.body.dataset['sidebar' + side[0].toUpperCase() + side.slice(1)];
      setSidebarState(side, cur === 'open' ? 'closed' : 'open');
    });
  });
}

// ============================================
// ANSWER SHEET
// ============================================
function renderAnswerSheet() {
  const grid = document.getElementById('sheet-grid');
  if (!grid) return;

  // Group questions by type
  const groups = {};
  questions.forEach(q => {
    if (!groups[q.type]) groups[q.type] = [];
    groups[q.type].push(q);
  });

  let html = '';
  cfg.types.forEach(type => {
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

// ============================================
// BOOT
// ============================================
(function boot() {
  const missing = [];
  if (!window.QUIZ_SUBJECT) missing.push('config.js (window.QUIZ_SUBJECT)');
  if (!window.QUIZ_QUESTIONS) missing.push('questions.js (window.QUIZ_QUESTIONS)');
  if (missing.length) {
    document.body.innerHTML =
      `<div style="font-family: system-ui, sans-serif; padding: 48px; color: #b91c1c;">
         题库加载失败:缺少 ${missing.join('、')}。请检查本目录文件是否完整。
       </div>`;
    return;
  }

  migrateLegacyProgress();
  progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  buildShell();
  initSidebarToggle();
  wireFilterButtons();
  renderAnswerSheet();
  updateSidebar();
  renderQuestion();
})();
