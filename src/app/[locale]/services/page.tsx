import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/shared/section-header'
import ImagePlaceholder from '@/components/shared/image-placeholder'
import { StaggerContainer, staggerItem, MotionWrapper } from '@/components/shared/motion-wrapper'
import { Button } from '@/components/ui/button'
import { getWhatsAppLink } from '@/lib/utils'
import { motion } from 'framer-motion'
import CtaBanner from '@/components/sections/cta-banner'
import { Sparkles, Star, Zap, Monitor, Smile, Anchor, Palette, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = [Sparkles, Star, Zap, Monitor, Smile, Anchor, Palette, AlertCircle]
const colors = [
  'bg-teal-50 text-primary',
  'bg-amber-50 text-amber-600',
  'bg-blue-50 text-blue-600',
  'bg-purple-50 text-purple-600',
  'bg-pink-50 text-pink-600',
  'bg-orange-50 text-orange-600',
  'bg-rose-50 text-rose-600',
  'bg-red-50 text-red-600',
]

const serviceKeys = [
  'hollywoodSmile',
  'veneers',
  'whitening',
  'digital',
  'smileDesign',
  'implants',
  'cosmetic',
  'emergency',
] as const

export default function ServicesPage() {
  const t = useTranslations('servicesPage')

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('badge')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {serviceKeys.map((key, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={key}
                  variants={staggerItem}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
                >
                  {/* Image placeholder */}
                  <div className="relative overflow-hidden">
                    <ImagePlaceholder
                      aspectRatio="16/9"
                      label={t(`items.${key}.title`)}
                      rounded="none"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-xl mb-4', colors[i])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t(`items.${key}.description`)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-5 w-full"
                      asChild
                    >
                      <a
                        href={getWhatsAppLink(`Hello, I'm interested in ${t(`items.${key}.title`)}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('bookService')}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Insurance banner */}
      <section className="py-12 bg-primary/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              {t('insurance.badge')}
            </span>
            <h3 className="text-2xl font-bold text-foreground mb-3">{t('insurance.title')}</h3>
            <p className="text-muted-foreground">{t('insurance.description')}</p>
          </MotionWrapper>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
