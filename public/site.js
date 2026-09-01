const CANONICAL_HOST = "www.turingmirror.com";
const APEX_HOST = "turingmirror.com";
const LOCALE_STORAGE_KEY = "turingmirror:locale";
const WECHAT_ID = "_UshioNoa";
const QQ_GROUP_ID = "1077458748";
const TAGLINE = "Touching the setsuna, reaching the future.";

const LOCALES = [
  { code: "sc", label: "简体中文", htmlLang: "zh-Hans", match: ["zh-hans", "zh-cn", "zh-sg", "zh"] },
  { code: "tc", label: "繁體中文", htmlLang: "zh-Hant", match: ["zh-hant", "zh-tw", "zh-hk", "zh-mo"] },
  { code: "en", label: "English", htmlLang: "en", match: ["en"] },
  { code: "ja", label: "日本語", htmlLang: "ja", match: ["ja"] }
];

const COPY = {
  sc: {
    siteName: "图灵镜",
    pageTitle: "图灵镜 Turing Mirror",
    metaDescription: `图灵镜 Turing Mirror。${TAGLINE}`,
    languageLabel: "语言",
    productsLabel: "产品",
    channelsLabel: "频道",
    contactLabel: "合作 / 商务",
    communityLabel: "社区 QQ 群",
    communityValue: "群号 " + QQ_GROUP_ID,
    contactValue: `微信号 ${WECHAT_ID}`,
    copyHint: "点击复制",
    copyDone: "已复制",
    communityCopyHint: "点击复制并展示二维码",
    communityCopyDone: "已复制，二维码已展示",
    communityQrShown: "二维码已展示",
    communityQrAlt: "图灵镜社区 QQ 群二维码",
    communityQrHelp: "使用 QQ 扫码加入社区",
    openNewTab: "在新标签页打开"
  },
  tc: {
    siteName: "圖靈鏡",
    pageTitle: "圖靈鏡 Turing Mirror",
    metaDescription: `圖靈鏡 Turing Mirror。${TAGLINE}`,
    languageLabel: "語言",
    productsLabel: "產品",
    channelsLabel: "頻道",
    contactLabel: "合作 / 商務",
    communityLabel: "社群 QQ 群",
    communityValue: "群號 " + QQ_GROUP_ID,
    contactValue: `微信號 ${WECHAT_ID}`,
    copyHint: "點擊複製",
    copyDone: "已複製",
    communityCopyHint: "點擊複製並展示 QR 碼",
    communityCopyDone: "已複製，QR 碼已展示",
    communityQrShown: "QR 碼已展示",
    communityQrAlt: "圖靈鏡社群 QQ 群 QR 碼",
    communityQrHelp: "使用 QQ 掃描加入社群",
    openNewTab: "於新分頁開啟"
  },
  en: {
    siteName: "Turing Mirror",
    pageTitle: "Turing Mirror",
    metaDescription: `Turing Mirror. ${TAGLINE}`,
    languageLabel: "Language",
    productsLabel: "Products",
    channelsLabel: "Channels",
    contactLabel: "Partnership / Business",
    communityLabel: "QQ Community",
    communityValue: "Group " + QQ_GROUP_ID,
    contactValue: `WeChat ${WECHAT_ID}`,
    copyHint: "Click to copy",
    copyDone: "Copied",
    communityCopyHint: "Copy the group number and show the QR code",
    communityCopyDone: "Copied, QR code shown",
    communityQrShown: "QR code shown",
    communityQrAlt: "Turing Mirror QQ community group QR code",
    communityQrHelp: "Scan with QQ to join the community",
    openNewTab: "Open in a new tab"
  },
  ja: {
    siteName: "チューリングミラー",
    pageTitle: "チューリングミラー Turing Mirror",
    metaDescription: `チューリングミラー Turing Mirror。${TAGLINE}`,
    languageLabel: "言語",
    productsLabel: "プロダクト",
    channelsLabel: "チャンネル",
    contactLabel: "コラボ / ビジネス",
    communityLabel: "QQ コミュニティ",
    communityValue: "グループ " + QQ_GROUP_ID,
    contactValue: `WeChat ${WECHAT_ID}`,
    copyHint: "クリックでコピー",
    copyDone: "コピーしました",
    communityCopyHint: "グループ番号をコピーして QR コードを表示",
    communityCopyDone: "コピーしました。QR コードを表示しました",
    communityQrShown: "QR コードを表示しました",
    communityQrAlt: "チューリングミラー QQ コミュニティの QR コード",
    communityQrHelp: "QQ でスキャンしてコミュニティに参加",
    openNewTab: "新しいタブで開く"
  }
};

