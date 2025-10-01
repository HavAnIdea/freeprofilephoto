# FreeProfilePhoto 详细改进计划（无 AI 版）

本计划严格避免接入任何 AI 生图/第三方生成 API，优先以 Canvas、预设样式、精选图库与内容/SEO 提效为核心，降低成本并快速闭环用户需求。

—

## 0. 目标与约束
- 目标：对齐关键词意图、修复体验断点、让用户在 30 秒内“上传/选择 → 预览 → 下载”。
- 约束：不接入 AI；仅使用前端 Canvas 与开源素材（或自制）实现；保持“永久免费、无水印”。

—

## 1. 主要问题（现状）
- 文案与事实不符：主页宣称“50+ styles”，但仅有 `/funny` 可用（app/page.tsx）。
- 导航指向 404：`/cute`、`/anime`、`/cool`、`/about`、`/blog` 无落地页。
- 缺少核心头像场景：目前仅“表情+背景”的趣味玩法，未覆盖“上传头像→编辑→导出”“尺寸裁切”等高意图需求。
- 无 SEO 结构化与专题页：关键词（Instagram/Facebook/LinkedIn/WhatsApp 尺寸、cute/funny/cool/anime）缺少承接。
- 可访问性/移动端细节欠缺：上传限制、EXIF 方向、触控裁切、下载/分享兼容等未梳理。

—

## 2. 里程碑（不接入 AI）

### M1（Week 1-2）：修复断点 + 基础生成闭环
1) 首页对齐与占位页
   - 移除/隐藏未上线链接或改为“即将上线”占位页，杜绝 404。
   - 调整首页文案：删去“50+ styles”，明确“免费、无水印、秒级下载”。
   - 英雄区加入“示例图库 + 立即生成”入口，展示真实结果样例。

2) `/funny` 升级为“上传 + 贴纸”
   - 新增上传头像：支持 JPG/PNG/WEBP（≤10MB），自动纠正 EXIF 方向。
   - 画布编辑：缩放/平移/裁切（圆形/方形），叠加贴纸（现有表情/图标），文字标题。
   - 一键下载 PNG；移动端分享 API 兼容与回退（复制链接/保存图片）。

3) 通用占位页组件
   - 路由：`/cute`、`/cool`、`/anime` 显示“预览 + 即将上线 + 订阅提醒（可选）”。
   - 不做空白页，提供返回与可用功能引导。

验收标准
- 所有导航无 404；首页宣称与功能一致；/funny 可上传并导出 PNG；移动端可完成下载或分享。

—

### M2（Week 3-4）：关键词功能覆盖（无 AI）
4) `/cute` 真正可用（复用现有 Canvas 能力）
   - 使用 `AvatarGenerator.generateCute`：提供动物（cat/bear/bunny/panda/fox）、表情眼型、可选腮红、背景色与贴纸。
   - 输出 PNG；保留“随机生成”“示例组合”。

5) `/cool` 样式生成器（几何/渐变/边框）
   - 预设 24+ 组合：网格渐变、噪点、玻璃态、高光描边、圆环/方框边框。
   - 支持用户上传头像→自动加边框/渐变背景；或在无头像时生成默认几何头像。

6) `/size` 尺寸助手（高意图：尺寸/裁切/导出）
   - 预设平台：Instagram、LinkedIn、Facebook、Discord、WhatsApp。
   - 上传图片→裁切框（可缩放/平移）、自动生成各平台尺寸的导出按钮。
   - 一键打包下载（ZIP 可延后；先提供逐一下载）。

7) `/blank` 默认/匿名头像生成器
   - 选项：字母首字母（输入姓名→取首字母）、颜色主题、几何/波纹/网格背景。
   - 一键导出；满足“no/blank/default profile image”关键词意图。

验收标准
- `/cute`、`/cool`、`/size`、`/blank` 全部可用且能下载；新增页面从首页与内部互链进入。

—

### M3（Week 5-6）：内容与 SEO 基建
8) 专题落地页矩阵（不依赖 AI）
   - `/_guides/instagram-profile-photo-size`
   - `/_guides/facebook-profile-photo-size`
   - `/_guides/linkedin-profile-photo-tips`
   - `/_guides/discord-funny-profile-pic-ideas`
   - `/_guides/cute-profile-pics-gallery`（内嵌 `/cute` 结果样例）

