# Bilingual Toggle — Allied Immigration Website

**Date:** 2026-05-24
**Approach:** Option A — Single-page language toggle with React Context + localStorage

---

## Goals

1. Serve Chinese-speaking users natively — site defaults to Chinese (中文) on first visit
2. Allow any user to switch to English in one click
3. Remember the user's language preference across visits

---

## Architecture

### LanguageContext

New file: `src/contexts/LanguageContext.tsx`

- Exports `LanguageProvider` (wraps `App`) and `useLang()` hook
- State: `lang: 'zh' | 'en'`
- On init: reads `localStorage.getItem('lang')`, defaults to `'zh'` if absent
- On `setLang`: writes to `localStorage`, updates React state
- No external i18n library

### Translation pattern — inline per component

Each component defines a `const t` object at the top:

```tsx
const t = {
  zh: { heading: '...', body: '...' },
  en: { heading: '...', body: '...' },
}
// inside component:
const { lang } = useLang()
// use t[lang].heading, t[lang].body
```

No prop drilling. All components import `useLang()` directly.

---

## Language Toggle — Navbar

The existing `EN | 中文` pill button in both desktop nav and mobile sheet gets wired to `setLang`.

- When `lang === 'zh'`: button shows `EN | 中文`, clicking sets `lang = 'en'`
- When `lang === 'en'`: button shows `中文 | EN`, clicking sets `lang = 'zh'`

---

## Translations

### Navbar

| Key | 中文 | English |
|---|---|---|
| CTA button | 免费评估 | Free Assessment |
| Mobile CTA button | 免费评估 | Free Assessment |
| Menu: 首页 | 首页 | Home |
| Menu: 移民 | 移民 | Immigration |
| Menu: 留学 | 留学 | Study |
| Menu: 访问 | 访问 | Visit |
| Menu: 枫叶卡 | 枫叶卡 | PR Card |
| Menu: 入籍 | 入籍 | Citizenship |
| Menu: 联系我们 | 联系我们 | Contact Us |

Submenus remain Chinese in both modes (they are service-specific legal terms best kept in Chinese; English speakers will consult directly).

### Hero

| Key | 中文 | English |
|---|---|---|
| Trust badge | ⭐ 超过10,000位客户的信赖之选 | ⭐ Trusted by 10,000+ Clients |
| H1 line 1 | 开启您的加拿大 | Your Pathway to a |
| H1 highlight | 新生活 | New Life |
| H1 line 2 | 移民之旅 | in Canada |
| Subtext | 专业移民咨询，成功率有保障。CICC认证顾问，全程陪伴您每一步。 | Expert immigration consultation with a proven track record. CICC-certified consultants guiding you every step of the way. |
| Primary CTA | 立即免费评估 | Start Free Assessment |
| Secondary CTA | 了解我们的服务 | View Our Services |
| Trust: success rate | 98% 成功率 | 98% Success Rate |
| Trust: certified | CICC认证 | CICC Certified |
| Trust: experience | 15年以上经验 | 15+ Years Experience |

### ServicesGrid

| Key | 中文 | English |
|---|---|---|
| Section label | 我们的服务 | What We Do |
| H2 | 我们能为您做什么？ | How Can We Help You? |
| Card 1 title | 快速通道 | Express Entry |
| Card 1 body | 面向技术移民的最快加拿大永居途径。 | The fastest route to Canadian permanent residency for skilled workers. |
| Card 2 title | 家庭团聚 | Family Sponsorship |
| Card 2 body | 通过加拿大家庭担保计划，与您的亲人重聚。 | Reunite with your loved ones through Canada's family sponsorship program. |
| Card 3 title | 留学签证 | Study Visas |
| Card 3 body | 在专业指导下，进入加拿大顶级院校学习。 | Study at world-class Canadian institutions with expert visa guidance. |
| Card 4 title | 工作签证 | Work Permits |
| Card 4 body | 根据您的情况，申请最合适的加拿大工作签证。 | Start your Canadian career with the right work permit for your situation. |
| Learn more link | 了解详情 → | Learn more → |

### EligibilityQuiz

