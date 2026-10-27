export type PricingPlan = {
  id: string
  index: string
  name: string
  description: string
  priceBRL: number
  highlighted: boolean
  badge: string | null
  features: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'equilibrio',
    index: '01',
    name: 'Equilíbrio',
    description: 'O equilíbrio ideal para manter a constância e cuidar do seu corpo.',
    priceBRL: 300,
    highlighted: false,
    badge: null,
    features: [
      '2 sessões de Pilates por semana',
      'Aulas em grupo',
      'Rotina consistente de exercícios',
      'Acompanhamento durante as aulas',
    ],
  },
  {
    id: 'pilates-massoterapia',
    index: '02',
    name: 'Pilates + Massoterapia',
    description: 'Combine movimento e relaxamento em uma rotina completa de cuidado e bem-estar.',
    priceBRL: 399,
    highlighted: true,
    badge: 'Popular',
    features: [
      '2 sessões de Pilates por semana',
      'Aulas em grupo',
      '1 sessão de massoterapia por mês',
      'Mais equilíbrio entre corpo e mente',
    ],
  },
  {
    id: 'premium',
    index: '03',
    name: 'Premium',
    description:
      'Uma experiência personalizada de Pilates individual e massoterapia para cuidar de você por completo.',
    priceBRL: 599,
    highlighted: false,
    badge: null,
    features: [
      '2 sessões individuais de Pilates por semana',
      'Atendimento individualizado',
      '2 sessões de massoterapia por mês',
      'Acompanhamento personalizado',
    ],
  },
]
