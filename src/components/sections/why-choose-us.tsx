'use client'

import { useTranslations } from 'next-intl'
import { Shield, Globe, Award, Clock } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const icons = [Shield, Globe, Award, Clock]
const colors = [
  'bg-teal-50 text-primary',
  'bg-amber-50 text-amber-600',
  'bg-blue-50 text-blue-600',
  'bg-purple-50 text-purple-600',
]

export default function WhyChooseUs() {
  const t = useTranslations('why')

  const features = [
    {
      title: t('items.insurance.title'),
      description: t('items.insurance.description'),
    },
    {
      title: t('items.installment.title'),
      description: t('items.installment.description'),
    },
    {
      title: t('items.digital.title'),
      description: t('items.digital.description'),
    },
    {
      title: t('items.multilingual.title'),
      description: t('items.multilingual.description'),
    },
  ]

  return (
    <section className="section-padding bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-16"
        />

        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          staggerDelay={0.1}
        >
          {features.map((feature, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"
              >
                <div className={cn('h-14 w-14 rounded-2xl flex items-center justify-center mb-5', colors[i])}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                {i === 1 && (
                  <span className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#5b2d8e]/10 text-[#5b2d8e] text-[11px] font-semibold tracking-wide">
                    ✦ Pay with Tabby
                  </span>
                )}
              </motion.div>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
