'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { Instagram, Youtube, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper, StaggerContainer, staggerItem } from '@/components/shared/motion-wrapper'
import { SOCIAL_LINKS } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { InstagramPost } from '@/app/api/instagram/route'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.73a4.85 4.85 0 01-1.02-.04z"/>
    </svg>
  )
}

const platformData = [
  {
    key: 'tiktok',
    handle: '@dr.arefehlotfi',
    url: SOCIAL_LINKS.tiktok,
    Icon: TikTokIcon,
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    iconColor: 'text-slate-800',
  },
  {
    key: 'youtube',
    handle: '@dr.arefehlotfi',
    url: SOCIAL_LINKS.youtube,
    Icon: Youtube,
    bg: 'bg-red-50',
    border: 'border-red-100',
    iconColor: 'text-red-600',
  },
]

function InstagramShowcase() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((json) => setPosts(json.data ?? []))
      .catch(() => setPosts([]))
  }, [])

  // Call process() after both posts are rendered AND embed.js is loaded.
  // setTimeout gives React one extra tick to commit blockquote nodes to the DOM.
  useEffect(() => {
    if (!scriptLoaded || posts.length === 0) return
    const id = setTimeout(() => window.instgrm?.Embeds.process(), 150)
    return () => clearTimeout(id)
  }, [scriptLoaded, posts])

  const displayPosts = posts.slice(0, 2)

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Profile header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center flex-shrink-0">
          <Instagram className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">@drarefehlotfi</p>
          <p className="text-xs text-muted-foreground">Hoor Al Aliaa Dental Clinic · Dubai</p>
        </div>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium shrink-0"
        >
          <ExternalLink className="h-3 w-3" />
          Follow
        </a>
      </div>

      {/* 2 embeds side-by-side, clipped to strip profile header + likes footer */}
      <div className="flex gap-3">
        {displayPosts.length > 0 ? displayPosts.map((post) => (
          <div key={post.shortcode} className="flex-1 overflow-hidden rounded-xl h-[440px]">
            {/* Negative top offset hides Instagram's ~70px profile header */}
            <div className="-mt-[70px]">
              {/* No data-instgrm-captioned → caption hidden */}
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${post.permalink}?utm_source=ig_embed`}
                data-instgrm-version="14"
              />
            </div>
          </div>
        )) : (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex-1 h-[440px] rounded-xl shimmer" />
          ))
        )}
      </div>

      {/* Follow CTA */}
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
      >
        <Instagram className="h-4 w-4" />
        Follow on Instagram
      </a>
    </>
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
          {/* Instagram embeds — spans 2 cols */}
          <MotionWrapper className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] overflow-hidden">
            <InstagramShowcase />
          </MotionWrapper>

          {/* TikTok + YouTube cards */}
          <div className="flex flex-col gap-4">
            <StaggerContainer staggerDelay={0.1}>
              {platformData.map(({ key, handle, url, Icon, bg, border, iconColor }) => (
                <motion.a
                  key={key}
                  variants={staggerItem}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-5 rounded-2xl border ${border} ${bg} shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 group`}
                >
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
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

            <div className="mt-2 p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
              {t('noToken')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
