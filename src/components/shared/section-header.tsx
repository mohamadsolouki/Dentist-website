import { cn } from '@/lib/utils'
import { MotionWrapper } from './motion-wrapper'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  dark?: boolean
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  dark = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-start items-start',
    center: 'text-center items-center',
    right: 'text-end items-end',
  }[align]

  return (
    <div className={cn('flex flex-col gap-4', alignClass, className)}>
      {badge && (
        <MotionWrapper delay={0}>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full',
              dark
                ? 'bg-white/15 text-white'
                : 'bg-primary/10 text-primary'
            )}
          >
            {badge}
          </span>
        </MotionWrapper>
      )}
      <MotionWrapper delay={0.08}>
        <h2
          className={cn(
            'text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight',
            dark ? 'text-white' : 'text-foreground',
            titleClassName
          )}
          // Preserve line breaks passed via template strings
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </MotionWrapper>
      {subtitle && (
        <MotionWrapper delay={0.16}>
          <p
            className={cn(
              'text-base lg:text-lg leading-relaxed max-w-2xl',
              dark ? 'text-white/75' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        </MotionWrapper>
      )}
    </div>
  )
}
