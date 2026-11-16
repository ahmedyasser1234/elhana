import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const inputPath = 'C:/Users/omega/.gemini/antigravity/brain/caf695b7-6748-4a51-bdc4-043cd0e12541/.user_uploaded/media_1794836399335_41a5b259.jpg';
const publicDir = 'c:/Users/omega/Downloads/elhana-main/elhana/public';

async function processLogo() {
  console.log('Processing logo without phone number...');

  // 1. Crop to remove phone pill (y from 0 to 553, width 1024)
  const croppedBuffer = await sharp(inputPath)
    .extract({ left: 0, top: 0, width: 1024, height: 553 })
    .toBuffer();

  // 2. Trim excess white borders with 15px padding
  const trimmed = await sharp(croppedBuffer)
    .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 10 })
    .extend({
      top: 15,
      bottom: 20,
      left: 20,
      right: 20,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    });

  const metadata = await trimmed.metadata();
  console.log('Final trimmed logo dimensions:', metadata.width, 'x', metadata.height);

  // 3. Save as PNG, WebP, JPG in public/
  await trimmed
    .clone()
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo.png'));

  await trimmed
    .clone()
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, 'logo.webp'));

  await trimmed
    .clone()
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'logo.jpg'));

  // Also create a transparent version where near-white pixels become transparent
  // for seamless dark/light overlays
  const { data, info } = await sharp(path.join(publicDir, 'logo.png'))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // If pixel is pure or near-white background (r>248, g>248, b>248)
    if (r > 248 && g > 248 && b > 248) {
      data[i + 3] = 0; // alpha = 0 (transparent)
    } else if (r > 238 && g > 238 && b > 238) {
      // Soft antialiased blend
      data[i + 3] = Math.round((255 - Math.max(r, g, b)) * 15);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
    .png()
    .toFile(path.join(publicDir, 'logo-transparent.png'));

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, 'logo-transparent.webp'));

  console.log('Logo generated successfully!');
}

processLogo().catch(console.error);
