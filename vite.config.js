import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'path'

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// mediaManifestPlugin
// Scans public/images/safari/** and public/images/sea/** on every server start
// and build, and writes public/media-manifest.json with a structured list of
// all media files.  The frontend reads this JSON at runtime so that any new
// photo or video added to a folder appears automaticallyâ€”no code changes needed.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function mediaManifestPlugin() {
  const IMG_EXT  = /\.(jpg|jpeg|png|webp|svg)$/i;
  const VID_EXT  = /\.(mp4|webm|mov)$/i;
  const MEDIA_EXT = /\.(jpg|jpeg|png|webp|svg|mp4|webm|mov)$/i;

  function scanDir(absDir, urlBase) {
    const items = [];
    if (!fs.existsSync(absDir)) return items;

    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(absDir, entry.name);
      const urlPath  = urlBase + '/' + entry.name;

      if (entry.isDirectory()) {
        items.push(...scanDir(fullPath, urlPath));
      } else if (MEDIA_EXT.test(entry.name)) {
        items.push({
          url:  urlPath,
          name: entry.name,
          type: VID_EXT.test(entry.name) ? 'video' : 'image',
          // relative path from /images root so parsePath() can categorize it
          rel: urlPath,   // e.g. /images/safari/atv/single/sunset/photo.jpg
        });
      }
    }
    return items;
  }

  function buildManifest(root) {
    const safariDir     = path.join(root, 'public', 'images', 'safari');
    const seaDir        = path.join(root, 'public', 'images', 'sea');
    const excursionsDir = path.join(root, 'public', 'images', 'excursions');

    const safariItems     = scanDir(safariDir,     '/images/safari');
    const seaItems        = scanDir(seaDir,        '/images/sea');
    const excursionsItems = scanDir(excursionsDir, '/images/excursions');

    const manifest = {
      generated: new Date().toISOString(),
      items: [...safariItems, ...seaItems, ...excursionsItems]
    };
    const outPath = path.join(root, 'public', 'media-manifest.json');

    fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`[media-manifest] ✓ wrote ${manifest.items.length} items → public/media-manifest.json`);
  }

  return {
    name: 'media-manifest',
    // Runs when Vite starts dev server
    configureServer(server) {
      buildManifest(server.config.root);

      // Dev middleware for sending Telegram messages without CORS issues
      server.middlewares.use('/api/telegram/send', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }
        let rawBody = '';
        req.on('data', chunk => { rawBody += chunk; });
        req.on('end', async () => {
          try {
            const { token, chat_id, text, parse_mode } = JSON.parse(rawBody || '{}');
            if (!token || !chat_id || !text) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'token, chat_id, and text are required' }));
            }
            const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id,
                text,
                parse_mode: parse_mode || 'HTML'
              })
            });
            const data = await tgRes.json();
            res.statusCode = tgRes.ok ? 200 : (tgRes.status || 500);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      // Re-generate whenever files inside public/images/safari, sea, or excursions change
      server.watcher.add([
        path.join(server.config.root, 'public', 'images', 'safari'),
        path.join(server.config.root, 'public', 'images', 'sea'),
        path.join(server.config.root, 'public', 'images', 'excursions'),
      ]);
      server.watcher.on('add',    () => buildManifest(server.config.root));
      server.watcher.on('unlink', () => buildManifest(server.config.root));
    },
    // Also runs at build time
    buildStart() {
      buildManifest(process.cwd());
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mediaManifestPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'El Hana Group Tourism & Safaris',
        short_name: 'El Hana Group',
        description: 'Book your authentic desert safaris, yacht cruises, and diving trips in Sharm El Sheikh.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: {
    watch: {
      // Ignore files that may be locked by other processes on Windows
      ignored: [
        '**/src/services/api/adminApi.js',
        '**/.git/**',
        '**/node_modules/**',
      ],
      // Suppress EBUSY / EPERM errors on Windows
      awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor';
            if (id.includes('lucide-react') || id.includes('framer-motion')) return 'ui';
            return 'deps';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})



