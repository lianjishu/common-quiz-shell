const { contextBridge, ipcRenderer } = require('electron');

const VALID_STATES = new Set(['checking', 'available', 'up-to-date', 'downloading', 'downloaded', 'error']);

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