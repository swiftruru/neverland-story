# Neverland Story

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572b6?style=flat-square&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![i18next](https://img.shields.io/badge/i18next-23-26a69a?style=flat-square&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![Swiper](https://img.shields.io/badge/Swiper-11-6332f6?style=flat-square&logo=swiper&logoColor=white)](https://swiperjs.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5a0fc8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![SSG](https://img.shields.io/badge/SSG-Static%20Export-0a7ea4?style=flat-square)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
[![Jest](https://img.shields.io/badge/Jest-29-c21325?style=flat-square&logo=jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-8-4b32c3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

Personal website for **Peter Pan** — iOS/Flutter instructor, author, and consultant. Built with **Next.js 14 App Router**, featuring bilingual content (繁體中文 / English), PWA support, and optimized for static deployment.

## Features

### Core Technology

- **Next.js 14 App Router** with static export (`output: 'export'`)
- **TypeScript** for type-safe development
- **CSS Modules** for scoped, maintainable styling
- **React 18** with Server Components support

### Internationalization (i18n)

- Dual language support (zh-TW / en) via `i18next` + `react-i18next`
- Automatic browser language detection
- `hreflang` tags and locale-aware metadata
- Language switcher with smooth transitions

### Progressive Web App (PWA)

- Service Worker with offline fallback
- Web App Manifest with multiple icon sizes
- Install prompts for supported browsers
- Background sync capabilities

### SEO & Analytics

- **Structured Data**: Organization, Person, Course, FAQ, Review, BreadcrumbList schemas
- **Open Graph & Twitter Cards**: Social preview optimization
- **Dynamic Sitemap**: Auto-generated `sitemap.xml`
- **Google Analytics**: Page tracking with content group support
- Per-page metadata with customizable titles and descriptions

### UI/UX Components

- **Swiper Lightbox**: Touch-friendly photo gallery with swipe navigation
- **Fade-in Animations**: Scroll-triggered reveal effects
- **Reading Progress Bar**: Visual indicator for long-form content
- **Back to Top**: Smooth scroll navigation
- **Floating Contact**: Quick access to contact options
- **Page Transitions**: Smooth route change animations
- **Responsive Design**: Mobile-first approach with tablet/desktop breakpoints

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus styling for interactive elements
- Alt text coverage for images
- ARIA labels for controls

## Project Structure

```text
src/
├── app/
│   ├── (flutter)/          # Flutter course pages
│   ├── (neverland)/        # Main site pages
│   │   └── neverland/
│   │       ├── apps/       # Portfolio - Apps
│   │       ├── books/      # Portfolio - Books
│   │       ├── classroom/  # Classroom info
│   │       ├── columns/    # Blog columns
│   │       ├── contact/    # Contact page
│   │       ├── courses/    # Course listings
│   │       ├── essays/     # Essays collection
│   │       ├── experience/ # Work experience
│   │       ├── ferryman/   # Ferryman service
│   │       ├── gallery/    # Photo gallery
│   │       ├── links/      # Useful links
│   │       ├── qa/         # FAQ section
│   │       ├── tutoring/   # Tutoring info
│   │       └── videos/     # Video portfolio
│   ├── (swift)/            # Swift course pages
│   ├── (swiftui)/          # SwiftUI course pages
│   ├── layout.tsx          # Root layout
│   ├── metadata.ts         # SEO helpers
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── common/             # Shared UI components
│   │   ├── BackToTop.tsx
│   │   ├── BreadcrumbJsonLd.tsx
│   │   ├── CourseJsonLd.tsx
│   │   ├── FadeInOnScroll.tsx
│   │   ├── FAQJsonLd.tsx
│   │   ├── FloatingContact.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── LazyImage.tsx
│   │   ├── OrganizationJsonLd.tsx
│   │   ├── PageTransition.tsx
│   │   ├── PaperCard.tsx
│   │   ├── PersonJsonLd.tsx
│   │   ├── PwaProvider.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── ReviewJsonLd.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Tape.tsx
│   │   └── ZoomImage.tsx
│   └── layout/             # Layout components
├── i18n/
│   ├── locales/            # Translation files
│   └── I18nProvider.tsx    # i18n context provider
├── constants/              # Navigation & content data
└── styles/                 # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/peterappletree/neverland-story.git

# Navigate to project directory
cd neverland-story

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Create production build (static export)  |
| `npm run start` | Serve production build locally           |
| `npm run lint`  | Run ESLint for code quality              |
| `npm run test`  | Run Jest test suite                      |

## Deployment

### Static Export

The project is configured for static export. Running `npm run build` generates the `out/` directory:

```bash
npm run build
# Deploy the 'out/' folder to any static hosting
```

### Docker

Multi-stage Dockerfile included for containerized deployment:

```bash
docker build -t neverland-story .
docker run -p 80:80 neverland-story
```

### Vercel

Deploy directly to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/peterappletree/neverland-story)

## Configuration

### Environment Variables

| Variable               | Description          | Default            |
| ---------------------- | -------------------- | ------------------ |
| `NEXT_PUBLIC_SITE_URL` | Production site URL  | `https://p207.app` |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics ID  | -                  |

### Customization

- **Translations**: Edit files in `src/i18n/locales/`
- **Metadata**: Update `src/app/metadata.ts`
- **Social Preview**: Replace `public/og-cover.png`
- **PWA Icons**: Update icons in `public/icons/`

## Tech Stack

| Category  | Technology                    |
| --------- | ----------------------------- |
| Framework | Next.js 14 (App Router)       |
| Language  | TypeScript 5.4                |
| Styling   | CSS Modules                   |
| i18n      | i18next + react-i18next       |
| Carousel  | Swiper 11                     |
| Testing   | Jest + React Testing Library  |
| Linting   | ESLint                        |
| Analytics | Google Analytics 4            |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is private and proprietary.

## Author

**Peter Pan** (彼得潘)

- Website: [p207.app](https://p207.app)
- Medium: [@apppeterpan](https://medium.com/@apppeterpan)
- Facebook: [iphone.peterpan](https://www.facebook.com/iphone.peterpan/)

---

Built with Next.js and React
