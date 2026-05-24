# Bilingual Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Chinese/English language toggle to the Allied Immigration website, defaulting to Chinese, persisted in localStorage.

**Architecture:** A `LanguageContext` provides `lang: 'zh' | 'en'` and `setLang` to the whole tree. Each component defines its own `const t = { zh: {...}, en: {...} }` translation object and reads `t[lang]` via `useLang()`. No external i18n library. The existing `EN | 中文` pill button in Navbar is wired to `setLang`.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, localStorage

---

## File Map

| File | Change |
|---|---|
| `src/contexts/LanguageContext.tsx` | **Create** — context, provider, `useLang` hook |
| `src/main.tsx` | **Modify** — wrap `<App>` with `<LanguageProvider>` |
| `src/App.tsx` | **Modify** — import `useLang`, translate footer + sticky CTA |
| `src/components/Navbar.tsx` | **Modify** — wire toggle button, translate menu titles + CTA |
| `src/components/Hero.tsx` | **Modify** — translate all visible text |
| `src/components/ServicesGrid.tsx` | **Modify** — translate section header + all card content |
| `src/components/EligibilityQuiz.tsx` | **Modify** — translate all questions, options, results, email capture |
| `src/components/SocialMedia.tsx` | **Modify** — translate heading, subheading, labels, YouTube link |

---

### Task 1: LanguageContext

**Files:**
- Create: `src/contexts/LanguageContext.tsx`

This is the foundation for all other tasks. Create it first — no other files need to change yet.

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/contexts
```

Create `src/contexts/LanguageContext.tsx` with this exact content:

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'zh' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'zh',
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'en' || stored === 'zh' ? stored : 'zh';
  });

  const setLang = (next: Lang) => {
    localStorage.setItem('lang', next);
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors. If there are errors, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add src/contexts/LanguageContext.tsx
git commit -m "feat: add LanguageContext with localStorage persistence"
```

---

### Task 2: Wire Provider + Translate App (footer & sticky CTA)

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `src/main.tsx` to wrap App with LanguageProvider**

Replace the entire content of `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Update `src/App.tsx` to translate footer and sticky CTA**

Replace the entire content of `src/App.tsx` with:

```tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import EligibilityQuiz from './components/EligibilityQuiz';
import SocialMedia from './components/SocialMedia';
import { useLang } from './contexts/LanguageContext';
import './index.css';

const year = new Date().getFullYear();

