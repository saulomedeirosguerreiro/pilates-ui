export type ServiceContent = {
  name: string
  description: string
  bullets: string[]
  note: string | null
}

export const servicesContent: ServiceContent[] = [
  {
    name: 'Pilates',
    description: 'Movimento consciente, trabalho de força, mobilidade e controle corporal.',
    bullets: [
      'Movimento consciente.',
      'Trabalho de força, mobilidade e controle corporal.',
      'Acompanhamento conforme as características e necessidades de cada aluno.',
    ],
    note: null,
  },
  {
    name: 'Massoterapia',
    description: 'Momentos de relaxamento e cuidado corporal, com foco em conforto e bem-estar.',
    bullets: ['Momentos de relaxamento e cuidado corporal.', 'Atendimento com foco em conforto e bem-estar.'],
    note: 'Modalidades e duração a serem configuradas posteriormente.',
  },
]
