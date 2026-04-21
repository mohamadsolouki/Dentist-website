'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fa', label: 'FA', full: 'فارسی' },
  { code: 'ar', label: 'AR', full: 'العربية' },
] satisfies Array<{ code: Locale; label: string; full: string }>

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(nextLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
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
