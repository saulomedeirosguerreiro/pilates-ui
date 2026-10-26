import { imagesConfig, type ImageKey } from '../../assets/images/images.config'

const toneClasses: Record<string, string> = {
  deep: 'from-brown-deep to-brown-warm',
  warm: 'from-brown-warm to-brown-medium',
  medium: 'from-brown-medium to-beige-light',
  sage: 'from-sage to-brown-medium',
}

type PlaceholderImageProps = {
  imageKey: ImageKey
  className?: string
}

export function PlaceholderImage({ imageKey, className = '' }: PlaceholderImageProps) {
  const { label, tone } = imagesConfig[imageKey]

  return (
    <div
      role="img"
      aria-label={label}
      className={`rounded-editorial relative overflow-hidden bg-gradient-to-br ${toneClasses[tone]} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="160"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-off-white"
        />
        <circle
          cx="160"
          cy="40"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-off-white"
        />
      </svg>
      <span className="text-off-white/80 absolute right-4 bottom-4 left-4 font-sans text-xs tracking-wide">
        {label} · imagem provisória
      </span>
    </div>
  )
}
