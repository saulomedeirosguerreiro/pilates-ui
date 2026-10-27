import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Barra fina fixa no topo indicando o progresso de leitura da página.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-sage fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
    />
  )
}
