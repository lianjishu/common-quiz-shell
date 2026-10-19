const { contextBridge, ipcRenderer, webFrame } = require('electron');

const VALID_STATES = new Set(['checking', 'available', 'up-to-date', 'downloading', 'downloaded', 'error', 'reset']);

// Ctrl+滚轮缩放
window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const current = webFrame.getZoomFactor();
      webFrame.setZoomFactor(Math.min(3, Math.max(0.5, current + delta)));
    }
  }, { passive: false });
});

contextBridge.exposeInMainWorld('electronAPI', {
  onSwitchTheme: (callback) => ipcRenderer.on('switch-theme', (_, key) => callback(key)),

  checkForUpdates: () => ipcRenderer.send('updater:check'),
  downloadUpdate:  () => ipcRenderer.send('updater:download'),
  quitAndInstall:  () => ipcRenderer.send('updater:install'),
  onUpdaterStatus: (callback) => {
    const handler = (_e, payload) => {
      if (payload && VALID_STATES.has(payload.state)) callback(payload);
    };
    ipcRenderer.on('updater:status', handler);
    return () => ipcRenderer.removeListener('updater:status', handler);
  }
});