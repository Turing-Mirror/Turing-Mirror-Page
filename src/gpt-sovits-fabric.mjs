const name = "GPT-SoVITS Fabric";

export const gsvFabricProduct = {
  slug: "gpt-sovits-fabric",
  name,
  meta: {
    sc: "Windows 桌面软件",
    tc: "Windows 桌面軟體",
    en: "Windows desktop application",
    ja: "Windows デスクトップアプリ"
  },
  pageMeta: {
    sc: "以 MIT 协议开放源代码。",
    tc: "原始碼以 MIT 授權公開。",
    en: "Source code is available under the MIT license.",
    ja: "ソースコードは MIT ライセンスで公開しています。"
  },
  lead: {
    sc: "Windows 语音合成与角色声音训练软件",
    tc: "Windows 語音合成與角色聲音訓練軟體",
    en: "Speech synthesis and voice model training for Windows",
    ja: "Windows 向け音声合成・音声モデル学習ソフト"
  },
  summary: {
    sc: "用参考音频生成语音，管理角色库，并在本机整理素材和训练模型。",
    tc: "用參考音訊產生語音、管理角色庫，並在本機整理素材與訓練模型。",
    en: "Generate speech from reference audio, manage character voices, and prepare datasets and train models locally.",
    ja: "参照音声から音声を生成し、キャラクターの声を管理できます。素材の整理とモデル学習もローカルで行えます。"
  },
  intro: {
    sc: "GPT-SoVITS Fabric 是图灵镜基于 GPT-SoVITS 开发的开源桌面软件。可将文本合成为语音，并在同一界面管理角色音频、校对标注、分离人声和训练模型。",
    tc: "GPT-SoVITS Fabric 是圖靈鏡基於 GPT-SoVITS 開發的開源桌面軟體。可將文字合成為語音，並在同一介面管理角色音訊、校對標註、分離人聲與訓練模型。",
    en: "GPT-SoVITS Fabric is an open-source desktop application from Turing Mirror based on GPT-SoVITS. It brings text-to-speech, character audio, annotation review, vocal separation and model training into one workspace.",
    ja: "GPT-SoVITS Fabric は Turing Mirror が GPT-SoVITS をもとに開発したオープンソースのデスクトップアプリです。音声合成、キャラクター音声の管理、アノテーションの確認、ボーカル分離、モデル学習を一つの画面で行えます。"
  },
  schema: {
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows 10, Windows 11",
    license: "https://opensource.org/licenses/MIT"
  },
  actions: [{
    href: "https://www.turingmirror.com/releases/gpt-sovits-fabric/setup.exe",
    primary: true,
    label: { sc: "下载 Windows x64", tc: "下載 Windows x64", en: "Download for Windows x64", ja: "Windows x64 版をダウンロード" }
  }, {
    href: "https://github.com/Turing-Mirror/GPT-SoVITS-Fabric/releases",
    label: { sc: "GitHub 发布页", tc: "GitHub 發布頁", en: "GitHub Releases", ja: "GitHub Releases" },
    external: true
  }],
  screenshots: [
    {
      id: "home",
      src: "/assets/products/gpt-sovits-fabric/home-zh-cn-v2.png",
      width: 1180,
      height: 780,
      alt: {
        sc: "GPT-SoVITS Fabric 首页，显示角色卡片和合成入口。",
        tc: "GPT-SoVITS Fabric 首頁，顯示角色卡片與合成入口。",
        en: "GPT-SoVITS Fabric home screen with character cards and access to synthesis.",
        ja: "キャラクターカードと音声合成への入口がある GPT-SoVITS Fabric のホーム画面。"
      },
      caption: { sc: "主界面", tc: "主介面", en: "Home screen", ja: "ホーム画面" }
    },
    {
      id: "synthesis",
      src: "/assets/products/gpt-sovits-fabric/synthesis-zh-cn-v2.png",
      width: 1180,
      height: 780,
      alt: {
        sc: "GPT-SoVITS Fabric 合成页，显示角色选择、参考音频和文本输入。",
        tc: "GPT-SoVITS Fabric 合成頁，顯示角色選擇、參考音訊與文字輸入。",
        en: "GPT-SoVITS Fabric synthesis screen with character selection, reference audio and text input.",
        ja: "キャラクター選択、参照音声、テキスト入力がある GPT-SoVITS Fabric の音声合成画面。"
      },
      caption: { sc: "语音合成", tc: "語音合成", en: "Speech synthesis", ja: "音声合成" }
    }
  ],
  features: [
    {
      title: { sc: "语音合成", tc: "語音合成", en: "Speech synthesis", ja: "音声合成" },
      body: {
        sc: "选择角色和参考音频，即可合成单条或批量文本，并将音频导出为 WAV 或 FLAC。",
        tc: "選擇角色與參考音訊，即可合成單筆或批次文字，並將音訊匯出為 WAV 或 FLAC。",
        en: "Choose a character and reference audio, synthesize one or more texts, and export WAV or FLAC files.",
        ja: "キャラクターと参照音声を選び、テキストを個別または一括で合成して WAV や FLAC に書き出せます。"
      }
    },
    {
      title: { sc: "角色管理", tc: "角色管理", en: "Character library", ja: "キャラクター管理" },
      body: {
        sc: "将权重、参考音频和标注整理为角色包，随时导入、编辑或导出。",
        tc: "將權重、參考音訊與標註整理為角色包，可隨時匯入、編輯或匯出。",
        en: "Keep model weights, reference audio and annotations together in character packs you can import, edit and export.",
        ja: "モデルの重み、参照音声、アノテーションをキャラクターパックにまとめ、読み込み、編集、書き出しができます。"
      }
    },
    {
      title: { sc: "素材整理与训练", tc: "素材整理與訓練", en: "Dataset preparation and training", ja: "素材の準備とモデル学習" },
      body: {
        sc: "分离人声、切分音频并校对转写标注，再使用训练队列微调 SoVITS 和 GPT 模型。",
        tc: "分離人聲、切分音訊並校對轉錄標註，再使用訓練佇列微調 SoVITS 與 GPT 模型。",
        en: "Separate vocals, split audio and review transcript annotations, then fine-tune SoVITS and GPT models with the training queue.",
        ja: "ボーカルの分離、音声の分割、文字起こしの確認を行い、学習キューで SoVITS と GPT モデルを微調整できます。"
      }
    }
  ],
  steps: [],
  faq: []
};
