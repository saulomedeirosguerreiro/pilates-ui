import { siteConfig, type SiteConfig } from './site.config'

/**
 * Hoje retorna o config estático local. Quando o backend (Fase 2+) existir,
 * esta função passa a buscar os dados via API sem exigir mudanças nos componentes.
 */
export function useSiteConfig(): SiteConfig {
  return siteConfig
}
