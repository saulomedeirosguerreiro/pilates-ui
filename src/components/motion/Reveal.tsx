import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { DURATION, EASE, VIEWPORT_ONCE } from './constants'

type RevealTag = 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'ul'

const TAGS: Record<RevealTag, (typeof motion)[RevealTag]> = {
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
}

type RevealProps = {
  children: ReactNode
  as?: RevealTag
  className?: string
  delay?: number
  y?: number
  duration?: number
}

/**
 * Fade + leve deslocamento vertical ao entrar na tela. Bloco base reutilizado
 * por praticamente todas as entradas de conteúdo (textos, cards, blocos).
 */
export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 24,
  duration = DURATION.base,
}: RevealProps) {
  const MotionTag = TAGS[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}
