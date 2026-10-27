import { Activity, Flame, MessageCircle, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { Avatar, Badge, HoverCard } from '../../components/client/ui'
import { Container } from '../../components/ui/Container'
import { pricingPlans } from '../../content/pricing'
import { instructorsContent } from '../../content/instructors'
import { formatDayMonth, formatWeekdayLong } from '../../lib/date'
import { api, type Achievement, type Booking, type Subscription, type Video } from '../../lib/api'

type ContinueWatching = { video: Video; progress: number }

export function ClientHomePage() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [nextBooking, setNextBooking] = useState<Booking | null>(null)
  const [continueWatching, setContinueWatching] = useState<ContinueWatching | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    if (!user) return
    let cancelled = false

    Promise.all([
      api.getSubscription(user.id),
      api.getBookings(user.id),
      api.getVideos(),
      api.getWatchProgress(user.id),
      api.getAchievements(user.id),
    ]).then(([subscriptionResult, bookings, videos, progress, achievementsResult]) => {
      if (cancelled) return

      setSubscription(subscriptionResult)

      const upcoming = bookings
        .filter((booking) => booking.status === 'confirmed')
        .sort((a, b) => a.date.localeCompare(b.date))
      setNextBooking(upcoming[0] ?? null)

      const [firstProgress] = progress
      const matchingVideo = firstProgress ? videos.find((video) => video.id === firstProgress.videoId) : undefined
      setContinueWatching(matchingVideo && firstProgress ? { video: matchingVideo, progress: firstProgress.progress } : null)

      setAchievements(achievementsResult)
    })

    return () => {
      cancelled = true
    }
  }, [user])

  if (!user) return null

  const plan = subscription ? pricingPlans.find((candidate) => candidate.id === subscription.planId) : null
  const firstName = user.name.split(' ')[0]
  const instructor = instructorsContent[0]
  const monthlyGoalPercent = Math.round((user.stats.totalClasses / user.stats.monthlyGoal) * 100)

  return (
    <>
      <section className="bg-brown-deep relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-brown-medium absolute -top-36 -right-24 h-96 w-96 rounded-full opacity-35 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="bg-sage absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-20 blur-[70px]"
        />
        <Container className="relative z-10 flex flex-col gap-8 pt-16 pb-12 sm:pt-20">
          <div className="flex flex-col gap-2">
            <span className="text-[#9ea48c] font-sans text-sm font-semibold tracking-[0.18em] uppercase">
              Sua jornada
            </span>
            <h1 className="text-off-white font-serif text-4xl">Olá, {firstName}</h1>
            <p className="text-off-white/75 font-sans text-base">
              Você está com a gente desde {user.memberSince.split('-').reverse().join('/')}. Continue assim.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-off-white/8 border-off-white/15 flex flex-1 items-center gap-3 rounded-2xl border px-5 py-3.5">
              <Flame aria-hidden="true" className="text-beige-light h-5 w-5 flex-none" />
              <div>
                <strong className="text-off-white block font-sans text-base font-semibold">
                  {user.stats.currentStreakWeeks} semanas
                </strong>
                <span className="text-off-white/65 font-sans text-sm">de sequência</span>
              </div>
            </div>
            <div className="bg-off-white/8 border-off-white/15 flex flex-1 items-center gap-3 rounded-2xl border px-5 py-3.5">
              <Activity aria-hidden="true" className="text-beige-light h-5 w-5 flex-none" />
              <div>
                <strong className="text-off-white block font-sans text-base font-semibold">
                  {user.stats.totalClasses} aulas
                </strong>
                <span className="text-off-white/65 font-sans text-sm">este mês</span>
              </div>
            </div>
            <div className="bg-off-white/8 border-off-white/15 flex min-w-[200px] flex-1 flex-col gap-2 rounded-2xl border px-5 py-3.5">
              <div className="flex justify-between font-sans text-sm font-medium">
                <span className="text-off-white">Meta mensal</span>
                <strong className="text-off-white">{monthlyGoalPercent}%</strong>
              </div>
              <div className="bg-off-white/15 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-beige-light h-full rounded-full"
                  style={{ width: `${Math.min(monthlyGoalPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <HoverCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-serif text-lg">Próxima aula</h3>
            <Link to="/area-do-cliente/agendamento" className="text-brown-warm hover:text-brown-deep text-sm font-medium hover:underline">
              Ver agenda
            </Link>
          </div>
          {nextBooking ? (
            <div className="flex items-center gap-4">
              <div className="bg-brown-deep text-off-white flex min-w-14 flex-col items-center justify-center rounded-2xl px-3 py-2">
                <span className="font-serif text-xl font-semibold">{formatDayMonth(nextBooking.date).day}</span>
                <span className="text-[11px] tracking-wide uppercase">{formatDayMonth(nextBooking.date).month}</span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold">{nextBooking.categoryLabel}</p>
                <p className="text-brown-warm/70 font-sans text-sm">
                  {formatWeekdayLong(nextBooking.date).split('-')[0]} · {nextBooking.time}
                </p>
                <p className="text-brown-warm/70 font-sans text-sm">com {nextBooking.instructor}</p>
              </div>
            </div>
          ) : (
            <p className="text-brown-warm/70 font-sans text-sm">Nenhuma aula agendada no momento.</p>
          )}
        </HoverCard>

        <HoverCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-serif text-lg">Seu plano</h3>
            <Link to="/area-do-cliente/plano" className="text-brown-warm hover:text-brown-deep text-sm font-medium hover:underline">
              Gerenciar
            </Link>
          </div>
          {plan ? (
            <>
              {plan.badge && (
                <div className="mb-2">
                  <Badge>{plan.badge}</Badge>
                </div>
              )}
              <p className="font-sans text-sm font-semibold">{plan.name}</p>
              <p className="font-serif text-2xl">
                R$ {plan.priceBRL.toLocaleString('pt-BR')}
                <span className="text-brown-warm/60 font-sans text-sm"> /mês</span>
              </p>
              {subscription && (
                <p className="text-brown-warm/70 font-sans text-sm">
                  Próxima cobrança em {formatDayMonth(subscription.nextBillingDate).day} de{' '}
                  {formatDayMonth(subscription.nextBillingDate).month}
                </p>
              )}
            </>
          ) : (
            <p className="text-brown-warm/70 font-sans text-sm">Carregando plano…</p>
          )}
        </HoverCard>

        <HoverCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-serif text-lg">Continue assistindo</h3>
            <Link to="/area-do-cliente/videos" className="text-brown-warm hover:text-brown-deep text-sm font-medium hover:underline">
              Biblioteca
            </Link>
          </div>
          {continueWatching ? (
            <div className="flex flex-col gap-2">
              <div className="from-brown-deep to-brown-medium relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br">
                <button
                  type="button"
                  aria-label={`Continuar assistindo: ${continueWatching.video.title}`}
                  className="bg-off-white/90 text-brown-deep absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                >
                  <Play aria-hidden="true" className="h-4.5 w-4.5" fill="currentColor" />
                </button>
                <span className="bg-brown-deep/80 text-off-white absolute right-2 bottom-2 rounded-full px-2 py-0.5 text-[11px]">
                  {continueWatching.video.duration}
                </span>
                <div className="bg-off-white/30 absolute inset-x-0 bottom-0 h-1">
                  <div className="bg-brown-medium h-full" style={{ width: `${continueWatching.progress}%` }} />
                </div>
              </div>
              <p className="font-sans text-sm leading-snug font-medium">{continueWatching.video.title}</p>
              <p className="text-brown-warm/70 font-sans text-xs">{continueWatching.video.channel}</p>
            </div>
          ) : (
            <p className="text-brown-warm/70 font-sans text-sm">Nenhum vídeo em andamento.</p>
          )}
        </HoverCard>

        <HoverCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-serif text-lg">Seu progresso</h3>
            <Link to="/area-do-cliente/agendamento" className="text-brown-warm hover:text-brown-deep text-sm font-medium hover:underline">
              Histórico
            </Link>
          </div>
          <div className="flex justify-between font-sans text-sm font-medium">
            <span>Sequência atual</span>
            <strong>{user.stats.currentStreakWeeks} semanas</strong>
          </div>
          <div className="mt-1.5 flex justify-between font-sans text-sm font-medium">
            <span>Aulas neste mês</span>
            <strong>{user.stats.totalClasses}</strong>
          </div>
          <div className="mt-3 flex gap-2" aria-hidden="true">
            {achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                title={achievement.label}
                className="bg-beige-light text-brown-warm flex h-7 w-7 items-center justify-center rounded-full"
              >
                <Flame className="h-3.5 w-3.5" />
              </div>
            ))}
          </div>
        </HoverCard>

        <HoverCard className="flex flex-col items-center text-center">
          <Avatar initials={instructor.index === '01' ? 'AN' : 'BE'} size="lg" />
          <h4 className="mt-3 font-serif text-lg">{instructor.name}</h4>
          <p className="text-brown-warm/70 mb-4 font-sans text-sm">Especialista em aulas em grupo</p>
          <button
            type="button"
            className="bg-brown-deep/6 text-brown-deep hover:bg-brown-deep/10 flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Enviar mensagem
          </button>
        </HoverCard>

        <HoverCard className="bg-beige-light border-transparent">
          <h4 className="mb-2 font-serif text-lg">Indique uma amiga</h4>
          <p className="text-brown-warm/80 mb-4 font-sans text-sm">
            Ganhe uma sessão grátis para cada amiga que assinar um plano.
          </p>
          <button
            type="button"
            className="bg-brown-deep text-off-white hover:bg-brown-warm w-full rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
          >
            Compartilhar convite
          </button>
        </HoverCard>
      </Container>
    </>
  )
}
