# RVC Fabric：Windows 实时变声器介绍与官方截图

RVC Fabric 是图灵镜开发的免费开源 Windows 桌面软件，基于 RVC 提供实时语音转换、音色管理、人声分离和模型训练，适用于语音通话、直播与音频制作。

## 可以用来做什么

使用麦克风说话时，RVC Fabric 可以将输入转换为所选音色。配合 VB-Cable 虚拟声卡，可以把转换后的声音传入通话或直播软件。

软件可管理音色模型、调整音高与共鸣、保存参数预设，并提供人声分离和音色训练工具。准备好运行环境和模型后，语音转换在本机执行。

## 官方界面截图

以下三张截图来自 RVC Fabric 官方仓库，记录于 2026 年 8 月。

### 主界面

![RVC Fabric 主界面，显示音色选择、音频工具和实时变声控制。](https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/releases/download/screenshots/rvc-fabric-home-2026-08.png)

主界面展示最近使用的音色和音频工具入口，底部提供变声开关、音高和共鸣调节。

### 设备与音频设置

![RVC Fabric 设置页面，显示输入、输出与监听选项。](https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/releases/download/screenshots/rvc-fabric-settings-2026-08.png)

设备与音频设置页展示设备类型、麦克风输入、输入增益、输出设备和监听选项。

### 其他功能

![RVC Fabric 其他功能页面，显示软件版本与运行环境。](https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/releases/download/screenshots/rvc-fabric-misc-2026-08.png)

其他功能页展示软件版本、目录、运行环境、显卡与引擎状态。该截图中的版本号为 1.4.2。

## 安装与音频连接

桌面端支持 Windows 10 和 Windows 11。实时语音转换支持 NVIDIA CUDA，以及 AMD 和 Intel 显卡的 DirectML 加速。当前模型训练界面要求 NVIDIA 显卡。

1. 从[官方 CNB 仓库](https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases/-/releases/download/setup/RVC_Fabric_Setup.exe)下载安装程序。
2. 按照引导配置运行环境，下载或导入音色模型。
3. 选择麦克风、输出设备和音色，开启变声。
4. 需要将声音传入其他软件时，安装 VB-Cable 并重启电脑。将 RVC Fabric 的输出设为 CABLE Input，将通话或直播软件的输入设为 CABLE Output。

实际延迟取决于硬件、模型和音频设置。

## 海王星分支

截至 2026 年 11 月 7 日，Neptune 海王星开发分支包含手机配对、本地 API 和 MCP 接口。手机配对由手机采集音频，桌面端执行语音转换。已发布版本的功能见对应发布说明。

## 官方入口

- [产品官网](https://www.turingmirror.com/products/rvc-fabric/)介绍软件功能。
- [官方截图页](https://www.turingmirror.com/products/rvc-fabric/screenshots/)提供原图及来源。
- [使用指南](https://www.turingmirror.com/guides/rvc-fabric/)说明安装、硬件与音频连接。
- [CNB 发布仓库](https://cnb.cool/Turing-Mirror/RVC-Fabric-Releases)提供安装包与资源。
- [GitHub 源代码仓库](https://github.com/Turing-Mirror/RVC-Fabric)提供代码与开发文档。
