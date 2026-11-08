# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing/landing site for "Finance 44" (a personal budget app), built with React 19 + TypeScript + Vite, Tailwind CSS v3 and shadcn/ui. Deployed to GitHub Pages at `https://m-dominiak-company44.github.io/finance-44`. There is no backend and no test suite.

## Commands

```bash
npm run dev        # Vite dev server (served under /finance-44/)
npm run build      # tsc -b (typecheck) && vite build -> dist/
npm run preview    # serve the built dist/
npm run lint       # eslint .   (lint:fix to autofix)
npm run format     # prettier --write .
npm run deploy     # builds, then pushes dist/ to the gh-pages branch
```

Known tooling quirks:
- **ESLint currently lints nothing.** `eslint.config.js` uses `files: ['./src/**/*.{ts,tsx}']`; flat config doesn't match the leading `./`, so every file is reported as "ignored". Fixing it to `src/**/*.{ts,tsx}` will surface errors, because the `prettier/prettier` rule there hardcodes `tabWidth: 2, printWidth: 100`, conflicting with `.prettierrc` (`tabWidth: 4, printWidth: 140`), which is what the code is actually formatted with.
- `vite.config.js` is the emitted output of `vite.config.ts` (via `tsconfig.node.json`, which is `composite` without `noEmit`), so `tsc -b` rewrites it. Edit `vite.config.ts`; keep the two in sync.

## Architecture

- **Base path**: `vite.config.ts` sets `base: '/finance-44/'`, and `main.tsx` passes `import.meta.env.BASE_URL` as the `BrowserRouter` basename. Anything path-related must respect this sub-path.
- **Routing is query-param based, not path based.** `App.tsx` has a single `/` route whose `PageHandler` switches on `?page=` (e.g. `?page=privacy` → `PrivacyPolicy`, default → `Home`). Any other path renders `NotFound`. This avoids GitHub Pages 404s on deep links. New pages: add a `case` in `PageHandler` and a `MyNavLink to="?page=..."` in the nav.
- **i18n**: `src/lib/i18n.ts` loads `src/locales/{en,pl}/translation.json` with browser language detection (fallback `en`). `src/@types/i18next.d.ts` types the resources, so `t('...')` keys are type-checked — add every new key to **both** `en` and `pl` files. Lists are stored as JSON arrays and read with `t(key, { returnObjects: true })`. All user-visible text goes through `t()`.
- **Theming**: dark mode is the `dark` class on `<html>` (Tailwind `darkMode: class`). The initial theme is set in `main.tsx` before render from `localStorage.theme` or `prefers-color-scheme`; `ThemeToggle` flips the class and persists it. Colors are shadcn CSS variables in `src/index.css`.
- **UI components**: shadcn/ui ("new-york" style, zinc base, lucide icons) under `src/components/ui/`; add more with the shadcn CLI per `components.json`. Merge classes with `cn()` from `~/lib/utils`.
- **Import alias**: `~/` → `src/` (configured in both `tsconfig.json` and `vite.config.ts`).
