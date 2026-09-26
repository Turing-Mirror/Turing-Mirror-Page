// 页面模板：把 content.mjs 的数据渲染成完整的静态 HTML。
import {
  SITE_URL,
  TAGLINE,
  WECHAT_ID,
  QQ_GROUP_ID,
  GITHUB_ORG,
  LOCALES,
  UI,
  PRODUCTS,
  CHANNELS,
  PROMOTIONS
} from "./content.mjs";

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

export function t(value, loc) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[loc.code] ?? value.sc ?? "";
}

export const homePath = (loc) => loc.path;
export const productPath = (loc, product) => `${loc.path}products/${product.slug}/`;
export const absolute = (path) => SITE_URL + path;

const STAGGER = 70;
const delay = (i, base = 0) => `--reveal-delay: ${base + i * STAGGER}ms`;

function externalAttrs(ui) {
  return {
    attrs: 'target="_blank" rel="noopener noreferrer"',
    hint: `<span class="sr-only">（${esc(ui.openNewTab)}）</span>`
  };
}

function jsonLd(data) {
  // 防止 JSON 中的 "</script>" 提前闭合标签。
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function organization(loc) {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Turing Mirror",
    alternateName: ["图灵镜", "圖靈鏡", "チューリングミラー"],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    slogan: TAGLINE,
    description: UI[loc.code].homeDescription,
    sameAs: [...CHANNELS.map((channel) => channel.href), GITHUB_ORG]
  };
}

// ---------- shared chrome ----------

function head({ loc, path, title, description, alternatesFor, assets, graph }) {
  const alternates = LOCALES.map(
    (other) => `    <link rel="alternate" hreflang="${other.htmlLang}" href="${absolute(alternatesFor(other))}">`
  ).join("\n");
  const fallback = LOCALES[0];

  return `<!doctype html>
<html lang="${loc.htmlLang}" data-locale="${loc.code}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#f4f1ea" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#1c1b18" media="(prefers-color-scheme: dark)">
    <link rel="canonical" href="${absolute(path)}">
${alternates}
    <link rel="alternate" hreflang="x-default" href="${absolute(alternatesFor(fallback))}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${assets.css}">
    <script src="${assets.boot}"></script>
    <script src="${assets.js}" defer></script>
    <script type="application/ld+json">
${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
    </script>
  </head>`;
}

function langMenu(loc, alternatesFor) {
  const ui = UI[loc.code];
  const items = LOCALES.map((other) => {
    const current = other.code === loc.code ? ' aria-current="true"' : "";
    return `            <li><a href="${alternatesFor(other)}" hreflang="${other.htmlLang}" lang="${other.htmlLang}" data-locale="${other.code}"${current}>${esc(other.label)}</a></li>`;
  }).join("\n");

  return `        <details class="lang-menu">
          <summary aria-label="${esc(ui.languageLabel)}: ${esc(loc.label)}">
            <span>${esc(loc.label)}</span>
          </summary>
          <ul class="lang-list">
${items}
          </ul>
        </details>`;
}

function topbar(loc, alternatesFor, start = "<span></span>") {
  return `      <header class="topbar">
        ${start}
        <div class="topbar-end">
${langMenu(loc, alternatesFor)}
        </div>
      </header>`;
}

function footer(loc) {
  const ui = UI[loc.code];
  const ext = externalAttrs(ui);
  const year = new Date().getFullYear();
  return `      <footer class="site-footer">
        <span>© ${year} ${esc(ui.copyright)}</span>
        <nav aria-label="${esc(ui.channelsLabel)}">
          <a href="${GITHUB_ORG}" ${ext.attrs}>GitHub${ext.hint}</a>
${CHANNELS.map((c) => `          <a href="${c.href}" ${ext.attrs}>${esc(t(c.name, loc))}${ext.hint}</a>`).join("\n")}
        </nav>
      </footer>`;
}

function page({ loc, headHtml, alternatesFor, topStart, main, bodyClass }) {
  return `${headHtml}
  <body class="${bodyClass}">
    <a class="skip-link" href="#main">${esc(UI[loc.code].skipLink)}</a>
    <div class="shell">
${topbar(loc, alternatesFor, topStart)}

${main}

${footer(loc)}
    </div>
  </body>
</html>
`;
}

// ---------- home ----------

function heroTitle(name) {
  const chars = Array.from(name);
  const spans = chars
    .map((ch, i) => (ch === " " ? " " : `<span class="hero-char" style="--i: ${i}">${esc(ch)}</span>`))
    .join("");
  return { spans, long: chars.length > 6 };
}

