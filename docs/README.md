# 项目说明

## 结构

```
public/
  index.html    首页结构（内容通过 site.js 按语言填充）
  404.html      错误页
  site.css      设计令牌与样式（沿用图灵镜 warm paper / ink 配色）
  site.js       语言数据、产品与频道数据、交互
  assets/
    qq_group.jpg  图灵镜社区 QQ 群二维码
  _headers      安全响应头与缓存策略
  favicon.svg   站点图标
  robots.txt / sitemap.xml
wrangler.jsonc  Cloudflare Pages 配置
```

## 内容维护

首页文案与频道链接集中在 `public/site.js` 顶部：

- COPY：四种语言（简体中文 / 繁体中文 / English / 日本語）的界面文案。
- PRODUCTS：产品名称、简介及 GitHub / 下载 / 前往链接。
- CHANNELS：社媒频道链接与账号信息。
- WECHAT_ID：商务合作微信号。
- QQ_GROUP_ID：社区 QQ 群号；二维码使用 public/assets/qq_group.jpg。
- TAGLINE：标语，不翻译。

`index.html` 中的静态默认内容为简体中文，用于首屏与不支持 JS 的场景。

## 语言

首次访问按浏览器语言自动匹配，切换后写入 `localStorage`（键名 `turingmirror:locale`）。不使用 Cookie。

## 域名

规范地址为 `https://www.turingmirror.com/`，裸域 `turingmirror.com` 由 `site.js` 与 Cloudflare 重定向规则跳转至 www。

## 部署

```bash
npm run deploy
```

对应 Cloudflare Pages 项目 `turing-mirror-page`。
