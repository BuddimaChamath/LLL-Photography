// Writes a fully rendered HTML file for every page into dist/, so search engines and
// link previews (WhatsApp, Facebook…) see real content and per-page meta tags.
// Runs after `vite build` (client) and `vite build --ssr` (server renderer).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, PRERENDER_PATHS, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const page = (url) => {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const url of PRERENDER_PATHS) {
  // Flat files (about.html) — Vercel's cleanUrls serves them at /about.
  const file = url === '/' ? join(dist, 'index.html') : join(dist, `${url.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(url));
}
writeFileSync(join(dist, '404.html'), page('/404'));

const robots = ['User-agent: *', 'Allow: /'];
if (SITE.url) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PRERENDER_PATHS.map(
    (p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`
  ).join('\n');
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  robots.push('', `Sitemap: ${SITE.url}/sitemap.xml`);
} else {
  console.warn('prerender: VITE_SITE_URL is not set — skipping sitemap.xml and canonical URLs.');
}
writeFileSync(join(dist, 'robots.txt'), robots.join('\n') + '\n');

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${PRERENDER_PATHS.length} pages + 404.html`);
