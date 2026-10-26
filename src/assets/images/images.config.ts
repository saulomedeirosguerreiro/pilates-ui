/**
 * Mapa central de imagens do site. Hoje aponta para placeholders editoriais
 * (ver ui/PlaceholderImage.tsx); quando houver fotografia definitiva do
 * estúdio, basta trocar a entrada correspondente por um import de arquivo real.
 */
export type ImageKey = 'hero' | 'studio' | 'pilates' | 'massotherapy'

export const imagesConfig: Record<ImageKey, { label: string; tone: 'deep' | 'warm' | 'medium' | 'sage' }> = {
  hero: { label: 'Prática de Pilates em estúdio', tone: 'deep' },
  studio: { label: 'Ambiente do Pilates Studio', tone: 'warm' },
  pilates: { label: 'Aparelho de Pilates', tone: 'medium' },
  massotherapy: { label: 'Ambiente de massoterapia', tone: 'sage' },
}
