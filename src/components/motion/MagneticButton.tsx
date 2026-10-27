import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useIsMobile } from './useIsMobile'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Envolve um botão/link e faz com que ele siga levemente o cursor quando
 * o mouse se aproxima. Desligado em touch (ponteiro coarse) e quando
 * `prefers-reduced-motion` está ativo.
 */
export function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  const isDisabled = prefersReducedMotion || isMobile

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isDisabled || !ref.current) return

    const bounds = ref.current.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength)
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={isDisabled ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
