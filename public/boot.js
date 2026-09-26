// 在首次渲染前执行（head 中同步加载，体积保持极小）：
// 1. 裸域跳转到 www；2. 默认语言页按已保存的语言偏好跳转；
// 3. 标记 JS 可用，入场动画才会隐藏元素；4. 跨页 View Transition 时跳过入场动画，避免与形变冲突。
(function () {
  var CANONICAL_HOST = "www.turingmirror.com";
  var APEX_HOST = "turingmirror.com";
  var LOCALE_STORAGE_KEY = "turingmirror:locale";
  var HREFLANG = { sc: "zh-Hans", tc: "zh-Hant", en: "en", ja: "ja" };
  var root = document.documentElement;

  if (location.hostname === APEX_HOST) {
    location.replace("https://" + CANONICAL_HOST + location.pathname + location.search + location.hash);
    return;
  }

  var stored = "";
  try {
    stored = localStorage.getItem(LOCALE_STORAGE_KEY) || "";
  } catch (error) {}

  // 只从默认语言（x-default）页面跳转，直接访问 /en/ 等地址时尊重该地址。
  if (stored && stored !== "sc" && root.getAttribute("data-locale") === "sc" && HREFLANG[stored]) {
    var alternate = document.querySelector('link[rel="alternate"][hreflang="' + HREFLANG[stored] + '"]');
    if (alternate) {
      // 只取路径，预览域名（*.pages.dev）与本地开发时同样可用。
      location.replace(new URL(alternate.href).pathname + location.hash);
      return;
    }
  }

  root.classList.add("js");

  window.addEventListener("pagereveal", function (event) {
    if (event.viewTransition) {
      root.classList.add("vt-nav");
    }
  });
})();
