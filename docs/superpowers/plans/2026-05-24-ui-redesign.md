# UI Redesign — Modern & Approachable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all UI components with Tailwind CSS to achieve a Modern & Approachable design with a full-screen eligibility quiz modal, split hero layout, horizontal-scroll services on mobile, and a sticky mobile CTA bar.

**Architecture:** Install Tailwind CSS v3 via PostCSS. Replace all vanilla CSS files with Tailwind utility classes in TSX. Lift quiz open/close state to `App.tsx`. Rebuild each component in isolation, deleting its old CSS file after rebuilding. Deploy to GitHub Pages after final cleanup.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v3, Lucide React, gh-pages

---

## File Map

| File | Action |
|---|---|
| `package.json` | Add `tailwindcss@^3`, `postcss`, `autoprefixer` |
| `tailwind.config.js` | Create — design tokens |
| `postcss.config.js` | Create — wire PostCSS plugins |
| `src/index.css` | Strip to reset + Google Fonts import + Tailwind directives + scrollbar-hide util |
| `src/App.css` | Delete |
| `src/App.tsx` | Add `quizOpen` state, sticky CTA bar, footer, remove `EligibilityQuiz` from page flow |
| `src/components/Navbar.tsx` | Rebuild — Tailwind, bottom sheet mobile drawer |
| `src/components/Navbar.css` | Delete |
| `src/components/Hero.tsx` | Rebuild — split layout, floating trust card, `onOpenQuiz` prop |
| `src/components/Hero.css` | Delete |
| `src/components/ServicesGrid.tsx` | Rebuild — snap scroll mobile, 4-col desktop grid |
| `src/components/ServicesGrid.css` | Delete |
| `src/components/EligibilityQuiz.tsx` | Rebuild — full-screen modal, auto-advance, progress bar |
| `src/components/EligibilityQuiz.css` | Delete |
| `src/components/SocialMedia.tsx` | Rebuild — dark bg, QR cards, YouTube link |
| `src/components/SocialMedia.css` | Delete |

---

## Task 1: Install Tailwind CSS

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Install Tailwind and PostCSS**

```bash
cd /home/user/awcanada-new
npm install -D tailwindcss@^3 postcss autoprefixer
```

Expected: packages added, no errors.

- [ ] **Step 2: Create `tailwind.config.js`**

Create `/home/user/awcanada-new/tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  '#1e3a5f',
          blue:  '#2d6bb5',
          amber: '#f5a623',
          sky:   '#0ea5e9',
          bg:    '#f0f7ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Create `postcss.config.js`**

Create `/home/user/awcanada-new/postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: Replace `src/index.css`**

Overwrite `/home/user/awcanada-new/src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 5: Verify Tailwind is working**

```bash
npm run dev -- --port 5173 &
sleep 4
curl -s http://localhost:5173 | grep -c "html"
```

Expected output: `1` (page loads). Kill the dev server after: `kill $(lsof -ti:5173)`

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css package.json package-lock.json
git commit -m "feat: install Tailwind CSS v3 with design tokens"
```

---

