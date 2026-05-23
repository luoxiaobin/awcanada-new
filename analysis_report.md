# Functional Analysis – awcanada.com (Chinese version – https://www.awcanada.com/cn/)

## 1. Site Overview
| Item | Details |
|------|---------|
| **Domain** | `https://www.awcanada.com/cn/` |
| **Purpose** | 为华语用户提供加拿大移民、永久居民卡、学习、工作、配偶赞助等服务的咨询平台 |
| **Primary Goal** | 捕获潜在客户用于免费咨询/预约 |
| **Language** | 简体中文（部分繁体中文菜单） |

## 2. Navigation & Menu
| Feature | Implementation | Notes |
|---------|----------------|-------|
| **Top‑level menu** | `首页`, `移民`, `留学`, `访问`, `枫叶卡`, `入籍`, `联系我们` | 使用 HTML `<ul>` + CSS hover（桌面），汉堡按钮 → 抽屉 + 手风琴（移动） |
| **Sub‑menus** | 每个除首页/联系我们外的顶级项均展开 3‑6 条子链接（如 “担保父母/祖父母移民”） | 功能正常，但 hover 背景对比度低；移动抽屉与头部重叠 |
| **Language selector** | 文本 `选择你的语音` | 拼写错误，应为 `选择你的语言`；未实现语言切换 |
| **CTA in nav** | “免费评估” 按钮（主色） | 链接至联系区块 |

## 3. Hero Section
| Element | Content | Issues |
|---------|---------|--------|
| **Background** | 大幅静态加拿大图片 | 未使用 lazy‑load，文件约 1 MB |
| **Headline** | “加拿大移民专业服务” | 粉色文字在深色遮罩上对比度不足，未达 WCAG AA |
| **Sub‑headline** | 简短价值陈述 | 同上 |
| **Primary CTA** | “免费咨询” 按钮 | 链接至 `#contact` 区块 |

## 4. Service Grid / Featured Cards
| Card | Title | CTA |
|------|-------|-----|
| Express Entry | “快速通道” | “详情” → 对应页面 |
| Family Sponsorship | “配偶/子女赞助” | “详情” |
| Study Visa | “留学签证” | “详情” |
| Work Permit | “工作许可” | “详情” |
*所有卡片均使用亮粉色文字与深色背景，导致可读性差。*

## 5. Educational / Resource Section
- 提供 PDF 链接（如《公民考试指南》）
- 仅普通 `<a>`，无预览、无 SEO 元信息

## 6. Contact / Lead Capture
| Field | Present? | Details |
|-------|----------|---------|
| 姓名 | ✅ | 文本框 |
| 邮箱 | ✅ | 文本框 |
| 电话 | ❌ | 未提供，仅在页面底部显示纯文本 |
| 信息 | ❌ | 没有 textarea |
| 提交按钮 | ✅ | “发送” 文本，POST 到 `mailto:`，无服务器校验 |
- 页面展示微信、WhatsApp 的二维码图片，未与表单关联

## 7. Social Media Section (footer & dedicated block)
- **微信**：二维码图片，链接至官方公众号
- **YouTube**：两枚图标（英文/中文频道）
- **WhatsApp**：二维码图片，显示较小
- 均为纯图片，无悬停样式或文字说明

## 8. Interactive Widgets
| Widget | Exists? | Purpose |
|--------|---------|---------|
| Quiz / Eligibility calculator | ❌ | 可提高用户参与度，生成潜在客户 |
| Live chat / chatbot | ❌ | 实时答疑，提高转化率 |
| Mobile accordion menu | ✅ | 功能正常，但缺少遮罩层 |

## 9. SEO & Metadata
- **Title tag**：通用 “加拿大联合移民 – 首页”。
- **Meta description**：多数页面缺失。
- **Open Graph / Twitter cards**：无。
- **Structured data**：未使用 JSON‑LD（Organization、Breadcrumb）。

## 10. Performance
| Metric | Observation |
|--------|-------------|
| 页面大小 | 约 2.5 MB（大型背景图、未压缩 PNG、PDF） |
| 首次内容渲染 (FCP) | 约 3 秒（3G） |
| 图片懒加载 | 无 |
| 缓存头 | 未见明显缓存策略 |

