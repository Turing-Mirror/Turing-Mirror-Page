# 给 Gemini 4 Argon 的文案审计交接书

请审计图灵镜官网、RVC Fabric 八语言 README、CNB 介绍和平台文章，列出问题与建议文案。审计日期为 2026 年 11 月 7 日。

## 文案依据

使用 `rules/textRules.ts`，对应 TRM UI 提交 `a761ffc`，于 2026 年 11 月 7 日同步。既有语言审校记录位于 `rules/TRM-UI-Style-Guide.md` 和 `rules/Turing-Mirror-Page.md`。

重点检查以下要求：

- 使用完整、平实的陈述句，直接说明事实、用途和操作结果。
- 删除防御性说明、说教、空泛口号和重复信息。
- 用户说明使用通行的软件术语。开发文档保留必要的代码、接口和命令名称。
- 各语言采用自然的本地表达，保留产品名、设备名、协议名与命令。

## 审计文件

| 材料 | 位置 |
| --- | --- |
| 官网四语言文案、使用指南和截图说明 | `copy/website/`。 |
| 官网仓库说明与品牌素材使用说明 | `copy/website/README.md`、`copy/website/docs/README.md` 和 `copy/website/docs/brand-assets.md`。 |
| RVC Fabric 八语言 README | `copy/readmes/`。 |
| CNB 首页和维护说明 | `copy/cnb/`。 |
| 国内平台文章与素材说明 | `copy/media/`。 |
| 修改差异 | `changes/`。 |
| 发布与检索记录 | `evidence/`。 |

本轮已检查官网产品说明、八语言 README、CNB 文档、平台文章及交接材料，修改了重复提醒、防御性措辞、内部术语和不完整的句子。请复核修改后的全文及各语言之间的对应关系。

官网代码采用标准 MIT 许可证，许可文本位于 `copy/website/LICENSE`。品牌素材的使用范围另行说明。请审阅相关说明的表述，保留 MIT 许可证原文。

## 产品事实

RVC Fabric 可在语音聊天和游戏中实时变声、播放音乐与音效，音频库支持片段、叠加播放、循环和全局快捷键。开发功能依据 Neptune 分支。该分支包含手机配对、本地 API 和 MCP 接口；手机采集音频，桌面端执行语音转换。已发布版本的功能查阅对应发布说明。

实时变声支持 CUDA 和 DirectML，当前模型训练需要 NVIDIA 显卡。延迟受硬件、模型和音频设置影响。“低于 80 ms”和安装包“约 9 MB”已从本轮产品说明中移除。

三张截图与仓库原图哈希一致，拍摄时间与版本见素材记录。RVC Fabric、RVC WebUI 和 w-okada voice-changer 的图片分别归属于各自项目。

## 发布与检索状态

官网四语言截图页和使用指南已发布。CNB 首页已发布产品介绍和三张截图，维护说明位于 `docs/maintainer-v1.md`。国内平台文章已准备，尚未发布到 CSDN、知乎或哔哩哔哩专栏。

Google 已发现 28 页并接受三项优先抓取申请。Bing IndexNow 已收到 16 个更新地址，返回 202。相关记录见 `google-submission.json`、`indexnow-result.json` 和 `image-followup.md`。

GPT 配图错误仍存在：已核实的回答使用了其他软件的界面；最新一条回答列出正确原图地址，却展示 MimicPC 和韩国博客的配图。

官网网页和图片的 HTTP 读取检查通过。默认 Python 客户端仍有 Pages 平台层 1010 响应。详细记录见 `README.md`。

本轮补充了八语言 README 的语音聊天、游戏内放歌与混音说明，合并导航并删除截图日期段落。官网和 CNB 同步采用简短图注；TRM UI 的 `documentStructure` 规则规定用途说明、段落组织与截图文案。

## 审计输出

按事实错误、守则问题、翻译与术语问题排序。每项提供文件位置、原文、问题依据、替换文案及需要同步的语言。待确认的事实单独列出。最后列明检查范围和需要修改的项目。
