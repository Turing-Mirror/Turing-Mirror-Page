import { buildDemo } from "./build-demo.mjs";
import { trmUiReference } from "../src/trm-ui.mjs";

// 生成 dist/：复制 public/ 中的静态资源，再为每种语言渲染首页与产品页，
// 并生成 sitemap.xml 与 llms.txt。用法：node scripts/build.mjs
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE_URL, TAGLINE, WECHAT_ID, QQ_GROUP_ID, GITHUB_ORG, LOCALES, UI, PRODUCTS, CHANNELS } from "../src/content.mjs";
import { absolute, homePath, productPath, renderHome, renderProduct, t } from "../src/render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const outDir = join(root, "dist");

async function versioned(file) {
  const content = await readFile(join(publicDir, file));
  const hash = createHash("sha256").update(content).digest("hex").slice(0, 10);
  return `/${file}?v=${hash}`;
}

async function versionedMotion() {
  const hash = createHash("sha256").update(await readFile(join(outDir, "trm-motion.css"))).digest("hex").slice(0, 10);
  return `/trm-motion.css?v=${hash}`;
}

async function emit(path, html) {
  const file = join(outDir, path, path.endsWith("/") ? "index.html" : "");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

function sitemap() {
  const groups = [(loc) => homePath(loc), ...PRODUCTS.map((product) => (loc) => productPath(loc, product))];
  const urls = groups.flatMap((pathFor) =>
    LOCALES.map((loc) => {
      const alternates = LOCALES.map(
        (other) => `    <xhtml:link rel="alternate" hreflang="${other.htmlLang}" href="${absolute(pathFor(other))}"/>`
      );
      alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(pathFor(LOCALES[0]))}"/>`);
      return `  <url>
    <loc>${absolute(pathFor(loc))}</loc>
${alternates.join("\n")}
  </url>`;
    })
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

// https://llmstxt.org/ ：给大模型与 AI 搜索读的站点摘要。
function llms() {
  const en = LOCALES.find((loc) => loc.code === "en");
  const sc = LOCALES[0];
  const products = PRODUCTS.map((product) => {
    const names = [...new Set([t(product.name, en), t(product.name, sc), t(product.altName, sc)].filter(Boolean))];
    const links = product.actions.map((action) => `${t(action.label, en)}: ${action.href}`).join("; ");
    return `### ${names.join(" / ")}

${t(product.intro, en)}

- Platform: ${t(product.meta, en)}
- ${t(product.note, en)}
- Page: ${absolute(productPath(en, product))} (简体中文: ${absolute(productPath(sc, product))})
- Links: ${links}
${product.features.map((feature) => `- ${t(feature.title, en)}: ${t(feature.body, en)}`).join("\n")}`;
  }).join("\n\n");

  return `# Turing Mirror (图灵镜)

> ${TAGLINE}

Turing Mirror (Chinese: 图灵镜, Traditional: 圖靈鏡, Japanese: チューリングミラー) — official website. All products below are free. The site is available in Simplified Chinese (${absolute(homePath(sc))}), Traditional Chinese, English (${absolute(homePath(en))}) and Japanese.

## Products

${products}

## Channels

${CHANNELS.map((channel) => `- ${t(channel.name, en)}: ${channel.href} (${t(channel.id, en)})`).join("\n")}
- GitHub: ${GITHUB_ORG}

## Contact

- Business: WeChat ${WECHAT_ID}
- Community: QQ group ${QQ_GROUP_ID}
`;
}

async function build() {
  await rm(outDir, { recursive: true, force: true });
  await cp(publicDir, outDir, { recursive: true });

  const assets = {
    css: await versioned("site.css"),
    js: await versioned("site.js"),
    boot: await versioned("boot.js")
  };

  await buildDemo(LOCALES);
  await writeFile(join(outDir, "trm-motion.css"), `:root { --tm-flow: ${trmUiReference.duration}ms; --tm-stagger: ${trmUiReference.stagger}ms; --tm-slow: ${trmUiReference.entrance}ms; --tm-settle: ${trmUiReference.easing}; }\n`);
  assets.motion = await versionedMotion();
  let pages = 0;
  for (const loc of LOCALES) {
    await emit(homePath(loc), renderHome(loc, assets));
    pages += 1;
    for (const product of PRODUCTS) {
      await emit(productPath(loc, product), renderProduct(loc, product, assets));
      pages += 1;
    }
  }

  await writeFile(join(outDir, "sitemap.xml"), sitemap());
  await writeFile(join(outDir, "llms.txt"), llms());
  console.log(`Built ${pages} pages for ${SITE_URL} into dist/`);
}

await build();
