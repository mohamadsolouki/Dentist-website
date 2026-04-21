'use client'

import { useTranslations } from 'next-intl'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function CountUp({ value, suffix = '', active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = 0
    const end = value
    const duration = 1800
    const step = 16
    const increment = (end / duration) * step
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setDisplay(end)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, step)

    return () => clearInterval(timer)
  }, [value, active])

  return <>{display}{suffix}</>
}

function parseStatValue(raw: string) {
  const match = raw.match(/^(\d+)([+★\s]?.*)$/)
  if (match) return { num: parseInt(match[1], 10), suffix: match[2] || '' }
  return { num: 0, suffix: raw }
}

export default function StatsBar() {
  const t = useTranslations('stats')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: t('patientsValue') + '+', label: t('patients') },
    { value: t('yearsValue'), label: t('years') },
    { value: t('servicesValue') + '+', label: t('services') },
    { value: t('ratingValue') + '★', label: t('rating') },
  ]

  return (
    <section className="relative z-10 -mt-1 bg-white border-y border-border shadow-[var(--shadow-card)]">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }, i) => {
            const { num, suffix } = parseStatValue(value)
            const isLast = i === stats.length - 1
            return (
              <div
                key={label}
                className={cn(
                  'flex flex-col items-center justify-center py-8 lg:py-10 text-center',
                  !isLast && 'border-e border-border'
                )}
              >
                <span className="text-3xl lg:text-4xl font-bold text-primary tabular-nums">
                  <CountUp value={num} suffix={suffix} active={inView} />
                </span>
                <span className="mt-1 text-xs lg:text-sm text-muted-foreground font-medium tracking-wide">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
