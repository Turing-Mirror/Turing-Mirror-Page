import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const PRODUCTS = {
  'rvc-fabric': {
    source: { url: 'https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/git/raw/main/' },
    legacySetupBase: 'https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/releases/download/setup/',
    setupName: version => `RVC-Fabric-Setup-${version}.exe`,
    syncAppJson: true,
  },
  'gpt-sovits-fabric': {
    source: { directory: fileURLToPath(new URL('../../GPT-SoVITS-Fabric-Releases/', import.meta.url)) },
    setupName: version => `GPT-SoVITS-Fabric-Setup-${version}.exe`,
    syncIndexJson: true,
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

function localPath(directory, name) {
  const path = resolve(directory, name);
  const rel = relative(directory, path);
  if (rel === '..' || rel.startsWith('..' + sep) || resolve(path) === resolve(directory)) {
    throw new Error(`Invalid local release file: ${name}`);
  }
  return path;
}

async function readSource(source, name) {
  if (source.directory) return readFile(localPath(source.directory, name));
  const response = await get(new URL(name, source.url));
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function readJson(source, name) {
  const text = (await readSource(source, name)).toString('utf8').replace(/^\uFEFF/, '');
  return { text, data: JSON.parse(text) };
}

function setupUrl(slug, product, version, actual) {
  const filename = encodeURIComponent(product.setupName(version));
  const target = `https://cdn.turingmirror.com/f/${slug}/${filename}`;
  // The remote RVC catalog can still contain the pre-migration address.
  // Only its exact product/version URL is migrated; arbitrary URLs are rejected.
  if (actual !== target && (!product.legacySetupBase || actual !== product.legacySetupBase + filename)) {
    throw new Error('The installer URL does not match the versioned Cloudflare Setup.');
  }
  return target;
}

async function readRelease(slug, product, changelog, expectedVersion) {
  const [updater, index] = await Promise.all([
    readJson(product.source, 'updater.json'), readJson(product.source, 'index.json'),
  ]);
  const { version, platforms } = updater.data;
  const windows = platforms?.['windows-x86_64'];
  const app = index.data?.app;
  if (
    !/^\d+\.\d+\.\d+$/.test(version) ||
    (expectedVersion && version !== expectedVersion) ||
    changelog.entries[0]?.version?.replace(/^v/i, '') !== version ||
    !windows?.signature?.trim() ||
    app?.version !== version || app?.gui?.version !== version ||
    !/^[a-f0-9]{64}$/i.test(app.gui.sha256) ||
    !Number.isSafeInteger(app.gui.size_bytes) || app.gui.size_bytes <= 0
  ) {
    throw new Error('The updater, index and changelog must describe the same signed release.');
  }
  windows.url = setupUrl(slug, product, version, windows.url);
  app.gui.url = setupUrl(slug, product, version, app.gui.url);
  const setup = await get(windows.url, 'HEAD');
  const size = Number(setup.headers.get('content-length'));
  if (!setup.ok || size !== app.gui.size_bytes || /text\/html/i.test(setup.headers.get('content-type') ?? '')) {
    throw new Error(`Cloudflare Setup is unavailable or has the wrong size: ${windows.url}`);
  }
  updater.text = JSON.stringify(updater.data, null, 2) + '\n';
  index.text = JSON.stringify(index.data, null, 2) + '\n';
  return { updater, index };
}

async function copyAnnouncementImages(plaza, source, publicBase) {
  const files = new Map();
  const sources = new Map();
  for (const item of plaza.items) {
    const field = ['image', 'image_url', 'cover'].find(key => typeof item[key] === 'string' && item[key].trim());
    if (!field) continue;
    const value = item[field].trim().replaceAll('\\', '/');
    let filename = sources.get(value);
    if (!filename) {
      let bytes, extension;
      if (source.directory) {
        bytes = await readFile(localPath(source.directory, value));
        extension = extname(value).toLowerCase().replace('.jpeg', '.jpg');
        if (!new Set(IMAGE_EXTENSIONS.values()).has(extension)) {
          throw new Error(`Unsupported local announcement image: ${value}`);
        }
      } else {
        const url = new URL(value.replace(/^\/+/, ''), source.url);
        if (url.protocol !== 'https:' || !(url.hostname === 'cnb.cool' || url.hostname.endsWith('.cnb.cool'))) {
          throw new Error(`Announcement image must have a CNB URL: ${value}`);
        }
        const response = await get(url);
        extension = IMAGE_EXTENSIONS.get(response.headers.get('content-type')?.split(';')[0]);
        if (!response.ok || !extension) throw new Error(`Cannot read announcement image ${url.href}`);
        bytes = Buffer.from(await response.arrayBuffer());
      }
      filename = `${createHash('sha256').update(bytes).digest('hex')}${extension}`;
      files.set(filename, bytes);
      sources.set(value, filename);
    }
    item[field] = new URL(`images/${filename}`, publicBase).href;
  }
  return files;
}

export async function sync(slug, product, expectedVersion, output = fileURLToPath(new URL(`../public/releases/${slug}/`, import.meta.url))) {
  const publicBase = `https://www.turingmirror.com/releases/${slug}/`;
  const [changelog, plaza] = await Promise.all(
    ['changelog.json', 'plaza.json'].map(file => readJson(product.source, file)));
  if (!Array.isArray(changelog.data.entries) || !Array.isArray(plaza.data.items)) {
    throw new Error('The changelog or announcements have an unexpected format.');
  }
  const [{ updater, index }, images] = await Promise.all([
    readRelease(slug, product, changelog.data, expectedVersion),
    copyAnnouncementImages(plaza.data, product.source, publicBase),
  ]);
  await mkdir(output, { recursive: true });
  if (images.size) {
    const imageDirectory = join(output, 'images');
    await mkdir(imageDirectory, { recursive: true });
    for (const [filename, bytes] of images) await writeFile(join(imageDirectory, filename), bytes);
  }
  await writeFile(join(output, 'changelog.json'), changelog.text);
  await writeFile(join(output, 'plaza.json'), images.size ? JSON.stringify(plaza.data, null, 2) + '\n' : plaza.text);
  await writeFile(join(output, 'updater.json'), updater.text);
  if (product.syncAppJson) await writeFile(join(output, 'app.json'), JSON.stringify({ app: index.data.app }, null, 2) + '\n');
  if (product.syncIndexJson) await writeFile(join(output, 'index.json'), index.text);
  console.log(`${slug}: ${updater.data.version}, ${images.size} announcement images`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
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
}
