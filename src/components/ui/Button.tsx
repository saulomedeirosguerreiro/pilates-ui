import type { ComponentProps } from 'react'
import { motion } from 'motion/react'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-medium tracking-wide transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brown-medium'

const variantClasses = {
  primary: 'bg-brown-deep text-off-white hover:bg-brown-warm',
  secondary:
    'bg-transparent text-brown-deep border border-brown-deep hover:bg-brown-deep hover:text-off-white',
  light: 'bg-off-white text-brown-deep hover:bg-beige-light',
  outlineLight:
    'bg-transparent text-off-white border border-off-white/40 hover:border-off-white hover:bg-off-white/10',
}

type Variant = keyof typeof variantClasses

const TAP_TRANSITION = { duration: 0.15, ease: [0.22, 1, 0.36, 1] } as const

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<typeof motion.button> & { variant?: Variant }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={TAP_TRANSITION}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export function LinkButton({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<typeof motion.a> & { variant?: Variant }) {
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      transition={TAP_TRANSITION}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
