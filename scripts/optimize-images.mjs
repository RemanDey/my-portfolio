import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '..', 'images');

const files = fs.readdirSync(imagesDir).filter(f => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const webpPath = path.join(imagesDir, `${name}.webp`);

  // Read into buffer first so we can write back to same path
  const buffer = fs.readFileSync(inputPath);
  const metadata = await sharp(buffer).metadata();

  let pipeline = sharp(buffer);

  // Resize very large images to reasonable dimensions
  const MAX_W = 1920;
  const MAX_H = 1080;
  if (metadata.width > MAX_W || metadata.height > MAX_H) {
    pipeline = pipeline.resize({
      width: Math.min(metadata.width, MAX_W),
      height: Math.min(metadata.height, MAX_H),
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Compress original
  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(inputPath + '.tmp');
  } else {
    await pipeline.clone().png({ quality: 80, compressionLevel: 9, palette: true }).toFile(inputPath + '.tmp');
  }
  fs.renameSync(inputPath + '.tmp', inputPath);

  // Create WebP version
  await pipeline.clone().webp({ quality: 75, effort: 6 }).toFile(webpPath);

  const origSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
  const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);
  console.log(`${file}: ${metadata.width}x${metadata.height} → ${origSize}K (orig) / ${webpSize}K (webp)`);
}

console.log('Done optimizing images.');
