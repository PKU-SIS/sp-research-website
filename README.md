# SP 研究体系与系统演示

团队研究网站：Memory、Harness 与策略学习，以及 SP1 / SP2 系统演示。

## 查看网站

下载仓库 ZIP 并解压，双击 `index.html`。图片、脚本与视频均在仓库中。

也可在本目录运行：

```sh
python3 preview.py
```

打开 http://127.0.0.1:8765/。预览服务支持视频分段请求和片段跳转。

## 内容

研究总览 → 八篇论文介绍 → 系统演示 → 系列论文目录。

系统演示包含 SP1 原始录屏，以及 SP2 在 DeerFlow2 上的真实截图回放；回放不连接模型后端。论文原图、视频与截图均保留，来源记录位于 `assets/figure-sources.json` 和 `assets/demo/sources.json`。

## 编辑

- `index.html`：页面结构、研究总览与论文目录。
- `app.js`：论文内容、演示案例与交互。
- `styles.css`：样式与响应式布局。
- `assets/`：图片、视频和来源清单。

本仓库仅用于团队内部审阅，未配置网站发布。
