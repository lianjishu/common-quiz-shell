const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { createMenu } = require('./menu');
const { loadWindowState, saveWindowState } = require('./window-state');

// Dev-only: 热重载。生产构建不会带这段（electron-builder 默认剔除 devDependencies）。
if (process.env.NODE_ENV !== 'production' && !process.env.ELECTRON_DISABLE_RELOAD) {
  try {
    require('electron-reload')(
      [
        path.join(__dirname, 'index.js'),
        path.join(__dirname, 'preload.js'),
        path.join(__dirname, 'menu.js'),
        path.join(__dirname, 'window-state.js'),
        path.join(__dirname, '..', 'renderer'),
        path.join(__dirname, '..', 'assets')
      ],
      {
        awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 },
        ignored: [/node_modules/, /\.git/, /dist/, /\.log$/, /window-state\.json$/]
      }
    );
  } catch (e) {
    console.warn('[dev] electron-reload skipped:', e.message);
  }
}

const isDev = !app.isPackaged;
const log = require('electron-log');
log.transports.file.level = 'info';
log.initialize();

let autoUpdater = null;
if (!isDev) {
  const updater = require('electron-updater');
  autoUpdater = updater.autoUpdater;
  autoUpdater.logger = log;
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
}

let mainWindow;

function checkUpdateWithDialog(win) {
  if (!autoUpdater) {
    dialog.showMessageBox(win, { type: 'info', title: '检查更新', message: '开发模式下不支持检查更新' });
    return;
  }
  dialog.showMessageBox(win, { type: 'info', title: '检查更新', message: '正在检查更新…' });
  autoUpdater.checkForUpdates().then((result) => {
    if (result && result.updateInfo) {
      const v = result.updateInfo.version;
      dialog.showMessageBox(win, {
        type: 'info', title: '发现新版本',
        message: `发现新版本 v${v}`,
        detail: '是否立即下载并安装？',
        buttons: ['下载', '稍后再说'],
        defaultId: 0, cancelId: 1
      }).then(({ response }) => {
        if (response === 0) autoUpdater.downloadUpdate();
      });
    } else {
      dialog.showMessageBox(win, { type: 'info', title: '检查更新', message: '当前已是最新版本' });
    }
  }).catch(() => {
    dialog.showMessageBox(win, { type: 'info', title: '检查更新', message: '当前已是最新版本' });
  });
}

function createWindow() {
  const state = loadWindowState();
  mainWindow = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 900,
    minHeight: 600,
    title: '计组练习',
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  if (state.isMaximized) mainWindow.maximize();

  mainWindow.webContents.setZoomFactor(1);

  mainWindow.on('close', () => saveWindowState(mainWindow));
  mainWindow.on('closed', () => { mainWindow = null; });
  createMenu(mainWindow, checkUpdateWithDialog);

  if (autoUpdater) {
    mainWindow.webContents.once('did-finish-load', () => {
      registerUpdaterIPC();
      autoUpdater.checkForUpdates().then((result) => {
        if (result && result.updateInfo) {
          const v = result.updateInfo.version;
          dialog.showMessageBox(mainWindow, {
            type: 'info', title: '发现新版本',
            message: `发现新版本 v${v}`,
            detail: '是否立即下载并安装？',
            buttons: ['下载', '稍后再说'],
            defaultId: 0, cancelId: 1
          }).then(({ response }) => {
            if (response === 0) autoUpdater.downloadUpdate();
          });
        }
      }).catch((e) => log.warn('checkForUpdates failed', e));
    });
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload);
  }
}

function registerUpdaterIPC() {
  ipcMain.on('updater:check',    () => autoUpdater.checkForUpdates());
  ipcMain.on('updater:download', () => autoUpdater.downloadUpdate());
  ipcMain.on('updater:install',  () => autoUpdater.quitAndInstall());

  autoUpdater.on('checking-for-update',  () => sendToRenderer('updater:status', { state: 'checking' }));
  autoUpdater.on('update-available',     (info) => sendToRenderer('updater:status', { state: 'available', info }));
  autoUpdater.on('update-not-available', (info) => sendToRenderer('updater:status', { state: 'up-to-date', info }));
  autoUpdater.on('download-progress',    (p)    => sendToRenderer('updater:status', { state: 'downloading', progress: p }));
  autoUpdater.on('update-downloaded',    (info) => sendToRenderer('updater:status', { state: 'downloaded', info }));
  autoUpdater.on('error',                (err)  => sendToRenderer('updater:status', { state: 'error', message: err && err.toString() }));
}