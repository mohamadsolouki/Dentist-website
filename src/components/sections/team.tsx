import { useTranslations } from 'next-intl'
import { GraduationCap, Award, Languages } from 'lucide-react'
import Image from 'next/image'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper } from '@/components/shared/motion-wrapper'

export default function Team() {
  const t = useTranslations('team')

  const credentials = [
    { icon: GraduationCap, text: t('credentials') },
    { icon: Award, text: t('clinicName') },
    { icon: Languages, text: t('languages') },
  ]

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          className="mb-12 lg:mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <MotionWrapper direction="left">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Decorative background blob */}
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 -z-10" />
              <div className="absolute -bottom-3 -end-3 w-full h-full rounded-2xl border-2 border-primary/20 -z-10" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/dr-lotfi-2.png"
                  alt={t('imageAlt')}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 384px"
                />
              </div>
            </div>
          </MotionWrapper>

          {/* Content */}
          <MotionWrapper direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{t('title')}</h3>
                <p className="text-primary font-medium mt-1">{t('credentials')}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{t('bio')}</p>

              {/* Credentials */}
              <div className="space-y-3">
                {credentials.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug pt-2">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
