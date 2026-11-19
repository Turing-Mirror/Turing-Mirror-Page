# Fabric 发版流程

GitHub 保存源码和正式 Release，CNB 分发安装包（Setup）、运行环境与底模，图灵镜官网提供产品下载入口与软件内更新清单。

| 软件 | 发版分支 | CNB 发布仓 | Setup 标签 | 固定名安装包 | 对外分发短链 |
| --- | --- | --- | --- | --- | --- |
| RVC Fabric | `tm-release` | `Turing-Mirror/RVC-Fabric-Releases` | `setup` | `RVC_Fabric_Setup.exe` | `https://cdn.turingmirror.com/d/rvc-fabric-setup` |
| GPT-SoVITS Fabric | `main` | `Turing-Mirror/GPT-SoVITS-Fabric-Releases` | `GSV-setup` | `GPT-SoVITS-Fabric-Setup.exe` | `https://cdn.turingmirror.com/d/gpt-sovits-fabric-setup` |

## 1. 对外下载与计数体系

- 官网产品页及对外宣发统一使用 `https://cdn.turingmirror.com/d/<产品>-setup`。
- `trm-telemetry` Cloudflare Worker 收到请求后，在 D1 `link_hits` 表记录一次下载，并 302 跳转至 D1 `links` 表（及 Worker 内置 `FALLBACK_LINKS`）中配置的 CNB 固定文件名安装包直链。
- 每次发版用新版安装包原地覆盖 CNB 上的固定文件名安装包，不更改短链地址；旧版自动更新只保留当前最新一个版本化安装包（如 `RVC-Fabric-Setup-<版本>.exe`、`GPT-SoVITS-Fabric-Setup-<版本>.exe`）。

## 2. 准备版本、构建和验收

- **RVC Fabric**：在 `tm-release` 分支同步版本号并通过版本校验后，运行 [Build RVC Fabric](https://github.com/Turing-Mirror/RVC-Fabric/actions/workflows/windows-release.yml) 生成已签名的版本化安装包、`updater.json` 与 `.sha256` 边车。
- **GPT-SoVITS Fabric**：在 `main` 分支运行 `python scripts/shell_version.py --set X.Y.Z` 同步版本号并更新 CNB 发布仓 `changelog.json`，运行 **Build GPT-SoVITS Fabric** 生成安装包与签名。
- 本地使用待发布的同一份 Setup 完成安装与核心功能验收。

## 3. 上传 CNB 与更新清单

1. 在 CNB 对应的 Setup 标签下上传本次版本化安装包与固定名安装包（同份文件改名覆盖），使该标签下仅保留固定名与当前版本化两个安装包。
2. 在 GitHub Releases 公开 `vX.Y.Z` 正式 Release。
3. 更新 CNB 发布仓的清单源文件、`setup` / `assets/setup` 下的 `.sha256` 边车、`changelog.json` 与 `updater.json`（`url` 指向本次 CNB 版本化安装包），编译生成 `index.json` 并推送到 CNB `main`。

## 4. 同步到图灵镜官网

在官网仓库根目录运行同步命令并重新构建：

```powershell
npm run sync:releases -- rvc-fabric <版本>
npm run sync:releases -- gpt-sovits-fabric <版本>
npm run check
npm run check:seo
```

核对 `public/releases/` 与 `dist/releases/` 中的 `updater.json`、`changelog.json`、`plaza.json`（以及 RVC Fabric 的 `app.json`），提交并推送 `main`，等待 Cloudflare Pages 部署完成后验证官网下载按钮与短链跳转。
