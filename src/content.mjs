import { rvcFabricProduct } from "./rvc-fabric.mjs";
import { trmUiProduct } from "./trm-ui.mjs";

// 站点内容的唯一数据源。scripts/build.mjs 读取这里，为每种语言生成静态页面。
// 可本地化的字段写成 { sc, tc, en, ja }；缺失的语言回落到 sc。

export const SITE_URL = "https://www.turingmirror.com";
export const TAGLINE = "Touching the setsuna, reaching the future.";
export const WECHAT_ID = "_UshioNoa";
export const QQ_GROUP_ID = "1077458748";
export const GITHUB_ORG = "https://github.com/Turing-Mirror";

// path 为该语言首页的路径；sc 为默认语言（x-default）。
export const LOCALES = [
  { code: "sc", label: "简体中文", htmlLang: "zh-Hans", path: "/" },
  { code: "tc", label: "繁體中文", htmlLang: "zh-Hant", path: "/zh-hant/" },
  { code: "en", label: "English", htmlLang: "en", path: "/en/" },
  { code: "ja", label: "日本語", htmlLang: "ja", path: "/ja/" }
];

export const UI = {
  sc: {
    skipLink: "跳到正文",
    siteName: "图灵镜",
    siteTitle: "图灵镜 Turing Mirror",
    brandShort: "图灵镜",
    homeDescription: "图灵镜开发开源软件，提供 RVC Fabric 实时语音转换、喵言喵聊天文本美化、趣味测试与 TRM UI 组件库。",
    titleSep: "：",
    languageLabel: "语言",
    productsLabel: "产品",
    channelsLabel: "频道",
    reachLabel: "社区与合作",
    contactLabel: "商务合作",
    communityLabel: "社区 QQ 群",
    contactValue: `微信号 ${WECHAT_ID}`,
    communityValue: `群号 ${QQ_GROUP_ID}`,
    copyHint: "点击复制",
    copyDone: "已复制",
    communityCopyHint: "点击复制并展示二维码",
    communityCopyDone: "已复制，二维码已展示",
    communityQrShown: "二维码已展示",
    communityQrAlt: "图灵镜社区 QQ 群二维码",
    communityQrHelp: "使用 QQ 扫码加入社区",
    openNewTab: "在新标签页打开",
    learnMore: "了解详情",
    promoTag: "推广",
    backHome: "图灵镜",
    productCrumb: "产品",
    featuresLabel: "核心特性",
    stepsLabel: "快速开始",
    faqLabel: "常见问题",
    noticeLabel: "使用须知",
    otherProducts: "其他产品",
    screenshotsLabel: "截图",
    enlarge: "查看大图",
    close: "关闭",
    copyright: "图灵镜 Turing Mirror"
  },
  tc: {
    skipLink: "跳至主要內容",
    siteName: "圖靈鏡",
    siteTitle: "圖靈鏡 Turing Mirror",
    brandShort: "圖靈鏡",
    homeDescription: "圖靈鏡開發開源軟體，提供 RVC Fabric 即時語音轉換、喵言喵聊天文字美化、趣味測試與 TRM UI 元件庫。",
    titleSep: "：",
    languageLabel: "語言",
    productsLabel: "產品",
    channelsLabel: "頻道",
    reachLabel: "社群與合作",
    contactLabel: "商務合作",
    communityLabel: "社群 QQ 群",
    contactValue: `微信號 ${WECHAT_ID}`,
    communityValue: `群號 ${QQ_GROUP_ID}`,
    copyHint: "點擊複製",
    copyDone: "已複製",
    communityCopyHint: "點擊複製並展示 QR 碼",
    communityCopyDone: "已複製，QR 碼已展示",
    communityQrShown: "QR 碼已展示",
    communityQrAlt: "圖靈鏡社群 QQ 群 QR 碼",
    communityQrHelp: "使用 QQ 掃描加入社群",
    openNewTab: "於新分頁開啟",
    learnMore: "了解詳情",
    promoTag: "推廣",
    backHome: "圖靈鏡",
    productCrumb: "產品",
    featuresLabel: "核心特色",
    stepsLabel: "快速開始",
    faqLabel: "常見問題",
    noticeLabel: "使用須知",
    otherProducts: "其他產品",
    screenshotsLabel: "截圖",
    enlarge: "檢視大圖",
    close: "關閉",
    copyright: "圖靈鏡 Turing Mirror"
  },
  en: {
    skipLink: "Skip to content",
    siteName: "Turing Mirror",
    siteTitle: "Turing Mirror",
    brandShort: "Turing Mirror",
    homeDescription: "Turing Mirror develops open-source software: RVC Fabric voice conversion, MoeText chat text formatting, interactive quizzes and the TRM UI component library.",
    titleSep: ": ",
    languageLabel: "Language",
    productsLabel: "Products",
    channelsLabel: "Channels",
    reachLabel: "Community & business",
    contactLabel: "Business",
    communityLabel: "QQ community",
    contactValue: `WeChat ${WECHAT_ID}`,
    communityValue: `Group ${QQ_GROUP_ID}`,
    copyHint: "Click to copy",
    copyDone: "Copied",
    communityCopyHint: "Copy and show QR code",
    communityCopyDone: "Copied, QR code shown",
    communityQrShown: "QR code shown",
    communityQrAlt: "Turing Mirror QQ community group QR code",
    communityQrHelp: "Scan with QQ to join the community",
    openNewTab: "Opens in a new tab",
    learnMore: "Learn more",
    promoTag: "Sponsored",
    backHome: "Turing Mirror",
    productCrumb: "Products",
    featuresLabel: "Features",
    stepsLabel: "Getting started",
    faqLabel: "FAQ",
    noticeLabel: "Before you use it",
    otherProducts: "More products",
    screenshotsLabel: "Screenshots",
    enlarge: "View larger",
    close: "Close",
    copyright: "Turing Mirror"
  },
  ja: {
    skipLink: "本文へスキップ",
    siteName: "チューリングミラー",
    siteTitle: "チューリングミラー Turing Mirror",
    brandShort: "チューリングミラー",
    homeDescription: "Turing Mirror は RVC Fabric の音声変換、MoeText のチャット文章整形、診断サイト、TRM UI コンポーネントライブラリなどのオープンソースソフトウェアを開発しています。",
    titleSep: "：",
    languageLabel: "言語",
    productsLabel: "プロダクト",
    channelsLabel: "チャンネル",
    reachLabel: "コミュニティ・お問い合わせ",
    contactLabel: "ビジネス",
    communityLabel: "QQ コミュニティ",
    contactValue: `WeChat ${WECHAT_ID}`,
    communityValue: `グループ ${QQ_GROUP_ID}`,
    copyHint: "クリックでコピー",
    copyDone: "コピーしました",
    communityCopyHint: "コピーして QR コードを表示",
    communityCopyDone: "コピーしました。QR コードを表示中",
    communityQrShown: "QR コードを表示中",
    communityQrAlt: "チューリングミラー QQ コミュニティの QR コード",
    communityQrHelp: "QQ でスキャンしてコミュニティに参加",
    openNewTab: "新しいタブで開く",
    learnMore: "詳しく見る",
    promoTag: "PR",
    backHome: "チューリングミラー",
    productCrumb: "プロダクト",
    featuresLabel: "主な機能",
    stepsLabel: "はじめかた",
    faqLabel: "よくある質問",
    noticeLabel: "ご利用にあたって",
    otherProducts: "ほかのプロダクト",
    screenshotsLabel: "スクリーンショット",
    enlarge: "拡大表示",
    close: "閉じる",
    copyright: "Turing Mirror"
  }
};

