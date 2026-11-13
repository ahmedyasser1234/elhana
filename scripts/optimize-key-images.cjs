const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimize() {
  console.log('Optimizing key assets...');

  // 1. Optimize logo: Keep original backup, create high-res crisp 128x128 WebP and optimized PNG
  if (fs.existsSync('public/logo.png')) {
    if (!fs.existsSync('public/logo-original.png')) {
      fs.copyFileSync('public/logo.png', 'public/logo-original.png');
    }
    
    // Create logo.webp (128x128)
    await sharp('public/logo-original.png')
      .resize(128, 128, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile('public/logo.webp');

    // Overwrite logo.png with optimized 128x128 PNG (~8KB)
    await sharp('public/logo-original.png')
      .resize(128, 128, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 85 })
      .toFile('public/logo.png');

    console.log('Optimized logo.png and generated logo.webp');
  }

  // 2. Convert /images/real/polaris-buggy-family.jpg to WebP
  const heroFamily = 'public/images/real/polaris-buggy-family.jpg';
  if (fs.existsSync(heroFamily)) {
    await sharp(heroFamily)
      .resize(1400, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile('public/images/real/polaris-buggy-family.webp');
    console.log('Generated polaris-buggy-family.webp');
  }

  // 3. Optimize polaris-buggy-white.jpg
  const buggyWhite = 'public/images/real/polaris-buggy-white.jpg';
  if (fs.existsSync(buggyWhite)) {
    await sharp(buggyWhite)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile('public/images/real/polaris-buggy-white.webp');
    console.log('Generated polaris-buggy-white.webp');
  }

  console.log('Image optimization complete!');
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