| Key | 中文 | English |
|---|---|---|
| Step indicator | 第 {step} 步，共3步 | Step {step} of 3 |
| Results heading | 评估结果 | Your Results |
| Q1 | 您的最高学历是？ | What is your highest level of education? |
| Q1 opt 1 | 高中及以下 | High School or below |
| Q1 opt 2 | 本科学位 | Bachelor's Degree |
| Q1 opt 3 | 硕士或博士 | Master's or PhD |
| Q2 | 您有多少年工作经验？ | How many years of work experience do you have? |
| Q2 opt 1 | 不足1年 | Less than 1 year |
| Q2 opt 2 | 1–3年 | 1–3 years |
| Q2 opt 3 | 3年以上 | 3+ years |
| Q3 | 您的英语水平如何？ | How would you rate your English proficiency? |
| Q3 opt 1 | 基础 | Basic |
| Q3 opt 2 | 中级 | Intermediate |
| Q3 opt 3 | 高级 | Advanced |
| Result: high badge | 🌟 高度符合条件 | 🌟 High Eligibility |
| Result: high text | 您的申请资质非常优秀，可能符合快速通道或其他快捷移民途径。 | Your profile looks strong for Canadian immigration. You may qualify for Express Entry or other fast-track pathways. |
| Result: moderate badge | ✅ 基本符合条件 | ✅ Moderate Eligibility |
| Result: moderate text | 您的基础条件良好，部分途径可能需要额外准备，我们的顾问将为您提供指导。 | You have a solid foundation. Some pathways may need additional preparation — our consultants can guide you. |
| Result: needs badge | 📋 需要个性化评估 | 📋 Needs Assessment |
| Result: needs text | 您的情况适合个性化指导，我们的顾问将为您找到最合适的移民途径。 | Your situation benefits from personalized guidance. Our consultants will identify the best pathway for you. |
| Email label | 通过邮件获取详细报告 | Get your detailed report by email |
| Email placeholder | 您的邮箱 | your@email.com |
| Submit button | 获取免费报告 | Get My Free Report |
| Success heading | 报告已发送！ | Report on its way! |
| Success body | 我们已将您的评估报告发送至 {email}。我们的团队将在24小时内与您联系。 | We've sent your eligibility report to {email}. Our team will be in touch within 24 hours. |

### SocialMedia

| Key | 中文 | English |
|---|---|---|
| Heading | 准备好开启您的移民之旅了吗？ | Ready to Start Your Journey? |
| Subheading | 与我们的团队预约免费咨询 | Book a free consultation with our team |
| WeChat label | 💬 微信 | 💬 WeChat |
| WhatsApp label | 📱 WhatsApp | 📱 WhatsApp |
| Scan to chat | 扫码联系 | Scan to chat |
| YouTube link | 在YouTube上观看客户故事 → | Watch our client stories on YouTube → |

### App — Footer & Sticky CTA

| Key | 中文 | English |
|---|---|---|
| CICC badge | CICC认证移民顾问 | CICC Certified Consultancy |
| Footer col 2 heading | 服务项目 | Services |
| Footer Express Entry | 快速通道 | Express Entry |
| Footer Family Sponsorship | 家庭团聚 | Family Sponsorship |
| Footer Study Visas | 留学签证 | Study Visas |
| Footer Work Permits | 工作签证 | Work Permits |
| Footer col 3 heading | 联系我们 | Contact |
| Email link | 发送邮件 | Email us |
| WeChat contact | 微信（扫描上方二维码） | WeChat (scan QR above) |
| WhatsApp contact | WhatsApp（扫描上方二维码） | WhatsApp (scan QR above) |
| Copyright | © {year} Allied Immigration. 版权所有。 | © {year} Allied Immigration. All rights reserved. |
| Sticky: chat | 💬 联系我们 | 💬 Chat with Us |
| Sticky: assessment | ✅ 免费评估 | ✅ Free Assessment |

---

## Files to Create / Modify

| File | Change |
|---|---|
| `src/contexts/LanguageContext.tsx` | New file — context, provider, `useLang` hook |
| `src/App.tsx` | Wrap with `LanguageProvider`, translate footer + sticky CTA |
| `src/components/Navbar.tsx` | Wire toggle button, translate CTA + menu titles |
| `src/components/Hero.tsx` | Add `t` object, translate all visible text |
| `src/components/ServicesGrid.tsx` | Add `t` object, translate all visible text |
| `src/components/EligibilityQuiz.tsx` | Add `t` object, translate all visible text |
| `src/components/SocialMedia.tsx` | Add `t` object, translate all visible text |

---

## Responsive / Accessibility Notes

- Language toggle is present in both desktop nav and mobile bottom sheet — both must call `setLang`
- No layout changes needed — Chinese text is approximately the same length as English for these strings
- `lang` attribute on `<html>` should update when language changes (set via `document.documentElement.lang`) for screen readers

---

## Out of Scope

- Submenu items (they are legal/service-specific terms; kept in Chinese for both modes)
- SEO / meta tag translation (separate future task)
- Right-to-left layout support (not needed for Chinese)
