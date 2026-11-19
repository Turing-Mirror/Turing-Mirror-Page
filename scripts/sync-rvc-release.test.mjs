import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { syncRvcRelease } from './sync-rvc-release.mjs';

const setup = 'RVC-Fabric-Setup-1.8.0.exe';
const base = 'https://github.com/Turing-Mirror/RVC-Fabric/releases/download/v1.8.0/';
const bytes = Buffer.from('test installer');
const hash = createHash('sha256').update(bytes).digest('hex');

async function fixture(t, options = {}) {
  const root = await mkdtemp(join(tmpdir(), 'rvc-feed-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const folder = join(root, 'releases', 'rvc-fabric');
  await mkdir(folder, { recursive: true });
  const previous = { app: { version: options.previous ?? '1.7.2', channel: 'stable', gui: { min_app_version: '1.3.0', sha256: 'old' } } };
  await writeFile(join(folder, 'app.json'), JSON.stringify(previous));
  await writeFile(join(folder, 'changelog.json'), JSON.stringify({ entries: [{ version: '1.7.2' }] }));
  await writeFile(join(root, '_redirects'), '/other /other-target 302\n/releases/rvc-fabric/setup.exe https://example.com/1.7.2.exe 302\n');
  const manifest = { version: '1.8.0', pub_date: '2026-11-19T00:00:00Z', notes: '- 更新说明', platforms: { 'windows-x86_64': { url: base + setup, signature: 'fixture' } } };
  const bodies = new Map([[setup, bytes], [setup + '.sig', 'fixture'], [setup + '.sha256', hash + '  ' + setup], ['updater.json', JSON.stringify(manifest)]]);
  const assets = [...bodies].map(([name, body]) => ({ name, state: 'uploaded', size: Buffer.byteLength(body), browser_download_url: base + name, digest: options.digest === undefined ? 'sha256:' + hash : options.digest }));
  const release = { tag_name: 'v1.8.0', draft: !!options.draft, prerelease: false, published_at: manifest.pub_date, assets };
  const calls = [];
  async function request(url) {
    calls.push(url);
    if (url === 'https://api.github.com/repos/Turing-Mirror/RVC-Fabric/releases/tags/v1.8.0') return Response.json(release);
    assert.ok(url.startsWith(base) && bodies.has(url.slice(base.length)));
    return new Response(bodies.get(url.slice(base.length)));
  }
  return { root, calls, request, read: file => readFile(join(folder, file), 'utf8') };
}

for (const digest of ['sha256:' + hash, null]) {
  test(digest ? 'syncs the published installer using its GitHub checksum' : 'verifies the installer when GitHub omits its checksum', async t => {
    const f = await fixture(t, { digest });
    await syncRvcRelease('1.8.0', f.root, f.request);
    const app = await f.read('app.json');
    const gui = JSON.parse(app).app.gui;
    assert.equal(gui.sha256, hash);
    assert.equal(gui.min_app_version, '1.3.0');
    assert.equal(gui.url, base + setup);
    assert.equal(gui.size_bytes, bytes.length);
    assert.equal(f.calls.includes(base + setup), !digest);
    assert.deepEqual(JSON.parse(await f.read('changelog.json')).entries.map(e => e.version), ['1.8.0', '1.7.2']);
    assert.equal(JSON.parse(await f.read('updater.json')).platforms['windows-x86_64'].url, gui.url);
    assert.equal(await readFile(join(f.root, '_redirects'), 'utf8'), '/other /other-target 302\n/releases/rvc-fabric/setup.exe ' + gui.url + ' 302\n');
    await syncRvcRelease('1.8.0', f.root, f.request);
    assert.equal(await f.read('app.json'), app);
  });
}

for (const [title, options, error] of [
  ['private draft', { draft: true }, /stable/],
  ['wrong checksum', { digest: 'sha256:wrong' }, /checksum/],
  ['replaced installer', { previous: '1.8.0' }, /different installer/],
  ['older version', { previous: '1.8.1' }, /newer version/],
]) {
  test('preserves the current feed for a ' + title, async t => {
    const f = await fixture(t, options);
    const before = await f.read('app.json');
    await assert.rejects(syncRvcRelease('1.8.0', f.root, f.request), error);
    assert.equal(await f.read('app.json'), before);
    assert.deepEqual(JSON.parse(await f.read('changelog.json')).entries, [{ version: '1.7.2' }]);
  });
}
