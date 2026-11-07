# 官网与 RVC Fabric 检索优化 v1

记录日期：2026 年 11 月 7 日。

本次调整补充产品介绍、使用指南和官方截图，并更新官网与仓库的入口。

## 内容与发布范围

- 官网保留现有设计，更新四语言产品文案、首页描述和图片元数据，新增四语言 RVC Fabric 使用指南。
- 产品页输出 Open Graph 图片、Twitter 图片及 ImageObject。SoftwareApplication 与 WebPage 引用官方截图，sitemap 收录图片与指南。
- RVC Fabric 的八语言 README 增加官网、指南、下载入口、准确的截图说明及海王星功能范围。
- GitHub About 增加官网入口，简介使用事实性陈述，Topics 改为产品、用途及技术分类。
- CNB 首页提供产品介绍和官方截图，维护说明位于 `docs/maintainer-v1.md`。

官网文案源位于 `src/rvc-fabric.mjs`、`src/content.mjs` 和 `docs/guides/rvc-fabric-v1.json`。生成结果位于 `dist/`，不得仅修改生成结果。

## 依据与分支

| 项目 | 修改前依据 |
| --- | --- |
| 官网 | `1c6296c`，`main`。 |
| TRM UI 文案守则 | 最新核对为 `c17c7c3`，`src/pages/textRules.ts`。 |
| RVC Fabric 开发功能 | `41bf8e1f55562bd391a214ee16ad8a0f3d62cebf`，`Neptune`。 |
| RVC Fabric 默认展示分支 | 初次核对为 `34003e4`；发布前同步到 `2b3c7ae`，`tm-release`。 |
| 官方截图 | `dd0de24aba1382177b953911b26afd8e277c025b`，2026 年 8 月 6 日。 |

八语言 README 的修改分别同步到 Neptune 和 tm-release。同步内容仅涉及文档，不将 Neptune 的产品实现合并到默认分支。

| 事实 | 核对位置或处理 |
| --- | --- |
| 手机采集音频，桌面执行语音转换。 | Neptune 的 `docs/mobile-v1.md`。 |
| 本地 API 与 MCP 接口属于海王星开发分支。 | Neptune 的 `docs/api-v1.md`。已发布功能见对应版本的发布说明。 |
| 当前训练界面要求 NVIDIA 显卡。 | Neptune 的 `app/src/components/TrainPanel.tsx`，训练前的 `st.nvidia` 检查。 |
| CUDA 与 DirectML 运行环境选择。 | `installer/RVC_Fabric_Setup.iss`。 |
| 训练包含切分、提取、训练、索引。 | `tools/train_worker.py`。 |
| 官网三张截图来自项目仓库。 | `screenshots.json` 保存文件哈希，三张均与仓库原图一致。 |
| 安装包约 9 MB、延迟低于 80 ms。 | 缺少对应版本及测量条件，已从此次官网文案移除。 |

截图记录于 2026 年 8 月。开发功能依据 Neptune 分支，已发布功能见对应版本的发布说明。

## Cloudflare 规则

已获用户确认并部署 `public-site-crawling-v1`。规则 ID 为 `3d2759ed8960472dba35c28bf452e608`。

```text
(http.host eq "www.turingmirror.com" and http.request.method in {"GET" "HEAD"})
```

该规则仅将匹配请求的 Browser Integrity Check 设为关闭。控制台已显示规则处于活动状态。回退时停用这一条规则即可。

复查发现默认 `Python-urllib/3.9` 在部分 URL 上仍收到 `403`，响应为 `error code: 1010`。Cloudflare 的 [Pages 已知问题说明](https://developers.cloudflare.com/pages/platform/known-issues/#browser-integrity-check-on-pages)明确指出：Pages 管理域还有无法由站点规则关闭的检查，自定义域也受其影响。

`TuringMirrorAudit/1.0 (+https://www.turingmirror.com/)` 与浏览器标识均能读取产品页、截图、robots.txt 和 sitemap。当前托管平台为 Cloudflare Pages。

## 检查与后续观察

本地执行 `npm run check`、`npm run check:seo` 和 `git diff --check`。当前检查覆盖四语言的 12 个产品、指南或截图页面，以及链接、图片元数据、JSON-LD 和 sitemap。完整站点生成 28 页。

初次部署记录和线上响应见 `release.json` 与 `http-after.json`，后续进展见 `image-followup.md`。

后续记录产品是否被提及、是否引用官网、截图归属，以及查询日期和来源。已核实的 GPT 回答仍存在配图错误，见 `image-recheck.md` 和 `image-followup.md`。

初次发布时尚未完成搜索平台提交。后续已通过 Google Search Console 提交 sitemap，Google 成功发现 28 页，并接受三项优先抓取申请；Bing IndexNow 已收到 16 个更新地址并返回 202。详细记录见 `image-followup.md`、`google-submission.json` 和 `indexnow-result.json`。`llms.txt` 提供产品、指南与截图入口。

## 参考

- [Google 图片检索说明](https://developers.google.com/search/docs/appearance/google-images)。
- [Google AI 搜索功能说明](https://developers.google.com/search/docs/appearance/ai-features)。
- [Cloudflare Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)。
- [VB-Cable 官方说明](https://vb-audio.com/Cable/)。
- [OBS 来源说明](https://obsproject.com/kb/sources-guide)。
- [RVC WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)。
- [w-okada voice-changer](https://github.com/w-okada/voice-changer)。