const PRODUCT_LINK_LABELS = {
  github: "GitHub",
  download: {
    sc: "下载",
    tc: "下載",
    en: "Download",
    ja: "ダウンロード"
  },
  visit: {
    sc: "前往",
    tc: "前往",
    en: "Visit",
    ja: "アクセス"
  }
};

const PRODUCTS = [
  {
    name: {
      sc: "RVC Fabric",
      tc: "RVC Fabric",
      en: "RVC Fabric",
      ja: "RVC Fabric"
    },
    description: {
      sc: "高性能实时 AI 变声桌面客户端",
      tc: "高效能即時 AI 變聲桌面客戶端",
      en: "High-performance real-time AI voice changer desktop client",
      ja: "高性能リアルタイム AI ボイスチェンジャーのデスクトップクライアント"
    },
    links: [
      { href: "https://github.com/Turing-Mirror/RVC-Fabric", label: "github" },
      { href: "https://cdn.turingmirror.com/d/rvc-fabric-setup", label: "download" }
    ]
  },
  {
    name: {
      sc: "喵言喵",
      tc: "喵言喵",
      en: "MoeText",
      ja: "MoeText"
    },
    description: {
      sc: "聊天文本自动美化工具",
      tc: "聊天文本自動美化工具",
      en: "Automatic chat-text beautifier",
      ja: "チャットテキスト自動美化ツール"
    },
    links: [
      { href: "https://github.com/Turing-Mirror/MoeText", label: "github" },
      { href: "https://cdn.turingmirror.com/d/moetype", label: "download" }
    ]
  },
  {
    name: {
      sc: "图灵镜 UI (TRM UI)",
      tc: "圖靈鏡 UI (TRM UI)",
      en: "Turing Mirror UI (TRM UI)",
      ja: "チューリングミラー UI (TRM UI)"
    },
    description: {
      sc: "图灵镜桌面产品的 UI/UX 模板",
      tc: "圖靈鏡桌面產品的 UI/UX 模板",
      en: "UI/UX template for Turing Mirror desktop products",
      ja: "チューリングミラーのデスクトップ製品向け UI/UX テンプレート"
    },
    links: [{ href: "https://github.com/Turing-Mirror/TRM-UI", label: "github" }]
  },
  {
    name: {
      sc: "测试镜 (Mirror-Test)",
      tc: "測試鏡 (Mirror-Test)",
      en: "Mirror-Test",
      ja: "Mirror-Test"
    },
    description: {
      sc: "Meme 趣味测试",
      tc: "Meme 趣味測試",
      en: "Meme-style fun tests",
      ja: "Meme 系のおもしろテスト"
    },
    links: [
      { href: "https://github.com/Turing-Mirror/Mirror-Test", label: "github" },
      { href: "https://test.turingmirror.com/", label: "visit" }
    ]
  }
];

const CHANNELS = [
  {
    href: "https://space.bilibili.com/3546871148579062",
    name: {
      sc: "哔哩哔哩",
      tc: "嗶哩嗶哩",
      en: "Bilibili",
      ja: "ビリビリ"
    },
    id: "UID 3546871148579062"
  },
  {
    href: "https://v.douyin.com/6NxXcrKK9cc",
    name: {
      sc: "抖音",
      tc: "抖音",
      en: "Douyin",
      ja: "抖音（Douyin）"
    },
    id: {
      sc: "抖音号 TuringMirror",
      tc: "抖音號 TuringMirror",
      en: "Douyin ID TuringMirror",
      ja: "抖音 ID TuringMirror"
    }
  },
  {
    href: "https://www.xiaohongshu.com/user/profile/65f56bf1000000000b00e094",
    name: {
      sc: "小红书",
      tc: "小紅書",
      en: "Xiaohongshu",
      ja: "小紅書（RED）"
    },
    id: {
      sc: "小红书号 TuringMirror",
      tc: "小紅書號 TuringMirror",
      en: "Xiaohongshu ID TuringMirror",
      ja: "小紅書 ID TuringMirror"
    }
  }
];

