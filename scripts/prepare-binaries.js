// Copies platform-specific binaries into the Tauri bundle before packaging
import fs from 'fs';
import os from 'os';
import path from 'path';

const platform = os.platform();
const srcDir = path.resolve('build-resources', platform === 'darwin' ? 'macos' : 'windows');
const destDir = path.resolve('src-tauri', 'bundled');

if (!fs.existsSync(srcDir)) {
  console.error('Missing platform binary directory:', srcDir);
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
for (const file of fs.readdirSync(srcDir)) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}
console.log(`Copied helper binaries from ${srcDir} → ${destDir}`);
