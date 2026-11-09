# 索引核对 v1

2026 年 11 月 9 日核对了 Search Console 的网页索引报告。当前 sitemap 已读取成功，列出 20 个正式页面。逐一访问均返回 200，页面的规范网址指向自身，HTML 与响应头均允许索引。

| 报告分类 | 网址 | 线上结果 |
| --- | --- | --- |
| 网页会自动重定向 | `http://www.turingmirror.com/`、`https://turingmirror.com/` | 301 到 `https://www.turingmirror.com/`。 |
| 网页会自动重定向 | `/en/products/rvc-fabric` | 308 到 `/en/products/rvc-fabric/`。 |
| 被 `noindex` 排除 | `/demos/trm-ui/en/`、`/demos/trm-ui/ja/` | 产品页内的嵌入式演示。正式产品页允许索引。 |
| 已抓取，尚未编入索引 | `/products/rvc-fabric/screenshots/` | 已撤下的独立截图页，301 到 `/products/rvc-fabric/`。 |

## Cloudflare 裸域跳转

原有「从根重定向到 WWW」规则仅匹配 HTTPS，裸域 HTTP 返回 522。规则已改为按主机名匹配，适用于裸域的 HTTP 和 HTTPS。

```text
(http.host eq "turingmirror.com")
concat("https://www.turingmirror.com", http.request.uri.path)
```

状态码为 301，保留查询参数。已复测裸域首页和英文产品页路径，HTTP 与 HTTPS 均直接跳转到对应的 HTTPS www 网址。
