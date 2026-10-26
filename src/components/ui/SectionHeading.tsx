type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', id }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">{eyebrow}</span>
      )}
      <h2 id={id} className="text-brown-deep font-serif text-3xl text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-brown-warm/80 font-sans text-base text-pretty sm:text-lg">{description}</p>
      )}
    </div>
  )
}
