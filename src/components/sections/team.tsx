import { useTranslations } from 'next-intl'
import { GraduationCap, Award, Languages } from 'lucide-react'
import SectionHeader from '@/components/shared/section-header'
import { MotionWrapper } from '@/components/shared/motion-wrapper'
import ImagePlaceholder from '@/components/shared/image-placeholder'

export default function Team() {
  const t = useTranslations('team')

  const credentials = [
    { icon: GraduationCap, text: t('credentials.degree') },
    { icon: Award, text: t('credentials.specialty') },
    { icon: Languages, text: t('credentials.languages') },
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
            <ImagePlaceholder
              aspectRatio="3/4"
              label="Dr. Arefeh Lotfi"
              rounded="2xl"
              className="max-w-sm mx-auto lg:mx-0"
            />
          </MotionWrapper>

          {/* Content */}
          <MotionWrapper direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Dr. Arefeh Lotfi</h3>
                <p className="text-primary font-medium mt-1">{t('role')}</p>
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
