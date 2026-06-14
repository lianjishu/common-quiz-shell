// ============================================
// THEME SWITCHER
// ============================================
const THEMES = [
  { key: 'default', name: '极光紫' },
  { key: 'style1',  name: '极简线性' },
  { key: 'style2',  name: '新粗野线条' },
  { key: 'style3',  name: '手绘线稿' },
  { key: 'style4',  name: '细线极简留白' },
];
const KEY_THEME = 'quiz-theme';

function applyTheme(key) {
  const theme = THEMES.find(t => t.key === key);
  if (!theme) return;
  // Enable/disable theme CSS files via media attribute
  THEMES.forEach(t => {
    const link = document.getElementById('theme-' + t.key);
    if (link) {
      if (t.key === key) {
        link.removeAttribute('media');
        link.rel = 'stylesheet';
      } else {
        link.media = 'none';
        link.rel = 'alternate stylesheet';
      }
    }
  });
  // Update switcher UI
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
