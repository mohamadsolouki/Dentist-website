import { useTranslations } from 'next-intl'
import { Instagram, Youtube, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper, StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { SOCIAL_LINKS } from '@/lib/utils'
import { motion } from 'framer-motion'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.73a4.85 4.85 0 01-1.02-.04z"/>
    </svg>
  )
}

const platformData = [
  {
    key: 'instagram',
    handle: '@drarefehlotfi',
    url: SOCIAL_LINKS.instagram,
    Icon: Instagram,
    color: 'from-pink-500 to-purple-600',
    bg: 'bg-gradient-to-br from-pink-50 to-purple-50',
    border: 'border-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    key: 'tiktok',
    handle: '@dr.arefehlotfi',
    url: SOCIAL_LINKS.tiktok,
    Icon: TikTokIcon,
    color: 'from-slate-800 to-slate-950',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    iconColor: 'text-slate-800',
  },
  {
    key: 'youtube',
    handle: '@dr.arefehlotfi',
    url: SOCIAL_LINKS.youtube,
    Icon: Youtube,
    color: 'from-red-500 to-red-700',
    bg: 'bg-red-50',
    border: 'border-red-100',
    iconColor: 'text-red-600',
  },
]

// Instagram grid placeholders (9 cells)
function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-muted overflow-hidden relative shimmer"
        >
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Instagram className="h-5 w-5 opacity-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SocialFeed() {
  const t = useTranslations('social')

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-16"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Instagram grid — takes 2/3 width */}
          <MotionWrapper className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                <span className="font-semibold text-sm text-foreground">@drarefehlotfi</span>
              </div>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                {t('viewProfile')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <InstagramGrid />
          </MotionWrapper>

          {/* TikTok + YouTube cards stacked */}
          <div className="flex flex-col gap-4">
            <StaggerContainer staggerDelay={0.1}>
              {platformData.slice(1).map(({ key, handle, url, Icon, bg, border, iconColor }) => (
                <motion.a
                  key={key}
                  variants={staggerItem}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-5 rounded-2xl border ${border} ${bg} shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t(key as 'tiktok' | 'youtube')}</p>
                    <p className="text-xs text-muted-foreground">{handle}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </StaggerContainer>

            {/* Follow note */}
            <div className="mt-2 p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
              {t('noToken')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
