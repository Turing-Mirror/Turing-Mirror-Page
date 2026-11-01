import reference from './trm-ui-reference.json' with { type: 'json' };
const l = (sc, tc, en, ja) => ({ sc, tc, en, ja });
const feature = (title, body) => ({ title, body });
export const trmUiReference = reference;
export const demoCopy = {
  heading: l('交互示例', '互動範例', 'Interactive examples', '操作例'),
  segmentHelp: l('点击选项或拖动滑块进行选择。', '點選項目或拖曳滑塊進行選擇。', 'Click an option or drag the thumb.', '項目をクリックするか、つまみをドラッグして選択します。'),
  choices: [l('组件', '元件', 'Components', 'コンポーネント'), l('动效', '動效', 'Motion', 'モーション')],
  motionJoin: l('与', '與', ' and ', 'と'),
  fieldSeparator: l('：', '：', ': ', '：'),
  current: l('当前选项', '目前選項', 'Selected option', '選択中の項目'),
  filterHelp: l('筛选或调整顺序，查看条目的移动、展开与收起。', '篩選或調整順序，查看項目的移動、展開與收合。', 'Filter or reorder the list to see items move, appear and collapse.', '絞り込みや並べ替えで、項目の移動、追加、折りたたみを確認できます。'),
  filters: [l('全部', '全部', 'All', 'すべて'), l('控件', '控制項', 'Controls', 'コントロール'), l('反馈', '回饋', 'Feedback', 'フィードバック')],
  sort: l('反转顺序', '反轉順序', 'Reverse order', '順序を反転'),
  items: [
    { id: 'button', kind: 1, name: l('按钮', '按鈕', 'Button', 'ボタン') },
    { id: 'notice', kind: 2, name: l('通知', '通知', 'Notice', '通知') },
    { id: 'select', kind: 1, name: l('选择框', '選擇框', 'Select', '選択欄') },
    { id: 'tooltip', kind: 2, name: l('悬停提示', '懸停提示', 'Tooltip', 'ツールチップ') }
  ],
  paneHelp: l('切换说明，查看内容推移与面板高度的连续变化。', '切換說明，查看內容推移與面板高度的連續變化。', 'Switch between descriptions to see the content move and the panel resize.', '説明を切り替えると、内容の移動とパネルの高さの変化を確認できます。'),
  panes: [
    { title: l('组件', '元件', 'Components', 'コンポーネント'), paragraphs: [l('按钮、菜单和表单控件使用相同的交互约定。', '按鈕、選單和表單控制項使用相同的互動規則。', 'Buttons, menus and form controls share consistent interaction rules.', 'ボタン、メニュー、フォームで共通の操作規則を使用します。')] },
    { title: l('接入', '接入', 'Integration', '導入'), paragraphs: [l('在项目中安装固定版本的组件包。', '在專案中安裝固定版本的元件套件。', 'Install a pinned version of the component package in your project.', 'プロジェクトにバージョンを固定してパッケージを導入します。'), l('导入所需组件和样式，再连接项目已有的语言与主题设置。', '匯入所需元件和樣式，再連接專案既有的語言與佈景設定。', 'Import the components and styles, then connect your existing language and theme settings.', '必要なコンポーネントとスタイルを読み込み、既存の言語設定とテーマに接続します。')] },
    { title: l('升级', '升級', 'Updates', '更新'), paragraphs: [l('组件改进集中在 TRM UI 中维护。', '元件改進集中在 TRM UI 中維護。', 'Shared component improvements are maintained in TRM UI.', '共通コンポーネントの改善は TRM UI で管理します。'), l('更新依赖版本后，检查项目中的使用效果。', '更新相依版本後，檢查專案中的使用效果。', 'After updating the dependency, check the components in your project.', '依存バージョンを更新したら、プロジェクト内で動作を確認します。'), l('确认构建和交互检查通过后，再发布产品更新。', '確認建置和互動檢查通過後，再發佈產品更新。', 'Release the product update after the build and interaction checks pass.', 'ビルドと操作の確認が完了してから、製品を更新します。')] }
  ]
};
export const trmUiProduct = {
  slug: 'trm-ui', name: l('图灵镜 UI', '圖靈鏡 UI', 'Turing Mirror UI', 'チューリングミラー UI'), altName: { sc: 'TRM UI' },
  meta: l('面向开发者的共享组件库', '供開發者使用的共用元件庫', 'Shared components for developers', '開発者向けの共通コンポーネント'),
  pageMeta: l('适用于 React 项目', '適用於 React 專案', 'For React projects', 'React プロジェクト向け'),
  summary: l('图灵镜桌面应用共用的组件库与设计系统，提供交互示例、八种语言和可选的 Tauri 桌面壳。', '圖靈鏡桌面應用程式共用的元件庫與設計系統，提供互動範例、八種語言和可選的 Tauri 桌面殼。', 'Shared components and a design system for Turing Mirror desktop apps, with interactive examples, eight languages and an optional Tauri shell.', 'チューリングミラーのデスクトップアプリで共有するコンポーネントとデザインシステムです。操作例、8 言語、任意で利用できる Tauri シェルを備えています。'),
  lead: l('共享组件库与设计系统', '共用元件庫與設計系統', 'Shared components and design system', '共通コンポーネントとデザインシステム'),
  intro: l('TRM UI 为图灵镜桌面应用提供统一的组件、配色与交互约定。组件画廊展示实际效果，并提供交互、文案和动效的使用说明。项目通过组件包引用经过验证的版本，已有的语言与主题设置可以继续使用。', 'TRM UI 為圖靈鏡桌面應用程式提供一致的元件、配色與互動規則。元件畫廊展示實際效果，並提供互動、文案和動效的使用說明。專案透過元件套件引用經過驗證的版本，既有的語言與佈景設定可以繼續使用。', 'TRM UI provides consistent components, colors and interaction rules for Turing Mirror desktop apps. The gallery demonstrates the components and explains interaction, writing and motion. Projects use a verified package version and can retain their existing language and theme settings.', 'TRM UI はチューリングミラーのデスクトップアプリに共通のコンポーネント、配色、操作規則を提供します。ギャラリーでは実際の動作と、操作、文章、モーションの使い方を確認できます。検証済みのパッケージを導入し、既存の言語設定やテーマに接続できます。'),
  schema: { applicationCategory: 'DeveloperApplication', operatingSystem: 'Web browser; optional Windows desktop shell', license: 'https://opensource.org/license/mit' },
  actions: [
    { href: 'https://github.com/Turing-Mirror/TRM-UI', primary: true, external: true, label: l('查看项目', '檢視專案', 'View project', 'プロジェクトを見る') },
    { href: 'https://github.com/Turing-Mirror/TRM-UI/blob/' + reference.revision + '/docs/components-v1.md', external: true, label: l('阅读接入说明', '閱讀接入說明', 'Read integration guide', '導入手順を読む') }
  ],
  note: l('组件画廊可在浏览器中运行。运行 Tauri 桌面壳时需要安装 Rust。', '元件畫廊可在瀏覽器中執行。執行 Tauri 桌面殼時需要安裝 Rust。', 'The gallery runs in a browser. Running the Tauri desktop shell requires Rust.', 'ギャラリーはブラウザで動作します。Tauri のデスクトップシェルを実行する場合は Rust が必要です。'),
  screenshots: [], demo: true,
  features: [
    feature(l('共享组件', '共用元件', 'Shared components', '共通コンポーネント'), l('按钮、表单、菜单、提示和弹窗由组件包统一维护，产品通过依赖版本接收改进。', '按鈕、表單、選單、提示和彈出視窗由元件套件統一維護，產品透過相依版本取得改進。', 'Buttons, forms, menus, tooltips and dialogs are maintained in one package. Products receive improvements by updating their dependency.', 'ボタン、フォーム、メニュー、ヒント、ダイアログを共通パッケージで管理し、依存バージョンの更新で改善を取り込みます。')),
    feature(l('可操作的设计规范', '可操作的設計規範', 'Interactive design guidance', '操作できるデザインガイド'), l('画廊提供交互、文案、排版、配色与动效示例，并记录已被替换的设计及原因。', '畫廊提供互動、文案、排版、配色與動效範例，並記錄已被替換的設計及原因。', 'The gallery covers interaction, writing, typography, color and motion, and records replaced designs and the reasons for each change.', '操作、文章、組版、配色、モーションの例に加え、変更されたデザインとその理由を確認できます。')),
    feature(l('连续的交互变化', '連續的互動變化', 'Continuous interaction', '連続した操作の変化'), l('分段控件支持拖动。列表筛选保留已有条目，内容切换时面板高度连续变化。', '分段控制項支援拖曳。清單篩選保留既有項目，內容切換時面板高度連續變化。', 'Segmented controls support dragging. Filtered lists retain existing items, and panels resize continuously as content changes.', 'セグメントはドラッグに対応します。リストを絞り込んでも既存の項目を保ち、内容の切り替えに合わせてパネルの高さが変化します。')),
    feature(l('八种语言与主题设置', '八種語言與佈景設定', 'Eight languages and theme settings', '8 言語とテーマ設定'), l('通用界面提供八种语言。产品可连接已有翻译，并使用共享配色变量或保留自己的主题。', '通用介面提供八種語言。產品可連接既有翻譯，並使用共用配色變數或保留自己的佈景。', 'Common interface text is available in eight languages. Products can connect their translations and use shared color variables or their own theme.', '共通の画面文言は 8 言語に対応します。製品の翻訳に接続し、共通の配色変数や独自のテーマを使用できます。'))
  ],
  steps: [
    feature(l('预览画廊', '預覽畫廊', 'Preview the gallery', 'ギャラリーを確認する'), l('获取项目后运行 npm install 和 npm run dev，在浏览器中打开本地预览地址。', '取得專案後執行 npm install 和 npm run dev，在瀏覽器中開啟本機預覽網址。', 'Get the project, run npm install and npm run dev, then open the local preview URL in a browser.', 'プロジェクトを取得し、npm install と npm run dev を実行して、ブラウザでプレビューを開きます。')),
    feature(l('安装组件包', '安裝元件套件', 'Install the package', 'パッケージを導入する'), l('按接入说明安装固定提交的 trm-ui，导入所需组件与样式，并连接项目的语言设置。', '依接入說明安裝固定提交的 trm-ui，匯入所需元件與樣式，並連接專案的語言設定。', 'Follow the integration guide to install trm-ui at a pinned commit, import the required components and styles, and connect your language settings.', '導入手順に従って trm-ui のコミットを固定し、必要なコンポーネントとスタイルを読み込み、言語設定に接続します。')),
    feature(l('验证并升级', '驗證並升級', 'Verify and update', '確認して更新する'), l('升级组件包后，检查产品构建和实际交互。确认通过后，再发布产品更新。', '升級元件套件後，檢查產品建置和實際互動。確認通過後，再發佈產品更新。', 'After updating the package, check the product build and interactions before releasing the product update.', 'パッケージを更新したら製品のビルドと操作を確認し、確認が完了してから製品を更新します。'))
  ],
  faq: []
};