## 11. Accessibility
- **对比度**：粉色文字对深色背景对比度 < 4.5:1，未达 WCAG AA。
- **Alt text**：多张装饰图片缺失 `alt`。
- **ARIA**：缺少 `role="navigation"`、`aria-expanded` 等属性。
- **标题层级**：同页出现多个 `<h1>`。

## 12. Gaps / Opportunities
| Gap | Impact | Suggested Fix |
|-----|--------|---------------|
| 低对比度 UI | 可读性差，SEO 受影响 | 重新配色（深蓝+柔和金），或为文字添加阴影/实心背景 |
| 语言选择器拼写错误 | 用户困惑 | 修正为 `选择你的语言` 并实现实际语言切换 |
| 表单信息不足 | 转化率低 | 扩展为多步骤表单（姓名、邮箱、电话、意向） |
| 缺少资格测评 | 失去互动机会 | 添加 3‑4 步的资格测评小部件 |
| 无实时聊天 | 客户咨询流失 | 集成 WhatsApp Click‑to‑Chat 或聊天机器人 |
| 缺少 SEO 元数据 | 搜索可见性弱 | 为每页编写独特标题/描述，加入 JSON‑LD 
| 资源文件体积大 | 页面加载慢，跳失率高 | 使用 WebP/AVIF，开启 lazy‑load，添加缓存头 |
| 移动抽屉重叠 | 移动端体验差 | 添加遮罩层，增大点击目标 |
| 社交图标不显眼 | 社交流量低 | 放大图标，添加文字 CTA（例如 “关注我们的 YouTube”） |

---

# Functional Analysis – awcanada.com (Chinese version – https://www.awcanada.com/cn/)
*(English version – same content as previously provided)*

## 1. Site Overview
| Item | Details |
|------|---------|
| **Domain** | `https://www.awcanada.com/cn/` |
| **Purpose** | Immigration consultancy for Chinese‑speaking clients (citizenship, PR‑card, study, work, family sponsorship). |
| **Primary Goal** | Capture leads for free consultation / appointment. |
| **Language** | Simplified Chinese (some Traditional Chinese in menu). |

## 2. Navigation & Menu
| Feature | Implementation | Notes |
|---------|----------------|-------|
| **Top‑level menu** | `首页`, `移民`, `留学`, `访问`, `枫叶卡`, `入籍`, `联系我们` | HTML `<ul>` + CSS hover for desktop; hamburger → drawer + accordion for mobile. |
| **Sub‑menus** | Each top‑level item (except 首页/联系我们) opens a dropdown with 3‑6 links (e.g., “担保父母/祖父母移民”). | Works, but hover background contrast is low; mobile drawer overlaps header. |
| **Language selector** | Text “选择你的语音”。 | Typo – should be “选择你的语言”. Not functional. |
| **CTA in nav** | “免费评估” button (primary). | Links to contact section. |

## 3. Hero Section
| Element | Content | Issues |
|---------|---------|--------|
| **Background** | Large static image of Canada. | Not lazy‑loaded; heavy (~1 MB). |
| **Headline** | “加拿大移民专业服务”。 | Pink text on dark overlay fails WCAG AA contrast. |
| **Sub‑headline** | Brief value proposition. | Same contrast problem. |
| **Primary CTA** | Button “免费咨询”。 | Links to `#contact` (scrolls to contact form). |

## 4. Service Grid / Featured Cards
| Card | Title | CTA |
|------|-------|-----|
| Express Entry | “快速通道”。 | “详情” → service page. |
| Family Sponsorship | “配偶/子女赞助”。 | “详情”. |
| Study Visa | “留学签证”。 | “详情”. |
| Work Permit | “工作许可”。 | “详情”. |
*All cards use bright pink on dark background → low readability.*

## 5. Educational / Resource Section
- Links to PDF guides (citizenship test, study material).
- Simple `<a>` tags, no preview, no SEO metadata for PDFs.

