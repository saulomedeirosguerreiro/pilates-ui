import type { ComponentProps, PropsWithChildren } from 'react'
import { Link } from 'react-router'

export function Card({ children, className = '', ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={`border-brown-deep/8 bg-off-white rounded-3xl border p-7 shadow-[0_1px_3px_rgba(34,25,14,0.06)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function HoverCard({ children, className = '', ...rest }: ComponentProps<'div'>) {
  return (
    <Card
      className={`transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(34,25,14,0.12)] ${className}`}
      {...rest}
    >
      {children}
    </Card>
  )
}

export function IndexChip({ children }: PropsWithChildren) {
  return (
    <span className="bg-brown-deep text-off-white flex h-7 w-7 flex-none items-center justify-center rounded-full font-sans text-xs font-semibold">
      {children}
    </span>
  )
}

export function Badge({ children, tone = 'accent' }: PropsWithChildren<{ tone?: 'accent' | 'sage' }>) {
  const toneClasses = tone === 'sage' ? 'bg-sage text-off-white' : 'bg-beige-light text-brown-deep'

  return (
    <span className={`inline-flex rounded-full px-3 py-1 font-sans text-xs font-semibold ${toneClasses}`}>
      {children}
    </span>
  )
}

export function TitleRule() {
  return <div className="bg-brown-medium my-4 h-[3px] w-12 rounded-full" />
}

export function ActionLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`text-brown-warm hover:text-brown-deep font-sans text-sm font-medium hover:underline ${props.className ?? ''}`}
    />
  )
}

export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-[72px] w-[72px] text-xl',
  }[size]

  return (
    <div
      className={`bg-beige-light text-brown-deep flex flex-none items-center justify-center rounded-full font-serif font-semibold ${sizeClasses}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[26px] w-11 flex-none rounded-full transition-colors motion-reduce:transition-none ${
        checked ? 'bg-brown-deep' : 'bg-brown-deep/15'
      }`}
    >
      <span
        className={`bg-off-white absolute top-[3px] h-5 w-5 rounded-full transition-transform motion-reduce:transition-none ${
          checked ? 'translate-x-[21px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}
