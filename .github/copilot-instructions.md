# Copilot instructions for this repository

## Build, lint, and run commands

Use the npm scripts from `package.json`:

- `npm run dev` - start the Vite dev server
- `npm run build` - run TypeScript project references with `tsc -b` and then build with Vite
- `npm run lint` - run ESLint across the repository
- `npm run preview` - preview the production build locally

There is currently **no test runner or test script configured** in this repository, so there is no supported command for running the full suite or a single test file.

## High-level architecture

This is a small **single-page React 19 + TypeScript + Vite** marketing site. `src\main.tsx` mounts `App` under `StrictMode`, and `src\App.tsx` composes the whole page as a fixed section order:

1. `Navbar`
2. `Hero`
3. `ServicesGrid`
4. `EligibilityQuiz`
5. `SocialMedia`
6. footer markup inline in `App.tsx`

The main architectural split is:

- **Global shell and design tokens** live in `src\index.css` and `src\App.css`. `index.css` defines the shared color tokens, shadows, layout primitives, and reusable classes such as `.container`, `.section`, `.btn-primary`, and `.btn-outline`.
- **Each page section is a standalone component** under `src\components`, with a matching plain CSS file imported directly by that component (`Navbar.tsx` + `Navbar.css`, etc.).
- **Static media is served from `public\`** and referenced with root-relative paths like `/hero_background.png`, `/wechat_qr.png`, and `/whatsapp_qr.png`.

Two components contain most of the nontrivial UI behavior:

- `Navbar.tsx` manages scroll state for header styling, desktop hover dropdowns, and the mobile drawer/accordion navigation from one component.
- `EligibilityQuiz.tsx` contains the only real step-based interaction flow in the app: local `step` state, local `formData`, progressive question screens, and the final lead-capture state.

There is no router, API layer, global state library, or shared data/model layer at the moment. Most content is static and stored directly inside the section component that renders it.

## Key repository conventions

- **Use plain CSS files, not CSS modules or CSS-in-JS.** Every section component imports its own stylesheet with `import './Component.css';`.
- **Preserve the section-based composition in `App.tsx`.** New homepage content should usually be added as another section component rather than folded into unrelated components.
- **Reuse the global primitives from `src\index.css`** before introducing new layout/button patterns. Existing sections already rely on `.container`, `.section`, `.btn-primary`, `.btn-outline`, and shared color variables.
- **Keep component content local when it is section-specific.** Menu items in `Navbar.tsx`, service cards in `ServicesGrid.tsx`, and quiz copy/options in `EligibilityQuiz.tsx` are all defined inline in the component instead of being extracted into separate config files.
- **Follow the current component shape:** import React, declare the component as `const ComponentName: React.FC = () => { ... }`, and default-export it.
- **Use `lucide-react` for icons** when adding new iconography, matching `Navbar.tsx`, `ServicesGrid.tsx`, and `EligibilityQuiz.tsx`.
- **Treat localization/content changes carefully.** The site intentionally mixes English and Chinese copy today (for example, Chinese navigation labels in `Navbar.tsx` and Chinese contact/social labels in `SocialMedia.tsx`), so content updates should preserve that bilingual intent unless the task explicitly changes it.
- **Reference public assets with root-relative URLs** so Vite serves them correctly from `public\`.