const t = {
  zh: {
    cicc: 'CICC认证移民顾问',
    servicesHeading: '服务项目',
    services: ['快速通道', '家庭团聚', '留学签证', '工作签证'],
    contactHeading: '联系我们',
    emailUs: '发送邮件',
    wechat: '微信（扫描上方二维码）',
    whatsapp: 'WhatsApp（扫描上方二维码）',
    copyright: `© ${year} Allied Immigration. 版权所有。`,
    chat: '💬 联系我们',
    assessment: '✅ 免费评估',
  },
  en: {
    cicc: 'CICC Certified Consultancy',
    servicesHeading: 'Services',
    services: ['Express Entry', 'Family Sponsorship', 'Study Visas', 'Work Permits'],
    contactHeading: 'Contact',
    emailUs: 'Email us',
    wechat: 'WeChat (scan QR above)',
    whatsapp: 'WhatsApp (scan QR above)',
    copyright: `© ${year} Allied Immigration. All rights reserved.`,
    chat: '💬 Chat with Us',
    assessment: '✅ Free Assessment',
  },
};

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
      <main>
        <Hero onOpenQuiz={() => setQuizOpen(true)} />
        <ServicesGrid />
        <SocialMedia />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-brand-amber font-bold text-lg mb-3">Allied Immigration</h3>
              <p className="text-slate-400 text-sm mb-2">{tx.cicc}</p>
              <a href="mailto:info@awcanada.com" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">
                info@awcanada.com
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{tx.servicesHeading}</h4>
              <ul className="space-y-2">
                {tx.services.map(s => (
                  <li key={s}>
                    <a href="#services" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{tx.contactHeading}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:info@awcanada.com" className="hover:text-brand-amber transition-colors duration-200">{tx.emailUs}</a></li>
                <li>{tx.wechat}</li>
                <li>{tx.whatsapp}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-500 text-sm">{tx.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA — hidden on md+ */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-100 shadow-lg px-4 py-3 z-30">
        <div className="flex gap-3">
          <a
            href="#contact"
            className="flex-1 py-3 rounded-full border-2 border-brand-navy text-brand-navy font-semibold text-sm text-center hover:bg-brand-navy hover:text-white transition-all duration-200"
          >
            {tx.chat}
          </a>
          <button
            onClick={() => setQuizOpen(true)}
            className="flex-1 py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
          >
            {tx.assessment}
          </button>
        </div>
      </div>

      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default App;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/App.tsx
git commit -m "feat: wire LanguageProvider and translate footer + sticky CTA"
```

---

### Task 3: Translate + Wire Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

The existing `EN | 中文` pill button needs to call `setLang`. Menu titles need English equivalents. The CTA buttons ("Free Assessment") need Chinese translation.

- [ ] **Step 1: Replace `src/components/Navbar.tsx` with the bilingual version**

```tsx
import React, { useState } from 'react';
import { Globe, Menu, X, ChevronDown, Plus, Minus } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  key: string;
  zhTitle: string;
  enTitle: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

const menuData: MenuItem[] = [
  { key: 'home', zhTitle: '首页', enTitle: 'Home', link: '#' },
  {
    key: 'immigration',
    zhTitle: '移民',
    enTitle: 'Immigration',
    subMenu: [
      { title: '担保父母/祖父母移民', link: '#' },
      { title: '担保配偶/同居伙伴移民', link: '#' },
      { title: '担保子女移民', link: '#' },
      { title: '自雇人士移民计划', link: '#' },
      { title: '留学生转移民', link: '#' },
    ],
  },
  {
    key: 'study',
    zhTitle: '留学',
    enTitle: 'Study',
    subMenu: [
      { title: '加拿大留学申请', link: '#' },
      { title: '留学生对配偶（大签）', link: '#' },
      { title: '留学生陪同人员签证（小签）', link: '#' },
      { title: '毕业工作签证PGWP', link: '#' },
    ],
  },
  {
    key: 'visit',
    zhTitle: '访问',
    enTitle: 'Visit',
    subMenu: [
      { title: '访问签证转工签计划', link: '#' },
      { title: '超级签证', link: '#' },
      { title: '旅伴延期、身分恢复', link: '#' },
    ],
  },
  {
    key: 'prcard',
    zhTitle: '枫叶卡',
    enTitle: 'PR Card',
    subMenu: [
      { title: '枫叶卡更新', link: '#' },
      { title: '枫叶卡更新 (加急)', link: '#' },
      { title: '枫叶卡遗失补办', link: '#' },
      { title: '永久居民旅行文件PRTD', link: '#' },
      { title: '放弃加拿大永久居民身份', link: '#' },
    ],
  },
  {
    key: 'citizenship',
    zhTitle: '入籍',
    enTitle: 'Citizenship',
    subMenu: [
      { title: '成年人入籍申请', link: '#' },
      { title: '未成年人入籍申请', link: '#' },
    ],
  },
  { key: 'contact', zhTitle: '联系我们', enTitle: 'Contact Us', link: '#contact' },
];

interface NavbarProps {
  onOpenQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const { lang, setLang } = useLang();

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const cta = lang === 'zh' ? '免费评估' : 'Free Assessment';
  const toggleLabel = lang === 'zh' ? 'EN | 中文' : '中文 | EN';
  const handleToggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="font-bold text-xl text-brand-navy flex-shrink-0">
              Allied <span className="text-brand-amber">Immigration</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuData.map(item =>
                item.subMenu ? (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200">
                      {lang === 'zh' ? item.zhTitle : item.enTitle}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-50">
                        {item.subMenu.map(sub => (
                          <a
                            key={sub.title}
                            href={sub.link}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-navy hover:bg-brand-bg transition-colors duration-200"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.key}
                    href={item.link}
                    className="text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200"
                  >
                    {lang === 'zh' ? item.zhTitle : item.enTitle}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleLang}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-brand-sky hover:text-brand-sky transition-all duration-200"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                {toggleLabel}
              </button>
              <button
                onClick={onOpenQuiz}
                className="hidden lg:block px-5 py-2 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200 shadow-sm"
              >
                {cta}
              </button>
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="font-bold text-brand-navy text-lg">
                Allied <span className="text-brand-amber">Immigration</span>
              </span>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-1">
              {menuData.map(item =>
                item.subMenu ? (
                  <div key={item.key}>
                    <button
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-3 text-slate-700 font-medium border-b border-slate-50"
                    >
                      {lang === 'zh' ? item.zhTitle : item.enTitle}
                      {openAccordions[item.key] ? (
                        <Minus className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {openAccordions[item.key] && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.subMenu.map(sub => (
                          <a
                            key={sub.title}
                            href={sub.link}
                            onClick={() => setSheetOpen(false)}
                            className="block py-2 text-sm text-slate-600 hover:text-brand-navy transition-colors duration-200"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.key}
                    href={item.link}
                    onClick={() => setSheetOpen(false)}
                    className="block py-3 text-slate-700 font-medium border-b border-slate-50"
                  >
                    {lang === 'zh' ? item.zhTitle : item.enTitle}
                  </a>
                )
              )}
            </div>

            <div className="px-6 pb-10 pt-3 space-y-3">
              <button
                onClick={handleToggleLang}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-slate-600 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {toggleLabel}
              </button>
              <button
                onClick={() => { setSheetOpen(false); setTimeout(() => onOpenQuiz(), 250); }}
                className="w-full py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
              >
                {cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: wire language toggle and translate Navbar"
```

---

### Task 4: Translate Hero

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Replace `src/components/Hero.tsx` with the bilingual version**

```tsx
import React from 'react';
import { useLang } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenQuiz: () => void;
}

const t = {
  zh: {
    badge: '⭐ 超过10,000位客户的信赖之选',
    h1Line1: '开启您的加拿大',
    h1Highlight: '新生活',
    h1Line2: '移民之旅',
    subtext: '专业移民咨询，成功率有保障。CICC认证顾问，全程陪伴您每一步。',
    primaryCta: '立即免费评估',
    secondaryCta: '了解我们的服务',
    trustItems: ['98% 成功率', 'CICC认证', '15年以上经验'],
    trustItemsFull: ['98% 成功率', 'CICC认证', '15年以上经验'],
    imgAlt: '加拿大生活',
  },
  en: {
    badge: '⭐ Trusted by 10,000+ Clients',
    h1Line1: 'Your Pathway to a',
    h1Highlight: 'New Life',
    h1Line2: 'in Canada',
    subtext: 'Expert immigration consultation with a proven track record. CICC-certified consultants guiding you every step of the way.',
    primaryCta: 'Start Free Assessment',
    secondaryCta: 'View Our Services',
    trustItems: ['98% Success Rate', 'CICC Certified', '15+ Years'],
    trustItemsFull: ['98% Success Rate', 'CICC Certified', '15+ Years Experience'],
    imgAlt: 'Life in Canada',
  },
};

const Hero: React.FC<HeroProps> = ({ onOpenQuiz }) => {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="min-h-screen grid lg:grid-cols-2 pt-16">
      {/* Left column */}
      <div className="bg-brand-bg flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/10 text-brand-sky text-sm font-semibold mb-6 w-fit">
          {tx.badge}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-5">
          {tx.h1Line1}<br />
          <span className="text-brand-amber">{tx.h1Highlight}</span> {tx.h1Line2}
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
          {tx.subtext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {tx.primaryCta}
          </button>
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full border-2 border-brand-navy text-brand-navy font-semibold hover:bg-brand-navy hover:text-white transition-all duration-200 text-center"
          >
            {tx.secondaryCta}
          </a>
        </div>

        {/* Mobile trust strip — visible only below lg */}
        <div className="flex flex-wrap items-center gap-4 lg:hidden">
          {tx.trustItems.map(item => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-slate-600">
              <span className="text-green-500">✅</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right column — desktop only */}
      <div className="relative hidden lg:block">
        <img
          src="/hero_background.png"
          alt={tx.imgAlt}
          className="w-full h-full object-cover"
        />
        {/* Floating trust card */}
        <div className="absolute bottom-12 -left-6 bg-white rounded-2xl shadow-xl p-5 min-w-[210px]">
          <div className="space-y-3">
            {tx.trustItemsFull.map(item => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="text-green-500 text-base">✅</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile image — stacks below text */}
      <div className="lg:hidden h-56 sm:h-72">
        <img
          src="/hero_background.png"
          alt={tx.imgAlt}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: translate Hero component"
```

---

### Task 5: Translate ServicesGrid

**Files:**
- Modify: `src/components/ServicesGrid.tsx`

The static `services` array must move inside a translation object since titles and descriptions differ by language. Icons stay in a separate parallel array indexed by position.

- [ ] **Step 1: Replace `src/components/ServicesGrid.tsx` with the bilingual version**

```tsx
import React from 'react';
import { FileText, Users, GraduationCap, Briefcase } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const icons = [FileText, Users, GraduationCap, Briefcase];

const t = {
  zh: {
    sectionLabel: '我们的服务',
    heading: '我们能为您做什么？',
    services: [
      { title: '快速通道', description: '面向技术移民的最快加拿大永居途径。', learnMore: '了解详情 →' },
      { title: '家庭团聚', description: '通过加拿大家庭担保计划，与您的亲人重聚。', learnMore: '了解详情 →' },
      { title: '留学签证', description: '在专业指导下，进入加拿大顶级院校学习。', learnMore: '了解详情 →' },
      { title: '工作签证', description: '根据您的情况，申请最合适的加拿大工作签证。', learnMore: '了解详情 →' },
    ],
  },
  en: {
    sectionLabel: 'What We Do',
    heading: 'How Can We Help You?',
    services: [
      { title: 'Express Entry', description: 'The fastest route to Canadian permanent residency for skilled workers.', learnMore: 'Learn more →' },
      { title: 'Family Sponsorship', description: "Reunite with your loved ones through Canada's family sponsorship program.", learnMore: 'Learn more →' },
      { title: 'Study Visas', description: 'Study at world-class Canadian institutions with expert visa guidance.', learnMore: 'Learn more →' },
      { title: 'Work Permits', description: 'Start your Canadian career with the right work permit for your situation.', learnMore: 'Learn more →' },
    ],
  },
};

const ServicesGrid: React.FC = () => {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-brand-sky text-sm font-semibold uppercase tracking-wider mb-3">
            {tx.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            {tx.heading}
          </h2>
        </div>

        {/* Cards: horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {tx.services.map(({ title, description, learnMore }, i) => {
            const Icon = icons[i];
            return (
              <div
                key={title}
                className="snap-start flex-shrink-0 w-72 lg:w-auto bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-7 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-brand-amber" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{description}</p>
                <a
                  href="#contact"
                  className="mt-5 text-sm font-semibold text-brand-blue hover:text-brand-navy transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {learnMore}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesGrid.tsx
git commit -m "feat: translate ServicesGrid component"
```

---

### Task 6: Translate EligibilityQuiz

**Files:**
- Modify: `src/components/EligibilityQuiz.tsx`

The `steps` array and `getResult` function return language-specific text. Scores (1/2/3) are language-agnostic and kept in a separate constant.

- [ ] **Step 1: Replace `src/components/EligibilityQuiz.tsx` with the bilingual version**

```tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface EligibilityQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const questionScores = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

const t = {
  zh: {
    stepIndicator: (step: number, total: number) => `第 ${step} 步，共${total}步`,
    resultsHeading: '评估结果',
    closeLabel: '关闭',
    questions: [
      {
        question: '您的最高学历是？',
        options: ['高中及以下', '本科学位', '硕士或博士'],
      },
      {
        question: '您有多少年工作经验？',
        options: ['不足1年', '1–3年', '3年以上'],
      },
      {
        question: '您的英语水平如何？',
        options: ['基础', '中级', '高级'],
      },
    ],
    results: {
      high: {
        badge: '🌟 高度符合条件',
        explanation: '您的申请资质非常优秀，可能符合快速通道或其他快捷移民途径。',
        badgeClass: 'bg-green-50 text-green-700',
      },
      moderate: {
        badge: '✅ 基本符合条件',
        explanation: '您的基础条件良好，部分途径可能需要额外准备，我们的顾问将为您提供指导。',
        badgeClass: 'bg-blue-50 text-brand-blue',
      },
      needs: {
        badge: '📋 需要个性化评估',
        explanation: '您的情况适合个性化指导，我们的顾问将为您找到最合适的移民途径。',
        badgeClass: 'bg-slate-50 text-slate-700',
      },
    },
    emailLabel: '通过邮件获取详细报告',
    emailPlaceholder: '您的邮箱',
    submitButton: '获取免费报告',
    successHeading: '报告已发送！',
    successBody: (email: string) =>
      `我们已将您的评估报告发送至 ${email}。我们的团队将在24小时内与您联系。`,
  },
  en: {
    stepIndicator: (step: number, total: number) => `Step ${step} of ${total}`,
    resultsHeading: 'Your Results',
    closeLabel: 'Close quiz',
    questions: [
      {
        question: 'What is your highest level of education?',
        options: ['High School or below', "Bachelor's Degree", "Master's or PhD"],
      },
      {
        question: 'How many years of work experience do you have?',
        options: ['Less than 1 year', '1–3 years', '3+ years'],
      },
      {
        question: 'How would you rate your English proficiency?',
        options: ['Basic', 'Intermediate', 'Advanced'],
      },
    ],
    results: {
      high: {
        badge: '🌟 High Eligibility',
        explanation:
          'Your profile looks strong for Canadian immigration. You may qualify for Express Entry or other fast-track pathways.',
        badgeClass: 'bg-green-50 text-green-700',
      },
      moderate: {
        badge: '✅ Moderate Eligibility',
        explanation:
          'You have a solid foundation. Some pathways may need additional preparation — our consultants can guide you.',
        badgeClass: 'bg-blue-50 text-brand-blue',
      },
      needs: {
        badge: '📋 Needs Assessment',
        explanation:
          'Your situation benefits from personalized guidance. Our consultants will identify the best pathway for you.',
        badgeClass: 'bg-slate-50 text-slate-700',
      },
    },
    emailLabel: 'Get your detailed report by email',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Get My Free Report',
    successHeading: 'Report on its way!',
    successBody: (email: string) =>
      `We've sent your eligibility report to ${email}. Our team will be in touch within 24 hours.`,
  },
};

const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLang();
  const tx = t[lang];

  const totalSteps = tx.questions.length;
  const isResults = step === totalSteps;
  const progress = isResults ? 100 : (step / totalSteps) * 100;
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const result =
    totalScore >= 8 ? tx.results.high : totalScore >= 5 ? tx.results.moderate : tx.results.needs;

  const handleSelect = (score: number) => {
    setScores(prev => [...prev, score]);
    setTimeout(() => setStep(s => s + 1), 250);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setScores([]);
      setEmail('');
      setSubmitted(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
        <button
          onClick={handleClose}
          className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all duration-200"
          aria-label={tx.closeLabel}
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-slate-400">
          {isResults ? tx.resultsHeading : tx.stepIndicator(step + 1, totalSteps)}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          {!isResults ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy text-center mb-10 leading-snug">
                {tx.questions[step].question}
              </h2>
              <div className="space-y-3">
                {tx.questions[step].options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(questionScores[step][i])}
                    className="w-full min-h-14 px-6 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-medium text-left hover:border-brand-amber hover:bg-amber-50 active:bg-amber-100 transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-6 ${result.badgeClass}`}>
                {result.badge}
              </div>
              <p className="text-slate-600 leading-relaxed mb-10 text-base max-w-sm mx-auto">
                {result.explanation}
              </p>

              {!submitted ? (
                <div className="space-y-3 text-left">
                  <p className="text-sm font-semibold text-slate-500 text-center mb-2">
                    {tx.emailLabel}
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={tx.emailPlaceholder}
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-brand-amber focus:outline-none text-slate-700 transition-colors duration-200"
                  />
                  <button
                    onClick={() => email && setSubmitted(true)}
                    disabled={!email}
                    className="w-full py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tx.submitButton}
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-5xl mb-4">📬</div>
                  <p className="font-bold text-brand-navy text-xl mb-2">{tx.successHeading}</p>
                  <p className="text-slate-500 text-sm">{tx.successBody(email)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-8 flex-shrink-0">
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="bg-brand-amber h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EligibilityQuiz;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/EligibilityQuiz.tsx
git commit -m "feat: translate EligibilityQuiz component"
```

---

### Task 7: Translate SocialMedia

**Files:**
- Modify: `src/components/SocialMedia.tsx`

- [ ] **Step 1: Replace `src/components/SocialMedia.tsx` with the bilingual version**

```tsx
import React from 'react';
import { useLang } from '../contexts/LanguageContext';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const t = {
  zh: {
    heading: '准备好开启您的移民之旅了吗？',
    subheading: '与我们的团队预约免费咨询',
    wechat: '💬 微信',
    whatsapp: '📱 WhatsApp',
    scanToChat: '扫码联系',
    wechatAlt: '微信二维码',
    whatsappAlt: 'WhatsApp二维码',
    youtube: '在YouTube上观看客户故事 →',
  },
  en: {
    heading: 'Ready to Start Your Journey?',
    subheading: 'Book a free consultation with our team',
    wechat: '💬 WeChat',
    whatsapp: '📱 WhatsApp',
    scanToChat: 'Scan to chat',
    wechatAlt: 'WeChat QR Code',
    whatsappAlt: 'WhatsApp QR Code',
    youtube: 'Watch our client stories on YouTube →',
  },
};

const SocialMedia: React.FC = () => {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="py-24 bg-brand-navy" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          {tx.heading}
        </h2>
        <p className="text-slate-300 text-lg mb-12">{tx.subheading}</p>

        {/* QR Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">{tx.wechat}</p>
            <img
              src="/wechat_qr.png"
              alt={tx.wechatAlt}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">{tx.scanToChat}</p>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">{tx.whatsapp}</p>
            <img
              src="/whatsapp_qr.png"
              alt={tx.whatsappAlt}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">{tx.scanToChat}</p>
          </div>
        </div>

        {/* YouTube link */}
        <a
          href="https://youtube.com/@awcanada"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:text-brand-amber transition-colors duration-200 font-medium"
        >
          <YoutubeIcon className="w-5 h-5 text-red-400" />
          {tx.youtube}
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
```

- [ ] **Step 2: Final build verification**

```bash
npm run build
```

Expected: `✓ built in ...ms` — zero errors, CSS bundle ~16–17 kB.

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialMedia.tsx
git commit -m "feat: translate SocialMedia component"
```

---

### Task 8: Deploy to GitHub Pages

**Files:**
- No source changes — build and push dist

- [ ] **Step 1: Build production bundle**

```bash
npm run build
```

Expected: `✓ built in ...ms` — dist/ contains index.html + assets/

- [ ] **Step 2: Deploy to gh-pages branch**

```bash
npx gh-pages -d dist --branch gh-pages
```

Expected: `Published`

- [ ] **Step 3: Push source branch**

```bash
git push -u origin master
```

- [ ] **Step 4: Verify live site**

Open `https://luoxiaobin.github.io/awcanada-new/` — confirm:
- Page loads in Chinese by default
- "EN | 中文" toggle switches all text to English
- "中文 | EN" switches back to Chinese
- Refreshing the page remembers the last selected language
- Quiz opens and displays questions in the current language
