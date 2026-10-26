import { servicesContent } from '../../content/services'
import { Container } from '../ui/Container'
import { PlaceholderImage } from '../ui/PlaceholderImage'
import { SectionHeading } from '../ui/SectionHeading'
import type { ImageKey } from '../../assets/images/images.config'

const imageByService: Record<string, ImageKey> = {
  Pilates: 'pilates',
  Massoterapia: 'massotherapy',
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="services-heading" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="services-heading"
          eyebrow="Serviços"
          title="Práticas dedicadas ao seu corpo"
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {servicesContent.map((service) => (
            <article
              key={service.name}
              className="rounded-editorial border-brown-medium/15 bg-off-white flex flex-col gap-4 border p-6 sm:p-8"
            >
              <PlaceholderImage imageKey={imageByService[service.name]} className="aspect-video w-full" />
              <h3 className="text-brown-deep font-serif text-2xl">{service.name}</h3>
              <p className="text-brown-warm/80 font-sans text-sm sm:text-base">{service.description}</p>
              <ul className="text-brown-warm/80 flex flex-col gap-2 font-sans text-sm">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden="true" className="text-sage">
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {service.note && <p className="text-sage font-sans text-xs italic">{service.note}</p>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
