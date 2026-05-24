# UI Redesign — Allied Immigration Website

**Date:** 2026-05-24
**Approach:** Option B — Full Layout + Design System Overhaul
**Style:** Modern & Approachable

---

## Goals

1. Increase trust and credibility with a bilingual (English/Chinese) audience
2. Improve conversion — more leads captured through the eligibility quiz
3. Modernize the visual design away from the current corporate-heavy feel

## Audience

Mixed: people in China researching immigration options, and Chinese immigrants already in Canada. Both need a site that feels professional but approachable — not intimidating for first-time applicants.

---

## Design System

### Tailwind Config

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

### Color Roles

| Token | Hex | Usage |
|---|---|---|
| `brand-navy` | `#1e3a5f` | Headings, navbar bg (footer), trust elements |
| `brand-blue` | `#2d6bb5` | Links, inline CTAs, active states |
| `brand-amber` | `#f5a623` | Primary CTA buttons, progress bars, accents |
| `brand-sky` | `#0ea5e9` | Section labels, secondary highlights |
| `brand-bg` | `#f0f7ff` | Page background, hero left-column background |
| `slate-900` | — | Footer background |
| `slate-600` | — | Body text |
| `slate-400` | — | Muted/secondary text |

### Typography

- Font: **Inter** (already loaded via Google Fonts)
- Headings: `font-bold tracking-tight text-brand-navy`
- H1: `text-5xl` desktop / `text-3xl` mobile
- H2: `text-3xl` desktop / `text-2xl` mobile
- Body: `text-slate-600 leading-relaxed`

### Shape Language

- Cards: `rounded-3xl shadow-sm` hover → `shadow-md`
- Buttons: `rounded-full`
- Icon containers: `rounded-2xl bg-amber-50`
- Inputs: `rounded-2xl`
- All transitions: `transition-all duration-200`

---

## Components

### 1. Navbar

- Always white with `shadow-sm` — no scroll-triggered transparency
- Layout: logo left | nav links center | CTA right
- Language toggle: `rounded-full` pill button (`EN | 中文`)
- CTA: `rounded-full bg-brand-amber text-white`
- Desktop: hover dropdowns (same structure as current)
- Mobile (< 1024px): hamburger opens a **bottom sheet drawer** (slides up from bottom, `fixed inset-x-0 bottom-0`, `rounded-t-3xl`)
- `backdrop-blur-sm` for glass feel when content scrolls behind

### 2. Hero

Split layout — no dark image overlay.

**Left column (`bg-brand-bg`):**
- Small badge: "Trusted by 10,000+ Clients" (`rounded-full bg-brand-sky/10 text-brand-sky`)
- H1: "Your Pathway to a New Life in Canada"
- Subtext: one sentence value proposition
- Two CTAs: `rounded-full bg-brand-amber` (primary) + `rounded-full border-2 border-brand-navy text-brand-navy` (secondary)

**Right column:**
- Hero image (existing `hero.png`)
- Floating trust card (bottom-left overlap): `rounded-2xl bg-white shadow-lg p-4`
  - ✅ 98% Success Rate
  - ✅ CICC Certified
  - ✅ 15+ Years Experience

**Mobile:** stacks vertically (text → image). Trust card becomes a horizontal 3-icon strip below the CTAs.

### 3. Services Grid

**Section header:**
- Small label: "What We Do" (`text-brand-sky text-sm font-semibold uppercase tracking-wider`)
- H2: "How Can We Help You?"

**Cards:**
- `rounded-3xl bg-white shadow-sm hover:shadow-md`
- Icon: `rounded-2xl bg-amber-50` container, amber icon color
- "Learn more →" link in `text-brand-blue` at card bottom

**Mobile:** `overflow-x-auto` horizontal scroll with `snap-x snap-mandatory`, each card `snap-start` — peek of next card visible

**Desktop:** `grid grid-cols-4 gap-6`

### 4. Eligibility Quiz — Full-Screen Modal

**Trigger:** Hero primary CTA ("Start Free Assessment") + sticky mobile CTA button. Both trigger the same `quizOpen` boolean state lifted to `App.tsx`, passed down as `onOpen` prop to Hero and the sticky CTA bar.

