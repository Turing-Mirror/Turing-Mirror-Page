import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { demoCopy, trmUiReference } from '../src/trm-ui.mjs';
const out = 'dist/demos/trm-ui';
export async function buildDemo(locales) {
  const spec = JSON.parse(await readFile('package.json', 'utf8')).dependencies['trm-ui'];
  if (!spec.endsWith('#' + trmUiReference.revision)) throw new Error('Sync the TRM UI reference to the installed dependency.');
  await mkdir(out, { recursive: true });
  await build({ entryPoints: ['src/demo/main.jsx'], outfile: out + '/demo.js', bundle: true, minify: true, format: 'esm', jsx: 'automatic', target: ['es2022'], define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'eof' });
  execFileSync(process.execPath, ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', 'src/demo/style.css', '-o', out + '/demo.css', '--minify'], { stdio: 'inherit' });
  const hash = async name => createHash('sha256').update(await readFile(out + '/' + name)).digest('hex').slice(0, 10);
  const js = await hash('demo.js'), css = await hash('demo.css');
  await copyFile('node_modules/trm-ui/LICENSE', out + '/LICENSE.txt');
  for (const loc of locales) {
    await mkdir(`${out}/${loc.code}`, { recursive: true });
    await writeFile(`${out}/${loc.code}/index.html`, `<!doctype html><html lang="${loc.htmlLang}" data-locale="${loc.code}" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${demoCopy.heading[loc.code]}</title><link rel="stylesheet" href="../demo.css?v=${css}"><script type="module" src="../demo.js?v=${js}"></script></head><body><div id="root"></div><noscript><a href="${trmUiReference.repository}">${demoCopy.heading[loc.code]}</a></noscript></body></html>`);
  }
}
