export type FaqItem = {
  question: string
  answer: string
}

const TBD = 'Informação a ser definida e publicada antes da abertura das vendas reais.'

export const faqContent: FaqItem[] = [
  {
    question: 'Como funciona a pré-venda?',
    answer:
      'Durante a pré-venda, um número limitado de vagas é disponibilizado com a mensalidade e a garantia de preço descritas nesta página. Ao preencher as vagas, novas inscrições entram automaticamente em uma lista de espera gratuita.',
  },
  {
    question: 'Quanto custa a mensalidade?',
    answer:
      'A mensalidade da pré-venda é de R$ 300, cobrada mensalmente de forma recorrente — não é um pagamento antecipado de 12 mensalidades.',
  },
  {
    question: 'Por quanto tempo o preço de R$ 300 fica garantido?',
    answer: 'O valor de R$ 300 fica garantido por 12 meses, conforme as condições comerciais desta oferta.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'O pagamento é processado por um provedor de pagamentos seguro, com cobrança mensal recorrente. A confirmação da assinatura só acontece após o pagamento ser efetivamente processado.',
  },
  {
    question: 'Quando o estúdio começará a atender?',
    answer: TBD,
  },
  {
    question: 'Como funcionam o cancelamento e os reembolsos?',
    answer: TBD,
  },
  {
    question: 'O que acontece quando as 50 vagas forem preenchidas?',
    answer:
      'As compras da oferta são bloqueadas automaticamente e a seção de contratação é substituída por um formulário de inscrição gratuita na lista de espera.',
  },
  {
    question: 'Como funciona a lista de espera?',
    answer:
      'A inscrição na lista de espera é gratuita, não exige cartão de crédito e não cria nenhuma assinatura. Quando houver novas vagas, os inscritos poderão ser convidados a contratar voluntariamente.',
  },
]
