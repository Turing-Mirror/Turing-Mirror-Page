import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { LOCALES, PRODUCTS, SITE_URL } from '../src/content.mjs';
import { productPath, guidePath } from '../src/render.mjs';
const guide = JSON.parse(await readFile('docs/guides/rvc-fabric-v1.json', 'utf8'));
const rvc = PRODUCTS.find(p => p.slug === guide.product);
for (const value of [guide.title, guide.summary, ...guide.sections.flatMap(s => [s.title, ...s.paragraphs, ...s.links.map(l => l.label)])]) {
  for (const loc of LOCALES) assert.ok(value[loc.code], `Missing guide translation: ${loc.code}`);
}
for (const loc of LOCALES) {
  for (const path of [productPath(loc, rvc), guidePath(loc, guide)]) {
    const html = await readFile(join('dist', path, 'index.html'), 'utf8');
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${path}"`));
    assert.ok(html.includes(`property="og:image" content="${SITE_URL}${rvc.screenshots[0].src}"`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json[1]);
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      await access(join('dist', href, href.endsWith('/') ? 'index.html' : ''));
    }
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
}
const map = await readFile('dist/sitemap.xml', 'utf8');
assert.ok(map.includes('xmlns:image='));
for (const shot of rvc.screenshots) assert.ok(map.includes(`<image:loc>${SITE_URL}${shot.src}</image:loc>`));
for (const loc of LOCALES) assert.ok(map.includes(`<loc>${SITE_URL}${guidePath(loc, guide)}</loc>`));
console.log('SEO checks passed: four languages, eight pages, local links, image metadata, JSON-LD and sitemap.');
