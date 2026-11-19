import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateSetupRedirect } from './setup-redirect.mjs';

const product = 'Turing-Mirror/RVC-Fabric';
const publicRoot = fileURLToPath(new URL('../public/', import.meta.url));
const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

async function get(url, accept) {
  const response = await fetch(url, { headers: { Accept: accept }, signal: AbortSignal.timeout(90_000) });
  if (!response.ok) throw new Error('HTTP ' + response.status + ' ' + url);
  return response;
}

function compare(a, b) {
  const right = b.split('.').map(Number);
  return a.split('.').map(Number).reduce((result, value, i) => result || value - right[i], 0);
}

export async function syncRvcRelease(version, root = publicRoot, request = get) {
  if (!stableVersion.test(version)) throw new Error('Enter the published release version, for example 1.8.0.');
  const folder = join(root, 'releases', 'rvc-fabric');
  const read = async file => JSON.parse(await readFile(join(folder, file), 'utf8'));
  const previous = await read('app.json');
  if (compare(version, previous.app.version) < 0) throw new Error('A newer version is already available.');
  const tag = 'v' + version;
  const release = await (await request('https://api.github.com/repos/' + product + '/releases/tags/' + tag, 'application/vnd.github+json')).json();
  if (release.tag_name !== tag || release.draft || release.prerelease || !release.published_at) throw new Error('Publish the stable GitHub release first.');

  const setup = 'RVC-Fabric-Setup-' + version + '.exe';
  const base = 'https://github.com/' + product + '/releases/download/' + tag + '/';
  function asset(name) {
    const item = release.assets.find(file => file.name === name);
    if (item?.browser_download_url !== base + name || item.state !== 'uploaded' || !(item.size > 0)) throw new Error('Missing release asset: ' + name);
    return item;
  }
  const installer = asset(setup);
  const getFile = name => request(asset(name).browser_download_url, 'application/octet-stream');
  const [manifest, signature, checksum] = await Promise.all([
    getFile('updater.json').then(r => r.json()), getFile(setup + '.sig').then(r => r.text()), getFile(setup + '.sha256').then(r => r.text()),
  ]);
  const platform = manifest.platforms?.['windows-x86_64'];
  const digest = checksum.trim().split(/\s+/)[0];
  if (manifest.version !== version || platform?.url !== installer.browser_download_url ||
      !signature.trim() || platform.signature !== signature.trim() || !manifest.notes?.trim() ||
      !/^[\da-f]{64}$/.test(digest) || checksum.trim() !== digest + '  ' + setup ||
      !Number.isFinite(Date.parse(manifest.pub_date))) throw new Error('Setup, signature and update manifest do not match.');
  if (installer.digest) {
    if (installer.digest !== 'sha256:' + digest) throw new Error('GitHub reports a different Setup checksum.');
  } else {
    const bytes = Buffer.from(await (await getFile(setup)).arrayBuffer());
    if (bytes.length !== installer.size || createHash('sha256').update(bytes).digest('hex') !== digest) throw new Error('Setup checksum mismatch.');
  }
  if (previous.app.version === version && previous.app.gui.sha256 !== digest) throw new Error('This version already points to a different installer.');
  const date = new Date(release.published_at).toISOString().slice(2, 10).replaceAll('-', '');
  const highlights = manifest.notes.trim().split(/\r?\n/).map(line => line.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
  const changelog = await read('changelog.json');
  const entry = { version, date, title: version, body: highlights.join('\n'), highlights };
  changelog.entries = [entry, ...changelog.entries.filter(old => old.version.replace(/^v/, '') !== version)];
  const app = { app: { ...previous.app, version, gui: { ...previous.app.gui, version, url: platform.url, sha256: digest, size_bytes: installer.size, notes: highlights.join('\n') } } };
  const redirectsPath = join(root, '_redirects');
  const redirects = updateSetupRedirect(await readFile(redirectsPath, 'utf8'), 'rvc-fabric', platform.url);
  for (const [name, data] of Object.entries({ 'app.json': app, 'updater.json': manifest, 'changelog.json': changelog })) {
    await writeFile(join(folder, name), JSON.stringify(data, null, 2) + '\n');
  }
  await writeFile(redirectsPath, redirects);
  console.log('Prepared RVC Fabric ' + version + ' from its published GitHub release.');
}
