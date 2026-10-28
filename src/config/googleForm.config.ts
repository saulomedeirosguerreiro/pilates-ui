/**
 * Preencher com os dados reais do Google Form antes de publicar em produção.
 *
 * Como obter:
 * 1. Crie um Google Form com 5 perguntas, nessa ordem: Nome, E-mail, Telefone,
 *    Bairro, Plano de interesse.
 * 2. Pegue a URL de envio: na URL do formulário publicado, troque o final
 *    "/viewform" por "/formResponse".
 * 3. Para cada pergunta, gere um link pré-preenchido (⋮ → "Obter link para
 *    pré-preencher") e procure o parâmetro "entry.XXXXXXXXX" correspondente
 *    a cada campo na URL gerada.
 */
export const GOOGLE_FORM_ACTION_URL = 'SUBSTITUIR_PELA_URL_DO_FORMULARIO/formResponse'

export const GOOGLE_FORM_ENTRY_IDS: Record<'nome' | 'email' | 'telefone' | 'bairro' | 'plano', string> = {
  nome: 'entry.SUBSTITUIR',
  email: 'entry.SUBSTITUIR',
  telefone: 'entry.SUBSTITUIR',
  bairro: 'entry.SUBSTITUIR',
  plano: 'entry.SUBSTITUIR',
}
