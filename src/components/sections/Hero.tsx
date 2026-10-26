import { useSiteConfig } from '../../config/useSiteConfig'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { PlaceholderImage } from '../ui/PlaceholderImage'

export function Hero() {
  const { campaign } = useSiteConfig()

  return (
    <section id="inicio" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-brown-deep font-serif text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl">
            Sua melhor versão
            <br />
            começa no movimento.
          </h1>

          <p className="text-brown-warm/90 max-w-xl font-sans text-base text-pretty sm:text-lg">
            Um espaço dedicado ao equilíbrio, à força e ao cuidado com o seu corpo. Descubra uma nova forma de
            se movimentar, respeitando seu ritmo e suas necessidades.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <LinkButton variant="primary" href="#pre-venda">
              Quero garantir minha vaga
            </LinkButton>
            <LinkButton variant="secondary" href="#studio">
              Conheça o Studio
            </LinkButton>
          </div>

          <p className="text-brown-warm/70 pt-4 font-sans text-sm">
            Pré-venda: mensalidade de R$ {campaign.pricePerMonthBRL} com preço garantido por{' '}
            {campaign.priceLockMonths} meses, conforme as condições comerciais da oferta.
          </p>
        </div>

        <PlaceholderImage imageKey="hero" className="aspect-[4/5] w-full lg:aspect-[3/4]" />
      </Container>
    </section>
  )
}
