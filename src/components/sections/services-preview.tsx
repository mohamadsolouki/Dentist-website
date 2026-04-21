'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Sparkles, Star, Zap, Monitor, Smile, Anchor } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper, StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const serviceIcons = [Sparkles, Star, Zap, Monitor, Smile, Anchor]
const serviceColors = [
  'bg-teal-50 text-primary',
  'bg-amber-50 text-amber-600',
  'bg-blue-50 text-blue-600',
  'bg-purple-50 text-purple-600',
  'bg-pink-50 text-pink-600',
  'bg-orange-50 text-orange-600',
]

export default function ServicesPreview() {
  const t = useTranslations('services')

  const services = [
    t('items.hollywoodSmile.title'),
    t('items.veneers.title'),
    t('items.whitening.title'),
    t('items.digital.title'),
    t('items.smileDesign.title'),
    t('items.implants.title'),
  ]

  const descs = [
    t('items.hollywoodSmile.description'),
    t('items.veneers.description'),
    t('items.whitening.description'),
    t('items.digital.description'),
    t('items.smileDesign.description'),
    t('items.implants.description'),
  ]

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-16"
        />

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          staggerDelay={0.08}
        >
          {services.map((name, i) => {
            const Icon = serviceIcons[i]
            return (
              <motion.div
                key={name}
                variants={staggerItem}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 cursor-default"
              >
                <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4', serviceColors[i])}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {descs[i]}
                </p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href="/services" className="hover:underline">
                    {t('learnMore')}
                  </Link>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            )
          })}
        </StaggerContainer>

        <MotionWrapper delay={0.2} className="text-center mt-10">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">
              {t('viewAll')}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </MotionWrapper>
      </div>
    </section>
  )
}
