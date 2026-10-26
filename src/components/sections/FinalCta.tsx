import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-brown-deep py-20 text-center sm:py-28">
      <Container className="flex flex-col items-center gap-6">
        <h2
          id="final-cta-heading"
          className="text-off-white max-w-xl font-serif text-3xl text-balance sm:text-4xl"
        >
          Seu momento de cuidar de você começa aqui.
        </h2>
        <LinkButton
          href="#pre-venda"
          variant="primary"
          className="bg-off-white text-brown-deep hover:bg-beige-light"
        >
          Garantir minha vaga
        </LinkButton>
      </Container>
    </section>
  )
}
