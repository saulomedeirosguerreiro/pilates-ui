import { motion, useReducedMotion } from 'motion/react'

type BlobProps = {
  className?: string
  color?: 'sage' | 'brown-medium' | 'beige-light'
  duration?: number
}

const COLOR_CLASSES: Record<NonNullable<BlobProps['color']>, string> = {
  sage: 'bg-sage',
  'brown-medium': 'bg-brown-medium',
  'beige-light': 'bg-beige-light',
}

/**
 * Forma orgânica desfocada que flutua lentamente em loop, usada como
 * elemento decorativo de fundo (baixa opacidade, atrás do conteúdo).
 */
export function Blob({ className = '', color = 'sage', duration = 22 }: BlobProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      animate={
        prefersReducedMotion
          ? undefined
          : {
              x: [0, 24, -16, 0],
              y: [0, -20, 18, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none rounded-full opacity-20 blur-3xl ${COLOR_CLASSES[color]} ${className}`}
    />
  )
}
