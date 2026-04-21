import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { geist, vazirmatn } from '@/lib/fonts'
import type { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import WhatsAppFab from '@/components/layout/whatsapp-fab'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'team' })

  const titles = {
    en: 'Dr. Arefeh Lotfi | Cosmetic Dentist Dubai | Hollywood Smile & Digital Dentistry',
    fa: 'دکتر اعرفه لطفی | دندانپزشک زیبایی دبی | لبخند هالیوودی و دندانپزشکی دیجیتال',
    ar: 'د. عارفة لطفي | طبيبة أسنان تجميلية دبي | ابتسامة هوليود وطب الأسنان الرقمي',
  }
  const descriptions = {
    en: 'Book your consultation with Dr. Arefeh Lotfi at Medicazone Dubai. Expert in Hollywood Smile, porcelain veneers, teeth whitening, and digital dentistry. All insurance accepted.',
    fa: 'مشاوره با دکتر اعرفه لطفی در Medicazone دبی را رزرو کنید. متخصص در لبخند هالیوودی، روکش پرسلن، سفید کردن دندان و دندانپزشکی دیجیتال. تمام بیمه‌ها پذیرفته می‌شود.',
    ar: 'احجز استشارتك مع د. عارفة لطفي في Medicazone دبي. خبيرة في الابتسامة الهوليودية وقشور البورسلين وتبييض الأسنان وطب الأسنان الرقمي. جميع التأمينات مقبولة.',
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
      'Medicazone',
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
      url: `https://drarefehlotfi.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[currentLocale] || titles.en,
      description: descriptions[currentLocale] || descriptions.en,
    },
    alternates: {
      canonical: `https://drarefehlotfi.com/${locale}`,
      languages: {
        en: 'https://drarefehlotfi.com/en',
        fa: 'https://drarefehlotfi.com/fa',
        ar: 'https://drarefehlotfi.com/ar',
      },
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

  const messages = await getMessages()
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  const fontClass = locale === 'en'
    ? geist.variable
    : `${vazirmatn.variable} font-[family-name:var(--font-vazirmatn)]`

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} dir={dir} className={fontClass}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </div>
    </NextIntlClientProvider>
  )
}
