import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { PRODUCTS, sync } from './sync-fabric-releases.mjs';

function fixtures(slug, legacy = false) {
  const product = PRODUCTS[slug], version = '1.2.3';
  const url = legacy ? product.legacySetupBase + product.setupName(version)
    : `https://cdn.turingmirror.com/f/${slug}/${product.setupName(version)}`;
  return {
    'changelog.json': { entries: [{ version }] },
    'plaza.json': { items: [] },
    'updater.json': { version, platforms: { 'windows-x86_64': { url, signature: 'public-signature' } } },
    'index.json': { app: { version, gui: { version, url, sha256: 'a'.repeat(64), size_bytes: 123 } }, runtimes: { cpu: {} } },
  };
}

test('GSV reads local metadata and images and copies the full index', async t => {
  const root = await mkdtemp(join(tmpdir(), 'fabric-local-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = fixtures('gpt-sovits-fabric');
  files['plaza.json'].items.push({ image: 'images/notice.png' });
  await mkdir(join(root, 'images'));
  await writeFile(join(root, 'images/notice.png'), Buffer.from('image bytes'));
  for (const [name, data] of Object.entries(files)) await writeFile(join(root, name), JSON.stringify(data));
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push([String(url), options.method]);
    return new Response(null, { headers: { 'content-length': '123' } });
  });
  const output = join(root, 'output');
  await sync('gpt-sovits-fabric', { ...PRODUCTS['gpt-sovits-fabric'], source: { directory: root } }, '1.2.3', output);
  assert.equal(requests.length, 1);
  assert.equal(requests[0][1], 'HEAD');
  assert.match(requests[0][0], /^https:\/\/cdn.turingmirror.com\/f\//);
  const index = JSON.parse(await readFile(join(output, 'index.json')));
  assert.deepEqual(index, files['index.json']);
  const plaza = JSON.parse(await readFile(join(output, 'plaza.json')));
  const imageName = new URL(plaza.items[0].image).pathname.split('/').at(-1);
  assert.equal((await readFile(join(output, 'images', imageName))).toString(), 'image bytes');
});

test('RVC reads CNB metadata and migrates only the matching legacy installer URL', async t => {
  const root = await mkdtemp(join(tmpdir(), 'fabric-remote-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = fixtures('rvc-fabric', true);
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push([String(url), options.method]);
    if (options.method === 'HEAD') return new Response(null, { headers: { 'content-length': '123' } });
    return Response.json(files[new URL(url).pathname.split('/').at(-1)]);
  });
  await sync('rvc-fabric', PRODUCTS['rvc-fabric'], '1.2.3', root);
  assert.equal(requests.filter(([url]) => url.startsWith(PRODUCTS['rvc-fabric'].source.url)).length, 4);
  const updater = JSON.parse(await readFile(join(root, 'updater.json')));
  const app = JSON.parse(await readFile(join(root, 'app.json')));
  assert.equal(app.app.gui.url, updater.platforms['windows-x86_64'].url);
  assert.match(app.app.gui.url, /^https:\/\/cdn.turingmirror.com\/f\/rvc-fabric\//);
});

for (const failure of ['version', 'url', 'size']) {
  test(`release validation rejects ${failure} before writing output`, async t => {
    const root = await mkdtemp(join(tmpdir(), 'fabric-invalid-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    const files = fixtures('rvc-fabric');
    if (failure === 'version') files['index.json'].app.version = '0.0.1';
    if (failure === 'url') files['updater.json'].platforms['windows-x86_64'].url = 'https://example.test/setup.exe';
    t.mock.method(globalThis, 'fetch', async (url, options) => options.method === 'HEAD'
      ? new Response(null, { headers: { 'content-length': '124' } })
      : Response.json(files[new URL(url).pathname.split('/').at(-1)]));
    await assert.rejects(sync('rvc-fabric', PRODUCTS['rvc-fabric'], '1.2.3', join(root, 'output')));
    await assert.rejects(readFile(join(root, 'output/updater.json')), { code: 'ENOENT' });
  });
}
