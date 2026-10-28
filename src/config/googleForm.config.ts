export const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdHYy1UPhQPgfTvxtYfKSiQUY0i9J1xGSQ6USX8AnjqWW3kXw/formResponse'

export const GOOGLE_FORM_ENTRY_IDS = {
  nome: 'entry.698979660',
  email: 'entry.173651352',
  telefone: 'entry.1344579910',
  bairro: 'entry.1461977303',
  faixaEtaria: 'entry.691510057',
  plano: 'entry.1410582685',
}

/**
 * O campo "plano" no Google Forms é de múltipla escolha: o valor enviado
 * precisa bater exatamente com o texto de uma das opções cadastradas lá,
 * não com o id interno do plano (ex.: "equilibrio").
 */
export const GOOGLE_FORM_PLAN_LABELS: Record<string, string> = {
  equilibrio: 'Equilíbrio',
  'pilates-massoterapia': 'Pilates + Massoterapia',
  premium: 'Premium',
}

/** Mesmas opções e mesma grafia (incluindo o travessão "–") cadastradas no Google Forms. */
export const AGE_RANGE_OPTIONS = [
  'Menos de 18 anos',
  '18–30 anos',
  '31–45 anos',
  '46–60 anos',
  'Acima de 60 anos',
  'Prefiro não informar',
] as const
