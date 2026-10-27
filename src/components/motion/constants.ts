/**
 * Curva e durações padrão da camada de animação — mantém o movimento
 * consistente (calmo, fluido) em todos os componentes de motion.
 */
export const EASE = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.6,
  base: 0.8,
  slow: 1.2,
}

export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const