9) SEO 技术要素
   - 每页 `<title>`、`<meta description>`、OG 图、Schema（Breadcrumb/Article），自动面包屑。
   - `sitemap.xml`、`robots.txt`、图片 `alt`、文件名可读，内部链接布置。
   - 站内搜索（简易版，可延后）。

10) 社会证明与分享
   - 结果页轻量水印（可关）+“由 FreeProfilePhoto 生成”可选角标以促进分享与品牌曝光。
   - 预填社交分享文案；统计分享点击。

验收标准
- 5+ 专题页上线并收录；各功能页具备基础 SEO 要素与分享引导；首页与功能页互链形成闭环。

—

## 3. 任务清单（按页面/模块分解）

### 3.1 首页（`app/page.tsx`）
用户故事
- 作为访客，我能在首屏理解价值，并立即进入一个可用的生成器，30 秒内得到可下载图片。

实现任务
- 文案修正：移除“50+ styles”，明确“免费、无水印、无需注册”。
- CTA 修正：仅保留可用路由；未上线的以“即将上线”组件承接。
- 示例图库：展示 8-12 张由 `/funny`/`/cute`/`/cool` 生成的样例图（本地静态资源），支持懒加载。
- 速度优化：减少首屏动画数量与阴影，控制 LCP < 2.5s。

验收标准
- Lighthouse 移动端性能 > 85；所有 CTA 可达；示例图均可见且支持下载跳转。

—

### 3.2 趣味生成器 `/funny`（`app/funny/page.tsx`, `lib/avatar-generator.ts`）
用户故事
- 我可以上传头像，进行裁切、叠加表情/贴纸/文字，快速导出 PNG。

实现任务
- 上传组件：文件类型/大小校验；EXIF 方向矫正；拖拽/点击上传；移动端支持相机。
- 画布工具：
  - 新增方法 `generatePhotoWithStickers({ image, crop, stickers, text, bg })`。
  - 裁切（圆/方）、缩放/平移；贴纸位置/大小可调；字体、颜色、描边可调。
- 下载与分享：支持 `navigator.share`，回退为保存图片/复制链接；JPEG/PNG 选项。
- UI：保留随机表情玩法；增加“清空画布”“撤销/重做（简化版）”。

验收标准
- iOS Safari 与 Android Chrome 可顺利上传、编辑、导出；图片方向正确；导出清晰度 ≥ 1024x1024。

—

### 3.3 萌系生成器 `/cute`
实现任务
- 调用 `generateCute`；补齐参数选择 UI（动物、眼型、腮红、配饰、背景）。
- 新增 12 套预设组合 + 随机生成；导出 PNG。
- 占位期结束：首页与页内互链打开。

验收标准
- 进入即有默认结果可下载；改变任一参数实时预览；移动端 1 手操作顺畅。

—

### 3.4 风格生成器 `/cool`
实现任务
- 新增 `generateCool`：
  - 背景：径向/网格渐变、细噪点、玻璃态（透明叠层）。
  - 边框：内外描边、圆环光晕、几何框。
  - 可选：上传头像叠加到中心并套边框。
- 提供 24+ 预设；导出 PNG。

验收标准
- 预设切换流畅；导出尺寸可选（方形 1024/2048）。

—

### 3.5 尺寸助手 `/size`
实现任务
- 预设清单（首批）：Instagram 320/640、LinkedIn 400/800、Facebook 170/320、Discord 128/512、WhatsApp 640。
- 裁切 UI：自由缩放/平移；显示导出尺寸预览；一键导出各尺寸。
- 文案提示：平台头像尺寸与注意事项（避免裁掉头顶等）。

验收标准
- 至少 5 平台可用；导出尺寸正确；误差 < 2px；移动端易用。

—

### 3.6 默认/匿名头像 `/blank`
实现任务
- 首字母头像：输入名称→取首字母，提供 12 套配色与 6 种背景图形（波纹/网格/斜条/噪点）。
- 可选圆/方、边框粗细与颜色；导出 PNG。

验收标准
- 无上传也能直接生成；首字母国际字符兼容（简单转码）。

—

### 3.7 占位页组件（所有“即将上线”）
实现任务
- 统一组件：展示预览图、功能简介、返回按钮、去其他已上线功能的引导。
- 可选：邮箱收集（可后置）。

