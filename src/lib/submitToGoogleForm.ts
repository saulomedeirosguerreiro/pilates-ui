import {
  GOOGLE_FORM_ACTION_URL,
  GOOGLE_FORM_ENTRY_IDS,
  GOOGLE_FORM_PLAN_LABELS,
} from '../config/googleForm.config'

export type PreLaunchLead = {
  nome: string
  email: string
  telefone: string
  bairro: string
  faixaEtaria: string
  plano: string
}

/**
 * Envia para o Google Forms via POST em modo "no-cors": o Google não permite
 * ler a resposta de fora do domínio dele, então a resposta vem opaca e o
 * sucesso é assumido assim que o fetch resolve (sem lançar erro de rede).
 */
export async function submitToGoogleForm(lead: PreLaunchLead): Promise<void> {
  const body = new URLSearchParams({
    [GOOGLE_FORM_ENTRY_IDS.nome]: lead.nome,
    [GOOGLE_FORM_ENTRY_IDS.email]: lead.email,
    [GOOGLE_FORM_ENTRY_IDS.telefone]: lead.telefone,
    [GOOGLE_FORM_ENTRY_IDS.bairro]: lead.bairro,
    [GOOGLE_FORM_ENTRY_IDS.faixaEtaria]: lead.faixaEtaria,
    [GOOGLE_FORM_ENTRY_IDS.plano]: GOOGLE_FORM_PLAN_LABELS[lead.plano] ?? lead.plano,
  })

  await fetch(GOOGLE_FORM_ACTION_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}
