# 官方截图发布与检索记录

日期：2026 年 11 月 7 日。

## 官网

简体中文、繁体中文、英文和日文截图页已发布。每页显示三张原图、图注、原图链接和固定提交的仓库来源。产品页、八语言 README、sitemap 和 llms.txt 提供截图页入口。

截图页沿用官网排版，输出 CollectionPage、ItemList 和 ImageObject。三张图记录于 2026 年 8 月，其他功能页截图显示版本 1.4.2。

构建生成 28 页。SEO 检查覆盖四语言的产品页、指南和截图页，包含 canonical、图片元数据、链接、JSON-LD、图注和 sitemap。四语言截图页的 HTTP 响应均为 200。

## 搜索平台

Google 已成功处理 sitemap，发现 28 页。中文产品页已编入索引，上次抓取时间显示为 2026 年 11 月 3 日 20:15:58。新截图页显示“已发现，尚未编入索引”。中文产品页、中文截图页和英文截图页均已加入优先抓取队列，记录见 `google-submission.json`。

Bing IndexNow 于 2026 年 11 月 7 日 11:56（台北时间）收到 16 个更新地址，返回 202，等待站点验证。记录见 `indexnow-result.json`。

提交命令：

```sh
npm run submit:indexnow -- /products/rvc-fabric/ /products/rvc-fabric/screenshots/
```

脚本读取 `public/indexnow-key.txt`，核对线上验证文件后，将指定官网地址提交至 Bing IndexNow。HTTP 200 表示收到请求，202 表示等待验证。

## 配图错误

查询 `"RVC Fabric" "Turing Mirror" screenshots` 仍返回其他 RVC 项目，未返回官方截图。检索工具读取新页面时报告不可访问，浏览器与 HTTP 读取成功。

后续分享回答混入其他 RVC 项目、MagicMic 和 DKStudio 的图片，并引用了已删除的“低于 80 ms”。当时官网中英文产品页已显示截图入口，未包含该延迟数字。裸域名会跳转至对应的 www 页面。

最新分享回答列出了官方仓库 `home.png`、`settings.png` 和 `misc.png` 地址，但展示的图片来自 MimicPC 和韩国博客，产品卡片还使用了 RVC-WebUI on Pinokio 图片。

## CNB 与平台材料

三张官方原图已上传至 CNB 的 `screenshots` 附件位置，文件名含产品名与记录年月。图片返回 `image/png`，哈希与原图一致，记录见 `cnb-screenshots-http.json`。最新软件版本仍指向安装包。

CNB 首页的产品介绍、图注与下载入口已推送至 `main`。原维护说明位于 `docs/maintainer-v1.md`。代码推送通过 `cnb login` 和 `cnb git-credential` 完成。

国内平台文章与素材说明位于 `docs/media/v1/`，目前尚未向内容平台发布或发送。

参考：[Google 图片检索说明](https://developers.google.com/search/docs/appearance/google-images)、[IndexNow 协议](https://www.indexnow.org/documentation)。
