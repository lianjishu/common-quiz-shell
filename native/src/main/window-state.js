const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const DEFAULTS = { width: 1280, height: 800, x: undefined, y: undefined };
const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    return Object.assign({}, DEFAULTS, JSON.parse(fs.readFileSync(stateFile(), 'utf-8')));
  } catch (e) {
    return DEFAULTS;
  }
}

function saveWindowState(win) {
  if (!win || win.isDestroyed()) return;
  const b = win.getBounds();
  try {
    fs.writeFileSync(stateFile(), JSON.stringify(b, null, 2));
  } catch (e) {}
}

module.exports = { loadWindowState, saveWindowState };
