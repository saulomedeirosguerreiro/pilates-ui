import '@testing-library/jest-dom/vitest'

// jsdom não implementa matchMedia — usado pelos hooks de reduced-motion /
// detecção de ponteiro coarse da camada de animação.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// jsdom também não implementa IntersectionObserver/ResizeObserver — usados
// pelas animações de entrada (whileInView, useInView) e pelo SplitLines.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined') {
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver
  }
  if (!window.ResizeObserver) {
    window.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver
  }
}
