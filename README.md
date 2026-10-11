# StackPlanner 团队研究网站

StackPlanner：以 Memory 为核心的神经符号融合智能体系统。

静态 HTML / CSS / JavaScript 网站，无框架、CDN、外部字体或构建依赖。展示团队研究体系、系统代码和实际演示，不包含个人简历。

## 本地预览

```sh
python3 preview.py
```

打开 [本地网站](http://127.0.0.1:8765/)。服务器仅绑定本机，支持视频 Range 请求。也可以直接打开 `index.html`；访问论文与代码等外部链接需要联网。本地预览不改变仓库可见性，也不会自动部署。

## 页面结构

1. 研究总览：系统目标、两大仓库、神经符号闭环、StackPlanner 2.0 架构原图、研究发展路线与可展开的 Memory 矩阵。
2. 八项核心工作：问题、原始 Framework、精简方法、代表性结果、Paper / 已核实 Code；展开查看动机、模块、步骤、创新、发展关系及实验说明。
3. 系统演示：StackPlanner 1.0 原始视频与片段导航；StackPlanner 2.0 基于真实截图的四类案例回放。
4. Paper List：全部十二篇合并为同一列表，按会议 / 投稿年份从新到旧排列，同年保持研究发展顺序。OPD、DFAMS、MODEL SHAPLEY、SRAO 仍只列文献信息，无独立详情。

Harness 侧沿 TC-RAG → StackPlanner → ScaffoldAgent 展开，策略学习侧沿 AgenticRag-R1 → LoongReflect → Harness-RL 展开。GitHarness 和 GenMem 在各自任务中结合两侧方法。发展关系不表示所有能力已在同一部署中联合训练。

两个系统入口是 [Stack-Planner](https://github.com/PKU-SIS/Stack-Planner/tree/master/) 和 [StackPlanner2.0](https://github.com/PKU-SIS/StackPlanner2.0)。Harness-RL 训练仓库属于对应论文资源。

## 如何修改

| 文件 | 内容 |
| --- | --- |
| `content.js` | 唯一内容清单：论文、结果、展开解析、代码入口、补充文献、系统仓库 |
| `index.html` | 首页叙事、运行架构、研究路线 SVG、导航与演示骨架 |
| `app.js` | 展开、原图查看、案例切换、视频跳转及章节导航 |
| `styles.css` | PKU 红白配色、字号、布局、手机与打印样式 |
| `assets/figure-sources.json` | 原始 Framework 出处 |
| `assets/resource-sources.json` | 仓库、资源链接与状态的依据 |
| `assets/demo/` | 视频、封面、实际运行截图与来源 |

修改文献清单后，用 Node 更新禁用 JavaScript 时的静态目录；正常运行网站不需要 Node：

```sh
node tools/build-publications.mjs
```

## 唯一维护源与预览副本

本 Git checkout 是唯一维护源。工作区中的 `outputs/sp-website` 为导出预览，不单独修改。导出命令：

```sh
python3 tools/export-preview.py /path/to/preview-directory
```

脚本只复制网站文件与 assets，不复制 `.git`、凭据或内部研究材料。协作时创建分支修改、提交并发起 PR；`git pull` 用于同步已有提交。

## 内容边界与待补素材

- 沿用团队确认的会议及在投状态；公开论文页面与录用状态分别核对。
- GitHarness 展示的 67% → 74% 为 training-free 结果。GenMem 在线更新外部经验，固定模型参数和 SID 码本。
- StackPlanner 2.0 架构直接展示团队原图，可点击放大；实际能力以部署配置为准。
- 未公开综述 PDF 不放入站点，不提供作者控制台链接。SRAO 仅登记确认的题名和状态，作者与访客可用的论文入口待补。
- 其余论文的 Code、模型和数据资源核实后再添加。
- 团队负责人邮箱、老师与实验室主页、新演示视频及技术分享资料待确认，不放占位入口。
- 当前保持私密预览，公开发布由团队另行决定。

## 2026-10-11 验证

已检查脚本语法、HTML 结构、资源与锚点、独立展开 / 收起、焦点恢复、原图 / 架构查看、案例切换及视频片段跳转逻辑。确认八项核心介绍与十二条文献，补充四篇仅在末尾列表。

当前环境未能启动 Chrome / WebKit 渲染检查，尚未完成浏览器截图、真实手机视觉验收和实际视频播放检查。

2026-10-11 后续反馈：架构改为直接使用团队原图；删除 Memory 条带与四步循环图；论文目录取消核心 / 其他分组，统一按年份倒序。
