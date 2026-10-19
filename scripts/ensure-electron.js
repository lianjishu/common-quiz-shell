// 兜底：electron 包的 postinstall 在某些环境（网络抖动、缓存污染、
// ELECTRON_SKIP_BINARY_DOWNLOAD=1 等）会静默跳过二进制下载，导致
// `node_modules/electron/dist/electron[.exe]` 缺失、`npm run dev` 报
// "Electron failed to install correctly"。这里在所有依赖装完之后再
// 检测一次，缺了就手动跑 install.js 重新下载。
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const distDir = path.join(__dirname, '..', 'node_modules', 'electron', 'dist');
const binaryName = process.platform === 'win32' ? 'electron.exe' : 'electron';
const binaryPath = path.join(distDir, binaryName);

if (fs.existsSync(binaryPath)) {
  console.log('[ensure-electron] binary present, skip');
  process.exit(0);
}

console.log('[ensure-electron] electron binary missing, running install.js ...');
try {
  execFileSync(process.execPath, [path.join('node_modules', 'electron', 'install.js')], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('[ensure-electron] install.js finished');
} catch (e) {
  // 兜底失败不阻塞整个 npm install —— 用户可能只需要打包/发布
  console.warn('[ensure-electron] install.js failed:', e.message);
  console.warn('[ensure-electron] `npm run dev` 仍会失败；修复：');
  console.warn('  rm -rf node_modules/electron && npm install');
  console.warn('  或设镜像：npm config set electron_mirror https://npmmirror.com/mirrors/electron/');
}
