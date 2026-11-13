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
      .webp({ quality: 80, effort: 6 })
      .toFile('public/logo.webp');

    // Overwrite logo.png with optimized 128x128 PNG (~8KB)
    await sharp('public/logo-original.png')
      .resize(128, 128, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 80 })
      .toFile('public/logo.png');

    console.log('Optimized logo.png and generated logo.webp');
  }

  // 2. Convert /images/real/polaris-buggy-family.jpg to WebP & Mobile WebP
  const heroFamily = 'public/images/real/polaris-buggy-family.jpg';
  if (fs.existsSync(heroFamily)) {
    // Desktop WebP (1200px width, quality 72)
    const tempDesktop = 'public/images/real/temp-family-desktop.webp';
    await sharp(heroFamily)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tempDesktop);
    fs.renameSync(tempDesktop, 'public/images/real/polaris-buggy-family.webp');
    console.log('Generated polaris-buggy-family.webp');

    // Mobile WebP (600px width, quality 70)
    await sharp(heroFamily)
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile('public/images/real/polaris-buggy-family-mobile.webp');
    console.log('Generated polaris-buggy-family-mobile.webp');
  }

  // 3. Optimize polaris-buggy-white.jpg
  const buggyWhite = 'public/images/real/polaris-buggy-white.jpg';
  if (fs.existsSync(buggyWhite)) {
    const tempWhite = 'public/images/real/temp-white.webp';
    await sharp(buggyWhite)
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tempWhite);
    fs.renameSync(tempWhite, 'public/images/real/polaris-buggy-white.webp');
    console.log('Generated polaris-buggy-white.webp');
  }

  // 4. Optimize atv-quad.jpg
  const atvQuad = 'public/images/real/atv-quad.jpg';
  if (fs.existsSync(atvQuad)) {
    const tempAtv = 'public/images/real/temp-atv.webp';
    await sharp(atvQuad)
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tempAtv);
    fs.renameSync(tempAtv, 'public/images/real/atv-quad.webp');
    console.log('Generated atv-quad.webp');
  }

  // 5. Optimize scuba-diving-intro
  const scuba = 'public/images/sea/scuba-diving-intro.jpg';
  if (fs.existsSync(scuba)) {
    const tempScuba = 'public/images/sea/temp-scuba.webp';
    await sharp(scuba)
      .resize(700, null, { withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tempScuba);
    fs.renameSync(tempScuba, 'public/images/sea/scuba-diving-intro.webp');
    console.log('Generated scuba-diving-intro.webp');
  }

  // 6. Optimize ras-mohammed-luxury-yacht
  const yacht = 'public/images/sea/ras-mohammed-luxury-yacht.jpg';
  if (fs.existsSync(yacht)) {
    const tempYacht = 'public/images/sea/temp-yacht.webp';
    await sharp(yacht)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tempYacht);
    fs.renameSync(tempYacht, 'public/images/sea/ras-mohammed-luxury-yacht.webp');
    console.log('Generated ras-mohammed-luxury-yacht.webp');
  }

  console.log('All image optimizations complete!');
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
