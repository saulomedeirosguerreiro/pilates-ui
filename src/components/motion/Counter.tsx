import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE } from './constants'

type CounterProps = {
  to: number
  className?: string
  prefix?: string
  suffix?: string
}

/**
 * Conta de 0 até o valor final ao entrar na tela, com desaceleração no
 * final (easing padrão do site).
 */
export function Counter({ to, className, prefix = '', suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(prefersReducedMotion ? to : 0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, prefersReducedMotion, to])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
