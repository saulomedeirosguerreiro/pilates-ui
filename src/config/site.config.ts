export type CampaignStatus = 'draft' | 'open' | 'paused' | 'closed'

export type SiteConfig = {
  company: {
    name: string
    cnpj: string | null
    address: string | null
    phone: string | null
    email: string | null
  }
  campaign: {
    status: CampaignStatus
    openingDateLabel: string | null
    pricePerMonthBRL: number
    priceLockMonths: number
    seatLimit: number
    seatsTaken: number
  }
  links: {
    terms: string | null
    privacyPolicy: string | null
  }
  social: {
    instagram: string | null
    facebook: string | null
    whatsapp: string | null
  }
}

/**
 * Fonte única de verdade para conteúdo comercial/institucional.
 * Campos `null` renderizam "a definir" na UI — nunca inventar valores aqui.
 * Em fases futuras este objeto é substituído por uma chamada à API (ver useSiteConfig.ts).
 */
export const siteConfig: SiteConfig = {
  company: {
    name: 'Pilates Studio',
    cnpj: null,
    address: 'Em breve em Fortaleza, Ceará.',
    phone: null,
    email: null,
  },
  campaign: {
    status: 'draft',
    openingDateLabel: null,
    pricePerMonthBRL: 300,
    priceLockMonths: 12,
    seatLimit: 50,
    seatsTaken: 0,
  },
  links: {
    terms: '/termos',
    privacyPolicy: '/privacidade',
  },
  social: {
    instagram: null,
    facebook: null,
    whatsapp: null,
  },
}
