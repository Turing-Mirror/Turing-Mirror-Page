# Turing Mirror Page

图灵镜官网（www.turingmirror.com）。静态站点：首页展示产品、频道与社区入口，每个产品有独立详情页；四种语言各有独立网址。由构建脚本从单一数据源生成，部署于 Cloudflare Pages。

```bash
npm install
npm run dev      # 构建并本地预览 http://127.0.0.1:4174
npm run check    # 语法检查 + 构建
npm run deploy   # 构建并部署 dist/
```

文档见 [docs/](docs/)。
