// ============================================
// THEME SWITCHER
// ============================================
const THEMES = [
  { key: 'default', name: '极光紫',        file: 'theme-default.css' },
  { key: 'style1',  name: '极简线性',      file: 'theme-style1.css' },
  { key: 'style2',  name: '新粗野线条',    file: 'theme-style2.css' },
  { key: 'style3',  name: '手绘线稿',      file: 'theme-style3.css' },
  { key: 'style4',  name: '细线极简留白',  file: 'theme-style4.css' },
];
const KEY_THEME = 'quiz-theme';

function applyTheme(key) {
  const theme = THEMES.find(t => t.key === key);
  if (!theme) return;
  const link = document.getElementById('theme-link');
  if (link) link.href = theme.file + '?v=' + Date.now();
  document.getElementById('theme-label').textContent = theme.name;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === key);
  });
  localStorage.setItem(KEY_THEME, key);
}

function renderThemeOptions() {
  const popover = document.getElementById('theme-popover');
  popover.innerHTML = THEMES.map(t => `
    <button class="theme-option" data-theme="${t.key}" role="menuitem" type="button">
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
  const saved = localStorage.getItem(KEY_THEME) || 'style4';
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

initTheme();
