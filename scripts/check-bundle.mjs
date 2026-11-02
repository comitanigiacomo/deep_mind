import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const DIST_DIR = resolve('dist');
const MAX_MODEL_BYTES = 320 * 1024;
const LAZY_VENDORS = /vendor-(?:three|animation)-/;

const html = await readFile(resolve(DIST_DIR, 'index.html'), 'utf8');
const preloads = [...html.matchAll(/<link[^>]*rel="modulepreload"[^>]*>/g)]
  .map((match) => match[0].match(/href="([^"]+)"/)?.[1])
  .filter(Boolean);

const eagerLazyVendors = preloads.filter((href) => LAZY_VENDORS.test(href));

if (eagerLazyVendors.length > 0) {
  console.error(
    `Bundling regression: these chunks are preloaded on first paint: ${eagerLazyVendors.join(', ')}`,
  );
  process.exit(1);
}

const entryHref = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"/)?.[1];

if (!entryHref) {
  console.error('Unable to locate the entry script in index.html.');
  process.exit(1);
}

const entrySource = await readFile(resolve(DIST_DIR, entryHref.slice(1)), 'utf8');
const staticImport = entrySource.match(
  /(?:import[^;]*from"|import")\.\/vendor-(?:three|animation)-/,
);

if (staticImport) {
  console.error(
    'Bundling regression: the entry chunk statically imports a lazy vendor chunk.',
  );
  process.exit(1);
}

const model = await stat(resolve(DIST_DIR, 'keyboard.glb'));

if (model.size > MAX_MODEL_BYTES) {
  console.error(
    `keyboard.glb is ${Math.round(model.size / 1024)} kB, above the ${MAX_MODEL_BYTES / 1024} kB budget.`,
  );
  process.exit(1);
}

console.log(
  `Bundle check passed: ${preloads.length} preload(s), no eager three.js, ` +
    `keyboard.glb ${Math.round(model.size / 1024)} kB.`,
);
