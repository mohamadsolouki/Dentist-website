'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppLink, CLINIC_PHONE_DISPLAY } from '@/lib/utils'
import Link from 'next/link'
import { useLocale } from 'next-intl'

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  const headlineWords = [t('headline1'), t('headline2'), t('headline3')]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Teal glow */}
        <div className="absolute top-1/4 start-1/4 w-[500px] h-[500px] rounded-full bg-teal-600/20 blur-[100px]" />
        <div className="absolute bottom-1/4 end-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[80px]" />
      </div>

      {/* Image placeholder overlay hint */}
      <div className="absolute inset-0 flex items-center justify-end pe-8 lg:pe-0 lg:justify-center pointer-events-none opacity-10">
        <div className="w-[340px] lg:w-[500px] aspect-[3/4] rounded-3xl border-2 border-dashed border-white/30 flex items-center justify-center">
          <span className="text-white/50 text-xs text-center px-4">Doctor photo placeholder</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-wide mb-8">
              {t('badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className={`block ${i === 1 ? 'gold-text' : ''}`}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button size="xl" variant="whatsapp" asChild>
              <a
                href={getWhatsAppLink('Hello Dr. Lotfi, I would like to book a consultation.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cta1')}
              </a>
            </Button>
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50" asChild>
              <Link href={`/${locale}/services`}>
                {t('cta2')}
              </Link>
            </Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-14 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[
              { value: '2000+', label: 'Patients' },
              { value: '5★', label: 'Google Rating' },
              { value: 'All', label: 'Insurance Accepted' },
              { value: '3', label: 'Languages' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-bold gold-text">{value}</span>
                <span className="text-xs text-white/50 tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase">{t('scrollHint')}</span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </section>
  )
}
