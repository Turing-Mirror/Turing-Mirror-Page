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

Google 不在此次 IndexNow 提交范围内。用户登录 Google Search Console 后，已提交正式 sitemap；Google 显示已成功处理并发现 28 个页面。新截图页状态为“已发现，尚未编入索引”，申请后 Google 显示已加入优先抓取队列。中文产品页已编入索引，上次抓取时间显示为 2026 年 11 月 3 日 20:15:58，用户代理为 Googlebot 智能手机版，抓取成功且允许编入索引。

## 验收

本地构建生成 28 页。SEO 检查覆盖四语言的产品页、指南及截图页，核对 canonical、图片元数据、本地链接、JSON-LD、截图说明与 sitemap。浏览器检查截图页的原图展示和现有视觉样式。

线上页面、IndexNow 回执与再次图片检索分别记录，不能相互替代。截图页收录与 AI 正确配图仍需实际检索证据。

参考：[Google 图片检索说明](https://developers.google.com/search/docs/appearance/google-images)、[IndexNow 协议](https://www.indexnow.org/documentation)。

## 本次结果

- 四语言截图页线上均返回 200，图注与 CollectionPage 数据检查通过。
- Bing IndexNow 于 2026 年 11 月 7 日 11:56（台北时间）返回 202，已收到 16 个更新地址，等待站点验证。
- 即时图片查询 `"RVC Fabric" "Turing Mirror" screenshots` 仍返回其他 RVC 项目，尚未出现官方截图。检索工具直接读取新页面仍报告不可访问，而浏览器和正式 HTTP 检查通过；此差异已保留，未据此宣称所有抓取客户端均可访问。
- 官网发布地址为 https://abc4cdba.turing-mirror-page.pages.dev 。官网内容提交为 `afc2705`；README 入口提交为 Neptune 的 `5e0456d` 与默认分支的 `40d11e3`。

Google 最终回执见 `google-submission.json`：中文产品页、中文截图页和英文截图页均已加入优先抓取队列。该队列状态尚不代表新图片已进入图片索引。

## 后续错误与国内入口

用户再次提供的回答以“介绍一下RVC Fabric，还有它的截图”为提问，图片仍混入其他 RVC 项目、MagicMic 和 DKStudio。回答引用了已删除的“低于 80 ms”，并声称官方没有独立截图图集。此时直接读取中英文产品页，均能找到截图入口，且不存在该延迟数字；裸域名也会跳转到对应 www 页面。当前证据不能确定回答使用了缓存、搜索摘要还是其他旧来源。

本轮向 CNB 的 `screenshots` 附件位置上传三张官方原图，文件名包含产品名与记录年月。该附件位置未设为最新软件版本。公开图片返回 `image/png`，内容哈希与原图一致，见 `cnb-screenshots-http.json`。

CNB 首页的新介绍、图注与下载入口在本地提交 `952653c`。原维护说明移至 `docs/maintainer-v1.md`。当前发布凭据可上传附件，但无 `repo-code:rw` 权限，首页推送尚未完成。

国内平台介绍正文与素材来源见 `docs/media/v1/`。正文可供 CSDN、知乎、哔哩哔哩专栏或软件目录编辑使用；目前未向这些平台发布或发送。此项直接补充中文产品介绍及可用原图，不要求用户继续证明其观察到的来源偏向。
