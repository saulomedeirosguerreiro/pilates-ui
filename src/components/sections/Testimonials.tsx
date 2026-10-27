import { useRef } from 'react'
import { testimonialsContent, testimonialsSummary } from '../../content/testimonials'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' })
  }

  return (
    <section id="depoimentos" className="bg-off-white py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="O que nossos clientes dizem"
            title="Ouça de quem já vive essa experiência com a gente."
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Depoimento anterior"
              className="border-brown-deep/20 text-brown-deep hover:bg-brown-deep hover:text-off-white flex h-11 w-11 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Próximo depoimento"
              className="border-brown-deep/20 text-brown-deep hover:bg-brown-deep hover:text-off-white flex h-11 w-11 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none"
            >
              →
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="flex snap-x gap-6 overflow-x-auto pb-4">
          {testimonialsContent.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-brown-deep text-off-white flex w-80 shrink-0 snap-start flex-col gap-4 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">{testimonial.timeframe}</span>
                <span aria-hidden="true" className="text-off-white/40 font-serif text-3xl">
                  "
                </span>
              </div>
              <p className="text-off-white/80 font-sans text-sm text-pretty">{testimonial.quote}</p>
              <p className="font-sans text-sm font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-brown-deep font-sans text-sm">
            <span className="font-serif text-lg">{testimonialsSummary.reviewCount}</span>{' '}
            {testimonialsSummary.label} amam nossos serviços
          </p>
          <span className="text-brown-warm/70 font-sans text-sm">{testimonialsSummary.basedOnLabel}</span>
        </div>
      </Container>
    </section>
  )
}
