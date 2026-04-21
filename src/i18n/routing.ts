import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fa', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      fa: '/services',
      ar: '/services',
    },
    '/about': {
      en: '/about',
      fa: '/about',
      ar: '/about',
    },
    '/gallery': {
      en: '/gallery',
      fa: '/gallery',
      ar: '/gallery',
    },
    '/contact': {
      en: '/contact',
      fa: '/contact',
      ar: '/contact',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
