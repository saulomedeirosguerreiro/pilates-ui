import { Calendar } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'react-day-picker/locale/pt-BR'

type DatePickerFieldProps = {
  label: string
  name: string
  optional?: boolean
  error?: string | null
}

const dayPickerClassNames = {
  root: 'font-sans',
  month_caption: 'flex items-center justify-center mb-3 px-8',
  nav: 'flex items-center justify-between absolute inset-x-0 top-0 px-1',
  button_previous:
    'flex h-8 w-8 items-center justify-center rounded-full text-brown-deep hover:bg-beige-light transition-colors motion-reduce:transition-none disabled:opacity-30',
  button_next:
    'flex h-8 w-8 items-center justify-center rounded-full text-brown-deep hover:bg-beige-light transition-colors motion-reduce:transition-none disabled:opacity-30',
  chevron: 'h-4 w-4 fill-current',
  dropdowns: 'flex items-center gap-2',
  dropdown_root: 'relative inline-flex items-center',
  dropdown: 'absolute inset-0 cursor-pointer opacity-0',
  caption_label:
    'pointer-events-none flex items-center gap-1 rounded-lg border border-brown-deep/15 bg-off-white px-3 py-1.5 font-sans text-sm font-medium text-brown-deep',
  month_grid: 'w-full border-collapse',
  weekdays: '',
  weekday: 'text-brown-warm/50 pb-2 text-center font-sans text-xs font-medium uppercase',
  week: '',
  day: 'p-0.5 text-center align-middle',
  day_button:
    'mx-auto flex h-9 w-9 items-center justify-center rounded-full font-sans text-sm text-brown-deep transition-colors hover:bg-beige-light motion-reduce:transition-none',
  selected: '[&>button]:bg-brown-deep [&>button]:text-off-white [&>button]:hover:bg-brown-deep',
  today: '[&>button]:font-semibold [&>button]:text-sage',
  outside: '[&>button]:text-brown-warm/30 [&>button]:hover:bg-transparent',
  disabled: '[&>button]:text-brown-warm/20 [&>button]:hover:bg-transparent',
}

/**
 * Campo de data com calendário (react-day-picker) em vez do seletor nativo do
 * navegador — usado na data de nascimento do cadastro. Guarda o valor num
 * input escondido (formato ISO) para continuar saindo no FormData do form.
 */
export function DatePickerField({ label, name, optional, error }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  const displayValue = selected ? selected.toLocaleDateString('pt-BR') : ''
  const isoValue = selected
    ? `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`
    : ''

  return (
    <div ref={containerRef} className="text-brown-deep relative flex flex-col gap-2 font-sans text-sm">
      <span className="font-medium">
        {label} {optional && <span className="text-brown-warm/50 font-normal">(opcional)</span>}
      </span>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`bg-off-white focus-visible:ring-brown-medium text-brown-deep flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left font-sans text-sm focus-visible:ring-2 focus-visible:outline-none ${
          error ? 'border-red-400' : 'border-brown-deep/15'
        }`}
      >
        <span className={displayValue ? '' : 'text-brown-warm/40'}>{displayValue || 'dd/mm/aaaa'}</span>
        <Calendar aria-hidden="true" className="text-brown-warm/60 h-4 w-4" />
      </button>

      {error && <p className="font-sans text-sm text-red-700">{error}</p>}

      <input type="hidden" name={name} value={isoValue} />

      {open && (
        <div className="border-brown-deep/10 bg-off-white absolute top-full left-0 z-20 mt-2 rounded-2xl border p-3 shadow-lg">
          <DayPicker
            mode="single"
            locale={ptBR}
            captionLayout="dropdown"
            endMonth={new Date()}
            selected={selected}
            onSelect={(date) => {
              setSelected(date)
              setOpen(false)
            }}
            classNames={dayPickerClassNames}
          />
        </div>
      )}
    </div>
  )
}
