// ============================================
// STATE
// ============================================
const questions = MARKDOWN_DATA;
let currentFilter = '全部';
let filteredIds = questions.map(q => q.id);
let currentIndex = 0;
let shuffled = false;
let answered = false;

// Progress from localStorage
let progress = JSON.parse(localStorage.getItem('quiz-progress') || '{}');

function saveProgress() {
  localStorage.setItem('quiz-progress', JSON.stringify(progress));
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
    filteredIds = questions.filter(q => progress[q.id] === 'wrong').map(q => q.id);
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
// ============================================
function renderAnalysis(q) {
  if (!q.analysis) return '';
  const a = q.analysis;
  // inline 样式:跨 5 主题通用,颜色用 --text 系变量
  return `
    <div class="analysis" style="margin-top: 12px; padding: 14px 16px; background: rgba(37,99,235,0.05); border-left: 3px solid #2563EB; border-radius: 6px; font-size: 14px; line-height: 1.7; color: var(--text, #222);">
      <h4 style="color: #2563EB; font-size: 13px; margin: 0 0 10px 0; font-weight: 600; letter-spacing: 0.5px;">// 解析</h4>
      ${a.keypoints ? `<div style="margin: 8px 0;"><strong style="color:#2563EB">📋 采分点:</strong><br>${escapeHtml(a.keypoints).replace(/\n/g, '<br>')}</div>` : ''}
      <div class="analysis-detail">${escapeHtml(a.detail || '').replace(/\n/g, '<br>')}</div>
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
  // 单选/填空/判断:答完题后显示
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
    } else if (state === undefined) {
      // not answered yet
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
  const q = getQuestionById(filteredIds[currentIndex]);
  if (!q || q.type !== '单选题') return;

  answered = true;
  const isCorrect = letter === q.answer;
  progress[q.id] = { userAnswer: letter, result: isCorrect ? 'correct' : 'wrong' };
  saveProgress();
  renderQuestion();
}

function selectJudge(label) {
  if (answered) return;
  const q = getQuestionById(filteredIds[currentIndex]);
  if (!q || q.type !== '判断题') return;

  answered = true;
  const isCorrect = label === q.answer;
  progress[q.id] = { userAnswer: label, result: isCorrect ? 'correct' : 'wrong' };
  saveProgress();
  renderQuestion();
}

function submitBlanks() {
  const q = getQuestionById(filteredIds[currentIndex]);
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

  const q = getQuestionById(filteredIds[currentIndex]);
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
  document.getElementById('count-单选题').textContent = questions.filter(q => q.type === '单选题').length;
  document.getElementById('count-填空题').textContent = questions.filter(q => q.type === '填空题').length;
  document.getElementById('count-判断题').textContent = questions.filter(q => q.type === '判断题').length;
  document.getElementById('count-简答题').textContent = questions.filter(q => q.type === '简答题').length;
  document.getElementById('count-wrong').textContent = questions.filter(q => progress[q.id] === 'wrong').length;

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
  if (confirm('确定要重置所有做题进度吗？此操作不可撤销。')) {
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

  const q = filteredIds.length > 0 ? getQuestionById(filteredIds[currentIndex]) : null;

  if (e.key >= '1' && e.key <= '4' && q && q.type === '单选题' && !answered) {
    const letters = ['A', 'B', 'C', 'D'];
    selectChoice(letters[parseInt(e.key) - 1]);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (q && q.type === '填空题' && !answered) {
      submitBlanks();
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
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});

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

// Chip filter
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


// ============================================
// INIT
// ============================================
initSidebarToggle();
renderAnswerSheet();
updateSidebar();
renderQuestion();
