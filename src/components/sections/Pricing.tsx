import { pricingPlans } from '../../content/pricing'
import { Blob } from '../motion/Blob'
import { Reveal } from '../motion/Reveal'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Pricing() {
  return (
    <section id="planos" className="bg-brown-deep relative overflow-hidden py-20 sm:py-28">
      <Blob color="beige-light" className="absolute top-1/4 -right-20 h-72 w-72" duration={26} />

      <Container className="relative flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Encontre o plano perfeito"
          title="Escolha um plano que combine com seu estilo de vida, objetivos e ritmo."
          align="center"
          tone="light"
        />

        <div className="grid w-full gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const surface = plan.highlighted
              ? 'bg-off-white text-brown-deep'
              : 'bg-brown-elevated text-off-white'

            return (
              <Reveal
                key={plan.id}
                delay={index * 0.1}
                y={32}
                className={`flex flex-col gap-6 rounded-3xl p-8 shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${surface}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 font-sans text-xs font-medium ${
                      plan.highlighted ? 'bg-brown-deep text-off-white' : 'bg-off-white/10'
                    }`}
                  >
                    {plan.index} {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="bg-brown-deep text-off-white rounded-full px-3 py-1 font-sans text-xs font-medium">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-serif text-4xl">
                    R$ {plan.priceBRL.toLocaleString('pt-BR')}
                    <span className="font-sans text-base font-normal opacity-70">/mês</span>
                  </p>
                  <p
                    className={`mt-2 font-sans text-sm ${plan.highlighted ? 'text-brown-warm/80' : 'text-off-white/70'}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <LinkButton
                  variant={plan.highlighted ? 'primary' : 'light'}
                  href={`/cadastro?plano=${plan.id}`}
                  className="w-full"
                >
                  Começar
                </LinkButton>

                <div>
                  <p className="mb-3 font-sans text-xs font-medium tracking-wide uppercase opacity-70">
                    O que está incluído:
                  </p>
                  <ul className="flex flex-col gap-2 font-sans text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
