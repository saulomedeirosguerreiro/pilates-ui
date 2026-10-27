export type BillingPeriod = 'mensal' | 'anual'

export const billingPeriods: { value: BillingPeriod; label: string }[] = [
  { value: 'mensal', label: 'Mensal' },
  { value: 'anual', label: 'Anual' },
]

export type PricingPlan = {
  id: string
  index: string
  name: string
  description: string
  priceBRL: Record<BillingPeriod, number>
  highlighted: boolean
  badge: string | null
  features: string[]
}

/**
 * Valores e benefícios de exemplo — não existe hoje uma tabela de 3 planos em
 * site.config.ts (que hoje modela só a oferta de pré-venda). Revisar com o
 * estúdio antes de publicar.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'iniciante',
    index: '01',
    name: 'Iniciante',
    description: 'Uma forma simples de começar sua jornada no pilates.',
    priceBRL: { mensal: 149, anual: 1430 },
    highlighted: false,
    badge: null,
    features: [
      'Acesso às aulas em grupo',
      '2 sessões por semana',
      'Programas para iniciantes',
      'Acesso básico ao estúdio',
    ],
  },
  {
    id: 'equilibrio',
    index: '02',
    name: 'Equilíbrio',
    description: 'Mantenha a consistência com uma rotina flexível e equilibrada.',
    priceBRL: { mensal: 249, anual: 2390 },
    highlighted: true,
    badge: 'Popular',
    features: [
      'Rotina flexível e consistente',
      '1 sessão individual por mês',
      'Acesso a aulas em grupo ilimitadas',
      'Treino com foco em progresso',
    ],
  },
  {
    id: 'premium',
    index: '03',
    name: 'Premium',
    description: 'Uma experiência completa de pilates, alinhada aos seus objetivos.',
    priceBRL: { mensal: 399, anual: 3830 },
    highlighted: false,
    badge: null,
    features: [
      'Aulas em grupo ilimitadas',
      '4 sessões individuais por mês',
      'Acesso completo ao reformer',
      'Acompanhamento personalizado',
    ],
  },
]
