# Dr. Arefeh Lotfi — Cosmetic Dentist Dubai

Personal brand website for **Dr. Arefeh Lotfi**, a cosmetic and digital dentist at Medicazone Dental Clinic in Dubai. Built with Next.js 15, featuring a fully multilingual experience in English, Arabic, and Persian (Farsi).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| i18n | next-intl v4 (en / ar / fa) |
| Animation | Framer Motion 12 |
| UI Components | Radix UI + shadcn/ui |
| Forms | React Hook Form + Zod |
| Carousel | Embla Carousel |
| Fonts | Geist (Latin) · Vazirmatn (Arabic/Persian) |
| Package Manager | pnpm |
| Sitemap | next-sitemap |

---

## Project Structure

```
.
├── messages/               # Translation files
│   ├── en.json
│   ├── ar.json
│   └── fa.json
├── public/
│   ├── robots.txt          # Static robots file (overridden by next-sitemap postbuild)
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx      # Root layout (metadataBase only)
│   │   ├── [locale]/
│   │   │   ├── layout.tsx  # Locale layout: metadata, JsonLd, Header, Footer
│   │   │   ├── page.tsx    # Home page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   └── services/
│   │   └── api/
│   │       └── instagram/  # Instagram feed proxy route
│   ├── components/
│   │   ├── layout/         # Header, Footer, WhatsApp FAB
│   │   ├── sections/       # Page sections (Hero, Stats, Services, etc.)
│   │   ├── shared/         # Reusable: SectionHeader, JsonLd, LocaleSwitcher
│   │   └── ui/             # shadcn/ui primitives
│   ├── i18n/
│   │   ├── routing.ts      # Locale routing config
│   │   └── request.ts      # next-intl server config
│   ├── lib/
│   │   ├── fonts.ts        # Font definitions
│   │   └── utils.ts        # Constants (phone, WhatsApp, socials, maps)
│   └── types/
│       └── index.ts
├── middleware.ts            # next-intl locale middleware
├── next.config.ts
├── next-sitemap.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohamadsolouki/Dentist-website.git
cd Dentist-website

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app will redirect to `/en` (the default locale).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for the Instagram feed section
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Used by next-sitemap during build
SITE_URL=https://drarefehlotfi.com
```

Without `INSTAGRAM_ACCESS_TOKEN`, the Social Feed section will display a fallback message prompting users to follow on Instagram. The site works fully without it.

### Getting an Instagram Access Token

1. Create a Meta developer app at [developers.facebook.com](https://developers.facebook.com)
2. Add the **Instagram Basic Display** product
3. Generate a long-lived access token for the Instagram account `@drarefehlotfi`
4. Store it in `.env.local` as shown above

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server with Turbopack |
| `pnpm build` | Production build (runs `next-sitemap` automatically via `postbuild`) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Internationalization (i18n)

The site supports three locales:

| Locale | Language | Direction |
|---|---|---|
| `en` | English | LTR |
| `ar` | Arabic | RTL |
| `fa` | Persian (Farsi) | RTL |

### URL Structure

```
https://drarefehlotfi.com/en            # English home
https://drarefehlotfi.com/ar            # Arabic home
https://drarefehlotfi.com/fa            # Persian home
https://drarefehlotfi.com/en/services   # English services page
```

All routes are prefixed with the locale (`localePrefix: 'always'`).

### Adding / Editing Translations

Translation files are in `messages/`:

```jsonc
// messages/en.json (example)
{
  "hero": {
    "headline1": "Your Perfect"
  }
}
```

Use `useTranslations('hero')` in client components or `getTranslations('hero')` in server components.

### Adding a New Locale

1. Add the locale code to `src/i18n/routing.ts`
2. Create `messages/<locale>.json` mirroring the structure of `en.json`
3. Update `next-sitemap.config.js` `alternateRefs`
4. Update the `generateMetadata` function in `src/app/[locale]/layout.tsx`

---

## Key Pages & Sections

| Route | Description |
|---|---|
| `/` | Home — Hero, Stats, Services preview, Why Us, Before/After, Team, Testimonials, Social Feed, CTA |
| `/services` | Full services list with icons and booking CTA |
| `/about` | Doctor bio, clinic values, location map |
| `/gallery` | Before/after gallery with filter tabs |
| `/contact` | Contact form (WhatsApp fallback), map, info |

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in the Vercel dashboard:
- `INSTAGRAM_ACCESS_TOKEN`
- `SITE_URL` (set to your production domain)

### Manual Build

```bash
pnpm build
pnpm start
```

The `postbuild` script runs `next-sitemap` automatically, generating `public/sitemap.xml` and `public/robots.txt`.

---

## SEO

- **Structured Data**: JSON-LD `Dentist` schema injected in every locale layout
- **Canonical URLs**: Per-locale canonicals set via Next.js `generateMetadata`
- **Hreflang**: Declared in metadata `alternates.languages`
- **Sitemap**: Auto-generated with `next-sitemap` after each build
- **Open Graph / Twitter Cards**: Configured per locale in the layout metadata
- **RTL Support**: `dir="rtl"` and Vazirmatn font applied automatically for Arabic and Persian

---

## Contact & Clinic Info

All contact constants are centralized in `src/lib/utils.ts`:

```typescript
export const CLINIC_PHONE_DISPLAY = '+971 55 772 5086'
export const WHATSAPP_NUMBER = '971564220620'
export const CLINIC_ADDRESS = 'Villa 943, Al Wasl Road, Al Manar, Umm Suqeim, Dubai'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/11UrtwcRo5EMfYN58'
```

Update these constants in one place to propagate changes across the entire site.

---

## License

Private project. All rights reserved — Dr. Arefeh Lotfi / Medicazone Dental Clinic.