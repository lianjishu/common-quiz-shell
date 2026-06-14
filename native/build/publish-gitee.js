#!/usr/bin/env node
/**
 * Gitee 自动发布脚本
 *
 * 流程：
 *   1. 调用 electron-builder 构建 Windows 安装包（不动 publish）
 *   2. 找到或创建 tag="latest" 的 Gitee Release
 *   3. 清空 Release 现有附件（避免重复堆积）
 *   4. 上传 dist/latest*.yml + dist/*.exe + dist/*.exe.blockmap 到该 Release
 *
 * 用法：
 *   GITEE_TOKEN=xxx npm run release
 *
 * 环境变量：
 *   GITEE_TOKEN  必填，Gitee 私人令牌（需要 projects 权限）
 *
 * 可选环境变量：
 *   SKIP_BUILD=1   跳过构建，直接上传现有 dist/ 内容（用于重传）
 *   TAG=stable     自定义 release tag（默认 "latest"）
 *   REPO_OWNER     Gitee 用户名（默认从 package.json 读）
 *   REPO_NAME      仓库名（默认从 package.json 读）
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const pkg = require('../package.json');
const TOKEN = process.env.GITEE_TOKEN;
const OWNER = process.env.REPO_OWNER || 'yake2024';
const REPO  = process.env.REPO_NAME  || pkg.name;
const TAG   = process.env.TAG || 'latest';
const DIST  = path.join(__dirname, '..', 'dist');
const SKIP_BUILD = process.env.SKIP_BUILD === '1';

if (!TOKEN) {
  console.error('\n❌ 缺少 GITEE_TOKEN 环境变量');
  console.error('   获取方式：Gitee → 设置 → 私人令牌 → 生成新令牌（projects 权限）');
  console.error('   用法：GITEE_TOKEN=xxx npm run release\n');
  process.exit(1);
}

function api(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      host: 'gitee.com', port: 443, method, path: urlPath,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'electron-publish-gitee/1.0',
        ...(data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, (res) => {
      let chunks = '';
      res.on('data', c => chunks += c);
      res.on('end', () => {
        try {
          const json = chunks ? JSON.parse(chunks) : {};
          if (res.statusCode >= 400) {
            reject(new Error(`API ${method} ${urlPath} → ${res.statusCode}: ${json.message || chunks.slice(0, 200)}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(new Error(`API ${method} ${urlPath} 响应解析失败: ${chunks.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function uploadAttachment(releaseId, filePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const boundary = '----WebKitFormBoundary' + crypto.randomBytes(16).toString('hex');

    const head = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${encodeURIComponent(fileName)}"\r\n` +
      `Content-Type: application/octet-stream\r\n\r\n`
    );
    const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([head, fileBuffer, tail]);

    const urlPath = `/api/v5/repos/${OWNER}/${REPO}/releases/${releaseId}/attach_files`;
    const req = https.request({
      host: 'gitee.com', port: 443, method: 'POST', path: urlPath,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'electron-publish-gitee/1.0',
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    }, (res) => {
      let chunks = '';
      res.on('data', c => chunks += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(chunks);
          if (res.statusCode >= 400) {
            reject(new Error(`上传 ${fileName} 失败: ${res.statusCode} ${json.message || chunks.slice(0, 200)}`));
          } else {
            console.log(`  ✓ ${fileName}`);
            resolve(json);
          }
        } catch (e) {
          reject(new Error(`上传响应解析失败: ${chunks.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function runBuild() {
  return new Promise((resolve, reject) => {
    console.log('▶ 正在构建 Windows 安装包...');
    const child = spawn('npx', ['electron-builder', '--win', '--publish', 'never'], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      env: process.env,
      shell: true
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`electron-builder 退出码 ${code}`));
    });
    child.on('error', reject);
  });
}

(async () => {
  try {
    if (!SKIP_BUILD) {
      await runBuild();
    }

    if (!fs.existsSync(DIST)) {
      throw new Error(`dist/ 目录不存在：${DIST}`);
    }

    const candidates = fs.readdirSync(DIST).filter(f => {
      if (f.endsWith('.blockmap.check')) return false;
      if (/^latest(-[a-z]+)?\.yml$/i.test(f)) return true;
      // 只保留当前版本（pkg.version）的安装包 / blockmap，避免把 dist/ 里残留的旧版本一起传上去
      if (f.includes(pkg.version) && /\.(exe|blockmap)$/i.test(f)) return true;
      return false;
    });
    if (candidates.length === 0) {
      throw new Error(`dist/ 中未找到 .yml/.exe/.blockmap 文件`);
    }
    console.log(`▶ 找到 ${candidates.length} 个待发布文件：`);
    candidates.forEach(f => console.log(`    - ${f}`));

    console.log(`▶ 查找 Gitee Release (tag=${TAG})...`);
    const releases = await api('GET', `/api/v5/repos/${OWNER}/${REPO}/releases?per_page=20`);
    let release = releases.find(r => r.tag_name === TAG);
    if (release) {
      console.log(`  ✓ 找到现有 Release: ${release.name} (id=${release.id})`);
    } else {
      console.log(`  ↻ Release 不存在，正在创建...`);
      release = await api('POST', `/api/v5/repos/${OWNER}/${REPO}/releases`, {
        tag_name: TAG,
        name: 'current',
        body: `当前最新版本。脚本自动发布。\n\n发布日期：${new Date().toISOString().slice(0, 10)}`
      });
      console.log(`  ✓ 已创建 Release: ${release.name} (id=${release.id})`);
    }

    console.log(`▶ 清空 Release 现有附件...`);
    const fullRelease = await api('GET', `/api/v5/repos/${OWNER}/${REPO}/releases/${release.id}`);
    const oldAssets = fullRelease.assets || [];
    let deleted = 0, skipped = 0;
    for (const asset of oldAssets) {
      try {
        await api('DELETE', `/api/v5/repos/${OWNER}/${REPO}/releases/${release.id}/attach_files/${asset.id}`);
        deleted++;
      } catch (e) {
        // 404 = 附件已不存在（ID 失效或先前已删），跳过。其他错误抛出
        if (/→ 404:|响应解析失败.*<!DOCTYPE/i.test(e.message)) {
          console.log(`  ↻ 附件 ${asset.name} 已不存在，跳过`);
          skipped++;
        } else {
          throw e;
        }
      }
    }
    console.log(`  ↻ 已删除 ${deleted} 个旧附件${skipped ? `（${skipped} 个已不存在，跳过）` : ''}`);

    console.log(`▶ 上传产物到 Release...`);
    for (const file of candidates) {
      await uploadAttachment(release.id, path.join(DIST, file));
    }

    console.log(`\n✅ 发布完成！`);
    console.log(`   Release URL: https://gitee.com/${OWNER}/${REPO}/releases/tag/${TAG}`);
    console.log(`   下载 URL:    https://gitee.com/${OWNER}/${REPO}//releases/latest/download/`);
    console.log(`\n已安装用户启动应用后会收到更新提示。\n`);
  } catch (e) {
    console.error(`\n❌ 发布失败：${e.message}\n`);
    process.exit(1);
  }
})();