import { motion, useReducedMotion } from 'motion/react'

/**
 * Indicador de scroll com movimento suave e contínuo, usado no rodapé do Hero.
 */
export function ScrollIndicator({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className={`flex flex-col items-center gap-2 ${className}`}>
      <span className="text-off-white/60 font-sans text-xs tracking-[0.2em] uppercase">Role</span>
      <motion.span
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-off-white/70 text-lg"
      >
        ↓
      </motion.span>
    </div>
  )
}
