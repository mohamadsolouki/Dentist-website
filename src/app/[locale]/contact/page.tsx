'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper } from '@/components/shared/motion-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, MessageCircle, Clock, Instagram, Youtube, CheckCircle, AlertCircle } from 'lucide-react'
import { CLINIC_PHONE_DISPLAY, WHATSAPP_DISPLAY, GOOGLE_MAPS_URL, MAPS_EMBED_URL, SOCIAL_LINKS, getWhatsAppLink } from '@/lib/utils'
import { cn } from '@/lib/utils'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.73a4.85 4.85 0 01-1.02-.04z"/>
    </svg>
  )
}

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const nameMin = t('form.validation.nameMin')
  const emailInvalid = t('form.validation.emailInvalid')
  const phoneInvalid = t('form.validation.phoneInvalid')
  const messageMin = t('form.validation.messageMin')
  const schema = useMemo(() => z.object({
    name: z.string().min(2, nameMin),
    email: z.string().email(emailInvalid),
    phone: z.string().min(7, phoneInvalid),
    service: z.string().optional(),
    message: z.string().min(10, messageMin),
  }), [nameMin, emailInvalid, phoneInvalid, messageMin])
  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    // Build a WhatsApp message with form data as fallback (no backend yet)
    const msg = `${t('form.whatsapp.newInquiry')} ${data.name}%0A${t('form.whatsapp.email')}: ${data.email}%0A${t('form.whatsapp.phone')}: ${data.phone}%0A${t('form.whatsapp.service')}: ${data.service || t('form.whatsapp.general')}%0A${t('form.whatsapp.message')}: ${data.message}`
    window.open(`https://wa.me/971557725086?text=${msg}`, '_blank')
    setStatus('success')
    reset()
  }

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

      {/* Main content */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Info column */}
            <MotionWrapper direction="left" className="lg:col-span-2 space-y-6">
              {/* Contact details */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: t('info.address'),
                    value: t('info.addressValue'),
                    href: GOOGLE_MAPS_URL,
                    hrefLabel: t('info.getDirections'),
                  },
                  {
                    icon: Phone,
                    label: t('info.phone'),
                    value: CLINIC_PHONE_DISPLAY,
                    href: `tel:${CLINIC_PHONE_DISPLAY.replace(/\s/g, '')}`,
                  },
                  {
                    icon: MessageCircle,
                    label: t('info.whatsapp'),
                    value: WHATSAPP_DISPLAY,
                    href: getWhatsAppLink(),
                    hrefLabel: t('info.chatWhatsApp'),
                  },
                  {
                    icon: Clock,
                    label: t('info.hours'),
                    value: t('info.hoursValue'),
                  },
                ].map(({ icon: Icon, label, value, href, hrefLabel }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
                      <p className="text-sm text-foreground">{value}</p>
                      {href && hrefLabel && (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                          {hrefLabel}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Button variant="whatsapp" size="lg" className="w-full" asChild>
                <a href={getWhatsAppLink(t('info.chatWhatsAppMessage'))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="me-2 h-5 w-5" />
                  {t('info.chatWhatsApp')}
                </a>
              </Button>

              {/* Social */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{t('social')}</p>
                <div className="flex gap-3">
                  {[
                    { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: 'Instagram' },
                    { href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon, label: 'TikTok' },
                    { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: 'YouTube' },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] aspect-video">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('info.mapTitle')}
                />
              </div>
            </MotionWrapper>

            {/* Form column */}
            <MotionWrapper direction="right" className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-[var(--shadow-card)]">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <h3 className="text-lg font-semibold text-foreground">{t('form.success')}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">{t('form.name')}</Label>
                        <Input
                          id="name"
                          placeholder={t('form.namePlaceholder')}
                          {...register('name')}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">{t('form.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          {...register('email')}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone">{t('form.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('form.phonePlaceholder')}
                        {...register('phone')}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="service">{t('form.service')}</Label>
                      <select
                        id="service"
                        {...register('service')}
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors text-foreground"
                      >
                        <option value="">{t('form.servicePlaceholder')}</option>
                        {[
                          t('form.services.hollywoodSmile'),
                          t('form.services.porcelainVeneers'),
                          t('form.services.teethWhitening'),
                          t('form.services.digitalDentistry'),
                          t('form.services.smileDesign'),
                          t('form.services.dentalImplants'),
                          t('form.services.generalConsultation'),
                        ].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">{t('form.message')}</Label>
                      <Textarea
                        id="message"
                        placeholder={t('form.messagePlaceholder')}
                        rows={5}
                        {...register('message')}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {t('form.error')}
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                      {status === 'loading' ? t('form.sending') : t('form.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>
    </>
  )
}