## Task 2: Rebuild `App.tsx` — Quiz State, Sticky CTA, Footer

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/App.css`

- [ ] **Step 1: Rewrite `src/App.tsx`**

Overwrite `/home/user/awcanada-new/src/App.tsx` with:

```tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import EligibilityQuiz from './components/EligibilityQuiz';
import SocialMedia from './components/SocialMedia';
import './index.css';

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);

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
              <p className="text-slate-400 text-sm mb-2">CICC Certified Consultancy</p>
              <a href="mailto:info@awcanada.com" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">
                info@awcanada.com
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2">
                {['Express Entry', 'Family Sponsorship', 'Study Visas', 'Work Permits'].map(s => (
                  <li key={s}>
                    <a href="#services" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:info@awcanada.com" className="hover:text-brand-amber transition-colors duration-200">Email us</a></li>
                <li>WeChat (scan QR above)</li>
                <li>WhatsApp (scan QR above)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Allied Immigration. All rights reserved.</p>
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
            💬 Chat with Us
          </a>
          <button
            onClick={() => setQuizOpen(true)}
            className="flex-1 py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
          >
            ✅ Free Assessment
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default App;
```

- [ ] **Step 2: Delete `src/App.css`**

```bash
rm /home/user/awcanada-new/src/App.css
```

- [ ] **Step 3: Verify the app still builds (TypeScript errors expected — components need updating)**

```bash
npx vite build 2>&1 | grep -E "error|✓"
```

Note: TypeScript errors from Navbar/Hero prop mismatches are expected at this stage — they will be fixed in subsequent tasks.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/App.css
git commit -m "feat: lift quiz state to App, add sticky mobile CTA and footer"
```

---

## Task 3: Rebuild `Navbar`

**Files:**
- Modify: `src/components/Navbar.tsx`
- Delete: `src/components/Navbar.css`

- [ ] **Step 1: Rewrite `src/components/Navbar.tsx`**

Overwrite `/home/user/awcanada-new/src/components/Navbar.tsx` with:

```tsx
import React, { useState } from 'react';
import { Globe, Menu, X, ChevronDown, Plus, Minus } from 'lucide-react';

interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  title: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

interface NavbarProps {
  onOpenQuiz: () => void;
}

const menuData: MenuItem[] = [
  { title: '首页', link: '#' },
  {
    title: '移民',
    subMenu: [
      { title: '担保父母/祖父母移民', link: '#' },
      { title: '担保配偶/同居伙伴移民', link: '#' },
      { title: '担保子女移民', link: '#' },
      { title: '自雇人士移民计划', link: '#' },
      { title: '留学生转移民', link: '#' },
    ],
  },
  {
    title: '留学',
    subMenu: [
      { title: '加拿大留学申请', link: '#' },
      { title: '留学生对配偶（大签）', link: '#' },
      { title: '留学生陪同人员签证（小签）', link: '#' },
      { title: '毕业工作签证PGWP', link: '#' },
    ],
  },
  {
    title: '访问',
    subMenu: [
      { title: '访问签证转工签计划', link: '#' },
      { title: '超级签证', link: '#' },
      { title: '旅伴延期、身分恢复', link: '#' },
    ],
  },
  {
    title: '枫叶卡',
    subMenu: [
      { title: '枫叶卡更新', link: '#' },
      { title: '枫叶卡更新 (加急)', link: '#' },
      { title: '枫叶卡遗失补办', link: '#' },
      { title: '永久居民旅行文件PRTD', link: '#' },
      { title: '放弃加拿大永久居民身份', link: '#' },
    ],
  },
  {
    title: '入籍',
    subMenu: [
      { title: '成年人入籍申请', link: '#' },
      { title: '未成年人入籍申请', link: '#' },
    ],
  },
  { title: '联系我们', link: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (title: string) => {
    setOpenAccordions(prev => ({ ...prev, [title]: !prev[title] }));
  };

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
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200">
                      {item.title}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {activeDropdown === item.title && (
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
                    key={item.title}
                    href={item.link}
                    className="text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-brand-sky hover:text-brand-sky transition-all duration-200">
                <Globe className="w-3.5 h-3.5" />
                EN | 中文
              </button>
              <button
                onClick={onOpenQuiz}
                className="hidden lg:block px-5 py-2 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200 shadow-sm"
              >
                Free Assessment
              </button>
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-200"
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
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-1">
              {menuData.map(item =>
                item.subMenu ? (
                  <div key={item.title}>
                    <button
                      onClick={() => toggleAccordion(item.title)}
                      className="w-full flex items-center justify-between py-3 text-slate-700 font-medium border-b border-slate-50"
                    >
                      {item.title}
                      {openAccordions[item.title] ? (
                        <Minus className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {openAccordions[item.title] && (
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
                    key={item.title}
                    href={item.link}
                    onClick={() => setSheetOpen(false)}
                    className="block py-3 text-slate-700 font-medium border-b border-slate-50"
                  >
                    {item.title}
                  </a>
                )
              )}
            </div>

            <div className="px-6 pb-10 pt-3 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-slate-600 text-sm font-medium">
                <Globe className="w-4 h-4" />
                EN | 中文
              </button>
              <button
                onClick={() => { setSheetOpen(false); onOpenQuiz(); }}
                className="w-full py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
              >
                Free Assessment
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

- [ ] **Step 2: Delete `src/components/Navbar.css`**

```bash
rm /home/user/awcanada-new/src/components/Navbar.css
```

- [ ] **Step 3: Start dev server and visually verify navbar**

```bash
npm run dev -- --port 5173 &
sleep 4
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/navbar-check.png --viewport-size=1440,900 --wait-for-timeout=2000
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/navbar-mobile-check.png --viewport-size=390,844 --wait-for-timeout=2000
```

Look at both screenshots. Navbar should be white with logo left, nav links center, CTA right on desktop. On mobile only the hamburger icon should be visible.

- [ ] **Step 4: Kill dev server and commit**

```bash
kill $(lsof -ti:5173) 2>/dev/null; true
git add src/components/Navbar.tsx src/components/Navbar.css
git commit -m "feat: rebuild Navbar with Tailwind, bottom sheet mobile drawer"
```

---

## Task 4: Rebuild `Hero`

**Files:**
- Modify: `src/components/Hero.tsx`
- Delete: `src/components/Hero.css`

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

Overwrite `/home/user/awcanada-new/src/components/Hero.tsx` with:

```tsx
import React from 'react';

interface HeroProps {
  onOpenQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenQuiz }) => {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 pt-16">
      {/* Left column */}
      <div className="bg-brand-bg flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/10 text-brand-sky text-sm font-semibold mb-6 w-fit">
          ⭐ Trusted by 10,000+ Clients
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-5">
          Your Pathway to a<br />
          <span className="text-brand-amber">New Life</span> in Canada
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
          Expert immigration consultation with a proven track record. CICC-certified consultants guiding you every step of the way.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Start Free Assessment
          </button>
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full border-2 border-brand-navy text-brand-navy font-semibold hover:bg-brand-navy hover:text-white transition-all duration-200 text-center"
          >
            View Our Services
          </a>
        </div>

        {/* Mobile trust strip — visible only on mobile */}
        <div className="flex flex-wrap items-center gap-4 lg:hidden">
          {['98% Success Rate', 'CICC Certified', '15+ Years'].map(item => (
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
          alt="Life in Canada"
          className="w-full h-full object-cover"
        />
        {/* Floating trust card */}
        <div className="absolute bottom-12 -left-6 bg-white rounded-2xl shadow-xl p-5 min-w-[210px]">
          <div className="space-y-3">
            {[
              '98% Success Rate',
              'CICC Certified',
              '15+ Years Experience',
            ].map(item => (
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
          alt="Life in Canada"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Delete `src/components/Hero.css`**

```bash
rm /home/user/awcanada-new/src/components/Hero.css
```

- [ ] **Step 3: Screenshot and verify**

```bash
npm run dev -- --port 5173 &
sleep 4
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/hero-desktop.png --viewport-size=1440,900 --wait-for-timeout=2000
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/hero-mobile.png --viewport-size=390,844 --wait-for-timeout=2000
kill $(lsof -ti:5173) 2>/dev/null; true
```

Desktop: two-column split, left column on light blue bg, right column image with floating trust card. Mobile: text column stacked above image, no trust card (strip shows instead).

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.css
git commit -m "feat: rebuild Hero with split layout and floating trust card"
```

---

## Task 5: Rebuild `ServicesGrid`

**Files:**
- Modify: `src/components/ServicesGrid.tsx`
- Delete: `src/components/ServicesGrid.css`

- [ ] **Step 1: Rewrite `src/components/ServicesGrid.tsx`**

Overwrite `/home/user/awcanada-new/src/components/ServicesGrid.tsx` with:

```tsx
import React from 'react';
import { FileText, Users, GraduationCap, Briefcase } from 'lucide-react';

const services = [
  {
    Icon: FileText,
    title: 'Express Entry',
    description: 'The fastest route to Canadian permanent residency for skilled workers.',
  },
  {
    Icon: Users,
    title: 'Family Sponsorship',
    description: "Reunite with your loved ones through Canada's family sponsorship program.",
  },
  {
    Icon: GraduationCap,
    title: 'Study Visas',
    description: 'Study at world-class Canadian institutions with expert visa guidance.',
  },
  {
    Icon: Briefcase,
    title: 'Work Permits',
    description: 'Start your Canadian career with the right work permit for your situation.',
  },
];

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-brand-sky text-sm font-semibold uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            How Can We Help You?
          </h2>
        </div>

        {/* Cards: horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {services.map(({ Icon, title, description }) => (
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
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
```

- [ ] **Step 2: Delete `src/components/ServicesGrid.css`**

```bash
rm /home/user/awcanada-new/src/components/ServicesGrid.css
```

- [ ] **Step 3: Screenshot and verify**

```bash
npm run dev -- --port 5173 &
sleep 4
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/services-desktop.png --viewport-size=1440,900 --wait-for-timeout=2000 --full-page
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/services-mobile.png --viewport-size=390,844 --wait-for-timeout=2000 --full-page
kill $(lsof -ti:5173) 2>/dev/null; true
```

Desktop: 4 equal-width cards in a row on white background. Mobile: single card visible with peek of next.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicesGrid.tsx src/components/ServicesGrid.css
git commit -m "feat: rebuild ServicesGrid with snap-scroll mobile and amber icon cards"
```

---

## Task 6: Rebuild `EligibilityQuiz` — Full-Screen Modal

**Files:**
- Modify: `src/components/EligibilityQuiz.tsx`
- Delete: `src/components/EligibilityQuiz.css`

- [ ] **Step 1: Rewrite `src/components/EligibilityQuiz.tsx`**

Overwrite `/home/user/awcanada-new/src/components/EligibilityQuiz.tsx` with:

```tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EligibilityQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    question: 'What is your highest level of education?',
    options: ['High School or below', "Bachelor's Degree", "Master's or PhD"],
    scores: [1, 2, 3],
  },
  {
    question: 'How many years of work experience do you have?',
    options: ['Less than 1 year', '1–3 years', '3+ years'],
    scores: [1, 2, 3],
  },
  {
    question: 'How would you rate your English proficiency?',
    options: ['Basic', 'Intermediate', 'Advanced'],
    scores: [1, 2, 3],
  },
];

function getResult(score: number) {
  if (score >= 8) {
    return {
      badge: '🌟 High Eligibility',
      explanation:
        'Your profile looks strong for Canadian immigration. You may qualify for Express Entry or other fast-track pathways.',
      badgeClass: 'bg-green-50 text-green-700',
    };
  }
  if (score >= 5) {
    return {
      badge: '✅ Moderate Eligibility',
      explanation:
        'You have a solid foundation. Some pathways may need additional preparation — our consultants can guide you.',
      badgeClass: 'bg-blue-50 text-brand-blue',
    };
  }
  return {
    badge: '📋 Needs Assessment',
    explanation:
      'Your situation benefits from personalized guidance. Our consultants will identify the best pathway for you.',
    badgeClass: 'bg-slate-50 text-slate-700',
  };
}

const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isResults = step === steps.length;
  const progress = isResults ? 100 : (step / steps.length) * 100;
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleSelect = (score: number) => {
    setScores(prev => [...prev, score]);
    // Brief pause so the selected state is visible before advancing
    setTimeout(() => setStep(s => s + 1), 250);
  };

  const handleClose = () => {
    onClose();
    // Reset state after the close animation
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
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-slate-400">
          {isResults ? 'Your Results' : `Step ${step + 1} of ${steps.length}`}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          {!isResults ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy text-center mb-10 leading-snug">
                {steps[step].question}
              </h2>
              <div className="space-y-3">
                {steps[step].options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(steps[step].scores[i])}
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
                    Get your detailed report by email
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-brand-amber focus:outline-none text-slate-700 transition-colors duration-200"
                  />
                  <button
                    onClick={() => email && setSubmitted(true)}
                    className="w-full py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md disabled:opacity-50"
                    disabled={!email}
                  >
                    Get My Free Report
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-5xl mb-4">📬</div>
                  <p className="font-bold text-brand-navy text-xl mb-2">Report on its way!</p>
                  <p className="text-slate-500 text-sm">
                    We've sent your eligibility report to <strong>{email}</strong>. Our team will be in touch within 24 hours.
                  </p>
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

- [ ] **Step 2: Delete `src/components/EligibilityQuiz.css`**

```bash
rm /home/user/awcanada-new/src/components/EligibilityQuiz.css
```

- [ ] **Step 3: Screenshot with quiz open**

```bash
npm run dev -- --port 5173 &
sleep 4
# Screenshot normal page
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/page-full.png --viewport-size=1440,900 --wait-for-timeout=2000 --full-page
kill $(lsof -ti:5173) 2>/dev/null; true
```

Verify the quiz no longer appears as a page section. The old embedded quiz should be gone. The quiz modal will be tested via clicking the CTA in the next task's verification.

- [ ] **Step 4: Commit**

```bash
git add src/components/EligibilityQuiz.tsx src/components/EligibilityQuiz.css
git commit -m "feat: rebuild EligibilityQuiz as full-screen modal with auto-advance"
```

---

## Task 7: Rebuild `SocialMedia` (Contact Section)

**Files:**
- Modify: `src/components/SocialMedia.tsx`
- Delete: `src/components/SocialMedia.css`

- [ ] **Step 1: Rewrite `src/components/SocialMedia.tsx`**

Overwrite `/home/user/awcanada-new/src/components/SocialMedia.tsx` with:

```tsx
import React from 'react';
import { Youtube } from 'lucide-react';

const SocialMedia: React.FC = () => {
  return (
    <section className="py-24 bg-brand-navy" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Ready to Start Your Journey?
        </h2>
        <p className="text-slate-300 text-lg mb-12">Book a free consultation with our team</p>

        {/* QR Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">💬 WeChat</p>
            <img
              src="/wechat_qr.png"
              alt="WeChat QR Code"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">Scan to chat</p>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">📱 WhatsApp</p>
            <img
              src="/whatsapp_qr.png"
              alt="WhatsApp QR Code"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">Scan to chat</p>
          </div>
        </div>

        {/* YouTube link */}
        <a
          href="https://youtube.com/@awcanada"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:text-brand-amber transition-colors duration-200 font-medium"
        >
          <Youtube className="w-5 h-5 text-red-400" />
          Watch our client stories on YouTube →
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
```

- [ ] **Step 2: Delete `src/components/SocialMedia.css`**

```bash
rm /home/user/awcanada-new/src/components/SocialMedia.css
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialMedia.tsx src/components/SocialMedia.css
git commit -m "feat: rebuild SocialMedia as dark contact section with QR cards"
```

---

## Task 8: Final Verification + Deploy

- [ ] **Step 1: Full production build — must pass with zero errors**

```bash
npm run build 2>&1
```

Expected: `✓ built in ...ms` with no TypeScript errors.

- [ ] **Step 2: Full-page desktop and mobile screenshots**

```bash
npm run dev -- --port 5173 &
sleep 4
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/final-desktop.png --viewport-size=1440,900 --wait-for-timeout=3000 --full-page
npx playwright screenshot --browser chromium http://localhost:5173 /tmp/final-mobile.png --viewport-size=390,844 --wait-for-timeout=3000 --full-page
kill $(lsof -ti:5173) 2>/dev/null; true
```

Review both screenshots. Verify:
- Navbar: white, logo left, CTA right, no legacy CSS classes
- Hero: split layout on desktop, stacked on mobile
- Services: 4 cards in grid on desktop
- Contact: dark navy section with 2 QR cards
- Footer: 3-column grid on dark background
- Sticky CTA bar visible at bottom on mobile screenshot

- [ ] **Step 3: Deploy to GitHub Pages**

```bash
npm run build
npx gh-pages -d dist --branch gh-pages
```

Expected: `Published`

- [ ] **Step 4: Push gh-pages branch manually (if needed)**

If the above doesn't push to GitHub, run:

```bash
cp -r dist /tmp/final-dist
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages
git rm -rf . --quiet 2>/dev/null; true
cp -r /tmp/final-dist/. .
touch .nojekyll
git add index.html assets/ favicon.svg hero_background.png icons.svg wechat_qr.png whatsapp_qr.png .nojekyll
git commit -m "Deploy redesigned site to GitHub Pages"
git push origin gh-pages --force
git checkout master
rm -f index.html favicon.svg hero_background.png icons.svg wechat_qr.png whatsapp_qr.png .nojekyll
rm -rf assets
```

- [ ] **Step 5: Final commit on master**

```bash
git add -A
git status  # should be clean
git log --oneline -8
```

Expected: clean working tree with all redesign commits visible.
