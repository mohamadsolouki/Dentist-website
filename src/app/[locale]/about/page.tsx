'use client'

import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/shared/section-header'
import ImagePlaceholder from '@/components/shared/image-placeholder'
import { MotionWrapper, StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { Palette, Monitor, Heart, Shield } from 'lucide-react'
import { MAPS_EMBED_URL, GOOGLE_MAPS_URL } from '@/lib/utils'
import CtaBanner from '@/components/sections/cta-banner'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MapPin, Clock, Accessibility } from 'lucide-react'

const valueIcons = [Palette, Monitor, Heart, Shield]
const valueColors = [
  'bg-teal-50 text-primary',
  'bg-amber-50 text-amber-600',
  'bg-blue-50 text-blue-600',
  'bg-purple-50 text-purple-600',
]

const valueKeys = ['artistry', 'technology', 'care', 'accessibility'] as const

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-foreground to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('badge')}
            title={t('heroTitle')}
            subtitle={t('heroSubtitle')}
            dark
          />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <MotionWrapper direction="left">
              <ImagePlaceholder
                aspectRatio="3/4"
                label="Dr. Arefeh Lotfi"
                rounded="2xl"
              />
            </MotionWrapper>
            <MotionWrapper direction="right" className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">{t('storyTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('storyText1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('storyText2')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('storyText3')}</p>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t('valuesTitle')}
            className="mb-12"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i]
              return (
                <motion.div
                  key={key}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"
                >
                  <div className={cn('h-14 w-14 rounded-2xl flex items-center justify-center mb-5', valueColors[i])}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(`values.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`values.${key}.description`)}</p>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Clinic info */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <MotionWrapper>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('clinicTitle')}</h2>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, text: t('clinicAddress') },
                  { Icon: Clock, text: t('clinicHours') },
                  { Icon: Accessibility, text: t('wheelchair') },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">{text}</p>
                  </div>
                ))}
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm text-primary font-medium hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </MotionWrapper>

            {/* Map embed */}
            <MotionWrapper direction="right">
              <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] aspect-[4/3]">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Medicazone Dental Clinic location"
                />
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
