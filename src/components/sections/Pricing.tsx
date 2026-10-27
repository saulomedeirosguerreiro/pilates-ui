import { useState } from 'react'
import { billingPeriods, pricingPlans, type BillingPeriod } from '../../content/pricing'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Tabs } from '../ui/Tabs'

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>('mensal')

  return (
    <section id="planos" className="bg-brown-deep py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Encontre o plano perfeito"
          title="Escolha um plano que combine com seu estilo de vida, objetivos e ritmo."
          align="center"
          tone="light"
        />

        <Tabs
          aria-label="Periodicidade do plano"
          options={billingPeriods}
          value={period}
          onChange={setPeriod}
        />

        <div className="grid w-full gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const surface = plan.highlighted
              ? 'bg-off-white text-brown-deep'
              : 'bg-brown-elevated text-off-white'

            return (
              <div key={plan.id} className={`flex flex-col gap-6 rounded-3xl p-8 ${surface}`}>
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
                    R$ {plan.priceBRL[period].toLocaleString('pt-BR')}
                    <span className="font-sans text-base font-normal opacity-70">
                      /{period === 'mensal' ? 'mês' : 'ano'}
                    </span>
                  </p>
                  <p
                    className={`mt-2 font-sans text-sm ${plan.highlighted ? 'text-brown-warm/80' : 'text-off-white/70'}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <LinkButton variant={plan.highlighted ? 'primary' : 'light'} href="#" className="w-full">
                  Começar →
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
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
