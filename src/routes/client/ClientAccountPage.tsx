import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { Avatar, Badge, Card, IndexChip, ToggleSwitch, TitleRule } from '../../components/client/ui'
import { Container } from '../../components/ui/Container'
import { pricingPlans } from '../../content/pricing'
import { formatLongDate } from '../../lib/date'
import { getInitials } from '../../lib/format'
import { api, type NotificationPrefs } from '../../lib/api'

const inputClasses =
  'w-full rounded-xl border border-brown-deep/15 bg-off-white px-4 py-2.5 font-sans text-sm text-brown-deep placeholder:text-brown-warm/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-medium'

const JUMP_LINKS = [
  { href: '#dados-pessoais', label: 'Dados pessoais' },
  { href: '#preferencias', label: 'Preferências' },
  { href: '#notificacoes', label: 'Notificações' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#privacidade', label: 'Privacidade' },
]

export function ClientAccountPage() {
  const { user, refreshUser, logout } = useAuth()
  const navigate = useNavigate()

  const [personalSaved, setPersonalSaved] = useState(false)
  const [preferencesSaved, setPreferencesSaved] = useState(false)
  const [isSavingPersonal, setIsSavingPersonal] = useState(false)
  const [isSavingPreferences, setIsSavingPreferences] = useState(false)

  if (!user) return null

  const plan = pricingPlans.find((candidate) => candidate.id === 'pilates-massoterapia')

  async function handleSavePersonal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return
    const formData = new FormData(event.currentTarget)
    setIsSavingPersonal(true)
    try {
      await api.updateUser(user.id, {
        name: String(formData.get('name') ?? user.name),
        email: String(formData.get('email') ?? user.email),
        phone: String(formData.get('phone') ?? user.phone),
        birthDate: String(formData.get('birthDate') ?? user.birthDate),
      })
      await refreshUser()
      setPersonalSaved(true)
    } finally {
      setIsSavingPersonal(false)
    }
  }

  async function handleSavePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return
    const formData = new FormData(event.currentTarget)
    setIsSavingPreferences(true)
    try {
      await api.updateUser(user.id, {
        preferredSchedule: String(formData.get('preferredSchedule') ?? user.preferredSchedule),
        goal: String(formData.get('goal') ?? user.goal),
      })
      await refreshUser()
      setPreferencesSaved(true)
    } finally {
      setIsSavingPreferences(false)
    }
  }

  async function handleToggleNotification(key: keyof NotificationPrefs, value: boolean) {
    if (!user) return
    await api.updateUser(user.id, { notifications: { ...user.notifications, [key]: value } })
    await refreshUser()
  }

  function handleSignOutEverywhere() {
    logout()
    navigate('/')
  }

  return (
    <Container className="flex flex-col gap-6 py-12">
      <div>
        <span className="text-sage font-sans text-sm font-semibold tracking-[0.18em] uppercase">Sua conta</span>
        <h1 className="font-serif text-3xl">Minha Conta</h1>
        <TitleRule />
      </div>

      <Card className="flex flex-wrap items-center gap-5">
        <Avatar initials={getInitials(user.name)} size="xl" />
        <div className="min-w-[200px] flex-1">
          <h2 className="font-serif text-xl">{user.name}</h2>
          <p className="text-brown-warm/70 font-sans text-sm">{user.email}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            {plan && <Badge>{plan.name}</Badge>}
            <span className="text-brown-warm/70 font-sans text-sm">Cliente desde {formatLongDate(user.memberSince)}</span>
          </div>
        </div>
        <button
          type="button"
          className="bg-brown-deep/6 text-brown-deep hover:bg-brown-deep/10 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
        >
          Alterar foto
        </button>
      </Card>

      <nav
        aria-label="Seções da conta"
        className="bg-brown-deep/6 flex w-fit flex-wrap gap-1 rounded-full p-1"
      >
        {JUMP_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-brown-warm/70 hover:bg-off-white hover:text-brown-deep rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Card id="dados-pessoais" className="scroll-mt-24">
        <div className="mb-5 flex items-center gap-3">
          <IndexChip>01</IndexChip>
          <h3 className="font-serif text-lg">Dados pessoais</h3>
        </div>
        <form onSubmit={handleSavePersonal} onChange={() => setPersonalSaved(false)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">Nome completo</span>
              <input className={inputClasses} name="name" type="text" defaultValue={user.name} />
            </label>
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">E-mail</span>
              <input className={inputClasses} name="email" type="email" defaultValue={user.email} />
            </label>
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">Telefone</span>
              <input className={inputClasses} name="phone" type="tel" defaultValue={user.phone} />
            </label>
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">CPF</span>
              <input className={inputClasses} type="text" defaultValue={user.cpf} readOnly />
              <span className="text-brown-warm/50 text-xs">Não pode ser alterado. Fale com o suporte se precisar corrigir.</span>
            </label>
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">Data de nascimento</span>
              <input className={inputClasses} name="birthDate" type="text" defaultValue={user.birthDate} />
            </label>
          </div>
          <div className="border-brown-deep/8 mt-5 flex items-center justify-end gap-3 border-t pt-5">
            {personalSaved && <span className="text-brown-warm/70 font-sans text-sm">Alterações salvas.</span>}
            <button
              type="submit"
              disabled={isSavingPersonal}
              className="bg-brown-deep text-off-white hover:bg-brown-warm rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              {isSavingPersonal ? 'Salvando…' : 'Salvar dados pessoais'}
            </button>
          </div>
        </form>
      </Card>

      <Card id="preferencias" className="scroll-mt-24">
        <div className="mb-5 flex items-center gap-3">
          <IndexChip>02</IndexChip>
          <h3 className="font-serif text-lg">Preferências</h3>
        </div>
        <form onSubmit={handleSavePreferences} onChange={() => setPreferencesSaved(false)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-sans text-sm">
              <span className="text-brown-warm/70">Dias e horários preferidos</span>
              <input className={inputClasses} name="preferredSchedule" type="text" defaultValue={user.preferredSchedule} />
            </label>
            <label className="flex flex-col gap-1.5 font-sans text-sm sm:col-span-2">
              <span className="text-brown-warm/70">Objetivo com o Pilates</span>
              <textarea className={inputClasses} name="goal" rows={3} defaultValue={user.goal} />
            </label>
          </div>
          <div className="border-brown-deep/8 mt-5 flex items-center justify-end gap-3 border-t pt-5">
            {preferencesSaved && <span className="text-brown-warm/70 font-sans text-sm">Alterações salvas.</span>}
            <button
              type="submit"
              disabled={isSavingPreferences}
              className="bg-brown-deep text-off-white hover:bg-brown-warm rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              {isSavingPreferences ? 'Salvando…' : 'Salvar preferências'}
            </button>
          </div>
        </form>
      </Card>

      <Card id="notificacoes" className="scroll-mt-24">
        <div className="mb-1 flex items-center gap-3">
          <IndexChip>03</IndexChip>
          <h3 className="font-serif text-lg">Notificações</h3>
        </div>
        <p className="text-brown-warm/70 mb-3 font-sans text-sm">Alterações aqui são salvas automaticamente.</p>
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 font-sans text-sm">
            <span>Lembretes de aula</span>
            <ToggleSwitch
              checked={user.notifications.classReminders}
              onChange={(value) => handleToggleNotification('classReminders', value)}
              label="Lembretes de aula"
            />
          </div>
          <div className="border-brown-deep/8 flex items-center justify-between border-t py-3 font-sans text-sm">
            <span>Novidades e promoções</span>
            <ToggleSwitch
              checked={user.notifications.promotions}
              onChange={(value) => handleToggleNotification('promotions', value)}
              label="Novidades e promoções"
            />
          </div>
          <div className="border-brown-deep/8 flex items-center justify-between border-t py-3 font-sans text-sm">
            <span>Novos vídeos na biblioteca</span>
            <ToggleSwitch
              checked={user.notifications.newVideos}
              onChange={(value) => handleToggleNotification('newVideos', value)}
              label="Novos vídeos na biblioteca"
            />
          </div>
        </div>
      </Card>

      <Card id="seguranca" className="scroll-mt-24">
        <div className="mb-1 flex items-center gap-3">
          <IndexChip>04</IndexChip>
          <h3 className="font-serif text-lg">Segurança</h3>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 py-3.5 font-sans text-sm">
            <div>
              <p className="font-medium">Senha</p>
              <p className="text-brown-warm/70">Alterada há 3 semanas</p>
            </div>
            <button
              type="button"
              className="border-brown-deep text-brown-deep hover:bg-brown-deep hover:text-off-white rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              Alterar senha
            </button>
          </div>
          <div className="border-brown-deep/8 flex items-center justify-between gap-4 border-t py-3.5 font-sans text-sm">
            <div>
              <p className="font-medium">E-mail verificado</p>
              <p className="text-brown-warm/70">{user.email}</p>
            </div>
            <Badge>Verificado</Badge>
          </div>
          <div className="border-brown-deep/8 flex items-center justify-between gap-4 border-t py-3.5 font-sans text-sm">
            <div>
              <p className="font-medium">Sessões ativas</p>
              <p className="text-brown-warm/70">1 dispositivo conectado</p>
            </div>
            <button type="button" onClick={handleSignOutEverywhere} className="text-brown-warm/60 hover:text-brown-deep font-sans text-sm">
              Sair de todos os dispositivos
            </button>
          </div>
        </div>
      </Card>

      <Card id="privacidade" className="scroll-mt-24">
        <div className="mb-1 flex items-center gap-3">
          <IndexChip>05</IndexChip>
          <h3 className="font-serif text-lg">Privacidade e dados</h3>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 py-3.5 font-sans text-sm">
            <div>
              <p className="font-medium">Seus dados</p>
              <p className="text-brown-warm/70">Baixe uma cópia de todas as informações associadas à sua conta.</p>
            </div>
            <button
              type="button"
              className="bg-brown-deep/6 text-brown-deep hover:bg-brown-deep/10 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              Baixar meus dados
            </button>
          </div>
          <div className="border-brown-deep/8 flex items-center justify-between gap-4 border-t py-3.5 font-sans text-sm">
            <div>
              <p className="font-medium">Políticas</p>
              <p className="text-brown-warm/70">Consulte como tratamos seus dados e os termos da assinatura.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/privacidade" className="text-brown-warm hover:text-brown-deep font-medium hover:underline">
                Política de privacidade
              </Link>
              <Link to="/termos" className="text-brown-warm hover:text-brown-deep font-medium hover:underline">
                Termos de uso
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h4 className="mb-4 font-serif text-lg">Gerenciar assinatura</h4>
        <div className="flex items-center justify-between gap-4 py-3 font-sans text-sm">
          <span>Pausar assinatura por até 30 dias</span>
          <button
            type="button"
            className="bg-brown-deep/6 text-brown-deep hover:bg-brown-deep/10 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
          >
            Pausar
          </button>
        </div>
        <div className="border-brown-deep/8 flex items-center justify-between gap-4 border-t py-3 font-sans text-sm">
          <span>Encerrar conta e cancelar assinatura</span>
          <button type="button" className="text-brown-warm/60 hover:text-brown-deep font-sans text-sm">
            Encerrar conta
          </button>
        </div>
      </Card>
    </Container>
  )
}
