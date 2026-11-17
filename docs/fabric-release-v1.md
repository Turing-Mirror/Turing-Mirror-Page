# Fabric 发版流程

你手动决定何时构建、何时发布。GitHub 保存源码和正式 Release。CNB 分发 Setup、Runtime 和底模，并给旧客户端提供更新清单。图灵镜官网提供新版客户端读取的更新清单、日志和公告图。

| 软件 | 发版分支 | CNB 发布仓 | Setup 标签 |
| --- | --- | --- | --- |
| RVC Fabric | `tm-release` | `Turing-Mirror/RVC-Fabric-Releases` | `setup` |
| GPT-SoVITS Fabric | `main` | `Turing-Mirror/GPT-SoVITS-Fabric-Releases` | `GSV-setup` |

## 1. 准备版本和更新日志

在产品仓的发版分支准备版本号，提交并推送。版本号按 `X.Y.Z` 递增，GitHub Release 标签用 `vX.Y.Z`。记录这次构建使用的 Git 提交。

- **RVC Fabric** 在 `app/package.json`、`app/src-tauri/Cargo.toml`、`app/src-tauri/tauri.conf.json` 和 `installer/RVC_Fabric_Setup.iss` 同步版本号，运行 `python -m unittest tests.test_version_sync -v`。在 CNB 发布仓的 `catalog-src/changelog.yaml` 增加一条。
- **GPT-SoVITS Fabric** 可以用 `python scripts/shell_version.py --set X.Y.Z` 同步版本号。在 CNB 发布仓的 `changelog.json` 的 `entries` 顶部加入本版条目。首发用产品仓已确定的版本号。

两款软件的更新条目都写版本、日期和用户能看到的变更。更新日志的第一条要和即将推送的 `updater.json` 版本一致。

## 2. 构建、签名和验收

**GPT-SoVITS Fabric** 在 GitHub 打开 **Actions → Build GPT-SoVITS Fabric → Run workflow**，选 `main` 并勾选 **Prepare release**。完成后在 **Releases** 找到本版草稿，下载 `GPT-SoVITS-Fabric-Setup-X.Y.Z.exe`、`.sig` 和 `.sha256`。Actions 会用项目已配置的 Tauri 密钥签名并校验。

**RVC Fabric** 签名沿用当前正式版的原密钥。可以由原发版人交给你已签名的 `RVC Fabric_X.Y.Z_x64-setup.exe`、`.sig` 和 `.sha256`。也可以在 CNB 产品仓的 `tm-release` 分支手动点 **云端构建 Windows 安装包**，然后在 RVCF 项目根目录运行 `python scripts/prepare_setup_release.py --source cnb --commit <构建的完整提交>`，用原密钥在本机签名。脚本同时准备官网固定文件名的副本及校验文件。

Tauri 的 `.sig` 用来验证软件内更新。私钥和密码留在原签名机或 GitHub Actions 的 Secrets 中。对 RVCF 换私钥也要改程序里的公钥，已安装的旧版还会使用原公钥，所以这次迁移保留原来的密钥。

验收时使用准备发布的同一份 Setup。RVCF 至少另测一份当前正式版，用新包覆盖原测试目录，确认上一版的 Runtime、模型、设置和本地音频还在，并启动一次核心功能。GSVF 首发测一次干净安装和运行环境下载。确认要公开前，GitHub 草稿和本机验收包就够用。

## 3. 上传 Setup 到 CNB

从 RVCF 产品仓运行现有的 `scripts/publish_asset.py`。它调用 CNB CLI，上传需要有 `repo-release:rw` 权限的 CNB 个人访问令牌。将令牌放在本机的 `CNB_TOKEN` 环境变量，签名密钥与 CNB 令牌分别管理。

```powershell
python scripts/publish_asset.py --repo Turing-Mirror/RVC-Fabric-Releases --tag setup --file '<RVCF 的版本号 Setup 路径>'
python scripts/publish_asset.py --repo Turing-Mirror/GPT-SoVITS-Fabric-Releases --tag GSV-setup --file '<GSVF 的版本号 Setup 路径>'
```

只运行本次产品对应的一行。上传后记录脚本输出的版本化下载 URL。保留之前版本的附件，旧清单或回退仍可能引用它。RVCF 另有官网固定地址 `RVC_Fabric_Setup.exe`。用同一份 Setup 上传固定名副本，随后核对两个地址的文件 SHA-256 一致。固定名需要替换时，以版本化文件经核验并可下载为前提。

## 4. 发布给用户

