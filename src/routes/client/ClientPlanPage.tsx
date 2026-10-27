import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import { Badge, Card, TitleRule } from '../../components/client/ui'
import { Container } from '../../components/ui/Container'
import { pricingPlans } from '../../content/pricing'
import { formatLongDate } from '../../lib/date'
import { api, type Invoice, type Subscription } from '../../lib/api'

export function ClientPlanPage() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    if (!user) return
    api.getSubscription(user.id).then(setSubscription)
    api.getInvoices(user.id).then(setInvoices)
  }, [user])

  if (!user) return null

  const currentPlan = subscription ? pricingPlans.find((plan) => plan.id === subscription.planId) : null

  return (
    <Container className="flex flex-col gap-6 py-12">
      <div>
        <span className="text-sage font-sans text-sm font-semibold tracking-[0.18em] uppercase">Assinatura</span>
        <h1 className="font-serif text-3xl">Meu Plano</h1>
        <TitleRule />
      </div>

      {currentPlan && subscription && (
        <Card>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {currentPlan.badge && <Badge>{currentPlan.badge}</Badge>}
            <span className="text-brown-warm/70 font-sans text-sm">
              Assinante desde {formatLongDate(user.memberSince)}
            </span>
          </div>
          <div className="flex flex-wrap gap-10">
            <div className="min-w-[260px] flex-1">
              <h2 className="font-serif text-2xl">{currentPlan.name}</h2>
              <p className="font-serif text-4xl">
                R$ {currentPlan.priceBRL.toLocaleString('pt-BR')}
                <span className="text-brown-warm/60 font-sans text-sm"> /mês</span>
              </p>
              <ul className="mt-4 flex flex-col gap-2 font-sans text-sm">
                {currentPlan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check aria-hidden="true" className="text-brown-medium mt-0.5 h-4 w-4 flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-brown-deep/10 flex min-w-[220px] flex-1 flex-col gap-1.5 border-l pl-10">
              <p className="text-brown-warm/70 font-sans text-sm">Próxima cobrança</p>
              <p className="font-sans text-base font-semibold">{formatLongDate(subscription.nextBillingDate)}</p>
              <p className="text-brown-warm/70 mt-2.5 font-sans text-sm">Forma de pagamento</p>
              <p className="font-sans text-base">{subscription.paymentMethodLabel}</p>
              <button
                type="button"
                className="border-brown-deep text-brown-deep hover:bg-brown-deep hover:text-off-white mt-2.5 rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
              >
                Atualizar forma de pagamento
              </button>
              <button type="button" className="text-brown-warm/60 hover:text-brown-deep mt-1 self-start font-sans text-sm">
                Cancelar assinatura
              </button>
            </div>
          </div>
        </Card>
      )}

      <h3 className="mt-6 font-serif text-xl">Outros planos disponíveis</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const isCurrent = plan.id === subscription?.planId
          const isUpgrade = currentPlan ? plan.priceBRL > currentPlan.priceBRL : false
          const isDowngrade = currentPlan ? plan.priceBRL < currentPlan.priceBRL : false

          return (
            <Card key={plan.id} className={isCurrent ? 'bg-beige-light' : ''}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="bg-brown-deep text-off-white flex h-7 w-7 items-center justify-center rounded-full font-sans text-xs font-semibold">
                  {plan.index}
                </span>
                {plan.badge && <Badge>{plan.badge}</Badge>}
              </div>
              <h4 className="font-serif text-lg">{plan.name}</h4>
              <p className="font-serif text-2xl">
                R$ {plan.priceBRL.toLocaleString('pt-BR')}
                <span className="text-brown-warm/60 font-sans text-sm"> /mês</span>
              </p>
              <ul className="my-4 flex flex-col gap-1.5 font-sans text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check aria-hidden="true" className="text-brown-medium mt-0.5 h-4 w-4 flex-none" />
                    {feature}
                  </li>
                ))}
              </ul>
              {isCurrent && (
                <button type="button" disabled className="bg-brown-deep/6 text-brown-deep w-full rounded-full px-5 py-2.5 font-sans text-sm font-medium opacity-60">
                  Seu plano atual
                </button>
              )}
              {!isCurrent && isUpgrade && (
                <button type="button" className="bg-brown-deep text-off-white hover:bg-brown-warm w-full rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none">
                  Fazer upgrade
                </button>
              )}
              {!isCurrent && isDowngrade && (
                <button type="button" className="border-brown-deep text-brown-deep hover:bg-brown-deep hover:text-off-white w-full rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none">
                  Fazer downgrade
                </button>
              )}
            </Card>
          )
        })}
      </div>

      <h3 className="mt-6 font-serif text-xl">Histórico de pagamentos</h3>
      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-brown-deep/10 border-b text-xs tracking-wide text-brown-warm/70 uppercase">
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Valor</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const plan = pricingPlans.find((candidate) => candidate.id === invoice.planId)
              return (
                <tr key={invoice.id} className="border-brown-deep/6 border-b">
                  <td className="px-4 py-3.5">{formatLongDate(invoice.date)}</td>
                  <td className="px-4 py-3.5">{plan?.name ?? invoice.planId}</td>
                  <td className="px-4 py-3.5">R$ {invoice.amount.toLocaleString('pt-BR')},00</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-beige-light text-brown-deep rounded-full px-3 py-1 text-xs font-semibold">
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Container>
  )
}
