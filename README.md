# PAYATHON 2026 前端本地研究版

在线预览：https://voicepeak.github.io/payathon-2026-frontend/

仓库：https://github.com/voicepeak/payathon-2026-frontend

`main` 分支每次推送后，GitHub Actions 会构建、检查资源与 JavaScript 语法，并部署到 GitHub Pages。预览使用原站已有的独立演示模式，不连接真实报名后台。

构建 Pages：`python build_pages.py --base-path /payathon-2026-frontend`；输出在 `_site/`。源代码、原始公开构建模块和技术文档保存在仓库中，浏览器诊断、依赖缓存及本机构建目录不会提交。

原页面：https://aipay.alipay.com/community/events/payathon-2026?chinfo=community

采集日期：2026-10-25。

这是公开 HTML、CSS、JavaScript、字体、图片的本地化版本，保留原站的浏览器端代码。它不是重新手绘的相似页面，也不是恢复出的原始 Astro 工程。未拿到原始 `.astro` 组件、TypeScript、Git 历史或服务端实现。

## 启动

Windows 双击 `start.cmd`；或在此目录运行：

```sh
python server.py --open
```

需要 Python 3，除此之外不需要安装依赖。默认访问：

http://127.0.0.1:8766/community/events/payathon-2026?preview=1

更换端口：`python server.py --port 9000 --open`。请使用 HTTP 服务访问，不要双击 HTML；ES modules 不能可靠地通过 `file://` 运行。

## 内容

- 活动首页所有公开板块：首屏、赛事合作伙伴、参赛价值、奖励、五条赛道、参赛指南、日历、评选标准、规则、权益、伙伴及页脚。
- 原站模块：ASCII 生物动画、标题入场、指针扰动与色彩分离、终端打字、奖杯 WebGL、滚动显现、奖金数字滚轮、目录定位、日历提示、赛道展开、导航。
- 报名表、个人/团队切换、头像裁剪、字段校验，以及原站自带的独立预览状态。
- 参赛中心、作品列表、作品提交前端页面；本地服务器支持参赛中心深链接回退。
- 232 个公开资源已本地保存，约 10.4 MB；资源原始 URL、下载字节数与 SHA-256 见 `asset-manifest.json`。

## 独立预览

原站发布代码本身包含 `?preview=1` 模式。本版本只为回环地址启用了这一已有功能。页面的预览控制面板可切换登录、报名审核及作品状态，数据保存在当前浏览器的 sessionStorage / IndexedDB；它们是演示数据，不会产生真实报名、审核或支付。

首页、参赛中心均使用同一预览参数。若预览状态受到之前操作影响，可用浏览器的新隐私窗口重新打开本地地址。

## 目录与修改

- `dist/`：可运行静态网站；修改这里可直接影响页面。
- `dist/assets/site/_astro/`：原站公开模块及样式；内容散列文件名保留，只有本地路径和独立预览开关做了必要适配。
- `dist/assets/media/`：本地图片、字体等媒体。
- `source/`：格式化后的阅读副本，方便分析。不是原始开发源码；编辑后需将对应文件同步到 `dist/`。
- `dist/local-adapter.js`：本地服务隔离、活动内部链接及诊断适配。
- `server.py`：Python 标准库静态服务器与深链接支持。
- `技术拆解.md`：实现方式与关键文件索引。
- `verification.json`：静态引用、模块语法、HTTP 检查结果。

## 范围和验证限制

真实登录、短信、报名提交、审核、上传、支付及 AI 助手依赖支付宝服务端，本地没有恢复这些服务。站外或活动之外的导航继续指向原官方网站，不代表已克隆整个 aipay 产品站。生产遥测入口已去除，CSP 限制网络连接为同源，本地预览不会向官方业务接口提交表单。

已做资源引用和 JavaScript 语法等静态检查，并检查本地 HTTP 路由。浏览器工具因无法可靠识别当前 URL 而中止，因此没有完成桌面/移动端逐屏截图比对、动画渲染及所有交互的实际浏览器验收；不能承诺像素级一致或所有功能已测试通过。

原站品牌、设计及素材仍属于原权利人。本地副本用于学习其前端实现。
