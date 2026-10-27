import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE } from './constants'
import { useIsMobile } from './useIsMobile'

type RevealImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Desloca a imagem sutilmente durante o scroll (parallax), em % da própria imagem. */
  parallax?: boolean
  /** Zoom lento no hover (grupo), para cards de aula/instrutor. */
  hoverZoom?: boolean
  /** Preto e branco em repouso, colorido no hover (fotos da equipe). */
  grayscale?: boolean
}

/**
 * Container com overflow hidden que revela a imagem com clip-path
 * (inset 100% → 0) + leve zoom (scale 1.2 → 1) ao entrar na tela, e
 * opcionalmente aplica um parallax sutil (~8%) durante o scroll e um
 * zoom lento no hover. Quando `parallax` está ativo, o repouso fica em
 * scale 1.08 (em vez de 1) para manter uma margem de segurança e nunca
 * expor bordas vazias durante o deslocamento.
 *
 * A detecção de "entrou na tela" usa `useInView` no container (sem
 * clip-path) em vez de `whileInView` direto na imagem: um elemento que
 * começa com `clip-path: inset(100% ...)` fica com área visual zero, e
 * alguns navegadores nunca reportam esse alvo como "intersectando" —
 * a animação nunca dispara. Medindo a visibilidade pelo container plano,
 * o problema não existe.
 */
export function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  parallax = false,
  hoverZoom = false,
  grayscale = false,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const parallaxRange = isMobile ? 4 : 8
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallaxRange}%`, `${parallaxRange}%`])
  const restingScale = parallax ? 1.08 : 1
  const restingFilter = grayscale ? 'grayscale(1)' : 'grayscale(0)'

  const hoverTarget: Record<string, string | number> = {}
  if (hoverZoom) hoverTarget.scale = restingScale * 1.05
  if (grayscale) hoverTarget.filter = 'grayscale(0)'

  const shouldReveal = prefersReducedMotion || isInView

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={
          prefersReducedMotion
            ? undefined
            : { clipPath: 'inset(100% 0 0 0)', scale: 1.2, filter: restingFilter }
        }
        animate={
          prefersReducedMotion
            ? undefined
            : shouldReveal
              ? { clipPath: 'inset(0% 0 0 0)', scale: restingScale, filter: restingFilter }
              : undefined
        }
        whileHover={!prefersReducedMotion && Object.keys(hoverTarget).length > 0 ? hoverTarget : undefined}
        transition={{ duration: 1.1, ease: EASE }}
        style={parallax && !prefersReducedMotion ? { y } : undefined}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
