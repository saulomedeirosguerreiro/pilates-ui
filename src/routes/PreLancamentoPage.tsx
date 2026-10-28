import type { ComponentProps, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { MapPin, Sparkles, Tag, Users } from 'lucide-react'
import { useSearchParams } from 'react-router'
import classFoundation from '../assets/images/photos/class-foundation.jpg'
import classGroup from '../assets/images/photos/class-group.jpg'
import classPrivate from '../assets/images/photos/class-private.jpg'
import classReformer from '../assets/images/photos/class-reformer.jpg'
import heroImage from '../assets/images/photos/pre-lancamento-hero.jpg'
import instructorAldiceia from '../assets/images/photos/instructor-aldiceia.jpg'
import instructorBruna from '../assets/images/photos/instructor-bruna.jpg'
import { PreLaunchChrome } from '../components/layout/PreLaunchChrome'
import { BlurText } from '../components/motion/BlurText'
import { Blob } from '../components/motion/Blob'
import { EASE } from '../components/motion/constants'
import { MagneticButton } from '../components/motion/MagneticButton'
import { Reveal } from '../components/motion/Reveal'
import { RevealImage } from '../components/motion/RevealImage'
import { ScrollIndicator } from '../components/motion/ScrollIndicator'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { classesContent } from '../content/classes'
import { instructorsContent } from '../content/instructors'
import { AGE_RANGE_OPTIONS } from '../config/googleForm.config'
import { useSiteConfig } from '../config/useSiteConfig'
import { pricingPlans } from '../content/pricing'
import { submitToGoogleForm } from '../lib/submitToGoogleForm'

const inputClasses =
  'w-full rounded-xl border border-brown-deep/15 bg-off-white px-4 py-3 font-sans text-sm text-brown-deep placeholder:text-brown-warm/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-medium'

const CLASS_IMAGES = [classFoundation, classPrivate, classGroup, classReformer]
const INSTRUCTOR_IMAGES = [instructorAldiceia, instructorBruna]
// As fotos são paisagem e recortadas em retrato — ajusta o foco horizontal
// para manter cada instrutora enquadrada (Aldiceia aparece à esquerda da foto original).
const INSTRUCTOR_IMAGE_POSITION = ['object-[20%_center]', 'object-center']

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

function Hero({ seatsLeft, onCtaClick }: { seatsLeft: number; onCtaClick: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden pb-28">
      <motion.img
        src={heroImage}
        alt="Mulher treinando em máquina de remo estacionária"
        initial={prefersReducedMotion ? undefined : { scale: 1.15 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="from-brown-deep via-brown-deep/60 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="from-brown-deep/85 absolute inset-0 bg-gradient-to-r to-transparent" />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative w-full"
      >
        <Container className="flex flex-col gap-6">
          <Reveal as="span" className="w-fit">
            <span className="bg-off-white/10 text-off-white inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-sm font-medium backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="bg-sage absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-sage relative inline-flex h-2 w-2 rounded-full" />
              </span>
              {`Restam somente ${seatsLeft} vagas`}
            </span>
          </Reveal>

          <h1 className="text-off-white max-w-3xl font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            <BlurText text="Fortaleza vai conhecer uma nova forma de cuidar de você." trigger="mount" stagger={0.05} />
          </h1>

          <Reveal
            as="p"
            delay={1.1}
            className="text-off-white/80 max-w-md font-sans text-base text-pretty sm:text-lg"
          >
            O Pilates Studio está preparando uma proposta de Pilates pensada para quem busca movimento,
            equilíbrio e bem-estar. Faça parte do nosso pré-lançamento e acompanhe as novidades.
          </Reveal>

          <Reveal delay={1.3} className="flex flex-wrap gap-4">
            <MagneticButton>
              <Button type="button" variant="light" onClick={onCtaClick}>
                Quero minha vaga ↓
              </Button>
            </MagneticButton>
          </Reveal>
        </Container>
      </motion.div>

      <ScrollIndicator className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex" />
    </section>
  )
}

function TrustBar() {
  const { campaign } = useSiteConfig()

  const items = [
    { icon: Tag, text: `Preço de fundador travado por ${campaign.priceLockMonths} meses` },
    { icon: Users, text: `Apenas ${campaign.seatLimit} vagas na turma de abertura` },
    { icon: MapPin, text: 'Em breve em Fortaleza, CE' },
  ]

  return (
    <section className="bg-beige-light py-10">
      <Container className="grid gap-6 sm:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            key={item.text}
            delay={index * 0.1}
            className="text-brown-deep flex items-center gap-3 font-sans text-sm font-medium"
          >
            <span className="bg-off-white text-brown-deep flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <item.icon aria-hidden="true" className="h-5 w-5" />
            </span>
            {item.text}
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

function StudioGallery() {
  return (
    <section className="bg-off-white py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="O estúdio que está chegando"
          title="Conheça a estrutura e as aulas que vão te esperar em Fortaleza."
          description="Equipamentos de precisão, aulas individuais e em grupo, pensadas para todos os níveis."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {classesContent.map((item, index) => (
            <Reveal
              key={item.index}
              delay={index * 0.1}
              y={32}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <RevealImage
                src={CLASS_IMAGES[index]}
                alt={item.imageAlt}
                parallax
                hoverZoom
                className="absolute inset-0 h-full w-full"
              />
              <div className="from-brown-deep/90 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className="bg-off-white/15 text-off-white absolute top-4 left-4 rounded-full px-3 py-1 font-sans text-xs font-medium backdrop-blur">
                {item.categoryLabel}
              </span>
              <div className="absolute inset-x-4 bottom-4">
                <h3 className="text-off-white font-serif text-xl">{item.title}</h3>
                <p className="text-off-white/70 mt-1 max-w-xs font-sans text-sm text-pretty">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function InstructorsTeaser() {
  return (
    <section className="bg-beige-light py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Quem vai te acompanhar"
          title="Instrutoras dedicadas a cuidar do seu progresso desde a primeira aula."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {instructorsContent.map((instructor, index) => (
            <Reveal
              key={instructor.index}
              delay={index * 0.1}
              y={32}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <RevealImage
                src={INSTRUCTOR_IMAGES[index]}
                alt={instructor.imageAlt}
                parallax
                hoverZoom
                grayscale
                className="absolute inset-0 h-full w-full"
                imgClassName={INSTRUCTOR_IMAGE_POSITION[index]}
              />
              <div className="from-brown-deep/90 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className="bg-off-white/15 text-off-white absolute top-4 left-4 rounded-full px-3 py-1 font-sans text-xs font-medium backdrop-blur">
                {instructor.name}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function PricingSection({
  selectedPlan,
  onSelectPlan,
}: {
  selectedPlan: string
  onSelectPlan: (planId: string) => void
}) {
  return (
    <section id="planos" className="bg-brown-deep relative overflow-hidden py-20 sm:py-28">
      <Blob color="beige-light" className="absolute top-1/4 -right-20 h-72 w-72" duration={26} />

      <Container className="relative flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Escolha o seu plano"
          title="Garanta hoje o plano que vai te acompanhar na abertura do estúdio."
          align="center"
          tone="light"
        />

        <div className="grid w-full gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id
            const surface = plan.highlighted
              ? 'bg-off-white text-brown-deep'
              : 'bg-brown-elevated text-off-white'

            return (
              <Reveal
                key={plan.id}
                delay={index * 0.1}
                y={32}
                className={`flex flex-col gap-6 rounded-3xl p-8 shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${surface} ${
                  isSelected ? 'ring-sage ring-2 ring-offset-2 ring-offset-brown-deep' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 font-sans text-xs font-medium ${
                      plan.highlighted ? 'bg-brown-deep text-off-white' : 'bg-off-white/10'
                    }`}
                  >
                    {plan.index} {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="bg-brown-deep text-off-white rounded-full px-3 py-1 font-sans text-xs font-medium">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-serif text-4xl">
                    R$ {plan.priceBRL.toLocaleString('pt-BR')}
                    <span className="font-sans text-base font-normal opacity-70">/mês</span>
                  </p>
                  <p
                    className={`mt-2 font-sans text-sm ${plan.highlighted ? 'text-brown-warm/80' : 'text-off-white/70'}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <Button
                  type="button"
                  variant={plan.highlighted ? 'primary' : 'light'}
                  className="w-full"
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {isSelected ? 'Plano selecionado ✓' : 'Quero esse plano'}
                </Button>

                <div>
                  <p className="mb-3 font-sans text-xs font-medium tracking-wide uppercase opacity-70">
                    O que está incluído:
                  </p>
                  <ul className="flex flex-col gap-2 font-sans text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export function PreLancamentoPage() {
  const { campaign } = useSiteConfig()
  const [searchParams] = useSearchParams()
  const planFromQuery = searchParams.get('plano')
  const initialPlan = pricingPlans.some((plan) => plan.id === planFromQuery)
    ? (planFromQuery as string)
    : pricingPlans[0].id

  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const seatsLeft = Math.max(campaign.seatLimit - campaign.seatsTaken, 0)
  const selectedPlanDetails = pricingPlans.find((plan) => plan.id === selectedPlan) ?? pricingPlans[0]

  function scrollToForm() {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToPlans() {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSelectPlan(planId: string) {
    setSelectedPlan(planId)
    scrollToForm()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitToGoogleForm({
        nome: String(formData.get('nome') ?? ''),
        email: String(formData.get('email') ?? ''),
        telefone: String(formData.get('telefone') ?? ''),
        bairro: String(formData.get('bairro') ?? ''),
        faixaEtaria: String(formData.get('faixaEtaria') ?? ''),
        plano: selectedPlan,
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('Não foi possível enviar seu cadastro agora. Tente novamente em instantes.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <PreLaunchChrome>
        <section className="bg-off-white flex min-h-[70vh] items-center pt-32 pb-24 sm:pt-40">
          <Container className="mx-auto max-w-xl text-center">
            <Reveal className="flex flex-col items-center gap-4">
              <span className="bg-beige-light text-brown-deep flex h-16 w-16 items-center justify-center rounded-full">
                <Sparkles aria-hidden="true" className="h-7 w-7" />
              </span>
              <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">
                Lista de pré-lançamento
              </span>
              <h1 className="text-brown-deep font-serif text-3xl sm:text-4xl">Você entrou na lista!</h1>
              <p className="text-brown-warm/80 font-sans text-base text-pretty">
                Recebemos seu interesse no plano <strong>{selectedPlanDetails.name}</strong>. Assim que o
                estúdio abrir em Fortaleza, vamos entrar em contato pelo e-mail ou telefone informado para
                confirmar sua vaga com o preço travado.
              </p>
            </Reveal>
          </Container>
        </section>
      </PreLaunchChrome>
    )
  }

  return (
    <PreLaunchChrome>
      <Hero seatsLeft={seatsLeft} onCtaClick={scrollToForm} />
      <TrustBar />
      <StudioGallery />
      <InstructorsTeaser />
      <PricingSection selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />

      <section id="cadastro" className="bg-off-white py-20 sm:py-28">
        <Container className="flex justify-center">
          <Reveal className="bg-beige-light w-full max-w-2xl rounded-3xl p-8 shadow-xl shadow-black/5 sm:p-12">
            <SectionHeading
              eyebrow="Pré-lançamento"
              title="Entre na lista de espera."
              description="Sem senha, sem compromisso agora. É só para avisarmos você assim que o estúdio abrir."
            />

            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome completo" name="nome" type="text" autoComplete="name" required />
                <Field label="E-mail" name="email" type="email" autoComplete="email" required />
                <Field
                  label="Telefone / WhatsApp"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(85) 91234-5678"
                  pattern="^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$"
                  title="Digite o telefone com DDD, ex.: (85) 91234-5678"
                  required
                />
                <div className="flex flex-col gap-2 font-sans text-sm">
                  <span className="text-brown-deep font-medium">Bairro</span>
                  <div className="flex gap-2">
                    <input
                      name="bairro"
                      type="text"
                      placeholder="Seu bairro"
                      required
                      className={inputClasses}
                    />
                    <span className="bg-off-white text-brown-warm/70 flex items-center rounded-xl border border-brown-deep/15 px-4 py-3 text-sm whitespace-nowrap">
                      Fortaleza, CE
                    </span>
                  </div>
                </div>
                <label className="text-brown-deep flex flex-col gap-2 font-sans text-sm">
                  <span className="font-medium">Faixa etária</span>
                  <select name="faixaEtaria" required defaultValue="" className={inputClasses}>
                    <option value="" disabled>
                      Selecione
                    </option>
                    {AGE_RANGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="bg-off-white border-brown-deep/15 flex items-center justify-between gap-4 rounded-2xl border p-4">
                <div>
                  <p className="text-brown-warm/60 font-sans text-xs tracking-wide uppercase">
                    Plano selecionado
                  </p>
                  <p className="text-brown-deep font-serif text-lg">
                    {selectedPlanDetails.name} — R$ {selectedPlanDetails.priceBRL.toLocaleString('pt-BR')}
                    /mês
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToPlans}
                  className="text-brown-deep font-sans text-sm font-medium underline hover:no-underline"
                >
                  Trocar
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-brown-deep flex items-start gap-3 font-sans text-sm">
                  <input
                    type="checkbox"
                    name="aceiteTermos"
                    required
                    className="accent-brown-deep mt-0.5 h-5 w-5 shrink-0"
                  />
                  <span>
                    Li e aceito os{' '}
                    <a href="/termos" className="text-brown-deep underline hover:no-underline">
                      Termos de Uso
                    </a>
                    .
                  </span>
                </label>
                <label className="text-brown-deep flex items-start gap-3 font-sans text-sm">
                  <input
                    type="checkbox"
                    name="aceitePrivacidade"
                    required
                    className="accent-brown-deep mt-0.5 h-5 w-5 shrink-0"
                  />
                  <span>
                    Li e aceito a{' '}
                    <a href="/privacidade" className="text-brown-deep underline hover:no-underline">
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>
              </div>

              {submitError && <p className="font-sans text-sm text-red-700">{submitError}</p>}

              <MagneticButton>
                <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Entrar na lista de pré-lançamento'}
                </Button>
              </MagneticButton>
            </form>
          </Reveal>
        </Container>
      </section>
    </PreLaunchChrome>
  )
}
