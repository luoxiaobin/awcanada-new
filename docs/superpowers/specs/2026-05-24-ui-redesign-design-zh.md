# UI 改版设计方案 — Allied Immigration 官方网站

**日期：** 2026-05-24
**方案：** B 方案 — 全面布局与设计系统重构
**风格：** 现代 · 亲切

---

## 设计目标

1. 通过双语界面（中英文）提升专业形象与用户信任感
2. 优化转化率——通过移民资格评估工具获取更多潜在客户
3. 现代化视觉风格，摆脱当前偏传统企业的设计感

## 目标用户

混合型受众：一部分是在中国研究移民资讯的用户，另一部分是已在加拿大的华人移民。两类用户都需要一个专业又平易近人的网站，对于第一次申请的用户不应感到压迫感。

---

## 设计系统

### Tailwind 配置

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        navy:  '#1e3a5f',
        blue:  '#2d6bb5',
        amber: '#f5a623',
        sky:   '#0ea5e9',
        bg:    '#f0f7ff',
      }
    },
    fontFamily: { sans: ['Inter', 'sans-serif'] },
    borderRadius: { '2xl': '1rem', '3xl': '1.5rem' }
  }
}
```

### 颜色角色说明

| 色彩标记 | 色值 | 用途 |
|---|---|---|
| `brand-navy` | `#1e3a5f` | 标题、导航栏背景（页脚）、信任元素 |
| `brand-blue` | `#2d6bb5` | 链接、内联 CTA、激活状态 |
| `brand-amber` | `#f5a623` | 主要 CTA 按钮、进度条、强调色 |
| `brand-sky` | `#0ea5e9` | 板块标签、次要高亮 |
| `brand-bg` | `#f0f7ff` | 页面背景、首屏左栏背景 |
| `slate-900` | — | 页脚背景 |
| `slate-600` | — | 正文文字 |
| `slate-400` | — | 辅助/次级文字 |

### 字体排版

- 字体：**Inter**（已通过 Google Fonts 引入）
- 标题：`font-bold tracking-tight text-brand-navy`
- H1：桌面端 `text-5xl` / 移动端 `text-3xl`
- H2：桌面端 `text-3xl` / 移动端 `text-2xl`
- 正文：`text-slate-600 leading-relaxed`

### 形状语言

- 卡片：`rounded-3xl shadow-sm`，悬停时 → `shadow-md`
- 按钮：`rounded-full`
- 图标容器：`rounded-2xl bg-amber-50`
- 输入框：`rounded-2xl`
- 所有过渡动画：`transition-all duration-200`

---

## 组件规格

### 1. 导航栏（Navbar）

- 始终保持白色底 + `shadow-sm`，不随滚动触发透明效果
- 布局：Logo 居左 | 导航链接居中 | CTA 居右
- 语言切换：`rounded-full` 药丸形按钮（`EN | 中文`）
- CTA 按钮：`rounded-full bg-brand-amber text-white`
- 桌面端：鼠标悬停展开下拉菜单（结构与现有相同）
- 移动端（< 1024px）：汉堡菜单触发**底部抽屉**（从底部滑入，`fixed inset-x-0 bottom-0`，`rounded-t-3xl`）
- 使用 `backdrop-blur-sm` 实现内容滚动时的磨玻璃效果

### 2. 首屏（Hero）

分栏布局，不使用深色图片遮罩。

**左栏（`bg-brand-bg`）：**
- 小徽章："超过10,000位客户的信赖之选"（`rounded-full bg-brand-sky/10 text-brand-sky`）
- H1："开启您的加拿大新生活"
- 副标题：一句话价值主张
- 两个 CTA 按钮：`rounded-full bg-brand-amber`（主要）+ `rounded-full border-2 border-brand-navy text-brand-navy`（次要）

**右栏：**
- 首屏图片（使用现有 `hero.png`）
- 浮动信任卡片（左下角叠加）：`rounded-2xl bg-white shadow-lg p-4`
  - ✅ 98% 成功率
  - ✅ CICC 认证
  - ✅ 15年以上经验

**移动端：** 纵向排列（文字 → 图片），信任卡片变为 CTA 下方的三图标横排。

### 3. 服务网格（ServicesGrid）

**板块标题：**
- 小标签："我们的服务"（`text-brand-sky text-sm font-semibold uppercase tracking-wider`）
- H2："我们能为您做什么？"

**卡片：**
- `rounded-3xl bg-white shadow-sm hover:shadow-md`
- 图标：`rounded-2xl bg-amber-50` 容器，琥珀色图标
- 卡片底部"了解详情 →"链接，颜色为 `text-brand-blue`

**移动端：** `overflow-x-auto` 横向滚动 + `snap-x snap-mandatory`，每张卡片 `snap-start`，可预览下一张
**桌面端：** `grid grid-cols-4 gap-6`

### 4. 移民资格评估 — 全屏弹窗

**触发方式：** 首屏主 CTA（"立即免费评估"）+ 移动端悬浮 CTA 按钮，均触发同一 `quizOpen` 布尔状态（提升至 `App.tsx`），通过 `onOpen` prop 传入首屏和悬浮 CTA 组件。

