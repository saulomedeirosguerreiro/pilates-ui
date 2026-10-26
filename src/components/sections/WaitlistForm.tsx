import { useId, useState } from 'react'
import { Button } from '../ui/Button'

/**
 * UI apenas, sem submissão real: a integração com o backend (validação,
 * anti-duplicidade, armazenamento) chega na Fase 4.
 */
export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const nameId = useId()
  const emailId = useId()

  if (submitted) {
    return (
      <p role="status" className="text-brown-deep font-sans text-sm">
        Obrigado! Assim que houver novas vagas, entraremos em contato por e-mail.
      </p>
    )
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={nameId} className="text-brown-deep font-sans text-xs font-medium">
          Nome
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          className="rounded-editorial border-brown-medium/30 bg-off-white text-brown-deep focus-visible:ring-brown-medium border px-3 py-2 font-sans text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={emailId} className="text-brown-deep font-sans text-xs font-medium">
          E-mail
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          className="rounded-editorial border-brown-medium/30 bg-off-white text-brown-deep focus-visible:ring-brown-medium border px-3 py-2 font-sans text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Entrar na lista de espera
      </Button>
    </form>
  )
}
