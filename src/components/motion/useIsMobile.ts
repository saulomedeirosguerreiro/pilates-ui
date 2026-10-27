import { useEffect, useState } from 'react'

/**
 * Detecta ponteiro "coarse" (touch) — usado para reduzir/desligar efeitos
 * pensados para mouse (parallax intenso, magnetismo, cursor customizado).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)')
    const handleChange = () => setIsMobile(query.matches)

    handleChange()
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}
