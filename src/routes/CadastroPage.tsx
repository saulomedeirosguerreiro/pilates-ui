import { ChevronLeft } from 'lucide-react'
import type { ComponentProps, FormEvent } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { SiteChrome } from '../components/layout/SiteChrome'
import { Reveal } from '../components/motion/Reveal'
import { Button, LinkButton } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { DatePickerField } from '../components/ui/DatePickerField'
import { SectionHeading } from '../components/ui/SectionHeading'
import { pricingPlans } from '../content/pricing'

const inputClasses =
  'w-full rounded-xl border border-brown-deep/15 bg-off-white px-4 py-3 font-sans text-sm text-brown-deep placeholder:text-brown-warm/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-medium'

function Field({
  label,
  optional,
  ...props
}: { label: string; optional?: boolean } & ComponentProps<'input'>) {
  return (
    <label className="text-brown-deep flex flex-col gap-2 font-sans text-sm">
      <span className="font-medium">
        {label} {optional && <span className="text-brown-warm/50 font-normal">(opcional)</span>}
      </span>
      <input className={inputClasses} {...props} />
    </label>
  )
}

function SectionTitle({
  index,
  title,
  className = '',
}: {
  index: string
  title: string
  className?: string
}) {
  return (
    <legend className={`text-brown-deep flex items-center gap-3 font-serif text-xl sm:text-2xl ${className}`}>
      <span className="bg-beige-light text-brown-deep rounded-full px-3 py-1 font-sans text-sm font-medium">
        {index}
      </span>
      {title}
    </legend>
  )
}

