import { ChevronLeft } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { SiteChrome } from '../components/layout/SiteChrome'
import { Reveal } from '../components/motion/Reveal'
import { useAuth } from '../auth/useAuth'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PasswordField } from '../components/ui/PasswordField'
import { SectionHeading } from '../components/ui/SectionHeading'

const inputClasses =
  'w-full rounded-xl border border-brown-deep/15 bg-off-white px-4 py-3 font-sans text-sm text-brown-deep placeholder:text-brown-warm/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-medium'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/area-do-cliente'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('senha') ?? '')

    try {
      const result = await login(email, password)
      if (!result.ok) {
        setError(result.message)
        return
      }
      navigate(redirectTo, { replace: true })
    } catch {
      setError('Não foi possível conectar ao mock-api. Rode "npm run mock:api" em outro terminal.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SiteChrome>
      <section className="bg-off-white flex min-h-[80vh] items-center pt-32 pb-24 sm:pt-40">
        <Container className="mx-auto max-w-md">
          <Reveal className="flex flex-col gap-10">
            <a
              href="/"
              className="text-brown-warm/70 hover:text-brown-deep inline-flex items-center gap-1.5 self-start font-sans text-sm transition-colors motion-reduce:transition-none"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              Voltar
            </a>

            <SectionHeading
              eyebrow="Entrar"
              title="Acesse sua área do cliente"
              description="Veja seu plano, agende aulas e acompanhe sua jornada no Pilates Studio."
            />

            <form
              onSubmit={handleSubmit}
              className="border-brown-deep/10 bg-beige-light flex flex-col gap-5 rounded-3xl border p-6 sm:p-8"
            >
              <label className="text-brown-deep flex flex-col gap-2 font-sans text-sm">
                <span className="font-medium">E-mail</span>
                <input
                  className={inputClasses}
                  type="email"
                  name="email"
                  autoComplete="email"
                  defaultValue="alexandria.souza@email.com"
                  required
                />
              </label>
              <PasswordField label="Senha" name="senha" autoComplete="current-password" required />

              {error && <p className="font-sans text-sm text-red-700">{error}</p>}

              <Button type="submit" variant="primary" className="mt-2 self-start" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando…' : 'Entrar'}
              </Button>
            </form>

            <p className="text-brown-warm/70 font-sans text-sm">
              Ainda não é cliente?{' '}
              <a href="/cadastro" className="text-brown-deep underline hover:no-underline">
                Crie sua conta
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </SiteChrome>
  )
}
