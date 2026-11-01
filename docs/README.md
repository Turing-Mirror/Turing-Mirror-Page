# 项目说明

## 结构

```
src/
  content.mjs   唯一数据源：语言、界面文案、产品、频道、推广
  render.mjs    页面模板（首页、产品页、结构化数据）
scripts/
  build.mjs     生成 dist/：复制 public/，渲染所有页面，生成 sitemap.xml 与 llms.txt
public/         原样复制到 dist/ 的静态资源
  site.css      设计令牌、样式与动画（warm paper / ink 配色）
  site.js       交互：滚动入场、语言菜单、复制与二维码、截图大图、指针光效
  boot.js       首屏前执行：裸域跳转、语言偏好跳转、动画开关
  404.html      错误页
  assets/       QQ 群二维码、产品截图（assets/products/<slug>/）
  _headers      安全响应头与缓存策略
  favicon.svg / favicon.png / favicon.ico / robots.txt
dist/           构建产物（入库，Cloudflare 直接发布此目录）
wrangler.jsonc  Cloudflare Pages 配置（输出目录 dist）
```

## 内容维护

所有文案和链接都在 `src/content.mjs`。改完运行 `npm run build`，并把 `dist/` 的变化一起提交（改 `public/` 下的样式、脚本、图片也一样）：

- `UI`：四种语言的界面文案。
- `PRODUCTS`：每个产品一项，`slug` 决定网址 `/products/<slug>/`。字段包括卡片简介 `summary`、详情页的 `lead` / `intro` / `actions`（下载、仓库等按钮）/ `features` / `steps` / `faq` / `notice` / `screenshots`，以及结构化数据用的 `schema`。`steps`、`faq`、`screenshots` 可以留空数组，对应板块不会出现。
- `CHANNELS`、`PROMOTIONS`、`WECHAT_ID`、`QQ_GROUP_ID`、`TAGLINE`（标语，不翻译）。

新增产品：在 `PRODUCTS` 追加一项，截图放到 `public/assets/products/<slug>/`。首页卡片、详情页、sitemap 与 llms.txt 会自动生成。

## 品牌素材

标签图标采用工作区 `docs/logo/` 中的 SVG、PNG 与 ICO 文件，发布副本位于 `public/`。图标链接使用简单版本参数，更新素材时同步递增。

四种语言首页复用 `src/render.mjs` 的 `heroLogo` 模板，以 LOGO 替代可见标题文字，保留对应语言的网站名称供读屏使用，并复用图形显示镜面倒影。

绘制动画的颜色、时长、延迟、分段间隔与缓动集中在 `site.css` 的 `--tm-logo-*` 变量中。系统启用减少动态效果时，LOGO 直接静态显示。

## 语言与网址

| 语言 | 首页 | 产品页 |
| --- | --- | --- |
| 简体中文（默认） | `/` | `/products/<slug>/` |
| 繁體中文 | `/zh-hant/` | `/zh-hant/products/<slug>/` |
| English | `/en/` | `/en/products/<slug>/` |
| 日本語 | `/ja/` | `/ja/products/<slug>/` |

- 每页互相声明 `hreflang`，简体中文页为 `x-default`。
- 语言菜单是普通链接；选择后写入 `localStorage`（键名 `turingmirror:locale`），之后访问简体中文页会跳到所选语言。直接访问其他语言的网址不会被跳转。
- 首次访问且浏览器语言不同时，只在右上角显示提示链接，不自动跳转（避免搜索引擎被重定向）。

## SEO / GEO

- 所有内容都直接写在 HTML 中，不依赖 JS。
- 结构化数据（JSON-LD）：首页为 Organization / WebSite / 产品列表；产品页为 SoftwareApplication、BreadcrumbList，有问答时附 FAQPage。
- `sitemap.xml` 包含全部语言版本及其互链；`/llms.txt` 是给 AI 搜索与大模型读的站点摘要。
- 推广链接带 `rel="sponsored"`。

## 动画

- 页面切换：跨页 View Transitions（Chrome / Edge / Safari 18.2+），首页卡片上的产品名会形变为详情页标题。不支持的浏览器正常跳转。
- 首页 LOGO 按上方曲线、下方折线、右侧竖线的顺序逐线绘制，只播放一次，完成后保持静止。倒影随后「浮出水面」，并随鼠标轻微倾斜。
- 内容滚动入场、卡片跟随指针的柔光、二维码展开、问答折叠、截图大图。
- 系统开启「减少动态效果」时关闭所有动画与页面过渡。

## 域名

规范地址为 `https://www.turingmirror.com/`，裸域 `turingmirror.com` 由 `boot.js` 与 Cloudflare 重定向规则跳转至 www。

## 部署

```bash
npm run deploy
```

Cloudflare Pages 项目 `turing-mirror-page` 连接 `main` 分支自动部署，发布目录由 `wrangler.jsonc` 的 `pages_build_output_dir`（`./dist`）决定。`dist/` 已入库，所以不设构建命令也能发布；建议在 Cloudflare 后台把构建命令设为 `npm run build`，这样即使忘记提交 `dist/` 也会在部署时重新生成。

手动部署：`npm run deploy`。

## TRM UI 产品页与示例

TRM UI 的介绍、接入步骤与示例文案位于 `src/trm-ui.mjs`。四种语言共用同一份结构。修改文案前阅读 TRM UI 仓库的 `src/pages/textRules.ts`，按用户正在进行的操作组织说明。

交互示例使用 `package.json` 中固定提交的 `trm-ui`，由 `src/demo/main.jsx` 引用真实组件。构建时生成独立页面与脚本、样式，只在 TRM UI 产品页通过 iframe 加载。首页及其他产品页继续使用静态 HTML。示例样式在 iframe 内生效。

`src/trm-ui-reference.json` 与 `src/demo/trm-motion.css` 是从 TRM UI 生成的参考数据，包含来源提交、四语言动效名称、文案规则与动效参数。不要直接编辑这些生成文件。更新组件版本时，在干净的 TRM UI 检出中选定提交，更新官网依赖，然后运行：

```sh
npm run sync:trm-ui -- ../TRM-UI
npm run check
```

同步脚本读取 TRM UI 的规则数据及共享实现，不维护另一套规范。正常构建只读取已提交的参考数据和已安装的固定版本依赖，不需要相邻仓库或远端服务。`dist/` 包含生成的四语言示例、固定版本的组件包许可与官网动效参数。