function productCard(loc, product, i) {
  const ui = UI[loc.code];
  const alt = t(product.altName, loc);
  return `          <li class="reveal" style="${delay(i)}">
            <a class="p-card" href="${productPath(loc, product)}">
              <span class="p-meta">${esc(t(product.meta, loc))}</span>
              <h3 class="p-name"><span class="p-name-main" style="view-transition-name: product-${product.slug}">${esc(t(product.name, loc))}</span>${alt ? ` <small>${esc(alt)}</small>` : ""}</h3>
              <p class="p-desc">${esc(t(product.summary, loc))}</p>
              <span class="p-more">${esc(ui.learnMore)} <span class="p-arrow" aria-hidden="true">→</span></span>
            </a>
          </li>`;
}

function channelCard(loc, channel, i) {
  const ui = UI[loc.code];
  const ext = externalAttrs(ui);
  const name = t(channel.name, loc);
  return `          <li class="reveal" style="${delay(i)}">
            <a class="channel-card" href="${channel.href}" ${ext.attrs}>
              <span class="channel-arrow" aria-hidden="true">↗</span>
              <span class="channel-name">${esc(name)}</span>
              <span class="channel-handle">@${esc(ui.siteName)}</span>
              <span class="channel-id">${esc(t(channel.id, loc))}</span>${ext.hint}
            </a>
          </li>`;
}

function promo(loc, promotion) {
  const ui = UI[loc.code];
  const ext = externalAttrs(ui);
  return `        <a class="promo reveal" href="${promotion.href}" target="_blank" rel="sponsored noopener noreferrer">
          <span class="promo-tag">${esc(ui.promoTag)}</span>
          <span class="promo-body"><strong>${esc(t(promotion.name, loc))}</strong><span class="promo-sep" aria-hidden="true">·</span>${esc(t(promotion.description, loc))}</span>
          <span class="promo-go" aria-hidden="true">↗</span>${ext.hint}
        </a>`;
}

export function renderHome(loc, assets) {
  const ui = UI[loc.code];
  const alternatesFor = (other) => homePath(other);
  const path = homePath(loc);
  const title = heroTitle(ui.siteName);

  const graph = [
    organization(loc),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: ui.siteTitle,
      inLanguage: LOCALES.map((other) => other.htmlLang),
      publisher: { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${absolute(path)}#webpage`,
      url: absolute(path),
      name: ui.siteTitle,
      description: ui.homeDescription,
      inLanguage: loc.htmlLang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        name: ui.productsLabel,
        itemListElement: PRODUCTS.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absolute(productPath(loc, product)),
          name: t(product.name, loc)
        }))
      }
    }
  ];

  const headHtml = head({
    loc,
    path,
    title: ui.siteTitle,
    description: ui.homeDescription,
    alternatesFor,
    assets,
    graph
  });

  const main = `      <main class="home" id="main">
        <section class="hero" aria-label="${esc(ui.siteTitle)}">
          <div class="hero-title-stack" data-mirror>
            <h1 class="hero-title${title.long ? " is-long" : ""}" aria-label="${esc(ui.siteName)}"><span aria-hidden="true">${title.spans}</span></h1>
            <span class="hero-mirror${title.long ? " is-long" : ""}" aria-hidden="true"><span class="hero-mirror-inner">${esc(ui.siteName)}</span></span>
          </div>
          <p class="hero-tagline" lang="en">${esc(TAGLINE)}</p>
          <p class="hero-intro">${esc(ui.heroIntro)}</p>
        </section>

        <section aria-labelledby="products-label">
          <h2 class="section-label reveal" id="products-label">${esc(ui.productsLabel)}</h2>
          <ul class="p-grid">
${PRODUCTS.map((product, i) => productCard(loc, product, i)).join("\n")}
          </ul>
        </section>

        <section aria-labelledby="channels-label">
          <h2 class="section-label reveal" id="channels-label">${esc(ui.channelsLabel)}</h2>
          <ul class="channel-grid">
${CHANNELS.map((channel, i) => channelCard(loc, channel, i)).join("\n")}
          </ul>
        </section>

        <section aria-labelledby="reach-label">
          <h2 class="section-label reveal" id="reach-label">${esc(ui.reachLabel)}</h2>
          <dl class="reach reveal">
            <dt>${esc(ui.contactLabel)}</dt>
            <dd>
              <button class="copy-chip" type="button" data-copy="${WECHAT_ID}" data-hint="${esc(ui.copyHint)}" data-done="${esc(ui.copyDone)}" aria-label="${esc(ui.contactValue)}. ${esc(ui.copyHint)}.">
                <span class="copy-value">${esc(ui.contactValue)}</span>
                <span class="copy-hint" aria-live="polite">${esc(ui.copyHint)}</span>
              </button>
            </dd>
            <dt>${esc(ui.communityLabel)}</dt>
            <dd>
              <button class="copy-chip" type="button" data-copy="${QQ_GROUP_ID}" data-hint="${esc(ui.communityCopyHint)}" data-done="${esc(ui.communityCopyDone)}" data-fallback="${esc(ui.communityQrShown)}" data-reveal="community-qr" aria-controls="community-qr" aria-expanded="false" aria-label="${esc(ui.communityValue)}. ${esc(ui.communityCopyHint)}.">
                <span class="copy-value">${esc(ui.communityValue)}</span>
                <span class="copy-hint" aria-live="polite">${esc(ui.communityCopyHint)}</span>
              </button>
              <div class="qr-panel" id="community-qr">
                <div class="qr-inner">
                  <img src="/assets/qq_group.jpg" alt="${esc(ui.communityQrAlt)}" width="220" height="220" loading="lazy" decoding="async">
                  <p>${esc(ui.communityQrHelp)}</p>
                </div>
              </div>
            </dd>
          </dl>
        </section>

${PROMOTIONS.map((promotion) => promo(loc, promotion)).join("\n")}
      </main>`;

  return page({ loc, headHtml, alternatesFor, main, bodyClass: "page-home" });
}