const dom = {
  langSelect: document.getElementById("lang-select"),
  langLabel: document.getElementById("lang-label"),
  siteName: document.getElementById("site-name"),
  siteNameMirror: document.getElementById("site-name-mirror"),
  productsLabel: document.getElementById("products-label"),
  productGrid: document.getElementById("product-grid"),
  channelsLabel: document.getElementById("channels-label"),
  channelGrid: document.getElementById("channel-grid"),
  contactLabel: document.getElementById("contact-label"),
  contactCopy: document.getElementById("contact-copy"),
  contactCopyValue: document.getElementById("contact-copy-value"),
  contactCopyHint: document.getElementById("contact-copy-hint"),
  communityLabel: document.getElementById("community-label"),
  communityCopy: document.getElementById("community-copy"),
  communityCopyValue: document.getElementById("community-copy-value"),
  communityCopyHint: document.getElementById("community-copy-hint"),
  communityQr: document.getElementById("community-qr"),
  communityQrImage: document.getElementById("community-qr-image"),
  communityQrHelp: document.getElementById("community-qr-help"),
  pageDescription: document.querySelector('meta[name="description"]'),
  ogTitle: document.querySelector('meta[property="og:title"]'),
  ogDescription: document.querySelector('meta[property="og:description"]'),
  twitterTitle: document.querySelector('meta[name="twitter:title"]'),
  twitterDescription: document.querySelector('meta[name="twitter:description"]')
};

let currentLocale = "sc";
let contactCopyFeedbackTimer = 0;
let communityCopyFeedbackTimer = 0;

function isSupportedLocale(locale) {
  return LOCALES.some((item) => item.code === locale);
}

function getCopy(locale = currentLocale) {
  return COPY[locale] || COPY.sc;
}

function localized(value, locale = currentLocale) {
  if (typeof value === "string") {
    return value;
  }

  return value[locale] || value.sc;
}

function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isSupportedLocale(stored) ? stored : "";
  } catch {
    return "";
  }
}

function persistLocale(locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}
}

function detectLocale() {
  const preferred = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ""];

  for (const tag of preferred) {
    const normalized = String(tag).toLowerCase();

    for (const locale of LOCALES) {
      if (locale.match.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}-`))) {
        return locale.code;
      }
    }
  }

  return "sc";
}

function buildLanguageSelect() {
  const fragment = document.createDocumentFragment();

  for (const locale of LOCALES) {
    const option = document.createElement("option");
    option.value = locale.code;
    option.textContent = locale.label;
    fragment.append(option);
  }

  dom.langSelect.append(fragment);
  dom.langSelect.addEventListener("change", (event) => {
    setLocale(event.target.value);
    persistLocale(currentLocale);
  });
}

function buildProducts() {
  const copy = getCopy();
  const fragment = document.createDocumentFragment();

  for (const product of PRODUCTS) {
    const item = document.createElement("li");
    const card = document.createElement("article");
    card.className = "product-card";

    const nameNode = document.createElement("h3");
    nameNode.className = "product-name";
    nameNode.textContent = localized(product.name);

    const descriptionNode = document.createElement("p");
    descriptionNode.className = "product-description";
    descriptionNode.textContent = localized(product.description);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    for (const productLink of product.links) {
      const label = localized(PRODUCT_LINK_LABELS[productLink.label]);
      const link = document.createElement("a");
      link.className = "product-link";
      link.href = productLink.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      link.setAttribute(
        "aria-label",
        localized(product.name) + " - " + label + ". " + copy.openNewTab + "."
      );
      actions.append(link);
    }

    card.append(nameNode, descriptionNode, actions);
    item.append(card);
    fragment.append(item);
  }

  dom.productGrid.replaceChildren(fragment);
}

function buildChannels() {
  const copy = getCopy();
  const fragment = document.createDocumentFragment();

  for (const channel of CHANNELS) {
    const name = localized(channel.name);
    const id = localized(channel.id);

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "channel-card";
    link.href = channel.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${name} @${copy.siteName} - ${id}. ${copy.openNewTab}.`);

    const arrow = document.createElement("span");
    arrow.className = "channel-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    const nameNode = document.createElement("span");
    nameNode.className = "channel-name";
    nameNode.textContent = name;

    const handleNode = document.createElement("span");
    handleNode.className = "channel-handle";
    handleNode.textContent = `@${copy.siteName}`;

    const idNode = document.createElement("span");
    idNode.className = "channel-id";
    idNode.textContent = id;

    link.append(arrow, nameNode, handleNode, idNode);
    item.append(link);
    fragment.append(item);
  }

  dom.channelGrid.replaceChildren(fragment);
}

