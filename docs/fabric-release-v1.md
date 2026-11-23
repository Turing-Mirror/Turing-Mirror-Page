# Fabric 发版流程

GitHub 保存源码和已签名的正式 Release。安装包存放在 Cloudflare R2 的 `trm-releases` 桶，由 `https://cdn.turingmirror.com/f/<key>` 分发。运行环境与底模使用 ModelScope 镜像映射；官网提供下载入口和软件内更新清单。

| 软件 | 发版分支 | 清单来源 | R2 前缀 | 固定名安装包 |
| --- | --- | --- | --- | --- |
| RVC Fabric | `tm-release` | CNB `Turing-Mirror/RVC-Fabric-Releases` 的 `main` | `rvc-fabric/` | `RVC_Fabric_Setup.exe` |
| GPT-SoVITS Fabric | `main` | 官网旁的本地 `../GPT-SoVITS-Fabric-Releases/` | `gpt-sovits-fabric/` | `GPT-SoVITS-Fabric-Setup.exe` |

GSV 的 CNB 发布仓已不可读写。该清单仓仅在本地维护和提交，不 clone 或 push CNB。

## 1. 下载地址

安装包同时保存固定名与当前版本化名，例如：

- `https://cdn.turingmirror.com/f/rvc-fabric/RVC-Fabric-Setup-1.8.1.exe`
- `https://cdn.turingmirror.com/f/gpt-sovits-fabric/GPT-SoVITS-Fabric-Setup-1.0.3.exe`

`updater.json` 和 `index.json` 的安装包条目使用版本化地址。对外下载入口继续使用 `https://cdn.turingmirror.com/d/<产品>-setup`，计数和跳转由既有统计服务负责。短链地址记录在 D1 数据库 trm-telemetry 的 links 表中，旧数据库 rvc-fabric-telemetry 不再使用。发布脚本不修改统计服务、D1 或下载 Worker。

## 2. 准备与构建

1. 在对应产品仓同步版本号，在 `docs/releases/X.Y.Z.md` 写更新说明。
2. 通过版本检查后，运行对应的 Windows Release 工作流，生成安装包、签名和 SHA-256 校验文件。
3. 使用同一份安装包完成安装和核心功能验收，公开 GitHub 的 `vX.Y.Z` 正式 Release。

## 3. 发布安装包与清单

在产品源码仓运行：

```powershell
python scripts/cnb_release.py --version X.Y.Z
python scripts/cnb_release.py --version X.Y.Z --publish
```

第一条只验证已公开的 GitHub Release 并在临时目录准备清单。第二条执行：

1. 核对 GitHub 安装包签名、SHA-256 和大小。
2. 通过 Wrangler 上传 R2 的版本化名与固定名；逐个从 CDN 下载完整内容，核对 SHA-256 和大小。
3. 两份文件都通过后，列出同一产品前缀内的对象，删除其他旧版本的版本化安装包。其他产品和非安装包对象不受影响；遇到更新版本会停止。
4. 更新源清单、校验文件、更新日志、`updater.json` 和编译后的 `index.json`。同版本重跑会迁移旧地址，不重复添加更新日志。
5. RVC 提交并推送 CNB 清单仓；GSV 在本地清单仓提交，不推送。GSV 可用 `--catalog <目录>` 指定本地检出，执行前工作区须干净。

Wrangler 默认从 PATH 或工作区的 `TRM-Nexus/services/community/node_modules/wrangler/bin/wrangler.js` 查找，也可用 `TRM_WRANGLER` 指定。复用 Wrangler 登录或 Cloudflare 环境变量；多个账户时设置 `CLOUDFLARE_ACCOUNT_ID`。对象列表通过 [Cloudflare R2 List Objects API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/list/) 分页读取，认证通过 [Wrangler auth token](https://developers.cloudflare.com/workers/wrangler/commands/general/#auth-token) 在内存中取得。

运行环境与底模的地址由发布仓 `catalog/modelscope.json` 按 SHA-256 映射。GSV 编译运行环境、底模等下载项，RVC 编译运行环境分片，保留已有 CNB 备用地址；缺少映射的条目不会生成未经验证的 ModelScope 地址。安装包不参与该映射，始终走 Cloudflare。

## 4. 同步官网

在官网仓运行：

```powershell
npm run sync:releases -- gpt-sovits-fabric X.Y.Z
npm run sync:releases -- rvc-fabric X.Y.Z
node --test scripts/sync-fabric-releases.test.mjs
npm run check
npm run check:seo
```

RVC 从 CNB raw 读取清单和公告图片。迁移期间，脚本只接受与产品及版本完全匹配的旧 CNB 安装包地址，将其转换为 CDN 地址；HEAD 和大小检查都访问 CDN。其他安装包地址会报错。

GSV 从本地发布仓读取清单，公告图片使用相对该仓的路径；同步过程不访问 GSV CNB。脚本校验 updater、index、更新日志版本一致，以及 CDN HEAD 返回的大小与清单一致，再写入官网。

核对 `public/releases/` 和 `dist/releases/` 中的 updater、changelog、plaza、公告图片，以及 RVC 的 `app.json`、GSV 的完整 `index.json`。正常发版时提交并推送官网，等待 Pages 部署，再验证线上清单和下载。本任务卡的验证阶段只在本地提交，不推送、不部署、不上传或清理远端文件。