## 6. Contact / Lead Capture
| Field | Present? | Details |
|-------|----------|---------|
| Name | ✅ | Text input. |
| Email | ✅ | Text input. |
| Phone | ❌ | Not present (only displayed as plain text). |
| Message | ❌ | No textarea. |
| Submit button | ✅ | Text “发送”。 |
- Form posts to a `mailto:` link (no server validation).
- QR codes for **WeChat** and **WhatsApp** displayed as images.

## 7. Social Media Section (footer & dedicated block)
- **WeChat**: QR image linking to official account.
- **YouTube**: Two icons (English & Chinese channels) linking to YouTube.
- **WhatsApp**: QR image (less prominent).
- No hover/focus styles; icons are plain images.

## 8. Interactive Widgets
| Widget | Exists? | Purpose |
|--------|---------|---------|
| Quiz / Eligibility calculator | ❌ | Not present (could be added). |
| Live chat / chatbot | ❌ | No embedded chat widget. |
| Mobile accordion menu | ✅ | Works but lacks backdrop overlay. |

## 9. SEO & Metadata
- **Title tag**: Generic “加拿大联合移民 – 首页”。
- **Meta description**: Missing on many pages.
- **Open Graph / Twitter cards**: None.
- **Structured data**: No JSON‑LD (Organization, Breadcrumb).

## 10. Performance
| Metric | Observation |
|--------|-------------|
| Page size | ≈2.5 MB (large hero image, unoptimized PNG icons, PDFs). |
| First‑Contentful Paint | ~3 s on 3G. |
| No lazy‑loading for images or PDFs. |
| No caching headers visible for static assets. |

## 11. Accessibility
- **Contrast**: Pink on dark background fails WCAG AA (ratio < 4.5:1).
- **Alt text**: Many decorative images lack `alt`.
- **ARIA**: No `role="navigation"` or `aria-expanded` on dropdowns.
- **Heading hierarchy**: Multiple `<h1>` tags on the same page.

## 12. Gaps / Opportunities
| Gap | Impact | Suggested Fix |
|-----|--------|---------------|
| Low contrast UI | Poor readability, SEO penalty | Redesign palette (navy/amber), add text shadow or solid overlay. |
| Language selector typo | Confusing for users | Correct to “选择你的语言” and make functional. |
| Minimal lead form | Low conversion, no phone capture | Expand to multi‑step form (name, email, phone, intent). |
| No quiz/calculator | Missed engagement | Add eligibility quiz (3‑step UI). |
| No live chat | Missed real‑time support | Integrate a chatbot or WhatsApp click‑to‑chat widget. |
| No SEO meta data | Weak discoverability | Write unique titles / meta descriptions, add JSON‑LD. |
| Heavy assets | Slow load, high bounce | Convert hero to WebP, lazy‑load, enable caching. |
| Mobile drawer overlap | Poor UX on phones | Add backdrop overlay, increase tap target size. |
| Social icons not prominent | Low social traffic | Enlarge icons, add clear CTA text (“Follow us on YouTube”). |

---

*Prepared by Antigravity – functional analysis (English & Chinese).*

---

## Implementation Plan – Proposed Improvements

### 1. Visual Design & UI
- **Palette Refresh**: Switch from hot‑pink/black to a premium navy `#003366` + soft‑gold `#d4af37` scheme. Update all CSS variables in `src/index.css` and component styles.
- **Contrast Fix**: Ensure text/background contrast ≥ 4.5:1 (WCAG AA) by adding semi‑transparent dark overlays behind hero text and using darker button backgrounds.
- **Typography**: Load Google Font *Inter* (weights 400/600) for all headings and body text; replace existing system fonts.
- **Hero Image**: Convert the hero background to WebP, enable `loading="lazy"`, and add a subtle parallax scroll effect.
- **Micro‑animations**: Add smooth `transition` for dropdowns, accordion expand/collapse, and button hover states (0.2 s ease‑out).

### 2. Navigation & Mobile Drawer
- **Desktop Dropdowns**: Refactor `Navbar.tsx` to use a reusable `Dropdown` component that renders a `<ul>` with `role="menu"` and `aria‑expanded` attributes.
- **Mobile Drawer**: Add a semi‑transparent backdrop (`<div class="drawer-backdrop">`) that closes the drawer on click. Ensure the drawer slides from the right with `transform: translateX(0)`.
- **Language Switcher**: Fix the typo to *选择你的语言* and wire it to a simple client‑side toggle that swaps the `lang` attribute and loads the appropriate JSON translations.

