# Cloudflare 发布管线验收记录

日期：2026-11-24。对应任务卡：工作区 `docs/codex/release-pipeline-cloudflare.md`。

本次实现发布管线并迁移现有 1.0.3、1.8.1 的本地清单。未发版、未运行 CI、未上传或删除远端文件，未修改统计服务、D1 或下载 Worker。R2 上传与清理通过模拟测试验证；真实网络验证仅使用已发布的安装包和只读清单。各仓分别本地提交，不推送。

## 改动文件

下列路径均相对对应仓库。同一行列出的文件承担同一项行为。

| 仓库 | 文件 | 行为变化 |
| --- | --- | --- |
| GPT-SoVITS-Fabric | `scripts/cnb_release.py` | 发布安装包到 R2，直接更新本地发布仓并本地提交，支持同版本迁移且不 clone/push CNB。 |
| GPT-SoVITS-Fabric | `scripts/release_storage.py` | 封装两种安装包名称的上传、下载哈希与大小核对，以及核对通过后的同产品旧版本清理。 |
| GPT-SoVITS-Fabric | `scripts/build_catalog.py` | 安装包条目始终生成版本化 CDN 地址，不参与 ModelScope 映射。 |
| GPT-SoVITS-Fabric | `scripts/test_build_catalog.py` | 验证安装包保持 CDN 地址，其他下载项仍使用 ModelScope 映射。 |
| GPT-SoVITS-Fabric | `scripts/test_cnb_release.py` | 验证同版本迁移、重复执行、临时演练和本地提交行为。 |
| GPT-SoVITS-Fabric | `scripts/test_release_storage.py` | 验证分页面向当前产品列举、上传后校验、失败停止及清理范围。 |
| GPT-SoVITS-Fabric | `docs/release.md` | 说明 Cloudflare 安装包和本地清单的新流程。 |
| RVC-Fabric | `scripts/cnb_release.py` | 安装包改用 R2，保留 CNB 清单提交和推送，允许同版本迁移地址。 |
| RVC-Fabric | `scripts/release_storage.py` | 提供独立于 CNB 资源上传的 R2 安装包发布模块。 |
| RVC-Fabric | `scripts/build_catalog.py` | app 和 setup 条目编译为版本化 CDN 地址。 |
| RVC-Fabric | `configs/online_catalog.json` | 将内置 app 段同步为已验证的 1.8.1 编译结果。 |
| RVC-Fabric | `tests/test_build_catalog.py` | 验证 app 和 setup 不再包含 CNB 安装包地址。 |
| RVC-Fabric | `tests/test_cnb_release.py` | 验证同版本迁移不重复日志，并保留发布时的 CNB 推送。 |
| RVC-Fabric | `scripts/test_release_storage.py` | 模拟验证上传、校验、幂等执行、分页和限定范围的清理。 |
| RVC-Fabric | `docs/release.md` | 说明 R2 安装包与 CNB 清单的职责及认证方式。 |
| GPT-SoVITS-Fabric-Releases | `catalog/sources.json` | 将滞后的 1.0.2 安装包源更新为已验证的 1.0.3 和版本化 CDN 地址。 |
| GPT-SoVITS-Fabric-Releases | `index.json` | 重新编译 1.0.3 清单，包含官网清单入口及 CDN 安装包地址。 |
| GPT-SoVITS-Fabric-Releases | `updater.json` | 使用现有 1.0.3 的公开签名、发布时间和 CDN 地址。 |
| GPT-SoVITS-Fabric-Releases | `changelog.json` | 补齐已发布的 1.0.3 更新说明。 |
| GPT-SoVITS-Fabric-Releases | `assets/setup/GPT-SoVITS-Fabric-Setup-1.0.2.exe.sha256`、`assets/setup/GPT-SoVITS-Fabric-Setup-1.0.3.exe.sha256` | 将本地版本化校验文件从 1.0.2 替换为已验证的 1.0.3。 |
| GPT-SoVITS-Fabric-Releases | `assets/setup/GPT-SoVITS-Fabric-Setup.exe.sha256` | 固定名校验值同步为同一份 1.0.3 安装包。 |
| GPT-SoVITS-Fabric-Releases | `README.md` | 明确该仓仅本地维护，官网从本地读取。 |
| RVC-Fabric-Releases | `catalog-src/app.yaml`、`catalog-src/setup.yaml` | 将现有 1.8.1 的安装包源迁移为版本化 CDN 地址。 |
| RVC-Fabric-Releases | `index.json`、`catalog/online_catalog.snippet.json` | 从源文件重新编译 CDN 安装包条目。 |
| RVC-Fabric-Releases | `updater.json` | 保留 1.8.1 签名，仅迁移安装包地址。 |
| RVC-Fabric-Releases | `README.md`、`docs/maintainer-v1.md` | 更新安装包下载入口和维护说明。 |
| Turing-Mirror-Page | `scripts/sync-fabric-releases.mjs` | RVC 继续读取 CNB raw，GSV 改读本地清单及图片，统一校验 CDN HEAD 与清单大小。 |
| Turing-Mirror-Page | `scripts/sync-fabric-releases.test.mjs` | 验证本地图片与完整 index 同步、旧 RVC 地址迁移和错误拒绝。 |
| Turing-Mirror-Page | `public/releases/gpt-sovits-fabric/index.json`、`dist/releases/gpt-sovits-fabric/index.json` | 新增可供新版 GSV 客户端读取的完整清单，源与构建产物一致。 |
| Turing-Mirror-Page | `docs/fabric-release-v1.md` | 记录安装包 R2、资源 ModelScope 映射、GSV 本地清单及官网同步流程。 |
| Turing-Mirror-Page | `docs/cloudflare-release-pipeline-v1.md` | 保存文件变化、验证范围和命令结果。 |

