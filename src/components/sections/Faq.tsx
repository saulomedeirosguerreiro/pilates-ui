import { faqContent } from '../../content/faq'
import { Accordion } from '../ui/Accordion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-beige-light py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="faq-heading"
          eyebrow="Perguntas frequentes"
          title="Tire suas dúvidas"
          align="center"
        />
        <div className="rounded-editorial bg-off-white mx-auto w-full max-w-3xl p-6 sm:p-8">
          <Accordion items={faqContent} idPrefix="faq" />
        </div>
      </Container>
    </section>
  )
}
