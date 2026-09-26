// 页面交互：滚动入场、语言菜单、复制与二维码、截图大图、卡片光斑与标题镜面。
// 文案全部由构建渲染进 HTML（data-* 属性），这里不维护语言数据。

const LOCALE_STORAGE_KEY = "turingmirror:locale";
const LOCALE_MATCH = {
  sc: ["zh-hans", "zh-cn", "zh-sg", "zh"],
  tc: ["zh-hant", "zh-tw", "zh-hk", "zh-mo"],
  en: ["en"],
  ja: ["ja"]
};
const HREFLANG = { sc: "zh-Hans", tc: "zh-Hant", en: "en", ja: "ja" };
// 语言提示用目标语言本身书写，让看不懂当前页的人也能认出来。
const LANG_HINT = {
  sc: "切换到简体中文",
  tc: "切換至繁體中文",
  en: "View in English",
  ja: "日本語で表示"
};

const root = document.documentElement;
const pageLocale = root.dataset.locale || "sc";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

function readStoredLocale() {
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY) || "";
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
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language || ""];
  for (const tag of preferred) {
    const normalized = String(tag).toLowerCase();
    for (const [code, prefixes] of Object.entries(LOCALE_MATCH)) {
      if (prefixes.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}-`))) {
        return code;
      }
    }
  }
  return "";
}

// ---------- scroll reveal ----------

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((node) => node.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
  );
  targets.forEach((node) => observer.observe(node));
}

// ---------- language menu ----------

function initLanguageMenu() {
  const menu = document.querySelector(".lang-menu");
  if (!menu) return;

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-locale]");
    if (link) persistLocale(link.dataset.locale);
  });
  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });

  // 首次访问且浏览器语言与当前页不同：只给出提示，不自动跳转（避免搜索引擎被重定向）。
  if (readStoredLocale()) return;
  const detected = detectLocale();
  if (!detected || detected === pageLocale) return;
  const alternate = document.querySelector(`link[rel="alternate"][hreflang="${HREFLANG[detected]}"]`);
  if (!alternate) return;

  const hint = document.createElement("a");
  hint.className = "lang-hint";
  hint.href = new URL(alternate.href).pathname;
  hint.lang = HREFLANG[detected];
  hint.hreflang = HREFLANG[detected];
  hint.textContent = LANG_HINT[detected];
  hint.addEventListener("click", () => persistLocale(detected));
  menu.before(hint);
}

// ---------- copy chips & QR ----------

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

function flashHint(chip, text, duration) {
  const hint = chip.querySelector(".copy-hint");
  hint.textContent = text;
  chip.classList.remove("is-done");
  void chip.offsetWidth; // 重启动画
  chip.classList.add("is-done");
  window.clearTimeout(chip._resetTimer);
  chip._resetTimer = window.setTimeout(() => {
    chip.classList.remove("is-done");
    hint.textContent = chip.dataset.hint;
  }, duration);
}

function initCopyChips() {
  for (const chip of document.querySelectorAll(".copy-chip")) {
    chip.addEventListener("click", async () => {
      const panel = chip.dataset.reveal ? document.getElementById(chip.dataset.reveal) : null;
      if (panel) {
        panel.classList.add("is-open");
        chip.setAttribute("aria-expanded", "true");
      }

      const copied = await copyText(chip.dataset.copy);
      if (copied) {
        flashHint(chip, chip.dataset.done, panel ? 2200 : 1800);
      } else if (chip.dataset.fallback) {
        flashHint(chip, chip.dataset.fallback, 2200);
      }
    });
  }
}

// ---------- screenshot lightbox ----------

function initLightbox() {
  const gallery = document.querySelector(".shots");
  if (!gallery || typeof HTMLDialogElement !== "function") return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  const image = document.createElement("img");
  const close = document.createElement("button");
  close.type = "button";
  close.className = "lightbox-close";
  close.setAttribute("aria-label", gallery.dataset.closeLabel || "Close");
  close.textContent = "×";
  dialog.append(image, close);
  document.body.append(dialog);

  const shut = () => {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    dialog.classList.add("is-closing");
    const done = () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    };
    if (reduceMotion.matches) done();
    else dialog.addEventListener("animationend", done, { once: true });
  };

  gallery.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-lightbox]");
    if (!link) return;
    event.preventDefault();
    const source = link.querySelector("img");
    image.src = link.href;
    image.alt = source.alt;
    dialog.showModal();
  });
  close.addEventListener("click", shut);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target === image) shut();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    shut();
  });
}

// ---------- pointer effects ----------

function initCardGlow() {
  document.addEventListener(
    "pointermove",
    (event) => {
      if (!finePointer.matches) return;
      const card = event.target.closest?.(".p-card, .channel-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    { passive: true }
  );
}

// 鼠标左右移动时，倒影随之轻微倾斜，像一面有深度的镜子。
function initMirrorTilt() {
  const stack = document.querySelector("[data-mirror]");
  if (!stack) return;
  let frame = 0;
  let target = 0;
  let current = 0;

  const step = () => {
    current += (target - current) * 0.08;
    stack.style.setProperty("--tilt", `${current.toFixed(3)}deg`);
    frame = Math.abs(target - current) > 0.01 ? window.requestAnimationFrame(step) : 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      target = ((event.clientX / window.innerWidth) - 0.5) * -14;
      if (!frame) frame = window.requestAnimationFrame(step);
    },
    { passive: true }
  );
}

initReveal();
initLanguageMenu();
initCopyChips();
initLightbox();
initCardGlow();
initMirrorTilt();
