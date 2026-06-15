(function attachUpdater() {
  if (!window.electronAPI || !window.electronAPI.onUpdaterStatus) return;

  const STYLE_ID = 'updater-toast-styles';
  if (!document.getElementById(STYLE_ID)) {
    const css = document.createElement('style');
    css.id = STYLE_ID;
    css.textContent = `
      .updater-toast {
        position: fixed; left: 50%; bottom: 32px;
        transform: translateX(-50%) translateY(20px);
        background: rgba(28,25,23,0.95);
        color: #fafaf9;
        padding: 14px 22px;
        border-radius: 10px;
        font-size: 14px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
        box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.25s ease, transform 0.25s ease;
        display: flex; align-items: center; gap: 14px;
        max-width: 480px;
      }
      .updater-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .updater-toast .updater-text { line-height: 1.4; }
      .updater-toast .updater-action {
        background: transparent;
        border: 1px solid rgba(250,250,249,0.4);
        color: #fafaf9;
        padding: 4px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-family: inherit;
        transition: background 0.15s, border-color 0.15s;
      }
      .updater-toast .updater-action:hover {
        background: rgba(250,250,249,0.12);
        border-color: rgba(250,250,249,0.7);
      }
      .updater-toast .updater-dismiss {
        background: transparent; border: none; color: rgba(250,250,249,0.6);
        cursor: pointer; padding: 0 4px; font-size: 16px; line-height: 1;
      }
      .updater-toast .updater-dismiss:hover { color: #fafaf9; }
      .updater-progress {
        position: fixed; left: 50%; bottom: 32px; transform: translateX(-50%);
        width: 320px; height: 4px; background: rgba(28,25,23,0.1);
        border-radius: 2px; overflow: hidden; z-index: 9998;
        opacity: 0; transition: opacity 0.2s;
      }
      .updater-progress.show { opacity: 1; }
      .updater-progress-bar {
        height: 100%; background: #0ea5e9;
        width: 0%; transition: width 0.15s ease;
      }
    `;
    document.head.appendChild(css);
  }

  let currentToast = null;
  let currentToastState = null;
  let progressEl = null;

  function dismissToast() {
    if (currentToast) {
      currentToast.classList.remove('show');
      const t = currentToast;
      setTimeout(() => t.remove(), 300);
      currentToast = null;
      currentToastState = null;
    }
  }

  function showUpdaterToast(text, opts = {}) {
    dismissToast();
    const toast = document.createElement('div');
    toast.className = 'updater-toast';
    const textEl = document.createElement('span');
    textEl.className = 'updater-text';
    textEl.textContent = text;
    toast.appendChild(textEl);
    if (opts.action) {
      const btn = document.createElement('button');
      btn.className = 'updater-action';
      btn.textContent = opts.action;
      btn.addEventListener('click', () => {
        if (typeof opts.onAction === 'function') opts.onAction();
        dismissToast();
      });
      toast.appendChild(btn);
    }
    if (opts.dismissible !== false) {
      const close = document.createElement('button');
      close.className = 'updater-dismiss';
      close.textContent = '×';
      close.setAttribute('aria-label', '关闭');
      close.addEventListener('click', dismissToast);
      toast.appendChild(close);
    }
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    currentToast = toast;
    currentToastState = opts.state || null;
  }

  function setProgress(percent) {
    if (!progressEl) {
      progressEl = document.createElement('div');
      progressEl.className = 'updater-progress';
      const bar = document.createElement('div');
      bar.className = 'updater-progress-bar';
      progressEl.appendChild(bar);
      progressEl._bar = bar;
      document.body.appendChild(progressEl);
    }
    progressEl._bar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    progressEl.classList.add('show');
  }

  function hideProgress() {
    if (progressEl) {
      progressEl.classList.remove('show');
      const p = progressEl;
      setTimeout(() => { if (progressEl === p) { p.remove(); progressEl = null; } }, 300);
    }
  }

  window.electronAPI.onUpdaterStatus((p) => {
    switch (p.state) {
      case 'available':
        showUpdaterToast(`发现新版本 v${p.info.version}，是否下载？`, {
          state: 'available',
          action: '下载',
          onAction: () => window.electronAPI.downloadUpdate()
        });
        break;
      case 'downloading':
        hideProgress();
        showUpdaterToast(`正在下载更新… ${Math.round(p.progress.percent)}%`, { state: 'downloading' });
        break;
      case 'downloaded':
        hideProgress();
        showUpdaterToast(`新版本 v${p.info.version} 已下载完成，重启后生效`, {
          state: 'downloaded',
          action: '立即重启',
          onAction: () => window.electronAPI.quitAndInstall()
        });
        break;
      case 'reset':
        // 菜单检查启动时,主进程要求 renderer 收掉 'available' 残留 toast。
        // 不会误伤 downloading/downloaded,这两类有用户需要看的进度/操作。
        if (currentToastState === 'available') {
          dismissToast();
          hideProgress();
        }
        break;
      case 'up-to-date':
        dismissToast();
        hideProgress();
        break;
      case 'error':
        hideProgress();
        // auto-check 在未发布 release 时返回 404，是预期的"暂无更新"场景。
        // 不打扰用户，错误留 console + electron-log 供排查。
        console.warn('[updater auto-check]', p.message);
        break;
      case 'checking':
        break;
    }
  });

  setTimeout(() => window.electronAPI.checkForUpdates(), 5000);
})();