# 官方截图检索改进

日期：2026 年 11 月 7 日。

## 已实施

新增简体中文、繁体中文、英文和日文官方截图页。每页直接输出三张原图、可见说明、原图链接及固定提交的仓库来源。产品页、八语言 README、sitemap 和 llms.txt 都提供截图页入口。继续使用原有图片地址，避免将同一图片拆为多套地址。

截图页沿用现有官网排版与配色。它输出 CollectionPage、ItemList 与 ImageObject，将每张截图关联到 RVC Fabric 软件实体。截图内容经过实际查看，说明与图中内容对应。其他功能页截图能直接读到版本号 1.4.2；这不代表另外两张图或当前下载版本也是该版本。

本次重新拉取 TRM UI 至 `c17c7c3`，文案规则 `src/pages/textRules.ts` 与前次使用的规则一致。

## 主动通知搜索引擎

`public/indexnow-key.txt` 是 IndexNow 要求公开提供的站点验证文件，不用于 Cloudflare 或 GitHub 登录。部署完成后可运行：

```sh
npm run submit:indexnow -- /products/rvc-fabric/ /products/rvc-fabric/screenshots/
```

脚本仅接受当前官网地址，先检查线上验证文件，再向 Bing 的 IndexNow 接口提交明确指定的更新地址。提交记录见 `indexnow-result.json`。HTTP 200 表示收到请求，HTTP 202 表示收到请求且等待验证；两者均不证明已收录。

Google 不在此次 IndexNow 提交范围内。Google Search Console 当前需要用户登录后才能检查站点权限、提交 sitemap 和检查索引。

## 验收

本地构建生成 28 页。SEO 检查覆盖四语言的产品页、指南及截图页，核对 canonical、图片元数据、本地链接、JSON-LD、截图说明与 sitemap。浏览器检查截图页的原图展示和现有视觉样式。

线上页面、IndexNow 回执与再次图片检索分别记录，不能相互替代。截图页收录与 AI 正确配图仍需实际检索证据。

参考：[Google 图片检索说明](https://developers.google.com/search/docs/appearance/google-images)、[IndexNow 协议](https://www.indexnow.org/documentation)。
