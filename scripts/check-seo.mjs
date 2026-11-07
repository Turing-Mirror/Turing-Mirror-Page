import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { LOCALES, PRODUCTS, SITE_URL } from '../src/content.mjs';
import { productPath } from '../src/render.mjs';

const rvc = PRODUCTS.find(p => p.slug === 'rvc-fabric');
const map = await readFile('dist/sitemap.xml', 'utf8');
const redirects = (await readFile('dist/_redirects', 'utf8')).trim().split('\n');
for (const loc of LOCALES) {
  const path = productPath(loc, rvc);
  const html = await readFile(join('dist', path, 'index.html'), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${path}"`));
  assert.ok(html.includes(`property="og:image" content="${SITE_URL}${rvc.screenshots[0].src}"`));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const app = graphs.flatMap(graph => graph['@graph'] ?? [graph]).find(item => item['@type'] === 'SoftwareApplication');
  assert.ok(app, 'The product page must describe its software and screenshots.');
  for (const shot of rvc.screenshots) {
    assert.ok(app.screenshot.some(image => image.contentUrl === `${SITE_URL}${shot.src}` && image.isBasedOn === shot.source));
    assert.ok(map.includes(`<image:loc>${SITE_URL}${shot.src}</image:loc>`));
  }
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    await access(join('dist', href, href.endsWith('/') ? 'index.html' : ''));
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(map.includes(`<loc>${SITE_URL}${path}</loc>`));
  for (const old of [`${loc.path}guides/${rvc.slug}`, `${path}screenshots`]) {
    for (const url of [old, `${old}/`]) assert.ok(redirects.includes(`${url} ${path} 301`));
    assert.ok(!map.includes(`<loc>${SITE_URL}${old}/</loc>`));
    await assert.rejects(access(join('dist', old, 'index.html')), { code: 'ENOENT' });
  }
}
assert.ok(map.includes('xmlns:image='));
console.log('SEO checks passed: four product pages, image metadata, local links, sitemap and retired-page redirects.');
