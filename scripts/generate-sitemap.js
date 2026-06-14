// Run this after each content change to regenerate sitemap.xml
// Usage: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://samuracare.com';
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/articles', priority: '0.9', changefreq: 'weekly' },
  { loc: '/guide', priority: '0.9', changefreq: 'weekly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
];

function loadData(filename) {
  try {
    const content = fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8');
    const match = content.match(/export\s+const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
      return eval('(' + match[1] + ')');
    }
  } catch {}
  return [];
}

const articles = loadData('articles.js');
const guideEntries = loadData('guide.js').flatMap(g => g.entries || []);

const urls = [
  ...staticPages,
  ...articles.map(a => ({ loc: `/articles/${a.slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...guideEntries.map(e => ({ loc: `/guide/${e.slug}`, priority: '0.8', changefreq: 'monthly' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${urls.length} URLs → public/sitemap.xml`);