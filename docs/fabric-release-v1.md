# Fabric 发版流程

两个项目都由维护者手动构建并公开 Release。

## RVC Fabric

1. 在 RVC Fabric 的 [Build RVC Fabric](https://github.com/Turing-Mirror/RVC-Fabric/actions/workflows/windows-release.yml) 选发版分支 `tm-release`，勾选 **Prepare release**。下载草稿中的 Setup 试装。
2. 在产品仓库点 **Publish release**，再到官网仓库运行 [Update RVC Fabric](https://github.com/Turing-Mirror/Turing-Mirror-Page/actions/workflows/rvc-release.yml)。输入刚发布的版本号，例如 `1.8.0`。官网会一起更新下载、版本清单和更新日志。
3. 1.8.0 首次发布时，在产品仓库运行 `python scripts/legacy_update.py --publish`，给旧版保留一次 CNB 更新。此后的客户端版本只需前两步。运行环境仍由原资源仓分发。

[RVC Fabric 发版和旧版升级说明](https://github.com/Turing-Mirror/RVC-Fabric/blob/tm-release/docs/release.md)

## GPT-SoVITS Fabric

### 准备和试装

在 `main` 运行 `python scripts/shell_version.py --set X.Y.Z`，提交版本号，在 CNB 发布仓的 `changelog.json` 顶部写入本版变更。用同一版本运行 **Build GPT-SoVITS Fabric → Run workflow**，勾选 **Prepare release**。下载草稿中的 `GPT-SoVITS-Fabric-Setup-X.Y.Z.exe`、`.sig` 和 `.sha256`。首发时测试全新安装和运行环境下载。

### 分发和发布

1. 在 RVC Fabric 源码根目录，用已有的 CNB 上传脚本上传同一份安装包。CNB_TOKEN 需要个人访问令牌的 `repo-release:rw` 权限。

```powershell
python scripts/publish_asset.py --repo Turing-Mirror/GPT-SoVITS-Fabric-Releases --tag GSV-setup --file '<GSVF 的版本号 Setup 路径>'
```

2. 在 GSVF 的 CNB 发布仓按下方命令验证文件、生成 `updater.json`。把下载地址固定到本次版本的 Setup。
3. 在 GitHub 草稿中核对版本、安装包与说明，点 **Publish release**。提交并推送 CNB 的更新清单和日志。
4. 在官网仓库运行同步命令，提交源码和构建产物，推送 `main` 后确认 Cloudflare 部署完成。

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

### 同步 GSVF 到官网

```powershell
npm run sync:releases -- gpt-sovits-fabric X.Y.Z
npm run build
```

检查 `public/releases/` 和 `dist/releases/` 的差异并一起提交。同步后核对[软件更新清单](https://www.turingmirror.com/releases/gpt-sovits-fabric/updater.json)中的版本、签名和 Setup 下载地址。运行环境、底模沿用各自的 CNB 清单。