验收标准
- 所有未完成路由均有优雅占位页，路径不返回 404。

—

## 4. 内容与 SEO 任务

结构
- 路由：`/_guides/*` 专题；功能页相互内链；主页 → 功能 → 指南 → 功能的循环。
- 站点基础：`robots.txt`、`sitemap.xml`、规范化链接、面包屑 Schema、OG 图。

首批专题（标题草案）
- Instagram 头像尺寸与构图指南（含常见误区与样例）
- Facebook/WhatsApp 头像尺寸速查表（可下载模板）
- LinkedIn 专业头像的 7 个快速技巧（无拍摄也能优化）
- 搞笑头像灵感 50 例（配 `/funny` 贴纸预设）
- 超可爱头像灵感合集（配 `/cute` 预设）

页面要素（每页）
- 目标关键词、语义相关词、FAQ 段落（可获取 PAA）
- 精选示例图（本地静态或 Canvas 生成）
- CTA：引导到相关功能页（size/cute/cool/funny/blank）

验收标准
- 每页具备独立关键词与 800-1500 字文字量；内部链接 ≥ 5；图片 alt 完整；OG 图可分享。

—

## 5. 性能、可访问性与质量

性能
- 首页与各功能页：LCP < 2.5s、CLS < 0.1、交互 < 100ms（动画懒加载）。
- 图片：WebP/PNG、懒加载、`srcset`；Canvas 导出大小不超过 4K。

可访问性
- 所有交互可键盘操作；焦点可见；对比度满足 4.5:1。
- 表单与按钮含 `aria-label`；图片含 `alt`；尊重 `prefers-reduced-motion`。

兼容性/QA
- 浏览器/设备矩阵：iOS Safari、Android Chrome、桌面 Chrome/Edge/Safari。
- 上传/裁切/导出在上述矩阵中验证通过；异常文件（超大/错误格式）有明确错误提示。

—

## 6. 指标与分析（零侵犯）
- 事件：`photo_uploaded`、`generator_used`、`size_exported`、`download_clicked`、`share_clicked`、`guide_viewed`。
- 页面：PV/UV、跳出率、从首页到功能页到下载的转化漏斗。
- 无需账号系统；可用 Vercel Analytics 或轻量自托管统计（后置亦可）。

—

## 7. 任务看板（优先级从高到低）
P0（M1）
- 修正文案与导航；加占位页；首页样例图库
- `/funny`：上传 + 裁切 + 贴纸 + 文本 + 导出

P1（M2）
- `/cute` MVP；`/cool` MVP；`/size` MVP；`/blank` MVP

P2（M3）
- 5+ 专题页；技术 SEO 基建；社会证明与分享

—

## 8. 文件改动建议（指引用）
- `app/page.tsx`：文案、CTA、样例图库模块、性能优化
- `app/funny/page.tsx`：上传/裁切 UI、贴纸/文本面板、导出/分享
- `lib/avatar-generator.ts`：新增 `generatePhotoWithStickers`、`generateCool`、首字母生成工具
- `app/(routes)/cute/page.tsx`：参数选择 + 预设 + 导出
- `app/(routes)/cool/page.tsx`：预设样式 + 可选头像叠加 + 导出
- `app/(routes)/size/page.tsx`：裁切器 + 多尺寸导出
- `app/(routes)/blank/page.tsx`：首字母/几何背景生成器
- `app/(routes)/*/coming-soon/page.tsx`：占位页组件（或通用组件复用）
- `app/sitemap.xml.ts`、`app/robots.txt.ts`：SEO 基础
- `lib/seo.ts`：标题/描述/OG 统一生成

—

## 9. 成功度量（M1/M2/M3）
- M1：无 404；/funny 上传→导出完成率 ≥ 70%；首页→功能点击率 ≥ 25%
- M2：新增 4 路由使用占比 ≥ 40%；尺寸助手导出率 ≥ 40%
- M3：专题页自然进流；内链点击率 ≥ 10%；品牌检索增长

—

备注：以上均为“无 AI 成本”的可落地路径。若后续需要引入 AI，再在既有 Canvas 与内容骨架上按需替换或补充，不影响站点结构与 SEO 布局。
