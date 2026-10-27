import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { EASE } from './constants'

type SplitLinesProps = {
  text: string
  className?: string
}

/**
 * Mede como o texto efetivamente quebra em linhas (responsivo) e revela
 * cada linha de baixo para cima com máscara (overflow hidden + y 100%→0%).
 * Usado nos títulos de seção (dentro de SectionHeading).
 *
 * A detecção de "entrou na tela" usa `useInView` no wrapper externo (sem
 * overflow hidden nem transform) em vez de `whileInView` direto em cada
 * linha: uma linha que começa traduzida 100% para fora do seu container
 * com overflow hidden fica com área visível zero, e o IntersectionObserver
 * corta essa área através dos ancestrais com overflow — a animação nunca
 * dispararia. Medindo pelo wrapper plano, o problema não existe.
 */
export function SplitLines({ text, className }: SplitLinesProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(wrapperRef, { once: true, amount: 0.3 })
  const words = text.split(' ')

  useLayoutEffect(() => {
    const container = measureRef.current
    if (!container) return

    function measure() {
      const wordEls = Array.from(container!.querySelectorAll<HTMLSpanElement>('[data-word]'))
      const groups: string[][] = []
      let lastTop: number | null = null

      wordEls.forEach((el) => {
        const top = el.offsetTop
        if (lastTop === null || Math.abs(top - lastTop) > 4) {
          groups.push([])
          lastTop = top
        }
        groups[groups.length - 1].push(el.textContent ?? '')
      })

      setLines(groups.map((group) => group.join(' ')))
    }

    measure()

    const observer = new ResizeObserver(() => measure())
    observer.observe(container)
    return () => observer.disconnect()
  }, [text])

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={wrapperRef} className={`relative block ${className ?? ''}`}>
      {/* Versão de medição: invisível, mesma largura/fonte, nunca interativa. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={lines ? 'invisible absolute inset-x-0' : 'invisible block'}
      >
        {words.map((word, index) => (
          <span key={index} data-word>
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>

      {/* Versão animada: só aparece depois que as linhas forem medidas. */}
      {lines && (
        <span className="block">
          {lines.map((line, index) => (
            <span key={index} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </span>
  )
}
