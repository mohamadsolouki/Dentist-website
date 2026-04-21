import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  aspectRatio?: '16/9' | '4/3' | '3/4' | '1/1' | '3/2' | '9/16'
  label?: string
  className?: string
  icon?: React.ReactNode
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const ratioClasses = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '9/16': 'aspect-[9/16]',
}

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

export default function ImagePlaceholder({
  aspectRatio = '4/3',
  label,
  className,
  icon,
  rounded = '2xl',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        ratioClasses[aspectRatio],
        roundedClasses[rounded],
        className
      )}
      role="img"
      aria-label={label || 'Image placeholder'}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 shimmer" />
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        {icon ? (
          icon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        )}
        {label && (
          <span className="text-xs font-medium tracking-wide uppercase opacity-60 px-2 text-center">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
