'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper } from '@/components/shared/motion-wrapper'

export default function BeforeAfter() {
  const t = useTranslations('beforeAfter')
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMove(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.min(Math.max(x, 5), 95))
  }

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-16"
        />

        <MotionWrapper className="max-w-3xl mx-auto">
          {/* Slider container */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card-hover)] cursor-ew-resize select-none"
            style={{ aspectRatio: '16/9' }}
            onMouseMove={(e) => handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* AFTER (full width) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-50 to-teal-100">
              <span className="text-muted-foreground text-sm">After Photo</span>
            </div>
            {/* BEFORE (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-200"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Before Photo</span>
              </div>
            </div>
            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-xl border-2 border-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
                </svg>
              </div>
            </div>
            {/* Labels */}
            <div className="absolute bottom-3 start-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              {t('before')}
            </div>
            <div className="absolute bottom-3 end-3 bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              {t('after')}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">{t('disclaimer')}</p>
        </MotionWrapper>
      </div>
    </section>
  )
}