function setLocale(locale) {
  currentLocale = isSupportedLocale(locale) ? locale : "sc";

  const localeConfig = LOCALES.find((item) => item.code === currentLocale);
  const copy = getCopy();

  document.documentElement.lang = localeConfig.htmlLang;
  document.title = copy.pageTitle;
  dom.pageDescription.setAttribute("content", copy.metaDescription);
  dom.ogTitle.setAttribute("content", copy.pageTitle);
  dom.ogDescription.setAttribute("content", copy.metaDescription);
  dom.twitterTitle.setAttribute("content", copy.pageTitle);
  dom.twitterDescription.setAttribute("content", copy.metaDescription);

  dom.langLabel.textContent = copy.languageLabel;
  dom.langSelect.setAttribute("aria-label", copy.languageLabel);
  dom.langSelect.value = currentLocale;
  dom.siteName.textContent = copy.siteName;
  dom.siteNameMirror.textContent = copy.siteName;
  dom.productsLabel.textContent = copy.productsLabel;
  dom.productGrid.setAttribute("aria-label", copy.productsLabel);
  dom.channelsLabel.textContent = copy.channelsLabel;
  dom.channelGrid.setAttribute("aria-label", copy.channelsLabel);
  dom.contactLabel.textContent = copy.contactLabel;
  dom.contactCopyValue.textContent = copy.contactValue;
  dom.contactCopy.setAttribute("aria-label", `${copy.contactValue}. ${copy.copyHint}.`);
  dom.communityLabel.textContent = copy.communityLabel;
  dom.communityCopyValue.textContent = copy.communityValue;
  dom.communityCopy.setAttribute(
    "aria-label",
    copy.communityValue + ". " + copy.communityCopyHint + "."
  );
  dom.communityQrImage.alt = copy.communityQrAlt;
  dom.communityQrHelp.textContent = copy.communityQrHelp;

  if (!contactCopyFeedbackTimer) {
    dom.contactCopyHint.textContent = copy.copyHint;
  }
  if (!communityCopyFeedbackTimer) {
    dom.communityCopyHint.textContent = copy.communityCopyHint;
  }

  buildProducts();
  buildChannels();
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

function bindContactCopy() {
  dom.contactCopy.addEventListener("click", async () => {
    const copied = await copyText(WECHAT_ID);

    if (!copied) {
      return;
    }

    const copy = getCopy();
    dom.contactCopyHint.textContent = copy.copyDone;
    window.clearTimeout(contactCopyFeedbackTimer);
    contactCopyFeedbackTimer = window.setTimeout(() => {
      contactCopyFeedbackTimer = 0;
      dom.contactCopyHint.textContent = getCopy().copyHint;
    }, 1800);
  });
}

function bindCommunityCopy() {
  dom.communityCopy.addEventListener("click", async () => {
    dom.communityQr.hidden = false;
    dom.communityCopy.setAttribute("aria-expanded", "true");

    const copied = await copyText(QQ_GROUP_ID);
    const copy = getCopy();
    dom.communityCopyHint.textContent = copied ? copy.communityCopyDone : copy.communityQrShown;
    window.clearTimeout(communityCopyFeedbackTimer);
    communityCopyFeedbackTimer = window.setTimeout(() => {
      communityCopyFeedbackTimer = 0;
      dom.communityCopyHint.textContent = getCopy().communityCopyHint;
    }, 2200);
  });
}

function init() {
  buildLanguageSelect();
  bindContactCopy();
  bindCommunityCopy();
  setLocale(readStoredLocale() || detectLocale());
  document.body.classList.add("is-ready");
}

if (window.location.hostname === APEX_HOST) {
  const target = new URL(window.location.href);
  target.protocol = "https:";
  target.hostname = CANONICAL_HOST;
  target.port = "";
  window.location.replace(target.toString());
} else {
  init();
}
