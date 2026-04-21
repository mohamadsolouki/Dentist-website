'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fa', label: 'FA', full: 'فارسی' },
  { code: 'ar', label: 'AR', full: 'العربية' },
]

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(nextLocale: string) {
    // Replace /currentLocale/ prefix with /nextLocale/
    const segments = pathname.split('/')
    segments[1] = nextLocale
    const newPath = segments.join('/')
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-0.5',
        isPending && 'opacity-60 pointer-events-none',
        className
      )}
    >
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          aria-label={`Switch to ${l.full}`}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200',
            locale === l.code
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background'
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
