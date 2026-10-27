import type { ElementType } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from './constants'

type BlurTextProps = {
  text: string
  as?: ElementType
  className?: string
  splitBy?: 'word' | 'letter'
  stagger?: number
  delay?: number
  /** Dispara ao entrar na viewport (padrão) ou imediatamente ao montar (hero). */
  trigger?: 'inView' | 'mount'
}

/**
 * Revela um texto unidade por unidade (palavra ou letra) com blur + fade +
 * leve subida. Usado no título do Hero (palavra a palavra) e no nome da
 * marca no rodapé (letra a letra).
 *
 * Cada palavra fica num wrapper `inline-block` próprio (ainda que dividida
 * em letras) para que o navegador só quebre linha entre palavras, nunca no
 * meio de uma — a divisão em letras não deve afetar o wrap do texto.
 */
export function BlurText({
  text,
  as: Tag = 'span',
  className,
  splitBy = 'word',
  stagger = 0.08,
  delay = 0,
  trigger = 'inView',
}: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const viewportProps =
    trigger === 'inView' ? { whileInView: 'visible', viewport: { once: true, amount: 0.6 } } : {}
  const animateProps = trigger === 'mount' ? { animate: 'visible' } : {}

  const variants = {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        {...viewportProps}
        {...animateProps}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.flatMap((word, wordIndex) => {
          const wordEl = (
            <span key={`word-${wordIndex}`} className="inline-block">
              {(splitBy === 'letter' ? word.split('') : [word]).map((unit, unitIndex) => (
                <motion.span
                  key={unitIndex}
                  variants={variants}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="inline-block will-change-transform"
                >
                  {unit}
                </motion.span>
              ))}
            </span>
          )

          return wordIndex < words.length - 1 ? [wordEl, ' '] : [wordEl]
        })}
      </motion.span>
    </Tag>
  )
}
