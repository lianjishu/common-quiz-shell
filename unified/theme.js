// ============================================
// THEME SWITCHER
// ============================================
const THEMES = [
  { key: 'default', name: '原版',          swatch: '#7C3AED' },
  { key: 'style1',  name: '极简线性',      swatch: '#2563EB' },
  { key: 'style2',  name: '新粗野线条',    swatch: '#FFE066' },
  { key: 'style3',  name: '手绘线稿',      swatch: '#D97706' },
  { key: 'style4',  name: '细线极简留白',  swatch: '#0F766E' },
];
const KEY_THEME = 'quiz-theme';

function applyTheme(key) {
  const theme = THEMES.find(t => t.key === key);
  if (!theme) return;
  document.body.dataset.theme = key;
  document.getElementById('theme-label').textContent = theme.name;
  document.getElementById('theme-dot').style.background = theme.swatch;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === key);
  });
  localStorage.setItem(KEY_THEME, key);
}

function renderThemeOptions() {
  const popover = document.getElementById('theme-popover');
  popover.innerHTML = THEMES.map(t => `
    <button class="theme-option" data-theme="${t.key}" role="menuitem" type="button">
      <span class="opt-swatch" style="background:${t.swatch}"></span>
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
  const saved = localStorage.getItem(KEY_THEME) || 'default';
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
