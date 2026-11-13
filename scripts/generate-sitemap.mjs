import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeXmlUrl(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;');
}

async function run() {
  const { EXPERIENCES } = await import('../src/data/experiences.js');
  const { BLOG_POSTS } = await import('../src/data/blogs.js');

  console.log(`Found ${EXPERIENCES.length} experiences and ${BLOG_POSTS.length} blog posts.`);

  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://www.elahanasafari.com';

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    // Category Hubs
    { path: '/safari', priority: '0.95', changefreq: 'weekly' },
    { path: '/sea-trips', priority: '0.95', changefreq: 'weekly' },
    { path: '/excursions', priority: '0.90', changefreq: 'weekly' },
    { path: '/experiences', priority: '0.90', changefreq: 'weekly' },
    { path: '/transfers', priority: '0.85', changefreq: 'weekly' },
    { path: '/airport-vip', priority: '0.85', changefreq: 'weekly' },
    // Activities
    { path: '/atv-tours', priority: '0.90', changefreq: 'weekly' },
    { path: '/buggy-tours', priority: '0.90', changefreq: 'weekly' },
    { path: '/bedouin-experience', priority: '0.85', changefreq: 'weekly' },
    { path: '/camel-riding', priority: '0.80', changefreq: 'weekly' },
    { path: '/horse-riding', priority: '0.80', changefreq: 'weekly' },
    { path: '/yacht-trips', priority: '0.90', changefreq: 'weekly' },
    { path: '/snorkeling', priority: '0.85', changefreq: 'weekly' },
    { path: '/diving', priority: '0.85', changefreq: 'weekly' },
    { path: '/parasailing', priority: '0.80', changefreq: 'weekly' },
    { path: '/banana-boat', priority: '0.80', changefreq: 'weekly' },
    { path: '/dolphin-experience', priority: '0.85', changefreq: 'weekly' },
    // Content & Trust
    { path: '/gallery', priority: '0.75', changefreq: 'monthly' },
    { path: '/blog', priority: '0.80', changefreq: 'weekly' },
    { path: '/about', priority: '0.70', changefreq: 'monthly' },
    { path: '/contact', priority: '0.75', changefreq: 'monthly' },
    { path: '/faq', priority: '0.70', changefreq: 'monthly' },
    { path: '/leave-review', priority: '0.65', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.40', changefreq: 'yearly' },
    { path: '/terms-and-conditions', priority: '0.40', changefreq: 'yearly' },
    { path: '/cancellation-policy', priority: '0.40', changefreq: 'yearly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Static routes
  for (const r of staticRoutes) {
    const loc = r.path === '/' ? `${baseUrl}/` : `${baseUrl}${r.path}`;
    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
  </url>
`;
  }

  // Experience detail routes
  for (const exp of EXPERIENCES) {
    const loc = `${baseUrl}/experience/${exp.slug}`;
    const mainImg = Array.isArray(exp.images) && exp.images[0] ? exp.images[0] : null;
    const rawImgUrl = mainImg
      ? (mainImg.startsWith('http') ? mainImg : `${baseUrl}${mainImg.startsWith('/') ? '' : '/'}${mainImg}`)
      : null;
    const imgUrl = escapeXmlUrl(rawImgUrl);
    const cleanTitle = escapeXml(exp.title || '');

    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`;

    // Google Image Sitemap strictly requires image URLs to belong to the verified domain
    if (imgUrl && rawImgUrl && rawImgUrl.startsWith(baseUrl)) {
      xml += `
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${cleanTitle}</image:title>
    </image:image>`;
    }

    xml += `
  </url>
`;
  }

  // Blog posts
  for (const post of BLOG_POSTS) {
    const loc = `${baseUrl}/blog/${post.slug}`;
    const rawImgUrl = post.image
      ? (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
      : null;
    const imgUrl = escapeXmlUrl(rawImgUrl);
    const cleanTitle = escapeXml(post.title || '');

    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`;

    // Google Image Sitemap strictly requires image URLs to belong to the verified domain
    if (imgUrl && rawImgUrl && rawImgUrl.startsWith(baseUrl)) {
      xml += `
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${cleanTitle}</image:title>
    </image:image>`;
    }

    xml += `
  </url>
`;
  }

  xml += `</urlset>\n`;

  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${staticRoutes.length + EXPERIENCES.length + BLOG_POSTS.length} URLs at ${sitemapPath}`);
}

run().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});
