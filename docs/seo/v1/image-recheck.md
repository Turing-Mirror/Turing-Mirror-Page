# 图片检索复查

复查日期：2026 年 11 月 7 日。

用户反馈：网页版 GPT 仍将 VCC 界面用于展示 RVC Fabric。尚未取得该次提问原文、对话分享地址或图片来源，因此没有将本次独立检索当作同一次 GPT 请求的复现。

## 独立检索结果

- 图片查询 `"RVC Fabric" screenshots` 返回了 RVC WebUI、RVC-GUI 和 w-okada 等其他项目的界面。本次返回结果中未出现官网三张截图。这不能证明所有搜索服务均未收录官方截图。
- 网页查询 `"RVC Fabric" Turing Mirror` 和 `site:turingmirror.com RVC Fabric` 能找到官网与 GitHub。
- 搜索结果中的官网内容仍包含“高性能实时 AI 变声桌面客户端”和“装好就能变声”等旧文案，抓取时间标记为一至两周前。GitHub 结果标记为六天前，仍显示旧简介。这些内容不同于本次正式部署的文案。
- 当前生成器直接输出带有产品全名替代文字的 `img` 标签，第一张截图没有懒加载。截图无需执行 JavaScript 才能出现在 HTML 中。产品页已有图片元数据与 ImageObject；此次没有发现必须通过增加同类标签才能解决的遗漏。

## 结论与待验证项

站点侧改动已发布，但本次图片检索仍未正确呈现 RVC Fabric。不得将 HTTP 200、结构化数据检查通过或完成部署记作 GPT 配图问题已经解决。

旧索引仍被搜索结果使用，这是本次可观察到的事实。GPT 是否由同一搜索结果选图、是否在生成答案时错误归属图片，以及用户所称 VCC 对应的图片来源，仍需该次回答的来源链接验证。

下一项外部验证是通过 Google Search Console 和 Bing Webmaster 检查产品页及截图的抓取与索引状态，并提交现有 sitemap。尚未取得并验证对应控制台权限，本记录不声称已经完成提交。站点地图地址为 `https://www.turingmirror.com/sitemap.xml`。

参考：[Google 图片检索说明](https://developers.google.com/search/docs/appearance/google-images)。图片可读取与图片被检索采用是不同的验证结果，元数据不能保证特定服务选用图片。
