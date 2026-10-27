import { useSiteConfig } from '../../config/useSiteConfig'
import heroImage from '../../assets/images/photos/hero.jpg'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

export function Hero() {
  const { company } = useSiteConfig()

  return (
    <section id="inicio" className="relative flex min-h-screen items-end pb-20">
      <img
        src={heroImage}
        alt="Pessoa praticando pilates em estúdio iluminado"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="from-brown-deep via-brown-deep/50 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="from-brown-deep/80 absolute inset-0 bg-gradient-to-r to-transparent" />

      <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
        <h1 className="text-off-white font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
          {company.name}
        </h1>

        <div className="flex flex-col gap-6">
          <p className="text-off-white/80 max-w-md font-sans text-base text-pretty sm:text-lg">
            Movimente-se com controle, ganhe força e encontre equilíbrio. Cada sessão é pensada para apoiar
            seu corpo e o seu bem-estar.
          </p>

          <div className="flex flex-wrap gap-4">
            <LinkButton variant="outlineLight" href="#planos">
              Agendar Aula
            </LinkButton>
            <LinkButton variant="light" href="#planos">
              Começar Agora ↗
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
