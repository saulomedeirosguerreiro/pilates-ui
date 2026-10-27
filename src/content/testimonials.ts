/**
 * Depoimentos de exemplo — substituir por avaliações reais de clientes antes do lançamento.
 */
export type Testimonial = {
  name: string
  timeframe: string
  quote: string
}

export const testimonialsContent: Testimonial[] = [
  {
    name: 'Fernanda',
    timeframe: '4 semanas',
    quote:
      'O pilates mudou completamente a forma como eu me movimento e cuido do meu corpo. Não é só sobre exercício, é sobre força e controle. Sinto mais confiança a cada sessão.',
  },
  {
    name: 'Juliana',
    timeframe: '2 meses',
    quote:
      'Depois de algumas semanas, já senti uma diferença real na força do meu corpo. O acompanhamento é próximo e o ambiente é calmo, sem pressa.',
  },
  {
    name: 'Rodrigo',
    timeframe: '3 meses',
    quote:
      'Sinto-me mais forte, com mais postura e mais disposição no dia a dia. Os instrutores realmente prestam atenção em cada detalhe do movimento.',
  },
]

export const testimonialsSummary = {
  reviewCount: 500,
  label: 'clientes satisfeitos',
  basedOnLabel: 'Baseado em +500 avaliações',
}
