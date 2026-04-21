import { useTranslations } from 'next-intl'
import { Instagram, Youtube, Phone, MapPin, MessageCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { SOCIAL_LINKS, CLINIC_PHONE_DISPLAY, getWhatsAppLink } from '@/lib/utils'

// TikTok icon (not in Lucide)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.73a4.85 4.85 0 01-1.02-.04z"/>
    </svg>
  )
}

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/services', label: tNav('services') },
    { href: '/about', label: tNav('about') },
    { href: '/gallery', label: tNav('gallery') },
    { href: '/contact', label: tNav('contact') },
  ] as const

  const socialLinks = [
    { href: SOCIAL_LINKS.instagram, icon: Instagram, label: 'Instagram' },
    { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: 'TikTok' },
    { href: SOCIAL_LINKS.youtube, icon: Youtube, label: 'YouTube' },
  ]

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
                AL
              </div>
              <div>
                <p className="font-bold text-white leading-tight">Dr. Arefeh Lotfi</p>
                <p className="text-[11px] text-white/50 leading-tight">{t('tagline')}</p>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{t('quickLinks')}</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/60 leading-relaxed">{t('address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${CLINIC_PHONE_DISPLAY.replace(/\s/g, '')}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-[#25D366] flex-shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('whatsapp')}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow / CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{t('followUs')}</h3>
            <div className="space-y-2.5">
              {[
                { href: SOCIAL_LINKS.instagram, label: '@drarefehlotfi', platform: 'Instagram' },
                { href: SOCIAL_LINKS.tiktok, label: '@dr.arefehlotfi', platform: 'TikTok' },
                { href: SOCIAL_LINKS.youtube, label: '@dr.arefehlotfi', platform: 'YouTube' },
              ].map(({ href, label, platform }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-primary text-xs font-semibold w-16">{platform}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <a
              href={getWhatsAppLink(t('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BA5C] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {t('whatsappCta')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Dr. Arefeh Lotfi. {t('rights')}
          </p>
          <p className="text-xs text-white/40">
            {t('designedBy')}{' '}
            <a
              href="https://hitalabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              Hita Labs FZC
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
