import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { dmSans, cormorant, vazirmatn } from '@/lib/fonts'
import type { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import WhatsAppFab from '@/components/layout/whatsapp-fab'
import JsonLd from '@/components/shared/json-ld'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const titles = {
    en: 'Dr. Arefeh Lotfi | Cosmetic Dentist Dubai | Hollywood Smile & Digital Dentistry',
    fa: 'دکتر عارفه لطفی | دندانپزشک زیبایی دبی | لبخند هالیوودی و دندانپزشکی دیجیتال',
    ar: 'د. عارفه لطفي | طبيبة أسنان تجميلية دبي | ابتسامة هوليود وطب الأسنان الرقمي',
  }
  const descriptions = {
    en: 'Book your consultation with Dr. Arefeh Lotfi at Hoor Al Aliaa Dental Clinic Dubai. Expert in Hollywood Smile, porcelain veneers, teeth whitening, and digital dentistry. All insurance accepted.',
    fa: 'مشاوره با دکتر عارفه لطفی در Hoor Al Aliaa Dental Clinic دبی را رزرو کنید. متخصص در لبخند هالیوودی، روکش پرسلن، سفید کردن دندان و دندانپزشکی دیجیتال. تمام بیمه‌ها پذیرفته می‌شود.',
    ar: 'احجز استشارتك مع د. عارفه لطفي في Hoor Al Aliaa Dental Clinic دبي. خبيرة في الابتسامة الهوليودية وقشور البورسلين وتبييض الأسنان وطب الأسنان الرقمي. جميع التأمينات مقبولة.',
  }

  const currentLocale = locale as 'en' | 'fa' | 'ar'
  const ogLocales = { en: 'en_US', fa: 'fa_IR', ar: 'ar_AE' }

  return {
    title: titles[currentLocale] || titles.en,
    description: descriptions[currentLocale] || descriptions.en,
    keywords: [
      'dentist dubai',
      'cosmetic dentist dubai',
      'hollywood smile dubai',
      'porcelain veneers dubai',
      'teeth whitening dubai',
      'digital dentistry dubai',
      'Dr Arefeh Lotfi',
      'Hoor Al Aliaa Dental Clinic',
      'smile design dubai',
      'dental implants dubai',
    ],
    authors: [{ name: 'Dr. Arefeh Lotfi' }],
    openGraph: {
      type: 'website',
      locale: ogLocales[currentLocale] || 'en_US',
      siteName: 'Dr. Arefeh Lotfi | Cosmetic Dentist Dubai',
      title: titles[currentLocale] || titles.en,
      description: descriptions[currentLocale] || descriptions.en,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[currentLocale] || titles.en,
      description: descriptions[currentLocale] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const rtlLocales = ['fa', 'ar']
const langMap = {
  en: 'en',
  fa: 'fa',
  ar: 'ar',
} as const

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  const lang = langMap[locale]
  const fontVars = `${dmSans.variable} ${cormorant.variable} ${vazirmatn.variable}`
  const fontClass = rtlLocales.includes(locale)
    ? `${fontVars} font-[family-name:var(--font-vazirmatn)]`
    : fontVars

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={lang} dir={dir} className={fontClass}>
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </div>
    </NextIntlClientProvider>
  )
}
