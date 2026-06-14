import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

console.log('--- Optimizing images ---');
execSync('node scripts/optimize-images.mjs', { cwd: root, stdio: 'inherit' });

console.log('\n--- Minifying CSS ---');
const csso = require('csso');
const css = readFileSync(resolve(root, 'style.css'), 'utf8');
const minCss = csso.minify(css, { restructure: true }).css;
writeFileSync(resolve(root, 'style.css'), minCss, 'utf8');
console.log(`CSS: ${(css.length / 1024).toFixed(1)}K → ${(minCss.length / 1024).toFixed(1)}K`);

console.log('\n--- Minifying JS ---');
const terser = require('terser');
const jsFiles = [
  'js/main.js',
  'js/render.js',
  'js/content.js',
  'js/modules/navigation.js',
  'js/modules/accordion.js',
  'js/modules/lightbox.js',
  'js/modules/scroll-effects.js',
  'js/modules/interactions.js',
];

let totalOrig = 0, totalMin = 0;
for (const file of jsFiles) {
  const fp = resolve(root, file);
  const code = readFileSync(fp, 'utf8');
  totalOrig += code.length;
  const result = await terser.minify({ [file]: code }, { module: true, compress: true, mangle: true });
  if (result.code) {
    writeFileSync(fp, result.code, 'utf8');
    totalMin += result.code.length;
    console.log(`${file}: ${(code.length / 1024).toFixed(1)}K → ${(result.code.length / 1024).toFixed(1)}K`);
  }
}
console.log(`\nJS total: ${(totalOrig / 1024).toFixed(1)}K → ${(totalMin / 1024).toFixed(1)}K`);

console.log('\n--- Build complete ---');
