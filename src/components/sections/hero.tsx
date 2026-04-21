'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowDown, Star, Shield, Award } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getWhatsAppLink } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 end-0 w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 start-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] translate-y-1/3 -translate-x-1/3" />
        {/* Accent line */}
        <div className="absolute top-1/2 start-0 end-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Content ── */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-wide">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {t('headline1')}{' '}
              <span className="gold-text">{t('headline2')}</span>
              <br />
              {t('headline3')}
            </motion.h1>

            {/* Divider accent */}
            <motion.div
              className="w-16 h-1 rounded-full bg-gradient-to-r from-teal-400 to-primary mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            />

            {/* Subheadline */}
            <motion.p
              className="text-lg text-white/70 leading-relaxed max-w-lg mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              {t('subheadline')}
            </motion.p>

            {/* Trust pills */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              {[
                { icon: Shield, text: 'All Insurance Accepted' },
                { icon: Award, text: '10+ Years Experience' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Icon className="h-3 w-3 text-teal-400" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
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
                <Link href="/services">
                  {t('cta2')}
                </Link>
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {[
                { value: '2000+', label: 'Happy Patients' },
                { value: '5★', label: 'Google Rating' },
                { value: '3', label: 'Languages' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold gold-text">{value}</span>
                  <span className="text-xs text-white/50 tracking-wide">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Doctor Image ── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-teal-500/20 blur-3xl scale-90 -z-10" />

              {/* Floating card – rating */}
              <motion.div
                className="absolute -start-6 top-12 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="flex -space-x-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none">5.0 Rating</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Google Reviews</p>
                </div>
              </motion.div>

              {/* Floating card – experience */}
              <motion.div
                className="absolute -end-6 bottom-20 z-20 bg-primary text-white rounded-2xl shadow-2xl px-4 py-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
              >
                <p className="text-2xl font-bold leading-none">10+</p>
                <p className="text-[11px] text-white/80 mt-1">Years of Excellence</p>
              </motion.div>

              {/* Doctor photo */}
              <div className="relative w-[300px] sm:w-[360px] lg:w-[420px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src="/images/dr-lotfi.png"
                  alt="Dr. Arefeh Lotfi – Cosmetic Dentist Dubai"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/60 to-transparent" />
                {/* Name tag */}
                <div className="absolute bottom-5 inset-x-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <p className="text-white font-semibold text-sm">Dr. Arefeh Lotfi</p>
                  <p className="text-white/60 text-xs mt-0.5">Cosmetic & Digital Dentist · Dubai</p>
                </div>
              </div>
            </div>
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