// ---------- product ----------

function actionButton(loc, action) {
  const ui = UI[loc.code];
  const ext = externalAttrs(ui);
  const cls = action.primary ? "btn btn-primary" : "btn";
  const badge = action.badge ? ` <small>${esc(action.badge)}</small>` : "";
  const arrow = action.external ? ' <span class="btn-arrow" aria-hidden="true">↗</span>' : "";
  const attrs = action.external ? ` ${ext.attrs}` : "";
  const hint = action.external ? ext.hint : "";
  return `            <a class="${cls}" href="${action.href}"${attrs}>${esc(t(action.label, loc))}${badge}${arrow}${hint}</a>`;
}

function screenshots(loc, product) {
  if (!product.screenshots.length) return "";
  const ui = UI[loc.code];
  const shots = product.screenshots
    .map(
      (shot, i) => `          <a class="shot reveal" style="${delay(i)}" href="${shot.src}" data-lightbox aria-label="${esc(t(shot.alt, loc))} - ${esc(ui.enlarge)}">
            <img src="${shot.src}" alt="${esc(t(shot.alt, loc))}" width="${shot.width}" height="${shot.height}"${i ? ' loading="lazy"' : ""} decoding="async">
          </a>`
    )
    .join("\n");
  return `
        <section class="shots${product.screenshots.length === 1 ? " is-single" : ""}" aria-label="${esc(ui.screenshotsLabel)}" data-close-label="${esc(ui.close)}">
${shots}
        </section>`;
}

function features(loc, product) {
  if (!product.features.length) return "";
  const ui = UI[loc.code];
  const ext = externalAttrs(ui);
  const label = product.featuresLabel ? t(product.featuresLabel, loc) : ui.featuresLabel;
  const items = product.features
    .map((feature, i) => {
      const title = feature.href
        ? `<a href="${feature.href}" ${ext.attrs}>${esc(t(feature.title, loc))} <span aria-hidden="true">↗</span>${ext.hint}</a>`
        : esc(t(feature.title, loc));
      return `            <li class="reveal" style="${delay(i % 2)}"><h3>${title}</h3><p>${esc(t(feature.body, loc))}</p></li>`;
    })
    .join("\n");
  return `
        <section aria-labelledby="features-label">
          <h2 class="pd-h2 reveal" id="features-label">${esc(label)}</h2>
          <ul class="features${product.features.some((f) => f.href) ? " is-links" : ""}">
${items}
          </ul>
        </section>`;
}

function steps(loc, product) {
  if (!product.steps.length) return "";
  const ui = UI[loc.code];
  const items = product.steps
    .map(
      (step, i) =>
        `            <li class="reveal" style="${delay(i)}"><h3>${esc(t(step.title, loc))}</h3><p>${esc(t(step.body, loc))}</p></li>`
    )
    .join("\n");
  return `
        <section aria-labelledby="steps-label">
          <h2 class="pd-h2 reveal" id="steps-label">${esc(ui.stepsLabel)}</h2>
          <ol class="steps">
${items}
          </ol>
        </section>`;
}

function faq(loc, product) {
  if (!product.faq.length) return "";
  const ui = UI[loc.code];
  const items = product.faq
    .map(
      (entry) => `            <details class="faq-item">
              <summary>${esc(t(entry.q, loc))}</summary>
              <div class="faq-answer"><p>${esc(t(entry.a, loc))}</p></div>
            </details>`
    )
    .join("\n");
  return `
        <section aria-labelledby="faq-label">
          <h2 class="pd-h2 reveal" id="faq-label">${esc(ui.faqLabel)}</h2>
          <div class="faq reveal">
${items}
          </div>
        </section>`;
}

