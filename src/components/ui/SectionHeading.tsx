type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  id,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  const titleColor = tone === 'light' ? 'text-off-white' : 'text-brown-deep'
  const descriptionColor = tone === 'light' ? 'text-off-white/70' : 'text-brown-warm/80'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">{eyebrow}</span>
      )}
      <h2 id={id} className={`font-serif text-3xl text-balance sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-sans text-base text-pretty sm:text-lg ${descriptionColor}`}>{description}</p>
      )}
    </div>
  )
}
