'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import SectionHeader from '@/components/shared/section-header'
import ImagePlaceholder from '@/components/shared/image-placeholder'
import { StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import CtaBanner from '@/components/sections/cta-banner'

const filterKeys = ['all', 'hollywoodSmile', 'veneers', 'whitening', 'implants', 'clinic'] as const
type FilterKey = typeof filterKeys[number]

// Mock gallery items
const galleryItems = [
  { id: 1, category: 'hollywoodSmile', aspect: '3/4' as const },
  { id: 2, category: 'veneers', aspect: '4/3' as const },
  { id: 3, category: 'whitening', aspect: '1/1' as const },
  { id: 4, category: 'hollywoodSmile', aspect: '4/3' as const },
  { id: 5, category: 'implants', aspect: '3/4' as const },
  { id: 6, category: 'clinic', aspect: '16/9' as const },
  { id: 7, category: 'veneers', aspect: '1/1' as const },
  { id: 8, category: 'whitening', aspect: '3/4' as const },
  { id: 9, category: 'hollywoodSmile', aspect: '4/3' as const },
  { id: 10, category: 'clinic', aspect: '3/4' as const },
  { id: 11, category: 'implants', aspect: '1/1' as const },
  { id: 12, category: 'veneers', aspect: '4/3' as const },
]

export default function GalleryPage() {
  const t = useTranslations('galleryPage')
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

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

      {/* Filter tabs */}
      <section className="pb-8 bg-background sticky top-16 lg:top-20 z-10 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  'flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  activeFilter === key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                )}
              >
                {t(`filters.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            staggerDelay={0.05}
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid mb-4"
                >
                  <ImagePlaceholder
                    aspectRatio={item.aspect}
                    label={t(`filters.${item.category as FilterKey}`)}
                    rounded="2xl"
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