**结构：**
- `fixed inset-0 bg-white z-50` 全屏遮罩
- 移动端从底部滑入（`translate-y` 动画），桌面端淡入
- 左上角关闭按钮（×）
- 右上角步骤指示（"第 X 步，共3步"）

**每个步骤的布局：**
- 大号居中问题文字（`text-2xl font-bold text-brand-navy`）
- 全宽选项按钮（`min-h-14 rounded-2xl border-2 border-slate-200 hover:border-brand-amber hover:bg-amber-50`）
- 选中选项后自动跳转下一步（无需"下一步"按钮）
- 底部进度条：`rounded-full bg-brand-amber` 填充

**结果页面：**
- 大号结果徽章（如"高度符合条件 ✅"）
- 两句话结果说明
- 邮箱收集：`rounded-2xl` 输入框 + `rounded-full bg-brand-amber` 提交按钮（"获取免费报告"）

**移动端：** 全屏弹窗天然适配所有屏幕尺寸

### 5. 联系/社交媒体板块

**背景：** `bg-brand-navy`（深色板块）

**标题：** "准备好开启您的移民之旅了吗？"（白色）+ "与我们的团队预约免费咨询"（slate-300）

**二维码卡片（2列网格）：**
- `rounded-3xl bg-white/10 border border-white/20`
- 左侧微信卡片 + 右侧 WhatsApp 卡片
- 二维码图片 + "扫码联系"白色标签

**YouTube：** 带红色 YouTube 图标的文字链接行 — `text-white hover:text-brand-amber`

**移动端：** 2列二维码网格保持不变，YouTube 链接另起一行

### 6. 页脚（Footer）

**背景：** `bg-slate-900`

**桌面端3列网格 → 移动端单列：**
- 第1列：品牌名（`text-brand-amber font-bold`）+ "CICC认证"徽章 + 邮箱
- 第2列：各服务快捷链接
- 第3列：联系方式（邮件、微信、WhatsApp）

**底部行：** 细分割线 + `text-slate-500` 版权信息

### 7. 移动端悬浮 CTA 栏

- `fixed bottom-0 left-0 right-0 md:hidden`
- `bg-white border-t border-slate-100 shadow-lg px-4 py-3`
- 两个等宽按钮："💬 联系我们"（微信/WhatsApp 链接）+ "✅ 免费评估"（触发评估弹窗）

---

## 实施顺序

1. 安装 Tailwind CSS，配置 `tailwind.config.js` 设计标记
2. 更新 `index.css`（移除 CSS 变量，保留 reset + Google Fonts 引入）
3. `Navbar` — 用 Tailwind 重构，实现底部抽屉移动端导航
4. `Hero` — 分栏布局，浮动信任卡，接入评估触发器
5. 移动端悬浮 CTA 栏（在 `App.tsx` 中实现）
6. `ServicesGrid` — 新卡片设计 + 移动端横向滚动
7. `EligibilityQuiz` — 全屏弹窗，自动跳转，进度条
8. `SocialMedia` / 联系板块 — 深色背景，二维码卡片
9. `Footer` — 3列网格
10. 删除所有 `*.css` 组件文件

---

## 响应式断点

| 板块 | 移动端（< md） | 桌面端（md+） |
|---|---|---|
| 导航栏 | 底部抽屉 | 水平导航 + 下拉菜单 |
| 首屏 | 纵向排列（文字 → 图片） | 左右各半分栏 |
| 服务 | 横向滑动卡片 | 4列网格 |
| 评估弹窗 | 全屏滑入 | 全屏淡入 |
| 联系 | 2列二维码 + 链接行 | 2列二维码 + 链接行 |
| 页脚 | 单列 | 3列网格 |
| 悬浮 CTA | 显示 | 隐藏 |

---

## 需修改的文件

| 文件 | 改动内容 |
|---|---|
| `package.json` | 添加 `tailwindcss`、`@tailwindcss/vite` |
| `vite.config.ts` | 添加 Tailwind Vite 插件 |
| `tailwind.config.js` | 新建文件 — 设计标记 |
| `src/index.css` | 精简为 reset + 字体引入 |
| `src/App.css` | 删除 |
| `src/App.tsx` | 添加评估状态 + 移动端悬浮 CTA 栏 |
| `src/components/Navbar.tsx` + `Navbar.css` | 用 Tailwind 重构，删除 CSS 文件 |
| `src/components/Hero.tsx` + `Hero.css` | 用 Tailwind 重构，删除 CSS 文件 |
| `src/components/ServicesGrid.tsx` + `ServicesGrid.css` | 用 Tailwind 重构，删除 CSS 文件 |
| `src/components/EligibilityQuiz.tsx` + `EligibilityQuiz.css` | 用 Tailwind 重构，删除 CSS 文件 |
| `src/components/SocialMedia.tsx` + `SocialMedia.css` | 用 Tailwind 重构，删除 CSS 文件 |
