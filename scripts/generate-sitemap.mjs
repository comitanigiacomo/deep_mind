import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blogPosts.js';
import { SITE_URL } from '../src/lib/site.js';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');

const STATIC_ROUTES = [{ path: '/', changeFrequency: 'weekly', priority: '1.0' }];

const BLOG_ROUTES = Object.keys(blogPosts).map((postId) => ({
  path: `/blog/${postId}`,
  changeFrequency: 'monthly',
  priority: '0.7',
}));

function renderUrlEntry({ path: routePath, changeFrequency, priority }) {
  return [
    '  <url>',
    `    <loc>${SITE_URL}${routePath}</loc>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...STATIC_ROUTES, ...BLOG_ROUTES].map(renderUrlEntry),
  '</urlset>',
  '',
].join('\n');

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, sitemap, 'utf8');

console.log(`sitemap.xml generated with ${STATIC_ROUTES.length + BLOG_ROUTES.length} entries`);