### 3. Lead Capture & Forms
- **Multi‑step Form**: Replace the simple mailto form with a React wizard (3 steps):
  1. **Contact Info** – name, email, phone.
  2. **Immigration Goal** – select immigration stream (radio group).
  3. **Message** – optional free‑text field.
- **Validation**: Use `react-hook-form` with schema validation (Yup) to provide instant feedback.
- **Backend**: Hook the wizard to a mock endpoint (`/api/lead`) that stores submissions in a JSON file (or integrate with a real CRM later).
- **QR Integration**: After successful submit, display the WeChat and WhatsApp QR codes with a *Copy Link* button.

### 4. Interactive Widgets
- **Eligibility Quiz**: Build a lightweight 4‑question quiz component that scores the user and suggests the most suitable visa category. Show a CTA button that opens the multi‑step form pre‑filled with the suggested category.
- **Live Chat**: Embed a WhatsApp Click‑to‑Chat link (`https://wa.me/4168282890`) and a simple Intercom‑style chat bubble that opens the WhatsApp chat on mobile and a web widget on desktop.

### 5. SEO & Structured Data
- **Meta Tags**: For each page (Home, Service, Contact) add unique `<title>` and `<meta name="description">` tags reflecting the primary keyword (e.g., “加拿大移民咨询 – 免费评估”).
- **Open Graph**: Add `<meta property="og:title">`, `og:description`, `og:image` (use the hero image in WebP).
- **JSON‑LD**: Insert an Organization schema with `name: "加拿大联合移民"`, `url`, `logo`, `contactPoint` (phone, email), and BreadcrumbList for each page.
- **hreflang**: Add `<link rel="alternate" hreflang="zh-CN" href="https://www.awcanada.com/cn/">` and an English version placeholder.

### 6. Performance Optimizations
- **Asset Compression**: Convert all PNG icons to WebP/AVIF, enable `loading="lazy"`.
- **Caching**: Add `Cache‑Control: public, max‑age=31536000` for static assets via Vite’s `build.assetsInlineLimit` and configure a simple `netlify.toml` or Vite preview server to serve headers.
- **Code Splitting**: Dynamically import heavy components (Quiz, ContactForm) using `React.lazy` and `Suspense`.
- **Bundle Analyzer**: Run `vite build --mode production && vite-bundle-analyzer` to verify bundle size < 500 KB gzipped.

### 7. Accessibility Enhancements
- **ARIA Roles**: Add `role="navigation"` to `<nav>`, `role="menuitem"` to dropdown links, and proper `aria‑expanded` toggles on the hamburger and accordion.
- **Alt Text**: Provide descriptive `alt` for all decorative and functional images (e.g., `alt="WeChat QR code for Canada United Immigration"`).
- **Heading Order**: Ensure a single `<h1>` (site name) per page, then `<h2>` for sections, etc.
- **Focus Management**: Trap focus within the mobile drawer when open and return focus to the hamburger button on close.

### 8. Content Management (Future‑Proofing)
- **Headless CMS**: Consider integrating Strapi or Contentful to manage service pages, PDFs, and blog posts without code changes. Create a small API layer (`/api/pages`) that the React app consumes.
- **Markdown Blog**: Migrate the existing article list to Markdown files in `src/content/` and render with `react-markdown`; this will automatically generate SEO‑friendly pages.

### 9. Roll‑out & Verification
1. **Branch Strategy**: Create a `feature/improvement-plan` branch from `main`.
2. **Incremental PRs**: Break the work into logical PRs (Design, Nav, Form, SEO, Performance, Accessibility).
3. **Testing**:
   - Run `npm run lint && npm test` after each PR.
   - Use Lighthouse CI to verify > 90 score for Performance, Accessibility, SEO.
   - Conduct manual QA on Chrome, Safari, and mobile devices.
4. **Deployment**: Deploy preview builds to Vercel/Netlify for stakeholder review before merging to `main`.

---

*Prepared by Antigravity – functional analysis & implementation plan (English & Chinese).*
