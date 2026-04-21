'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Sparkles, Star, Zap, Monitor, Smile, Anchor } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper, StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const serviceIcons = [Sparkles, Star, Zap, Monitor, Smile, Anchor]

const accentColors = [
  { bar: 'from-teal-400 to-teal-600', iconBg: 'bg-teal-50 text-teal-700', hover: 'hover:shadow-teal-100/80' },
  { bar: 'from-amber-400 to-amber-600', iconBg: 'bg-amber-50 text-amber-700', hover: 'hover:shadow-amber-100/80' },
  { bar: 'from-blue-400 to-blue-600', iconBg: 'bg-blue-50 text-blue-700', hover: 'hover:shadow-blue-100/80' },
  { bar: 'from-purple-400 to-purple-600', iconBg: 'bg-purple-50 text-purple-700', hover: 'hover:shadow-purple-100/80' },
  { bar: 'from-pink-400 to-pink-600', iconBg: 'bg-pink-50 text-pink-700', hover: 'hover:shadow-pink-100/80' },
  { bar: 'from-orange-400 to-orange-600', iconBg: 'bg-orange-50 text-orange-700', hover: 'hover:shadow-orange-100/80' },
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
    <section className="section-padding bg-muted/30">
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
            const color = accentColors[i]
            const num = String(i + 1).padStart(2, '0')

            return (
              <motion.div key={name} variants={staggerItem} className="group">
                <Card className={cn(
                  'relative overflow-hidden h-full border-border/50 bg-card',
                  'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                  color.hover
                )}>
                  {/* Gradient accent bar at top */}
                  <div className={cn('absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r', color.bar)} />

                  {/* Ghost number watermark */}
                  <span className="absolute bottom-4 end-4 text-7xl font-bold text-foreground/[0.035] select-none leading-none pointer-events-none">
                    {num}
                  </span>

                  <CardContent className="p-6 pt-7 flex flex-col h-full gap-4">
                    {/* Icon */}
                    <div className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset ring-black/5 shrink-0',
                      color.iconBg
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-foreground text-[17px] leading-snug group-hover:text-primary transition-colors duration-200">
                        {name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {descs[i]}
                      </p>
                    </div>

                    {/* Learn more link */}
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/60 hover:text-primary transition-colors duration-200 mt-1 w-fit"
                    >
                      {t('learnMore')}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
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