function notice(loc, product) {
  if (!product.notice) return "";
  const ui = UI[loc.code];
  return `
        <aside class="notice reveal" aria-labelledby="notice-label">
          <h2 id="notice-label">${esc(ui.noticeLabel)}</h2>
          <p>${esc(t(product.notice, loc))}</p>
        </aside>`;
}

function others(loc, product) {
  const ui = UI[loc.code];
  const items = PRODUCTS.filter((other) => other !== product)
    .map((other, i) => {
      const alt = t(other.altName, loc);
      return `            <li class="reveal" style="${delay(i)}"><a href="${productPath(loc, other)}"><span class="others-name">${esc(t(other.name, loc))}${alt ? ` <small>${esc(alt)}</small>` : ""}</span><span class="others-desc">${esc(t(other.lead, loc))}</span><span class="p-arrow" aria-hidden="true">→</span></a></li>`;
    })
    .join("\n");
  return `
        <section aria-labelledby="others-label">
          <h2 class="pd-h2 reveal" id="others-label">${esc(ui.otherProducts)}</h2>
          <ul class="others">
${items}
          </ul>
        </section>`;
}

function productSchema(loc, product) {
  const url = absolute(productPath(loc, product));
  const alt = t(product.altName, loc);
  const github = product.actions.find((action) => action.href.startsWith("https://github.com/"));
  const app = {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: t(product.name, loc),
    alternateName: [...new Set([alt, product.name.sc, product.name.en].filter(Boolean))].filter(
      (name) => name !== t(product.name, loc)
    ),
    description: t(product.intro, loc),
    url,
    applicationCategory: product.schema.applicationCategory,
    operatingSystem: product.schema.operatingSystem,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: product.features.map((feature) => t(feature.title, loc)),
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: loc.htmlLang
  };
  if (product.schema.license) app.license = product.schema.license;
  if (product.schema.downloadUrl) app.downloadUrl = product.schema.downloadUrl;
  if (product.schema.url) app.sameAs = [product.schema.url];
  if (github) app.sameAs = [...(app.sameAs || []), github.href];
  if (product.screenshots.length) app.screenshot = product.screenshots.map((shot) => absolute(shot.src));
  if (!app.alternateName.length) delete app.alternateName;

  const ui = UI[loc.code];
  const graph = [
    organization(loc),
    app,
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: t(product.name, loc),
      inLanguage: loc.htmlLang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${url}#software` }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui.siteName, item: absolute(homePath(loc)) },
        { "@type": "ListItem", position: 2, name: t(product.name, loc), item: url }
      ]
    }
  ];
  if (product.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: loc.htmlLang,
      mainEntity: product.faq.map((entry) => ({
        "@type": "Question",
        name: t(entry.q, loc),
        acceptedAnswer: { "@type": "Answer", text: t(entry.a, loc) }
      }))
    });
  }
  return graph;
}

export function renderProduct(loc, product, assets) {
  const ui = UI[loc.code];
  const alternatesFor = (other) => productPath(other, product);
  const path = productPath(loc, product);
  const name = t(product.name, loc);
  const alt = t(product.altName, loc);

  const headHtml = head({
    loc,
    path,
    title: `${name}${ui.titleSep}${t(product.lead, loc)} | ${ui.siteTitle}`,
    description: `${t(product.summary, loc)} ${t(product.note, loc)}`.trim(),
    alternatesFor,
    assets,
    graph: productSchema(loc, product)
  });

  const back = `<a class="back" href="${homePath(loc)}"><span class="back-arrow" aria-hidden="true">←</span> <span class="back-label">${esc(ui.backHome)}</span></a>`;

  const main = `      <main class="pd" id="main">
        <header class="pd-head">
          <p class="pd-meta reveal">${esc(t(product.pageMeta, loc))}</p>
          <h1 class="pd-title"><span class="pd-title-main" style="view-transition-name: product-${product.slug}">${esc(name)}</span>${alt ? ` <small>${esc(alt)}</small>` : ""}</h1>
          <p class="pd-lead reveal" style="${delay(1)}">${esc(t(product.lead, loc))}</p>
          <p class="pd-intro reveal" style="${delay(2)}">${esc(t(product.intro, loc))}</p>
          <div class="pd-actions reveal" style="${delay(3)}">
${product.actions.map((action) => actionButton(loc, action)).join("\n")}
          </div>
          <p class="pd-note reveal" style="${delay(4)}">${esc(t(product.note, loc))}</p>
        </header>
${screenshots(loc, product)}${features(loc, product)}${steps(loc, product)}${faq(loc, product)}${notice(loc, product)}${others(loc, product)}
      </main>`;

  return page({ loc, headHtml, alternatesFor, topStart: back, main, bodyClass: "page-product" });
}
