# Neverland Story

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![PWA](https://img.shields.io/badge/PWA-ready-5a0fc8?logo=pwa)](https://web.dev/progressive-web-apps/) [![Static Export](https://img.shields.io/badge/SSG-static%20export-0a7ea4)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

Personal site for Peter Pan (iOS instructor, author, consultant). Built with Next.js App Router, TypeScript, CSS Modules, and i18next for bilingual content (zh-TW / en). Pages include portfolio (apps, videos, books), courses, tutoring, gallery, essays, columns, contact, and ferryman service.

## Features
- Static export (SSG) friendly: `output: export` with pre-rendered pages and sitemap/robots.
- Dual language support via `i18next` + `react-i18next`; `hreflang` and locale-aware metadata.
- PWA-ready: manifest, service worker, offline fallback, install prompts, and proper icons.
- SEO/OG: structured data (BreadcrumbList, FAQ), social preview image, per-page metadata.
- Accessibility: focus styling, keyboardable controls, semantic components, alt text coverage.
- UI polish: responsive layouts, scroll-based fade/slide animations, lightbox/gallery, reading progress bar.

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000 (Next auto-picks an open port)
```

Common scripts:
- `npm run dev` – local dev server with hot reload.
- `npm run build` – production build (SSG).
- `npm run start` – serve production build.
- `npm run lint` – lint with Next/TypeScript rules.

## Project Structure (high level)
- `src/app` – Next.js App Router pages, layouts, and metadata.
- `src/components` – shared UI (cards, animations, modals, navigation).
- `src/constants` – navigation, content data, and schema helpers.
- `public` – static assets (OG image, PWA icons, offline.html, sitemap/robots).

## Deployment
- **Static export**: `npm run build` emits `out/` for static hosting.
- **Docker**: multi-stage build (Node build → Nginx serve) via `Dockerfile`.
- **PWA**: ensure `manifest.json`, `sw.js`, and icons are served from `public/`.

## Notes
- Main site URL (current): `https://p207.app/`.
- Adjust translations/content under `src/app/.../appWorks.ts`, `i18n` resources, and page data files.
- Update SEO/social assets in `public/og-cover.png` and metadata helpers in `src/app/metadata.ts`.
