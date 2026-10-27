const MONTHS_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const MONTHS_LONG = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]
const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const WEEKDAYS_LONG = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

/** Data de referência do protótipo — os dados seed (db.json) giram em torno dela, não da data real. */
export const DEMO_TODAY = '2026-10-27'

/** Datas no banco são "YYYY-MM-DD" — parse manual evita o fuso UTC de `new Date(string)`. */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(dateStr: string, delta: number): string {
  const date = parseLocalDate(dateStr)
  date.setDate(date.getDate() + delta)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDayMonth(dateStr: string) {
  const date = parseLocalDate(dateStr)
  return { day: String(date.getDate()).padStart(2, '0'), month: MONTHS_SHORT[date.getMonth()] }
}

export function formatShortDate(dateStr: string) {
  const date = parseLocalDate(dateStr)
  return `${WEEKDAYS_SHORT[date.getDay()]} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function formatWeekdayLong(dateStr: string) {
  return WEEKDAYS_LONG[parseLocalDate(dateStr).getDay()]
}

export function formatLongDate(dateStr: string) {
  const date = parseLocalDate(dateStr)
  return `${date.getDate()} de ${MONTHS_LONG[date.getMonth()]} de ${date.getFullYear()}`
}
