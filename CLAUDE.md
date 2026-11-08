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

Formatting is defined only in `.prettierrc` (4-space indent, 140 cols, single quotes, semicolons); ESLint runs it via `prettier/prettier` and also enforces Tailwind class order/shorthands (`size-*` instead of `h-* w-*`), so `npm run lint:fix` is the quickest way to clean up. `tsconfig.node.json` (for `vite.config.ts`) is composite and emits into `node_modules/.tmp`, so don't add a `vite.config.js` — Vite would load it ahead of the `.ts` file.

## Architecture

- **Base path**: `vite.config.ts` sets `base: '/finance-44/'`, and `main.tsx` passes `import.meta.env.BASE_URL` as the `BrowserRouter` basename. Anything path-related must respect this sub-path.
- **Routing is query-param based, not path based.** `App.tsx` has a single `/` route whose `PageHandler` switches on `?page=` (e.g. `?page=privacy` → `PrivacyPolicy`, default → `Home`). Any other path renders `NotFound`. This avoids GitHub Pages 404s on deep links. Pages: home (default), `?page=privacy` (`PrivacyPolicy`), `?page=terms` (`TermsOfUse`). New pages: add a `case` in `PageHandler`, a `MyNavLink to="?page=..."` in the nav and the page name to the home check in `my-nav-link.tsx` (the active link is decided by `?page=`, not by the path).
- **i18n**: `src/lib/i18n.ts` loads `src/locales/{en,pl}/translation.json` with browser language detection (fallback `en`). `src/@types/i18next.d.ts` types the resources, so `t('...')` keys are type-checked — add every new key to **both** `en` and `pl` files. Lists are stored as JSON arrays and read with `t(key, { returnObjects: true })`. All user-visible text goes through `t()`.
- **Theming**: dark mode is the `dark` class on `<html>` (Tailwind `darkMode: class`). The initial theme is set in `main.tsx` before render from `localStorage.theme` or `prefers-color-scheme`; `ThemeToggle` flips the class and persists it. Colors are shadcn CSS variables in `src/index.css`.
- **UI components**: shadcn/ui ("new-york" style, zinc base, lucide icons) under `src/components/ui/`; add more with the shadcn CLI per `components.json`. Merge classes with `cn()` from `~/lib/utils`.
- **Legal pages** (privacy policy, terms of use – the Android app links to `?page=privacy`): both render `LegalPage` (`src/components/legal-page.tsx`) from translation data – `highlights` and `sections`, each section `{ id, title, content }` with blocks `{ p }`, `{ list }` or `{ note }`. Texts may use `**bold**` and `[label](target)`, where target is a URL or `privacy` / `terms` / `contact` (`CONTACT_URL`). The "last updated" dates are constants in `src/lib/legal.ts` – **bump them whenever you change a document's text and never compute them** (an earlier version showed today's date). The texts describe what the Android app really does (local data, Android backup, optional Google Drive backup with the `drive.file` scope, export/import) – keep them in sync with the app project `C:\Users\Maciek\AndroidStudioProjects\Finance44` (`docs/migration/data.md`).
- **Brand color**: `--primary` in `src/index.css` is the emerald of the app icon (`#064E3B`, lighter in dark mode).
- **Import alias**: `~/` → `src/` (configured in both `tsconfig.json` and `vite.config.ts`).