const GITHUB_LABEL = { sc: "GitHub 仓库", tc: "GitHub 儲存庫", en: "GitHub", ja: "GitHub" };

export const PRODUCTS = [
  rvcFabricProduct,
  {
    slug: "moetext",
    name: { sc: "喵言喵", tc: "喵言喵", en: "MoeText", ja: "MoeText" },
    altName: { sc: "MoeText", tc: "MoeText", en: "喵言喵", ja: "喵言喵" },
    meta: { sc: "Android", tc: "Android", en: "Android", ja: "Android" },
    pageMeta: {
      sc: "以 MIT 协议开放源代码。",
      tc: "原始碼以 MIT 授權公開。",
      en: "Source code is available under the MIT license.",
      ja: "ソースコードは MIT ライセンスで公開しています。"
    },
    summary: {
      sc: "聊天文本自动美化工具，按你定义的规则改写 QQ 与 Discord 输入框中的文字。",
      tc: "聊天文本自動美化工具，依你定義的規則改寫 QQ 與 Discord 輸入框中的文字。",
      en: "Automatic chat-text beautifier that rewrites what you type in QQ and Discord, following rules you define.",
      ja: "チャット文章の自動美化ツール。QQ と Discord の入力欄の文章を、自分で決めたルールで書き換えます。"
    },
    lead: {
      sc: "聊天文本自动美化工具",
      tc: "聊天文本自動美化工具",
      en: "Automatic chat-text beautifier for Android",
      ja: "チャット文章の自動美化ツール"
    },
    intro: {
      sc: "基于 Android 无障碍服务，按你定义的规则自动改写 QQ 和 Discord 聊天输入框中的文字：把「我」换成「本喵」，在句尾加上后缀和颜文字，一键切换猫娘、文言等风格。",
      tc: "基於 Android 無障礙服務，依你定義的規則自動改寫 QQ 與 Discord 聊天輸入框中的文字：把「我」換成「本喵」，在句尾加上後綴與顏文字，一鍵切換貓娘、文言等風格。",
      en: "Built on Android's accessibility service, MoeText rewrites what you type in QQ and Discord using rules you define: swap words, add sentence endings and kaomoji, and switch between styles like catgirl or classical Chinese in one tap.",
      ja: "Android のユーザー補助サービスを利用し、QQ と Discord の入力欄の文章を自分で決めたルールで自動的に書き換えます。語句の置き換え、語尾や顔文字の追加、猫耳娘や漢文調などのスタイルの切り替えに対応しています。"
    },
    schema: {
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Android 6.0+",
      license: "https://opensource.org/licenses/MIT",
      downloadUrl: "https://cdn.turingmirror.com/d/moetype"
    },
    actions: [
      {
        href: "https://cdn.turingmirror.com/d/moetype",
        primary: true,
        label: { sc: "下载 APK", tc: "下載 APK", en: "Download APK", ja: "APK をダウンロード" },
        badge: "Android"
      },
      { href: "https://github.com/Turing-Mirror/MoeText", label: GITHUB_LABEL, external: true }
    ],
    note: {
      sc: "需要 Android 6.0 及以上版本。安装时需允许安装未知来源应用。",
      tc: "需要 Android 6.0 以上版本。安裝時需允許安裝未知來源應用。",
      en: "Requires Android 6.0 or later. Allow installation from unknown sources when prompted.",
      ja: "Android 6.0 以降に対応しています。インストール時に提供元不明のアプリを許可してください。"
    },
    screenshots: [],
    features: [
      {
        title: { sc: "风格包", tc: "風格包", en: "Style packs", ja: "スタイルパック" },
        body: {
          sc: "内置「猫娘」「文言」「emoji 谜语」「神谕」四款，一键切换；支持导入、导出自定义风格。",
          tc: "內建「貓娘」「文言」「emoji 謎語」「神諭」四款，一鍵切換；支援匯入、匯出自訂風格。",
          en: "Four built-in styles (catgirl, classical Chinese, emoji riddles and oracle) switch in one tap. Import and export your own as JSON.",
          ja: "猫耳娘、漢文調、絵文字なぞなぞ、神託の 4 種を切り替えて使えます。自作スタイルのインポートとエクスポートにも対応しています。"
        }
      },
      {
        title: { sc: "文本替换规则", tc: "文字替換規則", en: "Text replacement rules", ja: "文章の置換ルール" },
        body: {
          sc: "可组合使用快捷替换、自定义替换对、句尾后缀、固定尾缀和随机颜文字。",
          tc: "可組合使用快捷替換、自訂替換對、句尾後綴、固定尾綴和隨機顏文字。",
          en: "Combine quick swaps, custom replacements, sentence endings, fixed suffixes and random kaomoji.",
          ja: "クイック置換、カスタム置換、語尾、固定サフィックス、ランダム顔文字を組み合わせて使えます。"
        }
      },
      {
        title: { sc: "两种处理模式", tc: "兩種處理模式", en: "Two modes", ja: "2 つの処理モード" },
        body: {
          sc: "停顿处理或实时处理，沿用聊天应用原有的发送方式。",
          tc: "停頓處理或即時處理，沿用聊天應用原有的傳送方式。",
          en: "Rewrite after a pause or as you type, and send messages the way you always do.",
          ja: "入力が止まったときに処理するか、リアルタイムで処理するかを選べます。メッセージはチャットアプリから送信します。"
        }
      },
      {
        title: { sc: "连续编辑", tc: "連續編輯", en: "Continuous editing", ja: "続けて入力" },
        body: {
          sc: "继续编辑文字时，后缀会自动移到句尾。",
          tc: "繼續編輯文字時，後綴會自動移到句尾。",
          en: "The suffix stays at the end of the sentence as you continue editing.",
          ja: "入力を続けると、語尾は自動的に文末へ移動します。"
        }
      },
      {
        title: { sc: "Material 3 界面", tc: "Material 3 介面", en: "Material 3 design", ja: "Material 3 デザイン" },
        body: {
          sc: "跟随系统深色模式，内置实时预览。",
          tc: "跟隨系統深色模式，內建即時預覽。",
          en: "Follows system dark mode, with a live preview built in.",
          ja: "システムのダークモードに対応し、リアルタイムプレビューを備えています。"
        }
      },
      {
        title: { sc: "本机处理", tc: "本機處理", en: "Local processing", ja: "ローカル処理" },
        body: {
          sc: "聊天文本在本机处理。",
          tc: "聊天文字在本機處理。",
          en: "Chat text is processed on your device.",
          ja: "チャットの文章は端末内で処理します。"
        }
      }
    ],
    steps: [
      {
        title: { sc: "安装", tc: "安裝", en: "Install", ja: "インストール" },
        body: {
          sc: "下载 APK 并安装。",
          tc: "下載 APK 並安裝。",
          en: "Download and install the APK.",
          ja: "APK をダウンロードしてインストールします。"
        }
      },
      {
        title: { sc: "开启无障碍服务", tc: "開啟無障礙服務", en: "Enable accessibility", ja: "ユーザー補助を有効化" },
        body: {
          sc: "在「状态」页点击「前往开启无障碍服务」，在系统设置中授权喵言喵。",
          tc: "在「狀態」頁點擊「前往開啟無障礙服務」，於系統設定中授權喵言喵。",
          en: "On the Status tab, tap the button to open accessibility settings and allow MoeText.",
          ja: "「状態」タブからユーザー補助の設定を開き、MoeText を許可します。"
        }
      },
      {
        title: { sc: "配置规则，照常聊天", tc: "設定規則，照常聊天", en: "Set rules and chat", ja: "ルールを決めて会話" },
        body: {
          sc: "在「规则」页配置并保存，回到 QQ 或 Discord 正常输入即可。",
          tc: "在「規則」頁設定並儲存，回到 QQ 或 Discord 正常輸入即可。",
          en: "Configure and save rules on the Rules tab, then go back to QQ or Discord and type as usual.",
          ja: "「ルール」タブで設定を保存したら、QQ や Discord でいつもどおり入力するだけです。"
        }
      }
    ],
    faq: [
      {
        q: { sc: "支持哪些聊天应用？", tc: "支援哪些聊天應用？", en: "Which apps are supported?", ja: "対応アプリは？" },
        a: {
          sc: "目前支持 QQ 与 Discord 的聊天输入框。",
          tc: "目前支援 QQ 與 Discord 的聊天輸入框。",
          en: "The chat input boxes in QQ and Discord.",
          ja: "現在は QQ と Discord の入力欄に対応しています。"
        }
      },
      {
        q: { sc: "需要哪些权限？", tc: "需要哪些權限？", en: "What permissions does it need?", ja: "必要な権限は？" },
        a: {
          sc: "无障碍服务用于读取和修改聊天输入框中的文字，网络权限用于检查更新。",
          tc: "無障礙服務用於讀取和修改聊天輸入框中的文字，網路權限用於檢查更新。",
          en: "The accessibility service reads and edits text in the chat input box. Network access is used to check for updates.",
          ja: "ユーザー補助でチャット入力欄の文章を読み取り、書き換えます。ネットワーク権限は更新の確認に使います。"
        }
      },
      {
        q: { sc: "喵言喵免费吗？", tc: "喵言喵免費嗎？", en: "Is MoeText free?", ja: "MoeText は無料ですか？" },
        a: {
          sc: "免费，源码以 MIT 协议在 GitHub 开源。",
          tc: "免費，原始碼以 MIT 授權於 GitHub 開源。",
          en: "Yes. It is open source under the MIT license on GitHub.",
          ja: "無料です。MIT ライセンスで GitHub に公開しています。"
        }
      }
    ],
    notice: {
      sc: "本工具会自动改写你发出的消息，可能违反腾讯 QQ 用户协议，存在账号被限制功能或封禁的风险。喵言喵与腾讯官方没有任何关联。",
      tc: "本工具會自動改寫你送出的訊息，可能違反騰訊 QQ 使用者協議，有帳號被限制功能或封禁的風險。喵言喵與騰訊官方沒有任何關聯。",
      en: "MoeText automatically rewrites the messages you send, which may violate Tencent QQ's terms of service and put your account at risk of restriction or suspension. MoeText is not affiliated with Tencent.",
      ja: "送信するメッセージを自動で書き換えるため、Tencent QQ の利用規約に違反し、アカウントが制限・凍結される可能性があります。MoeText は Tencent とは一切関係ありません。"
    }
  },
  {
    slug: "mirror-test",
    name: { sc: "测试镜", tc: "測試鏡", en: "Mirror-Test", ja: "Mirror-Test" },
    altName: { sc: "Mirror-Test", tc: "Mirror-Test", en: "", ja: "" },
    meta: { sc: "Web", tc: "Web", en: "Web", ja: "Web" },
    pageMeta: {
      sc: "通过浏览器使用。",
      tc: "透過瀏覽器使用。",
      en: "Available in your browser.",
      ja: "ブラウザで利用できます。"
    },
    summary: {
      sc: "Meme 趣味测试合集：夏季番性格测试、GalGame 命定路线、Band-TI 乐队角色测试。",
      tc: "Meme 趣味測試合集：夏季番性格測試、GalGame 命定路線、Band-TI 樂團角色測試。",
      en: "Meme-style fun quizzes: a summer-anime personality test, a GalGame route test and the Band-TI band character test.",
      ja: "Meme 系おもしろ診断集。夏アニメ性格診断、ギャルゲー運命ルート診断、Band-TI バンドキャラ診断。"
    },
    lead: {
      sc: "Meme 趣味测试合集",
      tc: "Meme 趣味測試合集",
      en: "Meme-style fun quizzes",
      ja: "Meme 系おもしろ診断集"
    },
    intro: {
      sc: "测试镜提供动画、GalGame 和少女乐队主题的互动测试，可在浏览器中作答。",
      tc: "測試鏡提供動畫、GalGame 和少女樂團主題的互動測試，可在瀏覽器中作答。",
      en: "Mirror-Test offers browser-based quizzes about anime, GalGames and girls’ bands.",
      ja: "Mirror-Test では、アニメ、ギャルゲー、ガールズバンドを題材にした診断をブラウザで楽しめます。"
    },
    schema: {
      applicationCategory: "GameApplication",
      operatingSystem: "Web browser",
      url: "https://test.turingmirror.com/"
    },
    actions: [
      {
        href: "https://test.turingmirror.com/",
        primary: true,
        label: { sc: "开始测试", tc: "開始測試", en: "Start a quiz", ja: "診断をはじめる" },
        external: true
      },
      { href: "https://github.com/Turing-Mirror/Mirror-Test", label: GITHUB_LABEL, external: true }
    ],
    note: {
      sc: "无需安装，手机与电脑浏览器均可打开",
      tc: "無需安裝，手機與電腦瀏覽器皆可開啟",
      en: "Nothing to install. Works in mobile and desktop browsers.",
      ja: "インストール不要。スマホでも PC でも遊べます。"
    },
    screenshots: [],
    featuresLabel: { sc: "测试列表", tc: "測試列表", en: "Quizzes", ja: "診断一覧" },
    features: [
      {
        title: {
          sc: "2026 夏季番性格测试",
          tc: "2026 夏季番性格測試",
          en: "Summer 2026 anime personality test",
          ja: "2026 夏アニメ性格診断"
        },
        body: {
          sc: "看看哪部 2026 夏季新番最像你。",
          tc: "看看哪部 2026 夏季新番最像你。",
          en: "Find the summer 2026 anime that matches you best.",
          ja: "2026 年夏の新作アニメで、あなたに一番近い作品は？"
        },
        href: "https://test.turingmirror.com/anime-summer-2026/"
      },
      {
        title: {
          sc: "GalGame 命定路线测试",
          tc: "GalGame 命定路線測試",
          en: "GalGame destined-route test",
          ja: "ギャルゲー運命ルート診断"
        },
        body: {
          sc: "你会走进哪一条命定路线？",
          tc: "你會走進哪一條命定路線？",
          en: "Which destined route would you end up on?",
          ja: "あなたがたどる運命のルートは？"
        },
        href: "https://test.turingmirror.com/galgame-test/"
      },
      {
        title: {
          sc: "Band-TI 少女乐队角色测试",
          tc: "Band-TI 少女樂團角色測試",
          en: "Band-TI girls' band character test",
          ja: "Band-TI ガールズバンドキャラ診断"
        },
        body: {
          sc: "100 道题库每轮抽 20 题，覆盖 67 名角色、8 部作品与 14 组乐队。",
          tc: "100 道題庫每輪抽 20 題，涵蓋 67 名角色、8 部作品與 14 組樂團。",
          en: "20 questions drawn from a pool of 100, covering 67 characters, 8 series and 14 bands.",
          ja: "100 問から毎回 20 問を出題。67 人のキャラ、8 作品、14 バンドを収録。"
        },
        href: "https://test.turingmirror.com/band-ti/"
      }
    ],
    steps: [],
    faq: [
      {
        q: { sc: "需要注册或下载吗？", tc: "需要註冊或下載嗎？", en: "Do I need to sign up or install anything?", ja: "登録やインストールは必要？" },
        a: {
          sc: "不需要，用浏览器打开 test.turingmirror.com 即可开始。",
          tc: "不需要，用瀏覽器開啟 test.turingmirror.com 即可開始。",
          en: "No. Open test.turingmirror.com in your browser and start.",
          ja: "不要です。ブラウザで test.turingmirror.com を開くだけで始められます。"
        }
      },
      {
        q: { sc: "测试结果准吗？", tc: "測試結果準嗎？", en: "Are the results accurate?", ja: "結果は当たりますか？" },
        a: {
          sc: "这些测试以动画、游戏和乐队角色为主题，供娱乐使用。",
          tc: "這些測試以動畫、遊戲和樂團角色為主題，供娛樂使用。",
          en: "These quizzes are for entertainment and use themes from anime, games and band characters.",
          ja: "アニメ、ゲーム、バンドのキャラクターを題材にした娯楽用の診断です。"
        }
      }
    ]
  },
  trmUiProduct
];

