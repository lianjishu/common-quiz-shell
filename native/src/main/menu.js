const { Menu, app, shell } = require('electron');

function createMenu(win, onCheckUpdate) {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: '文件',
      submenu: [
        isMac ? { role: 'close', label: '关闭' } : { role: 'quit', label: '退出' }
      ]
    },
    {
      label: '主题',
      submenu: [
        { label: '极光紫',       click: () => win.webContents.send('switch-theme', 'default') },
        { label: '极简线性',     click: () => win.webContents.send('switch-theme', 'style1') },
        { label: '新粗野线条',   click: () => win.webContents.send('switch-theme', 'style2') },
        { label: '手绘线稿',     click: () => win.webContents.send('switch-theme', 'style3') },
        { label: '细线极简留白', click: () => win.webContents.send('switch-theme', 'style4') }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '重新加载' }, { role: 'forceReload', label: '强制重新加载' }, { role: 'toggleDevTools', label: '开发者工具' },
        { type: 'separator' },
        { role: 'resetZoom', label: '重置缩放' },
        { label: '放大', accelerator: 'CmdOrCtrl+=', click: () => { const f = win.webContents.getZoomFactor(); win.webContents.setZoomFactor(Math.min(3, f + 0.1)); } },
        { label: '缩小', accelerator: 'CmdOrCtrl+-', click: () => { const f = win.webContents.getZoomFactor(); win.webContents.setZoomFactor(Math.max(0.5, f - 0.1)); } },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        ...(onCheckUpdate ? [{ label: '检查更新', click: () => onCheckUpdate(win) }] : []),
        { label: '关于', click: () => {
          shell.openExternal('https://gitee.com/yake2024/computer-organization-quiz');
        }}
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = { createMenu };
