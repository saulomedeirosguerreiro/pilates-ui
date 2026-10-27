export type ClassCategory = 'essencial' | 'individual' | 'grupo' | 'precisao'

export const classCategories: { value: ClassCategory; label: string }[] = [
  { value: 'essencial', label: 'Essencial' },
  { value: 'individual', label: 'Individual' },
  { value: 'grupo', label: 'Em Grupo' },
  { value: 'precisao', label: 'Precisão' },
]

export type ClassItem = {
  index: string
  category: ClassCategory
  categoryLabel: string
  title: string
  description: string
  imageAlt: string
}

export const classesContent: ClassItem[] = [
  {
    index: '01',
    category: 'essencial',
    categoryLabel: 'Essencial',
    title: 'Aulas de Fundamentos',
    description: 'Desenvolva força, flexibilidade e controle através das práticas essenciais do pilates.',
    imageAlt: 'Mulher praticando pilates de solo em estúdio iluminado',
  },
  {
    index: '02',
    category: 'individual',
    categoryLabel: 'Individual',
    title: 'Aulas Individuais',
    description: 'Orientação um a um, adaptada ao seu corpo e aos seus objetivos pessoais.',
    imageAlt: 'Instrutor orientando aluna em sessão individual de pilates',
  },
  {
    index: '03',
    category: 'grupo',
    categoryLabel: 'Em Grupo',
    title: 'Aulas em Grupo',
    description: 'Movimente-se junto com pequenos grupos em sessões guiadas e colaborativas.',
    imageAlt: 'Grupo praticando pilates junto em estúdio',
  },
  {
    index: '04',
    category: 'precisao',
    categoryLabel: 'Precisão',
    title: 'Pilates com Reformer',
    description: 'Ganhe força e flexibilidade com treinos controlados em aparelhos de reformer.',
    imageAlt: 'Pessoa usando aparelho reformer de pilates',
  },
]
