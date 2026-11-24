import sharp from 'sharp';
import fs from 'fs';

async function buildUnifiedSafari() {
  const canvasW = 1400;
  const canvasH = 750;

  const buggyPath = 'public/images/real/polaris-buggy-family.jpg';
  const atvPath = 'public/images/real/user-atv-safari.jpg';
  const camelPath = 'public/images/real/camel-riding-hero.jpg';
  const bedouinPath = 'public/images/romantic/romantic-bedouin-candlelight-dinner.webp';

  // 1. Right background: Camel caravan across golden dunes
  const camelW = 680;
  const camelImg = await sharp(camelPath)
    .resize(camelW, canvasH, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .toBuffer();

  const camelMaskSvg = `
    <svg width="${camelW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cfade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
          <stop offset="18%" stop-color="#fff" stop-opacity="0.8"/>
          <stop offset="35%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="${camelW}" height="${canvasH}" fill="url(#cfade)"/>
    </svg>
  `;
  const camelMask = await sharp(Buffer.from(camelMaskSvg)).png().toBuffer();
  const maskedCamel = await sharp(camelImg)
    .ensureAlpha()
    .composite([{ input: camelMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Bedouin candlelight dinner at bottom right
  const bedouinW = 580;
  const bedouinH = 360;
  const bedouinImg = await sharp(bedouinPath)
    .resize(bedouinW, bedouinH, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .toBuffer();

  const bedouinMaskSvg = `
    <svg width="${bedouinW}" height="${bedouinH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="60%" cy="60%" r="60%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="60%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="85%" stop-color="#fff" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${bedouinW}" height="${bedouinH}" fill="url(#bg)"/>
    </svg>
  `;
  const bedouinMask = await sharp(Buffer.from(bedouinMaskSvg)).png().toBuffer();
  const maskedBedouin = await sharp(bedouinImg)
    .ensureAlpha()
    .composite([{ input: bedouinMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Polaris Buggy: Left side, showing buggy front AND driver smiling/waving
  // In 1024x768: extract from left: 100, top: 220, width: 880, height: 540
  const buggyW = 620;
  const buggyH = canvasH;
  const buggyImg = await sharp(buggyPath)
    .extract({ left: 80, top: 220, width: 880, height: 540 })
    .resize(buggyW, buggyH, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.02, saturation: 1.2 })
    .toBuffer();

  const buggyMaskSvg = `
    <svg width="${buggyW}" height="${buggyH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bfade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="75%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="90%" stop-color="#fff" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${buggyW}" height="${buggyH}" fill="url(#bfade)"/>
    </svg>
  `;
  const buggyMask = await sharp(Buffer.from(buggyMaskSvg)).png().toBuffer();
  const maskedBuggy = await sharp(buggyImg)
    .ensureAlpha()
    .composite([{ input: buggyMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 4. Red ATV Quad: center section, width 440, height 750, placed at left: 480
  const atvW = 440;
  const atvH = canvasH;
  const atvImg = await sharp(atvPath)
    .extract({ left: 0, top: 250, width: 1200, height: 1350 })
    .resize(atvW, atvH, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.02, saturation: 1.15 })
    .toBuffer();

  const atvMaskSvg = `
    <svg width="${atvW}" height="${atvH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="afade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
          <stop offset="15%" stop-color="#fff" stop-opacity="0.7"/>
          <stop offset="25%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="75%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="90%" stop-color="#fff" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${atvW}" height="${atvH}" fill="url(#afade)"/>
    </svg>
  `;
  const atvMask = await sharp(Buffer.from(atvMaskSvg)).png().toBuffer();
  const maskedAtv = await sharp(atvImg)
    .ensureAlpha()
    .composite([{ input: atvMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Base canvas background (warm golden desert tone)
  const baseCanvas = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 216, g: 156, b: 90, alpha: 1 }
    }
  }).png().toBuffer();

  // Composite layers together
  const composite = await sharp(baseCanvas)
    .composite([
      // Right background: Camels
      { input: maskedCamel, left: 720, top: 0 },
      // Bedouin dinner bottom right
      { input: maskedBedouin, left: 820, top: 390 },
      // Left foreground: Buggy
      { input: maskedBuggy, left: 0, top: 0 },
      // Center foreground: ATV
      { input: maskedAtv, left: 470, top: 0 }
    ])
    .toBuffer();

  // Final warm cinematic color grade overlay to unify all tones
  const warmTintSvg = `
    <svg width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="warm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff9900" stop-opacity="0.06"/>
          <stop offset="50%" stop-color="#ff7700" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#ffaa22" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
      <rect width="${canvasW}" height="${canvasH}" fill="url(#warm)"/>
    </svg>
  `;
  const warmTint = await sharp(Buffer.from(warmTintSvg)).png().toBuffer();

  // Write WebP and JPG
  const outWebp = 'public/images/safari/super-safari-combo-hero.webp';
  const outJpg = 'public/images/safari/super-safari-combo-hero.jpg';

  await sharp(composite)
    .composite([{ input: warmTint, blend: 'over' }])
    .webp({ quality: 90, effort: 6 })
    .toFile(outWebp);

  await sharp(composite)
    .composite([{ input: warmTint, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outJpg);

  console.log('Saved both WebP and JPG to public/images/safari/super-safari-combo-hero.*');
}

buildUnifiedSafari().catch(console.error);
