// Submit explicitly selected, published URLs. A successful response is not proof of indexing.
import { readFile } from 'node:fs/promises';
import { SITE_URL } from '../src/content.mjs';

const paths = process.argv.slice(2);
if (!paths.length) throw new Error('Usage: node scripts/submit-indexnow.mjs /changed/page/ [...]');
const urlList = [...new Set(paths.map(path => new URL(path, SITE_URL).href))];
if (urlList.some(url => new URL(url).origin !== SITE_URL)) throw new Error('Only this website may be submitted.');
const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();
const keyLocation = `${SITE_URL}/indexnow-key.txt`;
const headers = { 'User-Agent': `TuringMirrorIndexNow/1.0 (+${SITE_URL}/)` };
const published = await fetch(keyLocation, { headers, signal: AbortSignal.timeout(30000) });
if (!published.ok || (await published.text()).trim() !== key) throw new Error('Publish the matching key file before submission.');
const endpoint = 'https://www.bing.com/indexnow';
const response = await fetch(endpoint, {
  method: 'POST', headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE_URL).hostname, key, keyLocation, urlList }),
  signal: AbortSignal.timeout(30000)
});
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), endpoint, status: response.status,
  result: response.status === 200 ? 'received' : response.status === 202 ? 'received; key validation pending' : 'failed',
  urlList, response: await response.text() }, null, 2));
if (![200, 202].includes(response.status)) process.exitCode = 1;