官网现有 updater、RVC app、更新日志及公告经同步后与原内容一致。GSV 先前已有的 `.wrangler/` 未纳入提交，下载和临时校验文件存放于已忽略的 `GPT-SoVITS-Fabric/data/`。

## 测试与命令输出

GSV 在具备 torch 的本地 Python 3.12 环境执行脚本测试：

```text
./data/dev-root/Runtime/python.exe -m pytest scripts -q -o cache_dir=data/pytest-cache-cloudflare
33 passed, 9 subtests passed in 7.31s
```

补充同版本大小检查后的定向复核：

```text
python -m pytest scripts/test_cnb_release.py -q -o cache_dir=data/pytest-cache-cloudflare
3 passed in 0.45s
```

RVC：

```text
python -m pytest tests/test_build_catalog.py tests/test_cnb_release.py scripts/test_release_storage.py -q -o cache_dir=TEMP/pytest-cache-cloudflare
40 passed in 6.09s
```

官网：

```text
node --test scripts/sync-fabric-releases.test.mjs
tests 5
pass 5
fail 0

npm run sync:releases -- gpt-sovits-fabric 1.0.3
gpt-sovits-fabric: 1.0.3, 0 announcement images

npm run sync:releases -- rvc-fabric 1.8.1
rvc-fabric: 1.8.1, 0 announcement images

npm run check
Built 24 pages for https://www.turingmirror.com into dist/

npm run check:seo
SEO checks passed: four product pages, image metadata, local links, sitemap and retired-page redirects.
```

发布仓检查在工作区根目录执行：

```text
python GPT-SoVITS-Fabric/scripts/build_catalog.py --sources GPT-SoVITS-Fabric-Releases/catalog/sources.json --check
[catalog] 回环校验：2 个变体过了客户端解析器
[catalog] 运行时 2 个变体 · 角色 7 个 · extras 16 组
[catalog] 校验通过

python RVC-Fabric/scripts/build_catalog.py --cnb RVC-Fabric-Releases --bundled GPT-SoVITS-Fabric/data/cloudflare-verify/rvc-fabric/bundled.json check
check 通过（警告 1，音色 25 个，广场 0 条，更新日志 36 条）
```

RVC 的一条既有警告为官方音色建议补录授权字段，本次没有修改相关资源。另已核对本地发布仓的 app/updater、RVC 内置 app、官网 app/index/updater 的版本与地址一致；所有 `public/releases/` 文件与 `dist/releases/` 内容一致。`git diff --check` 在五个仓库通过。

## 真实下载核对

每款产品的版本化名与固定名均执行 HEAD 和完整下载，HEAD 均返回 HTTP 200；完整下载遇到连接截断后使用 Range 补齐，并对最终全部字节重新计算哈希。哈希与 GitHub Release 的校验文件一致，大小与 GitHub 资产元数据一致，签名通过各产品内置公钥验证。

| 产品 | 文件名 | 字节数 | SHA-256 |
| --- | --- | --- | --- |
| GSV 1.0.3 | `GPT-SoVITS-Fabric-Setup-1.0.3.exe`、`GPT-SoVITS-Fabric-Setup.exe` | 26181925 | `dbc7ffa0c6c29b558191ea0df82a98d228d879301b3a7765b368b79c314897f3` |
| RVC 1.8.1 | `RVC-Fabric-Setup-1.8.1.exe`、`RVC_Fabric_Setup.exe` | 25085336 | `83534c86053783eb7e2c9544c7b4aef545b7a93dd86d8bea48a94cc2915e6351` |

本记录不代表执行过远端 R2 写入、旧版本删除、CNB 推送或 Pages 部署。
