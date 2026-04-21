import { useTranslations } from 'next-intl'
import { MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppLink, CLINIC_PHONE_DISPLAY } from '@/lib/utils'
import { MotionWrapper } from '@/components/shared/motion-wrapper'

export default function CtaBanner() {
  const t = useTranslations('cta')

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 teal-gradient" />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #B8963E 1px, transparent 1px), radial-gradient(circle at 80% 50%, #B8963E 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Gold accent orbs */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 start-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <MotionWrapper>
          <p className="text-sm font-semibold tracking-widest text-white/60 uppercase mb-4">{t('badge')}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto">{t('subtitle')}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="whatsapp" asChild>
              <a
                href={getWhatsAppLink('Hello Dr. Lotfi, I would like to book a consultation.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="me-2 h-5 w-5" />
                {t('whatsapp')}
              </a>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              asChild
            >
              <a href={`tel:${CLINIC_PHONE_DISPLAY.replace(/\s/g, '')}`}>
                <Phone className="me-2 h-5 w-5" />
                {t('call')}
              </a>
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
