const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onSwitchTheme: (callback) => ipcRenderer.on('switch-theme', (_, key) => callback(key))
});
