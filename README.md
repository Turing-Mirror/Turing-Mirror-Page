# 图灵镜官网

本仓库提供[图灵镜官网](https://www.turingmirror.com/)的源代码。网站介绍图灵镜的产品，提供下载、使用指南、官方截图和社区入口。

## 产品

| 产品 | 用途 |
| --- | --- |
| [RVC Fabric](https://www.turingmirror.com/products/rvc-fabric/) | Windows 实时语音转换与模型训练软件。 |
| [喵言喵 MoeText](https://www.turingmirror.com/products/moetext/) | 按自定义规则改写 QQ 和 Discord 聊天输入框中的文字。 |
| [测试镜](https://www.turingmirror.com/products/mirror-test/) | 动画、GalGame 和少女乐队主题的互动测试。 |
| [TRM UI](https://www.turingmirror.com/products/trm-ui/) | 图灵镜应用共用的组件库与设计系统。 |

RVC Fabric 提供[使用指南](https://www.turingmirror.com/guides/rvc-fabric/)和[官方截图](https://www.turingmirror.com/products/rvc-fabric/screenshots/)。

网站支持[简体中文](https://www.turingmirror.com/)、[繁體中文](https://www.turingmirror.com/zh-hant/)、[English](https://www.turingmirror.com/en/)和[日本語](https://www.turingmirror.com/ja/)。

## 本地预览

安装依赖并启动预览：

```sh
npm install
npm run dev
```

在浏览器中打开 <http://127.0.0.1:4174>。

## 检查与发布

检查脚本语法、构建页面并核对页面元数据与链接：

```sh
npm run check
npm run check:seo
```

配置 Cloudflare 账号权限后，构建并部署到 Pages：

```sh
npm run deploy
```

## 维护文档

网站由构建脚本生成静态页面，TRM UI 交互示例使用 React 组件。构建结果位于 `dist/`，部署平台为 Cloudflare Pages。

- [项目说明](docs/README.md)介绍目录、内容维护、语言路径和部署方式。
- [检索优化记录](docs/seo/v1/README.md)记录官网、仓库和官方截图的发布进展。
- [平台文章与素材](docs/media/v1/README.md)提供 RVC Fabric 介绍和截图来源。
- [文案审计交接书](docs/seo/v1/gemini-handoff.md)列出审计范围、规则与材料。

修改文案前，请阅读 [TRM UI 文案守则](https://github.com/Turing-Mirror/TRM-UI/blob/main/src/pages/textRules.ts)。修改页面内容或静态资源后，重新构建并提交对应的 `dist/` 文件。

## 许可证

原创代码与文档采用 [MIT 许可证](LICENSE)。Logo、产品截图和社区二维码等素材的使用方式见[品牌素材使用说明](docs/brand-assets.md)。第三方代码适用各自的许可证。
