import { Eye, EyeOff } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

const inputClasses =
  'w-full rounded-xl border border-brown-deep/15 bg-off-white px-4 py-3 pr-11 font-sans text-sm text-brown-deep placeholder:text-brown-warm/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-medium'

type PasswordFieldProps = { label: string } & Omit<ComponentProps<'input'>, 'type'>

/**
 * Campo de senha com botão para mostrar/ocultar o valor digitado.
 */
export function PasswordField({ label, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <label className="text-brown-deep flex flex-col gap-2 font-sans text-sm">
      <span className="font-medium">{label}</span>
      <div className="relative">
        <input className={inputClasses} type={visible ? 'text' : 'password'} {...props} />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          className="text-brown-warm/60 hover:text-brown-deep absolute inset-y-0 right-0 flex w-11 items-center justify-center transition-colors motion-reduce:transition-none"
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Eye aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  )
}
