const { Menu, app, shell } = require('electron');

function createMenu(win) {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }
      ]
    },
    {
      label: 'Theme',
      submenu: [
        { label: '极光紫',       click: () => win.webContents.send('switch-theme', 'default') },
        { label: '极简线性',     click: () => win.webContents.send('switch-theme', 'style1') },
        { label: '新粗野线条',   click: () => win.webContents.send('switch-theme', 'style2') },
        { label: '手绘线稿',     click: () => win.webContents.send('switch-theme', 'style3') },
        { label: '细线极简留白', click: () => win.webContents.send('switch-theme', 'style4') }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About', click: () => {
          shell.openExternal('https://gitee.com/yake2024/computer-organization-quiz');
        }}
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = { createMenu };
