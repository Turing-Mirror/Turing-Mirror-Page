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
    homeDescription: `图灵镜 Turing Mirror。${TAGLINE}`,
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
    homeDescription: `圖靈鏡 Turing Mirror。${TAGLINE}`,
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
    homeDescription: `Turing Mirror. ${TAGLINE}`,
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
    homeDescription: `チューリングミラー Turing Mirror。${TAGLINE}`,
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

const GITHUB_LABEL = { sc: "GitHub 仓库", tc: "GitHub 倉庫", en: "GitHub", ja: "GitHub" };

export const PRODUCTS = [
  {
    slug: "rvc-fabric",
    name: { sc: "RVC Fabric" },
    altName: "",
    meta: { sc: "Windows · 桌面端", tc: "Windows · 桌面端", en: "Windows · Desktop", ja: "Windows · デスクトップ" },
    pageMeta: {
      sc: "Windows 桌面端 · MIT 开源",
      tc: "Windows 桌面端 · MIT 開源",
      en: "Windows desktop · MIT licensed",
      ja: "Windows デスクトップ · MIT ライセンス"
    },
    summary: {
      sc: "高性能实时 AI 变声桌面客户端。开箱即用，游戏开黑、连麦、直播一个软件搞定。",
      tc: "高效能即時 AI 變聲桌面客戶端。開箱即用，遊戲開黑、連麥、直播一個軟體搞定。",
      en: "High-performance real-time AI voice changer for Windows. Works out of the box for gaming, voice chat and streaming.",
      ja: "高性能リアルタイム AI ボイスチェンジャー。インストールするだけで、ゲーム・通話・配信にすぐ使えます。"
    },
    lead: {
      sc: "高性能实时 AI 变声桌面客户端",
      tc: "高效能即時 AI 變聲桌面客戶端",
      en: "Real-time AI voice changer for Windows",
      ja: "高性能リアルタイム AI ボイスチェンジャー"
    },
    intro: {
      sc: "面向 Windows 的实时 AI 变声软件，开箱即用：不需要自己装 Python、PyTorch，也不用打开浏览器操作 Gradio，装好就能变声。适合游戏开黑、语音连麦、直播互动和音频制作。基于 RVC WebUI 深度定制。",
      tc: "面向 Windows 的即時 AI 變聲軟體，開箱即用：不需要自行安裝 Python、PyTorch，也不必開啟瀏覽器操作 Gradio，裝好就能變聲。適合遊戲開黑、語音連麥、直播互動與音訊製作。基於 RVC WebUI 深度客製。",
      en: "A real-time AI voice changer for Windows that works out of the box: no Python or PyTorch to set up, no Gradio pages to click through in a browser. Install it and start talking. Built for gaming, voice chat, live streaming and audio production, and deeply customized from RVC WebUI.",
      ja: "Windows 向けのリアルタイム AI ボイスチェンジャー。Python や PyTorch の導入も、ブラウザで Gradio を操作する必要もなく、インストールすればすぐに使えます。ゲーム、ボイスチャット、配信、音声制作に。RVC WebUI をベースに大幅にカスタマイズしています。"
    },
    schema: {
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Windows 10, Windows 11",
      license: "https://opensource.org/licenses/MIT",
      downloadUrl: "https://cdn.turingmirror.com/d/rvc-fabric-setup"
    },
    actions: [
      {
        href: "https://cdn.turingmirror.com/d/rvc-fabric-setup",
        primary: true,
        label: { sc: "下载 Windows 版", tc: "下載 Windows 版", en: "Download for Windows", ja: "Windows 版をダウンロード" },
        badge: ".exe"
      },
      { href: "https://github.com/Turing-Mirror/RVC-Fabric", label: GITHUB_LABEL, external: true },
      {
        href: "https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases",
        label: { sc: "CNB 国内镜像", tc: "CNB 國內鏡像", en: "CNB mirror (China)", ja: "CNB ミラー（中国国内）" },
        external: true
      }
    ],
    note: {
      sc: "支持 Windows 10 / 11 · NVIDIA（含 RTX 50 系列）/ AMD / Intel 显卡自动适配",
      tc: "支援 Windows 10 / 11 · NVIDIA（含 RTX 50 系列）/ AMD / Intel 顯示卡自動適配",
      en: "Windows 10 / 11 · Automatically adapts to NVIDIA (incl. RTX 50 series), AMD and Intel GPUs",
      ja: "Windows 10 / 11 対応 · NVIDIA（RTX 50 シリーズ含む）/ AMD / Intel GPU を自動判別"
    },
    screenshots: [
      {
        src: "/assets/products/rvc-fabric/home.png",
        width: 1180,
        height: 780,
        alt: { sc: "RVC Fabric 主界面", tc: "RVC Fabric 主畫面", en: "RVC Fabric home screen", ja: "RVC Fabric のホーム画面" }
      },
      {
        src: "/assets/products/rvc-fabric/settings.png",
        width: 1180,
        height: 780,
        alt: { sc: "RVC Fabric 设置", tc: "RVC Fabric 設定", en: "RVC Fabric settings", ja: "RVC Fabric の設定画面" }
      },
      {
        src: "/assets/products/rvc-fabric/misc.png",
        width: 1180,
        height: 780,
        alt: { sc: "RVC Fabric 其他页", tc: "RVC Fabric 其他頁", en: "RVC Fabric misc page", ja: "RVC Fabric のその他画面" }
      }
    ],
    features: [
      {
        title: { sc: "实时变声", tc: "即時變聲", en: "Real-time conversion", ja: "リアルタイム変換" },
        body: {
          sc: "低延迟推理，变声中可无缝切换音色，一键切换变声与原声。",
          tc: "低延遲推論，變聲中可無縫切換音色，一鍵切換變聲與原聲。",
          en: "Low-latency inference, seamless voice switching mid-session, and one-click bypass to your original voice.",
          ja: "低遅延の推論。変換中もボイスをシームレスに切り替え、原音バイパスもワンクリック。"
        }
      },
      {
        title: { sc: "DSP 效果链", tc: "DSP 效果鏈", en: "DSP effect chain", ja: "DSP エフェクトチェーン" },
        body: {
          sc: "内置噪声门、压缩器与 5 段参数均衡器，支持预设套用与精细调音。",
          tc: "內建噪聲門、壓縮器與 5 段參數等化器，支援預設套用與精細調音。",
          en: "Built-in noise gate, compressor and 5-band parametric EQ, with presets and fine-tuning.",
          ja: "ノイズゲート、コンプレッサー、5 バンドパラメトリック EQ を内蔵。プリセットと細かな調整に対応。"
        }
      },
      {
        title: { sc: "音色与预设管理", tc: "音色與預設管理", en: "Voices & presets", ja: "ボイスとプリセット" },
        body: {
          sc: "网格化音色库，绑定 .index 特征库；参数预设可保存、导入、导出分享。",
          tc: "網格化音色庫，綁定 .index 特徵庫；參數預設可儲存、匯入、匯出分享。",
          en: "A grid voice library with .index bindings; save, import and share parameter presets.",
          ja: "グリッド表示のボイスライブラリと .index の紐付け。プリセットは保存・インポート・共有が可能。"
        }
      },
      {
        title: { sc: "社区音色广场", tc: "社群音色廣場", en: "Community voice store", ja: "コミュニティボイスストア" },
        body: {
          sc: "图灵镜官方源 + 第三方开放源，多线程并发下载、断点续传。",
          tc: "圖靈鏡官方源 + 第三方開放源，多執行緒並行下載、斷點續傳。",
          en: "Official and third-party sources, with multi-threaded, resumable downloads.",
          ja: "公式ソースとサードパーティソースに対応。マルチスレッド・レジューム対応のダウンロード。"
        }
      },
      {
        title: { sc: "音频工具箱", tc: "音訊工具箱", en: "Audio toolbox", ja: "オーディオツールボックス" },
        body: {
          sc: "人声分离提取干声与伴奏，文本转语音并换成目标音色，一键训练专属音色。",
          tc: "人聲分離擷取乾聲與伴奏，文字轉語音並換成目標音色，一鍵訓練專屬音色。",
          en: "Separate vocals from accompaniment, turn text into speech in any voice, and train your own voice in one click.",
          ja: "ボーカル分離、テキスト読み上げ＋ボイス変換、ワンクリックで自分専用ボイスの学習。"
        }
      },
      {
        title: { sc: "自动硬件加速", tc: "自動硬體加速", en: "Automatic acceleration", ja: "自動ハードウェア加速" },
        body: {
          sc: "自动识别 NVIDIA CUDA 与 AMD / Intel DirectML，并下载对应的计算运行时。",
          tc: "自動識別 NVIDIA CUDA 與 AMD / Intel DirectML，並下載對應的運算執行環境。",
          en: "Detects NVIDIA CUDA or AMD / Intel DirectML and downloads the matching runtime for you.",
          ja: "NVIDIA CUDA と AMD / Intel DirectML を自動判別し、対応するランタイムをダウンロード。"
        }
      }
    ],
    steps: [
      {
        title: { sc: "下载安装", tc: "下載安裝", en: "Install", ja: "インストール" },
        body: {
          sc: "运行 RVC_Fabric_Setup.exe，建议安装到纯英文路径。",
          tc: "執行 RVC_Fabric_Setup.exe，建議安裝到純英文路徑。",
          en: "Run RVC_Fabric_Setup.exe. An install path with only English characters is recommended.",
          ja: "RVC_Fabric_Setup.exe を実行します。英数字のみのパスへのインストールを推奨します。"
        }
      },
      {
        title: { sc: "跟随引导", tc: "跟隨引導", en: "Follow the setup", ja: "初回セットアップ" },
        body: {
          sc: "首次启动会自动识别硬件、补全运行时并安装虚拟声卡。",
          tc: "首次啟動會自動識別硬體、補齊執行環境並安裝虛擬音效卡。",
          en: "On first launch it detects your hardware, fetches the runtime and installs the virtual audio cable.",
          ja: "初回起動時にハードウェアを判別し、ランタイムと仮想オーディオケーブルを自動で導入します。"
        }
      },
      {
        title: { sc: "接入游戏 / 语音", tc: "接入遊戲 / 語音", en: "Route your audio", ja: "ゲーム・通話につなぐ" },
        body: {
          sc: "软件输出选 CABLE Input，游戏、QQ 或 Discord 的麦克风选 CABLE Output。",
          tc: "軟體輸出選 CABLE Input，遊戲、QQ 或 Discord 的麥克風選 CABLE Output。",
          en: "Set RVC Fabric's output to CABLE Input, and the microphone in your game, QQ or Discord to CABLE Output.",
          ja: "RVC Fabric の出力を CABLE Input に、ゲームや QQ・Discord のマイクを CABLE Output に設定します。"
        }
      }
    ],
    faq: [
      {
        q: { sc: "RVC Fabric 免费吗？", tc: "RVC Fabric 免費嗎？", en: "Is RVC Fabric free?", ja: "RVC Fabric は無料ですか？" },
        a: {
          sc: "免费。源码以 MIT 协议在 GitHub 开源；模型权重、音色包与第三方资源遵循各自的原始许可。",
          tc: "免費。原始碼以 MIT 授權於 GitHub 開源；模型權重、音色包與第三方資源遵循各自的原始授權。",
          en: "Yes. The source code is MIT-licensed on GitHub; model weights, voice packs and third-party resources follow their own licenses.",
          ja: "無料です。ソースコードは MIT ライセンスで GitHub に公開しています。モデルやボイスパック、サードパーティ素材はそれぞれのライセンスに従います。"
        }
      },
      {
        q: {
          sc: "没有 NVIDIA 显卡能用吗？",
          tc: "沒有 NVIDIA 顯示卡能用嗎？",
          en: "Does it work without an NVIDIA GPU?",
          ja: "NVIDIA 以外の GPU でも使えますか？"
        },
        a: {
          sc: "可以。AMD 与 Intel 显卡通过 DirectML 加速实时变声；只有「音色训练」需要 NVIDIA 显卡。",
          tc: "可以。AMD 與 Intel 顯示卡透過 DirectML 加速即時變聲；只有「音色訓練」需要 NVIDIA 顯示卡。",
          en: "Yes. AMD and Intel GPUs run real-time conversion through DirectML. Only voice training requires an NVIDIA GPU.",
          ja: "使えます。AMD と Intel の GPU は DirectML でリアルタイム変換を行います。ボイスの学習のみ NVIDIA GPU が必要です。"
        }
      },
      {
        q: {
          sc: "怎么让游戏、QQ、Discord 里的人听到变声？",
          tc: "怎麼讓遊戲、QQ、Discord 裡的人聽到變聲？",
          en: "How do people in my game, QQ or Discord hear the changed voice?",
          ja: "ゲームや QQ・Discord の相手に変換後の声を届けるには？"
        },
        a: {
          sc: "通过 VB-Cable 虚拟声卡转发：RVC Fabric 输出选 CABLE Input，对方软件的麦克风选 CABLE Output；Windows 默认播放设备保持为你的耳机。",
          tc: "透過 VB-Cable 虛擬音效卡轉發：RVC Fabric 輸出選 CABLE Input，對方軟體的麥克風選 CABLE Output；Windows 預設播放裝置保持為你的耳機。",
          en: "Through the VB-Cable virtual audio device: set RVC Fabric's output to CABLE Input and the other app's microphone to CABLE Output. Keep your headphones as the Windows default playback device.",
          ja: "仮想オーディオデバイス VB-Cable を経由します。RVC Fabric の出力を CABLE Input、相手側アプリのマイクを CABLE Output に設定し、Windows の既定の再生デバイスはヘッドホンのままにします。"
        }
      },
      {
        q: {
          sc: "和 RVC WebUI 有什么关系？",
          tc: "和 RVC WebUI 有什麼關係？",
          en: "How is it related to RVC WebUI?",
          ja: "RVC WebUI との関係は？"
        },
        a: {
          sc: "RVC Fabric 基于 RVC WebUI 深度定制，用 Tauri + Rust + React 桌面外壳把实时变声做成开箱即用的客户端；上游训练与推理 WebUI 作为高级功能随包保留。",
          tc: "RVC Fabric 基於 RVC WebUI 深度客製，以 Tauri + Rust + React 桌面外殼把即時變聲做成開箱即用的客戶端；上游訓練與推論 WebUI 作為進階功能隨附保留。",
          en: "RVC Fabric is a deep customization of RVC WebUI. A Tauri + Rust + React desktop shell turns real-time conversion into a ready-to-use client, and the upstream training and inference WebUI still ships as an advanced feature.",
          ja: "RVC WebUI をベースに大幅にカスタマイズしたもので、Tauri + Rust + React のデスクトップシェルでリアルタイム変換をすぐ使えるクライアントにしています。上流の学習・推論 WebUI も上級機能として同梱しています。"
        }
      }
    ],
    notice: {
      sc: "请勿将本软件用于伪造身份、欺诈或其他违法用途。使用他人声音进行训练或转换前，请取得原权利人授权，并遵守当地法律法规。",
      tc: "請勿將本軟體用於偽造身分、詐騙或其他違法用途。使用他人聲音進行訓練或轉換前，請取得原權利人授權，並遵守當地法律法規。",
      en: "Do not use this software to impersonate others, commit fraud or for any other unlawful purpose. Get permission from the rights holder before training on or converting someone else's voice, and follow local laws.",
      ja: "なりすまし、詐欺、その他の違法な目的に使用しないでください。他人の声で学習・変換する場合は権利者の許諾を得て、現地の法令を遵守してください。"
    }
  },
  {
    slug: "moetext",
    name: { sc: "喵言喵", tc: "喵言喵", en: "MoeText", ja: "MoeText" },
    altName: { sc: "MoeText", tc: "MoeText", en: "喵言喵", ja: "喵言喵" },
    meta: { sc: "Android", tc: "Android", en: "Android", ja: "Android" },
    pageMeta: {
      sc: "Android 应用 · MIT 开源",
      tc: "Android 應用 · MIT 開源",
      en: "Android app · MIT licensed",
      ja: "Android アプリ · MIT ライセンス"
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
      ja: "Android のユーザー補助サービスを利用し、QQ と Discord の入力欄の文章を自分で決めたルールで自動的に書き換えます。語句の置き換え、語尾や顔文字の追加、猫耳娘・漢文調などのスタイル切り替えもワンタップ。"
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
      sc: "需要 Android 6.0 及以上 · 安装时需允许安装未知来源应用",
      tc: "需要 Android 6.0 以上 · 安裝時需允許安裝未知來源應用",
      en: "Requires Android 6.0 or later · Allow installs from unknown sources when installing",
      ja: "Android 6.0 以降 · インストール時に提供元不明のアプリを許可してください"
    },
    screenshots: [],
    features: [
      {
        title: { sc: "风格包", tc: "風格包", en: "Style packs", ja: "スタイルパック" },
        body: {
          sc: "内置「猫娘」「文言」「emoji 谜语」「神谕」四款，一键切换；支持导入、导出自定义风格。",
          tc: "內建「貓娘」「文言」「emoji 謎語」「神諭」四款，一鍵切換；支援匯入、匯出自訂風格。",
          en: "Four built-in styles (catgirl, classical Chinese, emoji riddles and oracle) switch in one tap. Import and export your own as JSON.",
          ja: "猫耳娘・漢文調・絵文字なぞなぞ・神託の 4 種を内蔵し、ワンタップで切り替え。自作スタイルの入出力にも対応。"
        }
      },
      {
        title: { sc: "规则链引擎", tc: "規則鏈引擎", en: "Rule-chain engine", ja: "ルールチェーン" },
        body: {
          sc: "快捷替换、自定义替换对、句尾后缀、固定尾缀、随机颜文字，自由组合。",
          tc: "快捷替換、自訂替換對、句尾後綴、固定尾綴、隨機顏文字，自由組合。",
          en: "Combine quick swaps, custom replacements, sentence endings, fixed suffixes and random kaomoji.",
          ja: "クイック置換、カスタム置換、語尾、固定サフィックス、ランダム顔文字を自由に組み合わせ。"
        }
      },
      {
        title: { sc: "两种处理模式", tc: "兩種處理模式", en: "Two modes", ja: "2 つの処理モード" },
        body: {
          sc: "停顿处理或实时处理，沿用聊天应用原有的发送方式。",
          tc: "停頓處理或即時處理，沿用聊天應用原有的傳送方式。",
          en: "Rewrite after a pause or as you type, and send messages the way you always do.",
          ja: "入力が止まったときに処理するか、リアルタイムで処理するかを選べます。送信方法はいつもどおり。"
        }
      },
      {
        title: { sc: "不打断输入", tc: "不打斷輸入", en: "Stays out of your way", ja: "入力を邪魔しない" },
        body: {
          sc: "连续编辑、光标位置映射与写回重试，继续打字时后缀会自动跟到句尾。",
          tc: "連續編輯、游標位置對應與寫回重試，繼續打字時後綴會自動跟到句尾。",
          en: "Continuous editing, cursor mapping and write-back retries keep the suffix at the end as you keep typing.",
          ja: "連続編集、カーソル位置の追従、書き戻しの再試行で、入力を続けても語尾は文末に付いてきます。"
        }
      },
      {
        title: { sc: "Material 3 界面", tc: "Material 3 介面", en: "Material 3 design", ja: "Material 3 デザイン" },
        body: {
          sc: "跟随系统深色模式，内置实时预览。",
          tc: "跟隨系統深色模式，內建即時預覽。",
          en: "Follows system dark mode, with a live preview built in.",
          ja: "システムのダークモードに追従し、リアルタイムプレビューを内蔵。"
        }
      },
      {
        title: { sc: "不收集数据", tc: "不收集資料", en: "No data collection", ja: "データ収集なし" },
        body: {
          sc: "网络权限仅用于检查更新，不收集、不上传任何数据。",
          tc: "網路權限僅用於檢查更新，不收集、不上傳任何資料。",
          en: "Network access is only used to check for updates. Nothing is collected or uploaded.",
          ja: "ネットワークは更新確認にのみ使用し、データの収集・送信は一切行いません。"
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
          sc: "无障碍服务：用于读取并写回聊天输入框；网络：仅用于检查更新。应用不收集、不上传任何数据。",
          tc: "無障礙服務：用於讀取並寫回聊天輸入框；網路：僅用於檢查更新。應用不收集、不上傳任何資料。",
          en: "The accessibility service, to read and rewrite the chat input box, and network access, only to check for updates. The app collects and uploads nothing.",
          ja: "入力欄の読み取りと書き戻しのためのユーザー補助と、更新確認のためだけのネットワーク権限です。データの収集・送信は行いません。"
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
      sc: "本工具会自动改写你发出的消息，可能违反腾讯 QQ 用户协议，存在账号被限制功能或封禁的风险，请自行评估。喵言喵与腾讯官方没有任何关联。",
      tc: "本工具會自動改寫你送出的訊息，可能違反騰訊 QQ 使用者協議，有帳號被限制功能或封禁的風險，請自行評估。喵言喵與騰訊官方沒有任何關聯。",
      en: "MoeText automatically rewrites the messages you send, which may violate Tencent QQ's terms of service and put your account at risk of restriction or suspension. Use it at your own discretion. MoeText is not affiliated with Tencent.",
      ja: "送信するメッセージを自動で書き換えるため、Tencent QQ の利用規約に違反し、アカウントが制限・凍結される可能性があります。ご自身の判断でご利用ください。MoeText は Tencent とは一切関係ありません。"
    }
  },
  {
    slug: "mirror-test",
    name: { sc: "测试镜", tc: "測試鏡", en: "Mirror-Test", ja: "Mirror-Test" },
    altName: { sc: "Mirror-Test", tc: "Mirror-Test", en: "", ja: "" },
    meta: { sc: "Web", tc: "Web", en: "Web", ja: "Web" },
    pageMeta: {
      sc: "网页 · 打开即玩",
      tc: "網頁 · 打開即玩",
      en: "Web · Play in your browser",
      ja: "Web · ブラウザですぐ遊べる"
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
      sc: "在浏览器里打开就能玩的互动测试站。从动画、GalGame 到少女乐队，答几道题，看看你是哪一型。测试结果仅供娱乐，不代表真实人格判断。",
      tc: "在瀏覽器裡打開就能玩的互動測試站。從動畫、GalGame 到少女樂團，答幾道題，看看你是哪一型。測試結果僅供娛樂，不代表真實人格判斷。",
      en: "Interactive quizzes that run right in your browser. From anime and GalGames to girls' bands, answer a few questions and find out which type you are. Results are just for fun and are not a real personality assessment.",
      ja: "ブラウザですぐ遊べるインタラクティブ診断サイト。アニメやギャルゲーからガールズバンドまで、いくつかの質問に答えてあなたのタイプを診断します。結果はお楽しみ用で、実際の性格判定ではありません。"
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
          sc: "测试结果仅供娱乐，不代表真实人格判断。",
          tc: "測試結果僅供娛樂，不代表真實人格判斷。",
          en: "They are just for fun and are not a real personality assessment.",
          ja: "結果はお楽しみ用で、実際の性格判定ではありません。"
        }
      }
    ]
  },
  {
    slug: "trm-ui",
    name: { sc: "图灵镜 UI", tc: "圖靈鏡 UI", en: "Turing Mirror UI", ja: "チューリングミラー UI" },
    altName: { sc: "TRM UI" },
    meta: {
      sc: "开发者 · 设计模板",
      tc: "開發者 · 設計模板",
      en: "Developers · Design template",
      ja: "開発者向け · デザインテンプレート"
    },
    pageMeta: {
      sc: "React + Tauri · 设计模板",
      tc: "React + Tauri · 設計模板",
      en: "React + Tauri · Design template",
      ja: "React + Tauri · デザインテンプレート"
    },
    summary: {
      sc: "图灵镜桌面产品共用的 UI/UX 模板：设计令牌、组件库、八语言 i18n 与 Tauri 壳。",
      tc: "圖靈鏡桌面產品共用的 UI/UX 模板：設計權杖、元件庫、八語言 i18n 與 Tauri 殼。",
      en: "The shared UI/UX template behind Turing Mirror desktop apps: design tokens, components, 8-language i18n and a Tauri shell.",
      ja: "チューリングミラーのデスクトップ製品に共通の UI/UX テンプレート。デザイントークン、コンポーネント、8 言語 i18n、Tauri シェル。"
    },
    lead: {
      sc: "图灵镜桌面产品的 UI/UX 模板",
      tc: "圖靈鏡桌面產品的 UI/UX 模板",
      en: "UI/UX template for Turing Mirror desktop apps",
      ja: "デスクトップ製品のための UI/UX テンプレート"
    },
    intro: {
      sc: "每个图灵镜桌面产品都从同一套界面起步：同样的设计令牌、组件与动效，改进也回到这里，而不是散落在各个产品里。模板包含 React 组件库、侧栏式应用外壳、八语言 i18n，以及一个能直接开窗的 Tauri 壳，不包含任何产品代码。",
      tc: "每個圖靈鏡桌面產品都從同一套介面起步：同樣的設計權杖、元件與動效，改進也回到這裡，而不是散落在各個產品裡。模板包含 React 元件庫、側欄式應用外殼、八語言 i18n，以及一個能直接開窗的 Tauri 殼，不包含任何產品程式碼。",
      en: "Every Turing Mirror desktop app starts from the same interface: the same design tokens, components and motion, with improvements flowing back here instead of drifting apart in each product. It includes a React component library, a sidebar app shell, 8-language i18n and a ready-to-run Tauri shell, with no product code.",
      ja: "チューリングミラーのデスクトップ製品はすべて同じ UI から始まります。同じデザイントークン、コンポーネント、モーションを共有し、改善もここに集約します。React コンポーネントライブラリ、サイドバー型アプリシェル、8 言語 i18n、すぐに起動できる Tauri シェルを含み、製品コードは含みません。"
    },
    schema: {
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows"
    },
    actions: [
      {
        href: "https://github.com/Turing-Mirror/TRM-UI",
        primary: true,
        label: { sc: "在 GitHub 查看", tc: "在 GitHub 檢視", en: "View on GitHub", ja: "GitHub で見る" },
        external: true
      }
    ],
    note: {
      sc: "npm install && npm run dev 即可预览组件画廊，无需安装 Rust",
      tc: "npm install && npm run dev 即可預覽元件畫廊，無需安裝 Rust",
      en: "Run npm install && npm run dev to preview the component gallery. No Rust needed.",
      ja: "npm install && npm run dev でコンポーネントギャラリーをプレビュー。Rust は不要です。"
    },
    screenshots: [],
    features: [
      {
        title: { sc: "设计令牌与三态主题", tc: "設計權杖與三態主題", en: "Tokens & themes", ja: "トークンとテーマ" },
        body: {
          sc: "颜色、间距、圆角与动效集中定义，浅色 / 深色 / 跟随系统三态切换。",
          tc: "顏色、間距、圓角與動效集中定義，淺色 / 深色 / 跟隨系統三態切換。",
          en: "Colors, spacing, radii and motion defined in one place, with light, dark and system themes.",
          ja: "色・余白・角丸・モーションを一元管理し、ライト / ダーク / システム連動の 3 テーマに対応。"
        }
      },
      {
        title: { sc: "组件库", tc: "元件庫", en: "Component library", ja: "コンポーネント" },
        body: {
          sc: "按钮、表单控件、分段控件、菜单、弹窗、抽屉、日历、通知等，每一个都能直接操作。",
          tc: "按鈕、表單控制項、分段控制項、選單、彈窗、抽屜、日曆、通知等，每一個都能直接操作。",
          en: "Buttons, form controls, segmented controls, menus, modals, drawers, calendars, notices and more, all interactive.",
          ja: "ボタン、フォーム、セグメント、メニュー、モーダル、ドロワー、カレンダー、通知など。すべて実際に操作できます。"
        }
      },
      {
        title: { sc: "侧栏式应用外壳", tc: "側欄式應用外殼", en: "Sidebar app shell", ja: "サイドバー型シェル" },
        body: {
          sc: "标题栏、侧栏与方向性换页，新产品直接套用。",
          tc: "標題列、側欄與方向性換頁，新產品直接套用。",
          en: "Title bar, sidebar and directional page transitions, ready for a new product.",
          ja: "タイトルバー、サイドバー、方向のあるページ遷移をそのまま新製品に。"
        }
      },
      {
        title: { sc: "八语言 i18n", tc: "八語言 i18n", en: "8-language i18n", ja: "8 言語 i18n" },
        body: {
          sc: "构建时打包、同步切换，附带三道校验脚本；界面与壳共用语言包。",
          tc: "建置時打包、同步切換，附帶三道校驗腳本；介面與殼共用語言包。",
          en: "Bundled at build time and switched instantly, with three validation checks; the UI and shell share one set of locale files.",
          ja: "ビルド時にバンドルして即時切り替え。3 段階の検証スクリプト付きで、UI とシェルで言語ファイルを共有します。"
        }
      },
      {
        title: { sc: "Tauri 桌面壳", tc: "Tauri 桌面殼", en: "Tauri desktop shell", ja: "Tauri シェル" },
        body: {
          sc: "无边框窗口、托盘、开机自启、日志与配置的原子写入，开箱即可开窗。",
          tc: "無邊框視窗、系統匣、開機自啟、日誌與設定的原子寫入，開箱即可開窗。",
          en: "Frameless window, tray, autostart, logging and atomic config writes, ready to open a window.",
          ja: "フレームレスウィンドウ、トレイ、自動起動、ログ、設定のアトミック書き込みを備え、すぐにウィンドウを開けます。"
        }
      },
      {
        title: { sc: "克制的设计取向", tc: "克制的設計取向", en: "A restrained style", ja: "控えめなデザイン" },
        body: {
          sc: "少框少线、颜色克制，出现和消失都有过程；指到的卡片向内收，不向上浮。",
          tc: "少框少線、顏色克制，出現與消失都有過程；指到的卡片向內收，不向上浮。",
          en: "Few borders, restrained color, and motion on both enter and exit; hovered cards press in rather than float up.",
          ja: "枠線は少なく、色は控えめ。表示も非表示もアニメーションし、ホバーしたカードは浮かずに沈みます。"
        }
      }
    ],
    steps: [
      {
        title: { sc: "预览组件", tc: "預覽元件", en: "Preview", ja: "プレビュー" },
        body: {
          sc: "npm install && npm run dev，打开 http://localhost:1410 查看组件画廊。",
          tc: "npm install && npm run dev，開啟 http://localhost:1410 檢視元件畫廊。",
          en: "Run npm install && npm run dev and open http://localhost:1410 to browse the gallery.",
          ja: "npm install && npm run dev を実行し、http://localhost:1410 でギャラリーを表示します。"
        }
      },
      {
        title: { sc: "连壳运行", tc: "連殼執行", en: "Run with the shell", ja: "シェルごと起動" },
        body: {
          sc: "安装 Rust 后运行 npm run tauri:dev，得到一个真实的桌面窗口。",
          tc: "安裝 Rust 後執行 npm run tauri:dev，得到一個真實的桌面視窗。",
          en: "With Rust installed, run npm run tauri:dev to get a real desktop window.",
          ja: "Rust を導入して npm run tauri:dev を実行すると、実際のデスクトップウィンドウが開きます。"
        }
      },
      {
        title: { sc: "带进你的项目", tc: "帶進你的專案", en: "Bring it into your app", ja: "プロジェクトに組み込む" },
        body: {
          sc: "src/trm/ 是模板本体，可以整个复制走。",
          tc: "src/trm/ 是模板本體，可以整個複製帶走。",
          en: "src/trm/ is the template itself. Copy the whole folder.",
          ja: "テンプレート本体は src/trm/ です。フォルダごとコピーして使えます。"
        }
      }
    ],
    faq: []
  }
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
    href: "https://www.rainyun.com/m1rror_?s=RVC-Fabric",
    name: { sc: "雨云", tc: "雨雲", en: "Rainyun", ja: "Rainyun" },
    description: {
      sc: "首月五折 · 性价比云服务器 / 游戏云 / 面板服",
      tc: "首月五折 · 性價比雲伺服器 / 遊戲雲 / 面板服",
      en: "50% off the first month · Value cloud servers, game hosting and panel servers",
      ja: "初月半額 · 高コスパのクラウドサーバー / ゲームクラウド / パネルサーバー"
    }
  }
];
