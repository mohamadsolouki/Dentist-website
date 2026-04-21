'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '@/components/shared/locale-switcher'
import { Button } from '@/components/ui/button'
import { getWhatsAppLink } from '@/lib/utils'

export default function Header() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
    { href: '/gallery', label: t('gallery') },
    { href: '/contact', label: t('contact') },
  ] as const

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-[var(--shadow-header)]'
            : 'bg-gradient-to-b from-black/40 to-transparent backdrop-blur-[2px]'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow">
                AL
              </div>
              <div className="hidden sm:block">
                <p className={cn('text-sm font-bold leading-tight', scrolled ? 'text-foreground' : 'text-white')}>Dr. Arefeh Lotfi</p>
                <p className={cn('text-[10px] leading-tight tracking-wide', scrolled ? 'text-muted-foreground' : 'text-white/60')}>Cosmetic Dentist · Dubai</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    scrolled
                      ? 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LocaleSwitcher className="hidden sm:flex" />
              <Button
                size="sm"
                variant="default"
                className="hidden lg:inline-flex"
                asChild
              >
                <a
                  href={getWhatsAppLink('Hello, I would like to book a consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('bookAppointment')}
                </a>
              </Button>
              {/* Mobile menu button */}
              <button
                className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10')}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen ? 'true' : 'false'}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <motion.div
        className={cn(
          'fixed inset-0 z-30 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        initial={false}
        animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <motion.nav
          className="absolute top-0 end-0 h-full w-72 bg-white shadow-2xl flex flex-col"
          initial={{ x: '100%' }}
          animate={mobileOpen ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-semibold text-foreground">Menu</span>
            <button
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-base font-medium text-foreground rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t border-border space-y-3">
            <LocaleSwitcher className="w-full justify-center" />
            <Button variant="whatsapp" size="lg" className="w-full" asChild>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('bookAppointment')}
              </a>
            </Button>
          </div>
        </motion.nav>
      </motion.div>
    </>
  )
}