1. 确认 CNB 的版本化 Setup 与签过名的本地文件 SHA-256 一致。RVCF 同时更新 `catalog-src/setup.yaml` 和 `app.yaml` 的版本、日期、大小和校验值，更新 `setup/RVC_Fabric_Setup.exe.sha256`，再从 RVCF 项目运行 `python scripts/build_catalog.py build --diff` 生成兼容清单。发布仓路径可用 `RVCF_CNB_DIR` 指定。
2. 按下方模板在对应 CNB 发布仓生成 `updater.json`。其中 `url` 用步骤 3 的版本化地址，`signature` 用同一份 Setup 的 `.sig`。RVCF 的运行环境索引仍由自己的编译器维护。GSVF 的应用更新用 `changelog.json` 和 `updater.json`，Runtime、底模有各自的 CNB 清单和附件。
3. 在 GitHub Releases 打开本版草稿，填写正式的更新说明，核对版本与 Setup 后手动点 **Publish release**。RVCF 使用原有 CNB 构建时，可以在同一提交创建 GitHub Release，将同一份 Setup 作为附件。
4. 提交并推送 CNB 发布仓的新版清单。旧版 RVCF 会从这里收到新版本。确认 CNB 上的 `updater.json` 内容后，到 `Turing-Mirror-Page` 仓库同步该产品，用现有的官网部署流程发布。
5. 核对 Cloudflare 和 CNB 的 `updater.json` 版本、安装包 URL 和签名完全一致。至少用有上一版的测试机点一次「检查更新」，确认能看到本次日志并下载到正确的 Setup。

### 生成 updater.json

在对应的 CNB 发布仓根目录运行。替换前三项即可。

```powershell
$version = '<本次版本号，如 1.2.3>'
$setup = '<本机签过名的版本号 Setup 完整路径>'
$download = '<CNB 版本化 Setup 下载地址>'

$remoteSetup = Join-Path $env:TEMP ([guid]::NewGuid().ToString('N') + '.exe')
try {
    Invoke-WebRequest -Uri $download -OutFile $remoteSetup
    if ((Get-FileHash -LiteralPath $remoteSetup).Hash -ne (Get-FileHash -LiteralPath $setup).Hash) {
        throw 'CNB 的 Setup 和本机的 Setup 不一致。'
    }
} finally {
    if (Test-Path -LiteralPath $remoteSetup) { Remove-Item -LiteralPath $remoteSetup }
}
$signature = (Get-Content -LiteralPath "$setup.sig" -Raw).Trim()
$decoded = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($signature))
$stamp = [regex]::Match($decoded, '(?m)^trusted comment: timestamp:(\d+)').Groups[1].Value
if (!$stamp) { throw '签名中没有时间。' }
$entry = (Get-Content -LiteralPath 'changelog.json' -Raw -Encoding UTF8 | ConvertFrom-Json).entries[0]
if ($entry.version -notin @($version, "v$version")) { throw '更新日志的第一条与本次版本不一致。' }
$json = [ordered]@{
    version = $version
    notes = (@($entry.highlights) -join [Environment]::NewLine)
    pub_date = [DateTimeOffset]::FromUnixTimeSeconds([long]$stamp).ToString("yyyy-MM-dd'T'HH:mm:ss'Z'")
    platforms = @{ 'windows-x86_64' = @{ url = $download; signature = $signature } }
} | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText((Join-Path (Get-Location).Path 'updater.json'), $json + [Environment]::NewLine)
```

### 同步到 Cloudflare

在官网仓库根目录运行，`X.Y.Z` 换成本次版本号。将 `gpt-sovits-fabric` 换成 `rvc-fabric` 就可以同步 RVCF。

```powershell
npm run sync:releases -- gpt-sovits-fabric X.Y.Z
npm run build
```

脚本从已推送的 CNB 发布仓读取清单，检查新版的日志、版本和 Setup 地址，再生成 `public/releases/` 中的文件。有公告图时，旧版沿用原地址，新版使用同步到官网的副本。社区模型封面由社区服务提供。

检查 `public/releases/` 和 `dist/releases/` 的差异并一起提交，推送官网 `main`，等 Cloudflare Pages 部署完成。官网清单地址如下。

- [RVCF 更新清单](https://www.turingmirror.com/releases/rvc-fabric/updater.json)
- [GSVF 更新清单](https://www.turingmirror.com/releases/gpt-sovits-fabric/updater.json)，从首个正式版起提供。

## 旧版升级和回退

- 旧版 RVCF 仍读取原 CNB 地址。兼容清单、原签名公钥以及版本化附件要继续保留。新版先读取 Cloudflare，读取失败时再试 CNB。
- 用户手动升级 RVCF 时选择原安装目录覆盖安装。过去部分版本走卸载再安装会移除 FFmpeg，导致下次启动重新补装。测试时同时检查原安装目录和用户数据。
- 紧急暂停更新时，把 CNB 和 Cloudflare 的更新清单恢复到上一版，RVCF 的固定名下载也恢复到上一版。已经装了出问题版本的用户需要一个版本号更高的修复版，才能通过软件内更新修复。保留上一版的 Setup、签名和清单有助于完成回退。
