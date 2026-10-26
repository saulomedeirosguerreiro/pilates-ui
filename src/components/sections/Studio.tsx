import { studioContent } from '../../content/studio'
import { Container } from '../ui/Container'
import { PlaceholderImage } from '../ui/PlaceholderImage'
import { SectionHeading } from '../ui/SectionHeading'

export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="bg-beige-light py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <PlaceholderImage imageKey="studio" className="aspect-[4/3] w-full lg:order-2" />

        <div className="flex flex-col gap-6 lg:order-1">
          <SectionHeading id="studio-heading" eyebrow={studioContent.eyebrow} title={studioContent.title} />
          {studioContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brown-warm/90 font-sans text-base sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}
