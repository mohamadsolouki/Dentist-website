'use client'

import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper } from '@/components/shared/motion-wrapper'
import { useRef } from 'react'

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplayPlugin.current])

  const items = [
    { name: t('items.0.name'), text: t('items.0.text'), flag: '🇬🇧' },
    { name: t('items.1.name'), text: t('items.1.text'), flag: '🇮🇷' },
    { name: t('items.2.name'), text: t('items.2.text'), flag: '🇦🇪' },
    { name: t('items.3.name'), text: t('items.3.text'), flag: '🇬🇧' },
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

        <MotionWrapper>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 -ms-5 ps-5">
              {items.map((item, i) => (
                <div key={i} className="flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)]">
                  <div className="h-full flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
                    <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                          {item.flag}
                        </div>
                        <span className="font-semibold text-sm text-foreground">{item.name}</span>
                      </div>
                      <StarRating />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                className="h-1.5 rounded-full bg-primary/20 transition-all hover:bg-primary data-[active]:bg-primary data-[active]:w-6 w-6"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
