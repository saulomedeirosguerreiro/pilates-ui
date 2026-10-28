import { PreLaunchChrome } from '../components/layout/PreLaunchChrome'
import { Reveal } from '../components/motion/Reveal'
import { LinkButton } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  return (
    <PreLaunchChrome>
      <section className="bg-off-white flex min-h-[70vh] items-center pt-32 pb-24 sm:pt-40">
        <Container className="mx-auto max-w-xl text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">
              Erro 404
            </span>
            <h1 className="text-brown-deep font-serif text-3xl sm:text-4xl">Página não encontrada.</h1>
            <p className="text-brown-warm/80 font-sans text-base text-pretty">
              O link que você acessou não existe ou foi movido.
            </p>
            <LinkButton variant="primary" href="/" className="mt-4">
              Voltar para o início
            </LinkButton>
          </Reveal>
        </Container>
      </section>
    </PreLaunchChrome>
  )
}
