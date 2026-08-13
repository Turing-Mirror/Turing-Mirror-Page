const CANONICAL_HOST = "www.turingmirror.com";
const APEX_HOST = "turingmirror.com";
const LOCALE_STORAGE_KEY = "turingmirror:locale";
const WECHAT_ID = "_UshioNoa";
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
    channelsLabel: "频道",
    contactLabel: "合作 / 商务",
    contactValue: `微信号 ${WECHAT_ID}`,
    copyHint: "点击复制",
    copyDone: "已复制",
    openNewTab: "在新标签页打开"
  },
  tc: {
    siteName: "圖靈鏡",
    pageTitle: "圖靈鏡 Turing Mirror",
    metaDescription: `圖靈鏡 Turing Mirror。${TAGLINE}`,
    languageLabel: "語言",
    channelsLabel: "頻道",
    contactLabel: "合作 / 商務",
    contactValue: `微信號 ${WECHAT_ID}`,
    copyHint: "點擊複製",
    copyDone: "已複製",
    openNewTab: "於新分頁開啟"
  },
  en: {
    siteName: "Turing Mirror",
    pageTitle: "Turing Mirror",
    metaDescription: `Turing Mirror. ${TAGLINE}`,
    languageLabel: "Language",
    channelsLabel: "Channels",
    contactLabel: "Partnership / Business",
    contactValue: `WeChat ${WECHAT_ID}`,
    copyHint: "Click to copy",
    copyDone: "Copied",
    openNewTab: "Open in a new tab"
  },
  ja: {
    siteName: "チューリングミラー",
    pageTitle: "チューリングミラー Turing Mirror",
    metaDescription: `チューリングミラー Turing Mirror。${TAGLINE}`,
    languageLabel: "言語",
    channelsLabel: "チャンネル",
    contactLabel: "コラボ / ビジネス",
    contactValue: `WeChat ${WECHAT_ID}`,
    copyHint: "クリックでコピー",
    copyDone: "コピーしました",
    openNewTab: "新しいタブで開く"
  }
};

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
  channelsLabel: document.getElementById("channels-label"),
  channelGrid: document.getElementById("channel-grid"),
  contactLabel: document.getElementById("contact-label"),
  contactCopy: document.getElementById("contact-copy"),
  contactCopyValue: document.getElementById("contact-copy-value"),
  contactCopyHint: document.getElementById("contact-copy-hint"),
  pageDescription: document.querySelector('meta[name="description"]'),
  ogTitle: document.querySelector('meta[property="og:title"]'),
  ogDescription: document.querySelector('meta[property="og:description"]'),
  twitterTitle: document.querySelector('meta[name="twitter:title"]'),
  twitterDescription: document.querySelector('meta[name="twitter:description"]')
};

let currentLocale = "sc";
let copyFeedbackTimer = 0;

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
  dom.ogDescription.setAttribute("content", TAGLINE);
  dom.twitterTitle.setAttribute("content", copy.pageTitle);
  dom.twitterDescription.setAttribute("content", TAGLINE);

  dom.langLabel.textContent = copy.languageLabel;
  dom.langSelect.setAttribute("aria-label", copy.languageLabel);
  dom.langSelect.value = currentLocale;
  dom.siteName.textContent = copy.siteName;
  dom.siteNameMirror.textContent = copy.siteName;
  dom.channelsLabel.textContent = copy.channelsLabel;
  dom.channelGrid.setAttribute("aria-label", copy.channelsLabel);
  dom.contactLabel.textContent = copy.contactLabel;
  dom.contactCopyValue.textContent = copy.contactValue;
  dom.contactCopy.setAttribute("aria-label", `${copy.contactValue}. ${copy.copyHint}.`);

  if (!copyFeedbackTimer) {
    dom.contactCopyHint.textContent = copy.copyHint;
  }

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
    window.clearTimeout(copyFeedbackTimer);
    copyFeedbackTimer = window.setTimeout(() => {
      copyFeedbackTimer = 0;
      dom.contactCopyHint.textContent = getCopy().copyHint;
    }, 1800);
  });
}

function init() {
  buildLanguageSelect();
  bindContactCopy();
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
