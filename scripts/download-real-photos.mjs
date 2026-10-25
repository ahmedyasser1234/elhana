import fs from 'fs';
import path from 'path';

const userAgent = 'ElHanaTravel/1.0 (contact@elhanagroup.com) NodeFetch/1.0';

async function getImageUrl(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': userAgent } });
  const data = await res.json();
  const pages = data?.query?.pages || {};
  for (const pageId in pages) {
    const page = pages[pageId];
    if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
      return page.imageinfo[0].url;
    }
  }
  return null;
}

async function searchWikimedia(searchTerm, limit = 5) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent } });
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const results = [];
    for (const pageId in pages) {
      const page = pages[pageId];
      if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
        results.push({
          title: page.title,
          url: page.imageinfo[0].url
        });
      }
    }
    return results;
  } catch (e) {
    console.error('Search error for:', searchTerm, e.message);
    return [];
  }
}

async function downloadFile(url, destPath) {
  console.log(`Downloading ${url} -> ${destPath}`);
  const res = await fetch(url, { headers: { 'User-Agent': userAgent } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  console.log(`✓ Saved ${destPath} (${Math.round(buffer.length / 1024)} KB)`);
}

async function run() {
  const targets = [
    {
      query: 'Sinai "Mount Sinai" clouds summit OR sunrise',
      destDir: 'd:/web/public/images/excursions/catherine',
      prefix: 'mount-sinai-sea-of-clouds'
    },
    {
      query: 'Lever de soleil Mont Sinaï OR "Gabal Musa" sunrise',
      destDir: 'd:/web/public/images/excursions/catherine',
      prefix: 'mount-sinai-gabal-musa-sunrise'
    },
    {
      query: '"Ras Shitan" OR "Ras Shetan" Sinai Egypt',
      destDir: 'd:/web/public/images/excursions/nuweiba',
      prefix: 'nuweiba-ras-shitan'
    },
    {
      query: 'Nuweiba beach Sinai Egypt',
      destDir: 'd:/web/public/images/excursions/nuweiba',
      prefix: 'nuweiba-beach'
    },
    {
      query: '"Saint Catherine Monastery" Sinai',
      destDir: 'd:/web/public/images/excursions/catherine',
      prefix: 'st-catherine-monastery'
    },
    {
      query: '"Blue Hole" Dahab',
      destDir: 'd:/web/public/images/excursions/dahab',
      prefix: 'dahab-blue-hole'
    },
    {
      query: 'Dahab Egypt coast',
      destDir: 'd:/web/public/images/excursions/dahab',
      prefix: 'dahab-coast'
    },
    {
      query: '"Fjord Bay" Taba',
      destDir: 'd:/web/public/images/excursions/taba',
      prefix: 'taba-fjord-bay'
    },
    {
      query: '"Pharaoh\'s Island" Taba',
      destDir: 'd:/web/public/images/excursions/taba',
      prefix: 'taba-pharaoh-island'
    },
    {
      query: 'Wishwashi canyon Nuweiba OR "Colored Canyon" Sinai',
      destDir: 'd:/web/public/images/excursions/nuweiba',
      prefix: 'nuweiba-canyon'
    }
  ];

  for (const target of targets) {
    console.log(`\nSearching for: ${target.query}`);
    const results = await searchWikimedia(target.query, 4);
    console.log(`Found ${results.length} images`);
    let idx = 1;
    for (const item of results) {
      const cleanUrl = item.url.split('?')[0];
      const ext = path.extname(cleanUrl);
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase())) continue;
      const targetFilename = path.join(target.destDir, `${target.prefix}-${idx}${ext}`);
      try {
        await downloadFile(item.url, targetFilename);
        idx++;
      } catch (err) {
        console.warn(`Could not download ${item.url}:`, err.message);
      }
    }
  }
}

run().catch(console.error);
