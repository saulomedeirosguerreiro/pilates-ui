import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

/**
 * Scroll suave de página inteira via Lenis. Fica totalmente fora do fluxo
 * quando `prefers-reduced-motion` está ativo, deixando o scroll nativo do
 * navegador no lugar (sem lerp/inércia extra).
 */
export function SmoothScroll() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return null
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      }}
    />
  )
}