export const CHANNELS = [
  {
    href: "https://space.bilibili.com/3546871148579062",
    name: { sc: "哔哩哔哩", tc: "嗶哩嗶哩", en: "Bilibili", ja: "ビリビリ" },
    id: "UID 3546871148579062"
  },
  {
    href: "https://v.douyin.com/6NxXcrKK9cc",
    name: { sc: "抖音", tc: "抖音", en: "Douyin", ja: "抖音（Douyin）" },
    id: {
      sc: "抖音号 TuringMirror",
      tc: "抖音號 TuringMirror",
      en: "Douyin ID TuringMirror",
      ja: "抖音 ID TuringMirror"
    }
  },
  {
    href: "https://www.xiaohongshu.com/user/profile/65f56bf1000000000b00e094",
    name: { sc: "小红书", tc: "小紅書", en: "Xiaohongshu", ja: "小紅書（RED）" },
    id: {
      sc: "小红书号 TuringMirror",
      tc: "小紅書號 TuringMirror",
      en: "Xiaohongshu ID TuringMirror",
      ja: "小紅書 ID TuringMirror"
    }
  },
  {
    href: "https://www.youtube.com/@TuringMirror",
    name: { sc: "YouTube", tc: "YouTube", en: "YouTube", ja: "YouTube" },
    id: "@TuringMirror"
  }
];

export const PROMOTIONS = [
  {
    href: "https://www.rainyun.com/m1rror_?s=trm-site",
    name: { sc: "雨云", tc: "雨雲", en: "Rainyun", ja: "Rainyun" },
    description: {
      sc: "提供云服务器、游戏云与面板服，首月五折。",
      tc: "提供雲端伺服器、遊戲雲與面板服，首月五折。",
      en: "Cloud servers, game hosting and panel servers with 50% off the first month.",
      ja: "クラウドサーバー、ゲームホスティング、管理パネル付きサーバーを初月半額で提供します。"
    }
  }
];
