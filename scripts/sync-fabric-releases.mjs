import { createHash } from 'node:crypto';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PRODUCTS = {
  'rvc-fabric': {
    repository: 'RVC-Fabric-Releases',
    setupTag: 'setup',
    setupName: version => `RVC Fabric_${version}_x64-setup.exe`,
  },
  'gpt-sovits-fabric': {
    repository: 'GPT-SoVITS-Fabric-Releases',
    setupTag: 'GSV-setup',
    setupName: version => `GPT-SoVITS-Fabric-Setup-${version}.exe`,
    firstReleasePending: true,
  },
};
const IMAGE_EXTENSIONS = new Map([
  ['image/png', '.png'], ['image/jpeg', '.jpg'], ['image/webp', '.webp'],
  ['image/gif', '.gif'], ['image/avif', '.avif'],
]);

async function get(url, method = 'GET') {
  return fetch(url, {
    method,
    headers: { 'Cache-Control': 'no-cache' },
    signal: AbortSignal.timeout(30_000),
  });
}

async function readJson(response) {
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
  const text = await response.text();
  return { text, data: JSON.parse(text) };
}

async function readUpdater(rawBase, output, product, changelog, expectedVersion) {
  const response = await get(new URL('updater.json', rawBase));
  if (response.status === 404 && product.firstReleasePending && !expectedVersion && changelog.entries.length === 0) {
    const existing = await stat(join(output, 'updater.json')).catch(error => {
      if (error.code !== 'ENOENT') throw error;
    });
    if (!existing) return null;
  }
  const updater = await readJson(response);
  const { version, platforms } = updater.data;
  const windows = platforms?.['windows-x86_64'];
  const target = `https://cnb.cool/Turing-Mirror/${product.repository}/-/releases/download/${product.setupTag}/${encodeURIComponent(product.setupName(version))}`;
  if (
    !/^\d+\.\d+\.\d+$/.test(version) ||
    (expectedVersion && version !== expectedVersion) ||
    changelog.entries[0]?.version?.replace(/^v/i, '') !== version ||
    !windows?.signature?.trim() ||
    windows.url !== target
  ) {
    throw new Error('The updater, changelog and versioned CNB Setup must describe the same release.');
  }
  const setup = await get(windows.url, 'HEAD');
  if (!setup.ok || Number(setup.headers.get('content-length')) <= 0) {
    throw new Error(`CNB Setup is unavailable: ${windows.url}`);
  }
  return updater;
}

async function copyAnnouncementImages(plaza, rawBase, publicBase) {
  const files = new Map();
  const sources = new Map();
  for (const item of plaza.items) {
    const field = ['image', 'image_url', 'cover'].find(key => typeof item[key] === 'string' && item[key].trim());
    if (!field) continue;

    const value = item[field].trim().replaceAll('\\', '/');
    const source = new URL(value.replace(/^\/+/, ''), rawBase);
    if (source.protocol !== 'https:' || !(source.hostname === 'cnb.cool' || source.hostname.endsWith('.cnb.cool'))) {
      throw new Error(`Announcement image must have a CNB URL: ${value}`);
    }
    let filename = sources.get(source.href);
    if (!filename) {
      const response = await get(source);
      const type = response.headers.get('content-type')?.split(';')[0];
      const extension = IMAGE_EXTENSIONS.get(type);
      if (!response.ok || !extension) throw new Error(`Cannot read announcement image ${source.href}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      filename = `${createHash('sha256').update(bytes).digest('hex')}${extension}`;
      files.set(filename, bytes);
      sources.set(source.href, filename);
    }
    item[field] = new URL(`images/${filename}`, publicBase).href;
  }
  return files;
}

async function sync(slug, product, expectedVersion) {
  const rawBase = `https://cnb.cool/Turing-Mirror/${product.repository}/-/git/raw/main/`;
  const publicBase = `https://www.turingmirror.com/releases/${slug}/`;
  const output = fileURLToPath(new URL(`../public/releases/${slug}/`, import.meta.url));
  const [changelog, plaza] = await Promise.all(['changelog.json', 'plaza.json'].map(async file =>
    readJson(await get(new URL(file, rawBase)))));
  if (!Array.isArray(changelog.data.entries) || !Array.isArray(plaza.data.items)) {
    throw new Error('The CNB changelog or announcements have an unexpected format.');
  }
  const [updater, images] = await Promise.all([
    readUpdater(rawBase, output, product, changelog.data, expectedVersion),
    copyAnnouncementImages(plaza.data, rawBase, publicBase),
  ]);

  await mkdir(output, { recursive: true });
  if (images.size) {
    const imageDirectory = join(output, 'images');
    await mkdir(imageDirectory, { recursive: true });
    for (const [filename, bytes] of images) await writeFile(join(imageDirectory, filename), bytes);
  }
  await writeFile(join(output, 'changelog.json'), changelog.text);
  await writeFile(join(output, 'plaza.json'), images.size ? JSON.stringify(plaza.data, null, 2) + '\n' : plaza.text);
  if (updater) await writeFile(join(output, 'updater.json'), updater.text);
  console.log(`${slug}: ${updater ? updater.data.version : 'awaiting first release'}, ${images.size} announcement images`);
}

const [slug, expectedVersion, ...extra] = process.argv.slice(2);
if (!Object.hasOwn(PRODUCTS, slug) || extra.length) {
  console.error(`Usage: npm run sync:releases -- ${Object.keys(PRODUCTS).join('|')} [version]`);
  process.exitCode = 1;
} else {
  try {
    await sync(slug, PRODUCTS[slug], expectedVersion);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
