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
        // 外壳与题库都在仓库根 —— 桌面版与 Web 版共用同一份,不存在副本
        path.join(__dirname, '..', '..', 'index.html'),
        path.join(__dirname, '..', '..', 'shared'),
        path.join(__dirname, '..', '..', 'subjects'),
        path.join(__dirname, '..', '..', 'assets')
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
let menuCheckInProgress = false;

function isNewerVersion(remote, local) {
  if (!remote || !local) return false;
  const toParts = v => String(v).replace(/^v/i, '').split('.').map(s => parseInt(s, 10) || 0);
  const r = toParts(remote);
  const l = toParts(local);
  for (let i = 0; i < Math.max(r.length, l.length); i++) {
    if ((r[i] || 0) > (l[i] || 0)) return true;
    if ((r[i] || 0) < (l[i] || 0)) return false;
  }
  return false;
}

function runUpdateCheck(win, { silent = true } = {}) {
  if (!autoUpdater) {
    if (!silent) {
      dialog.showMessageBox(win, { type: 'info', title: '检查更新', message: '开发模式下不支持检查更新' });
    }
    return;
  }

  let giteeVersion = null;
  const onNotAvailable = (info) => { giteeVersion = info && info.version; };
  autoUpdater.on('update-not-available', onNotAvailable);
  const cleanup = () => autoUpdater.off('update-not-available', onNotAvailable);

  if (!silent) {
    sendToRenderer('updater:status', { state: 'reset' });
    menuCheckInProgress = true;
  }
  autoUpdater.checkForUpdates()
    .then((result) => {
      cleanup();
      const localV = app.getVersion();
      if (result && result.updateInfo) {
        const v = result.updateInfo.version;
        if (isNewerVersion(v, localV)) {
          return dialog.showMessageBox(win, {
            type: 'info', title: '发现新版本',
            message: `发现新版本 v${v}`,
            detail: `当前版本: v${localV}\n是否立即下载并安装？`,
            buttons: ['下载', '稍后再说'],
            defaultId: 0, cancelId: 1
          }).then(({ response }) => {
            if (response === 0) autoUpdater.downloadUpdate();
          });
        }
        log.info(`up-to-date: local=${localV} gitee=${v} (electron-updater 误报,已自检纠正)`);
      } else {
        log.info(`up-to-date: local=${localV} gitee=${giteeVersion || 'unknown'}`);
      }
      if (silent) return;
      const giteeV = (result && result.updateInfo && result.updateInfo.version) || giteeVersion || '未知';
      return dialog.showMessageBox(win, {
        type: 'info', title: '检查更新',
        message: '当前已是最新版本',
        detail: `当前版本: v${localV}\nGitee 最新版本: v${giteeV}`
      });
    })
    .catch((err) => {
      cleanup();
      log.error('checkForUpdates failed:', err);
      if (silent) return;
      dialog.showMessageBox(win, {
        type: 'error', title: '检查更新失败',
        message: '检查更新失败',
        detail: err ? String(err) : '未知错误，请稍后重试或检查网络'
      });
    })
    .finally(() => {
      menuCheckInProgress = false;
    });
}

function checkUpdateWithDialog(win) {
  runUpdateCheck(win, { silent: false });
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
    title: '复习题库',
    icon: path.join(__dirname, '..', '..', 'assets', 'icon.png'),
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', '..', 'index.html'));

  mainWindow.webContents.setZoomFactor(1);

  mainWindow.on('close', () => saveWindowState(mainWindow));
  mainWindow.on('closed', () => { mainWindow = null; });
  createMenu(mainWindow, checkUpdateWithDialog);

  if (autoUpdater) {
    mainWindow.webContents.once('did-finish-load', () => {
      registerUpdaterIPC();
      runUpdateCheck(mainWindow, { silent: true });
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
  autoUpdater.on('update-available',     (info) => {
    if (menuCheckInProgress) return;
    if (!isNewerVersion(info.version, app.getVersion())) return;
    sendToRenderer('updater:status', { state: 'available', info });
  });
  autoUpdater.on('update-not-available', (info) => sendToRenderer('updater:status', { state: 'up-to-date', info }));
  autoUpdater.on('download-progress',    (p)    => sendToRenderer('updater:status', { state: 'downloading', progress: p }));
  autoUpdater.on('update-downloaded',    (info) => sendToRenderer('updater:status', { state: 'downloaded', info }));
  autoUpdater.on('error',                (err)  => sendToRenderer('updater:status', { state: 'error', message: err && err.toString() }));
}