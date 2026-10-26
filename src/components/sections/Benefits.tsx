import { benefitsContent } from '../../content/benefits'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="benefits-heading" className="bg-beige-light py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Benefícios"
          title="Os pilares do Pilates Studio"
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {benefitsContent.map((benefit) => (
            <div key={benefit.title} className="flex flex-col gap-2 text-center">
              <span aria-hidden="true" className="border-sage mx-auto h-10 w-10 rounded-full border" />
              <h3 className="text-brown-deep font-serif text-lg">{benefit.title}</h3>
              <p className="text-brown-warm/80 font-sans text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