**Structure:**
- `fixed inset-0 bg-white z-50` overlay
- Slides up from bottom on mobile (`translate-y` animation), fades in on desktop
- Close button (×) top-left
- Step indicator top-right ("Step X of 3")

**Per-step layout:**
- Large centered question text (`text-2xl font-bold text-brand-navy`)
- Full-width option buttons (`min-h-14 rounded-2xl border-2 border-slate-200 hover:border-brand-amber hover:bg-amber-50`)
- Selecting an option auto-advances to next step (no "Next" button)
- Progress bar bottom: `rounded-full bg-brand-amber` fill

**Results screen:**
- Large result badge (e.g., "High Eligibility ✅")
- Short 2-sentence explanation
- Email capture: `rounded-2xl` input + `rounded-full bg-brand-amber` submit button ("Get My Free Report")

**Mobile:** identical layout — full-screen naturally handles all screen sizes

### 5. Contact / Social Section

**Background:** `bg-brand-navy` (dark section)

**Header:** "Ready to Start Your Journey?" (white) + "Book a free consultation" (slate-300)

**QR Cards (2-column grid):**
- `rounded-3xl bg-white/10 border border-white/20`
- WeChat card (left) + WhatsApp card (right)
- QR image + "Scan to chat" label in white

**YouTube:** Text link row with red YouTube icon — `text-white hover:text-brand-amber`

**Mobile:** 2-column QR grid stays, YouTube link full-width row below

### 6. Footer

**Background:** `bg-slate-900`

**3-column grid (desktop) → stacked (mobile):**
- Col 1: Brand name (`text-brand-amber font-bold`) + "CICC Certified" badge + email
- Col 2: Quick links to each service
- Col 3: Contact methods (email, WeChat, WhatsApp)

**Bottom row:** thin divider + copyright in `text-slate-500`

### 7. Sticky Mobile CTA Bar

- `fixed bottom-0 left-0 right-0 md:hidden`
- `bg-white border-t border-slate-100 shadow-lg px-4 py-3`
- Two equal buttons: "💬 Chat with Us" (WhatsApp/WeChat link) + "✅ Free Assessment" (quiz trigger)

---

## Implementation Order

1. Install Tailwind CSS + configure `tailwind.config.js` with design tokens
2. Update `index.css` (remove CSS variables, keep only reset + Google Fonts import)
3. `Navbar` — rebuild with Tailwind, bottom sheet mobile drawer
4. `Hero` — split layout, floating trust card, connect quiz trigger
5. Sticky mobile CTA bar (in `App.tsx`)
6. `ServicesGrid` — new card design + horizontal scroll mobile
7. `EligibilityQuiz` — full-screen modal, auto-advance, progress bar
8. `SocialMedia` / Contact section — dark background, QR cards
9. `Footer` — 3-column grid
10. Delete all `*.css` component files

---

## Responsive Breakpoints

| Section | Mobile (`< md`) | Desktop (`md+`) |
|---|---|---|
| Navbar | Bottom sheet drawer | Horizontal with dropdowns |
| Hero | Stacked (text → image) | Split 50/50 |
| Services | Horizontal scroll snap | 4-column grid |
| Quiz | Slides up full-screen | Fades in full-screen |
| Contact | 2-col QR + link row | 2-col QR + link row |
| Footer | Single column | 3-column grid |
| Sticky CTA | Visible | Hidden |

---

## Files to Modify

| File | Change |
|---|---|
| `package.json` | Add `tailwindcss`, `@tailwindcss/vite` |
| `vite.config.ts` | Add Tailwind Vite plugin |
| `tailwind.config.js` | New file — design tokens |
| `src/index.css` | Strip to reset + font import only |
| `src/App.css` | Delete |
| `src/App.tsx` | Add quiz state + sticky CTA bar |
| `src/components/Navbar.tsx` + `Navbar.css` | Rebuild in Tailwind, delete CSS |
| `src/components/Hero.tsx` + `Hero.css` | Rebuild in Tailwind, delete CSS |
| `src/components/ServicesGrid.tsx` + `ServicesGrid.css` | Rebuild in Tailwind, delete CSS |
| `src/components/EligibilityQuiz.tsx` + `EligibilityQuiz.css` | Rebuild in Tailwind, delete CSS |
| `src/components/SocialMedia.tsx` + `SocialMedia.css` | Rebuild in Tailwind, delete CSS |