export function CadastroPage() {
  const [searchParams] = useSearchParams()
  const planFromQuery = searchParams.get('plano')
  const initialPlan = pricingPlans.some((plan) => plan.id === planFromQuery)
    ? (planFromQuery as string)
    : pricingPlans[0].id

  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (!formData.get('nascimento')) {
      setDateError('Selecione sua data de nascimento.')
      return
    }
    setDateError(null)

    if (formData.get('senha') !== formData.get('confirmarSenha')) {
      setPasswordError('As senhas não coincidem.')
      return
    }

    setPasswordError(null)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <SiteChrome>
        <section className="bg-off-white flex min-h-[70vh] items-center pt-32 pb-24 sm:pt-40">
          <Container className="mx-auto max-w-xl text-center">
            <Reveal className="flex flex-col items-center gap-4">
              <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">
                Cadastro
              </span>
              <h1 className="text-brown-deep font-serif text-3xl sm:text-4xl">
                Formulário preenchido com sucesso!
              </h1>
              <p className="text-brown-warm/80 font-sans text-base text-pretty">
                Esta é uma pré-visualização do fluxo de contratação. O envio e o processamento do cadastro
                serão habilitados assim que o backend estiver disponível.
              </p>
              <LinkButton variant="primary" href="/" className="mt-4">
                Voltar para a página inicial
              </LinkButton>
            </Reveal>
          </Container>
        </section>
      </SiteChrome>
    )
  }

  return (
    <SiteChrome>
      <section className="bg-off-white pt-32 pb-24 sm:pt-40">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <a
                href="/"
                className="text-brown-warm/70 hover:text-brown-deep inline-flex items-center gap-1.5 font-sans text-sm transition-colors motion-reduce:transition-none"
              >
                <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                Voltar
              </a>
            </Reveal>

            <SectionHeading
              eyebrow="Cadastro"
              title="Crie sua conta e comece a treinar."
              description="Preencha seus dados para contratar um dos nossos planos."
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-16">
            <Reveal as="fieldset" className="flex flex-col gap-6">
              <SectionTitle index="01" title="Dados pessoais" />
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome completo" name="nome" type="text" autoComplete="name" required />
                <Field label="E-mail" name="email" type="email" autoComplete="email" required />
                <Field label="Telefone / WhatsApp" name="telefone" type="tel" autoComplete="tel" required />
                <Field
                  label="CPF"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  required
                />
                <DatePickerField label="Data de nascimento" name="nascimento" error={dateError} />
              </div>
            </Reveal>

            <Reveal as="fieldset" delay={0.05} className="flex flex-col gap-6">
              <SectionTitle index="02" title="Acesso à conta" />
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Senha"
                  name="senha"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <Field
                  label="Confirmar senha"
                  name="confirmarSenha"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
              {passwordError && <p className="font-sans text-sm text-red-700">{passwordError}</p>}
            </Reveal>

            <Reveal as="fieldset" delay={0.1} className="flex flex-col gap-6">
              <SectionTitle index="03" title="Plano contratado" />
              <div className="grid gap-4 sm:grid-cols-3">
                {pricingPlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id

                  return (
                    <label
                      key={plan.id}
                      className={`flex cursor-pointer flex-col gap-2 rounded-2xl border p-5 transition-colors motion-reduce:transition-none ${
                        isSelected
                          ? 'border-brown-deep bg-beige-light'
                          : 'border-brown-deep/15 hover:border-brown-deep/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plano"
                        value={plan.id}
                        checked={isSelected}
                        onChange={() => setSelectedPlan(plan.id)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-brown-deep font-serif text-lg">{plan.name}</span>
                        {plan.badge && (
                          <span className="bg-brown-deep text-off-white rounded-full px-2 py-0.5 font-sans text-xs font-medium">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-brown-deep font-sans text-sm">
                        R$ {plan.priceBRL.toLocaleString('pt-BR')}
                        <span className="text-brown-warm/70">/mês</span>
                      </p>
                    </label>
                  )
                })}
              </div>
            </Reveal>

            <Reveal as="fieldset" delay={0.15} className="flex flex-col gap-6">
              <SectionTitle index="04" title="Informações complementares" />
              <Field
                label="Preferência de dias e horários"
                name="preferenciaHorario"
                type="text"
                placeholder="Ex.: segundas e quartas, à noite"
              />
              <label className="text-brown-deep flex flex-col gap-2 font-sans text-sm">
                <span className="font-medium">
                  Objetivo com o Pilates <span className="text-brown-warm/50 font-normal">(opcional)</span>
                </span>
                <textarea name="objetivo" rows={3} className={inputClasses} />
              </label>
              <p className="bg-beige-light text-brown-warm/80 rounded-xl p-4 font-sans text-sm">
                Informações de saúde relevantes para a prática serão coletadas separadamente, em uma etapa
                própria, com os devidos cuidados de privacidade.
              </p>
            </Reveal>

            <Reveal as="fieldset" delay={0.2} className="flex flex-col gap-6">
              <SectionTitle index="05" title="Confirmações" className="mb-2" />
              <label className="text-brown-deep flex items-start gap-3 font-sans text-sm">
                <input type="checkbox" name="aceiteTermos" required className="mt-1" />
                <span>
                  Li e aceito os{' '}
                  <a href="/termos" className="text-brown-deep underline hover:no-underline">
                    Termos de Uso
                  </a>
                  .
                </span>
              </label>
              <label className="text-brown-deep flex items-start gap-3 font-sans text-sm">
                <input type="checkbox" name="aceitePrivacidade" required className="mt-1" />
                <span>
                  Li e aceito a{' '}
                  <a href="/privacidade" className="text-brown-deep underline hover:no-underline">
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>
              <label className="text-brown-deep flex items-start gap-3 font-sans text-sm">
                <input type="checkbox" name="aceitePromocional" className="mt-1" />
                <span>
                  Aceito receber comunicações promocionais por e-mail e WhatsApp{' '}
                  <span className="text-brown-warm/50">(opcional)</span>.
                </span>
              </label>
            </Reveal>

            <Button type="submit" variant="primary" className="self-start">
              Finalizar cadastro →
            </Button>
          </form>
        </Container>
      </section>
    </SiteChrome>
  )
}
