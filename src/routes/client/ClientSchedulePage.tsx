import { Calendar, Check, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import { Avatar, Card, TitleRule } from '../../components/client/ui'
import { Container } from '../../components/ui/Container'
import { Tabs } from '../../components/ui/Tabs'
import { classCategories, classesContent, type ClassCategory } from '../../content/classes'
import { instructorsContent } from '../../content/instructors'
import { addDays, DEMO_TODAY, formatDayMonth, formatShortDate, formatWeekdayLong } from '../../lib/date'
import { api, type Booking, type Slot } from '../../lib/api'

function instructorForCategory(category: ClassCategory) {
  return category === 'individual' || category === 'precisao'
    ? instructorsContent[1].name
    : instructorsContent[0].name
}

export function ClientSchedulePage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [category, setCategory] = useState<ClassCategory>('grupo')
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [bookingConfirmation, setBookingConfirmation] = useState<Slot | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    if (!user) return
    api.getBookings(user.id).then(setBookings)
  }, [user])

  useEffect(() => {
    api.getSlots(category).then(setSlots)
  }, [category])

  function handleCategoryChange(next: ClassCategory) {
    setCategory(next)
    setSelectedSlot(null)
    setBookingConfirmation(null)
  }

  if (!user) return null

  const confirmedBookings = bookings
    .filter((booking) => booking.status === 'confirmed')
    .sort((a, b) => a.date.localeCompare(b.date))
  const [nextBooking, ...otherUpcoming] = confirmedBookings
  const pastBookings = bookings
    .filter((booking) => booking.status === 'completed')
    .sort((a, b) => b.date.localeCompare(a.date))

  const windowStart = addDays(DEMO_TODAY, -27)
  const streakDays = Array.from({ length: 28 }, (_, index) => {
    const date = addDays(windowStart, index)
    const attended = pastBookings.some((booking) => booking.date === date)
    return { date, attended }
  })

  async function handleConfirmBooking() {
    if (!selectedSlot || !user) return
    setIsBooking(true)
    try {
      await api.bookSlot(selectedSlot, {
        userId: user.id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        category: selectedSlot.category,
        categoryLabel: classesContent.find((entry) => entry.category === category)?.title ?? category,
        instructor: instructorForCategory(category),
        location: 'Estúdio — Unidade Centro',
        status: 'confirmed',
      })
      const [freshBookings, freshSlots] = await Promise.all([
        api.getBookings(user.id),
        api.getSlots(category),
      ])
      setBookings(freshBookings)
      setSlots(freshSlots)
      setBookingConfirmation(selectedSlot)
      setSelectedSlot(null)
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Container className="flex flex-col gap-6 py-12">
      <div>
        <span className="text-sage font-sans text-sm font-semibold tracking-[0.18em] uppercase">
          Agendamento
        </span>
        <h1 className="font-serif text-3xl">Suas Aulas</h1>
        <TitleRule />
        <p className="text-brown-warm/80 max-w-xl font-sans text-base">
          Veja sua próxima aula, agende novos horários e acompanhe sua frequência.
        </p>
      </div>

      <Card>
        <p className="text-sage mb-4 font-sans text-sm font-semibold tracking-[0.18em] uppercase">
          Próxima aula
        </p>
        {nextBooking ? (
          <div className="flex flex-wrap items-center gap-6">
            <div className="bg-brown-deep text-off-white flex min-w-18 flex-col items-center justify-center rounded-2xl px-4 py-3">
              <span className="font-serif text-2xl font-semibold">
                {formatDayMonth(nextBooking.date).day}
              </span>
              <span className="text-xs tracking-wide uppercase">
                {formatDayMonth(nextBooking.date).month}
              </span>
            </div>
            <div className="min-w-[200px] flex-1">
              <h3 className="font-serif text-xl">{nextBooking.categoryLabel}</h3>
              <p className="font-sans text-sm">
                {formatWeekdayLong(nextBooking.date)} · {nextBooking.time}
              </p>
              {nextBooking.location && (
                <p className="text-brown-warm/70 font-sans text-sm">{nextBooking.location}</p>
              )}
              <div className="mt-2 flex items-center gap-2 font-sans text-sm">
                <Avatar initials="AN" size="md" />
                <span>com {nextBooking.instructor}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="border-brown-deep text-brown-deep hover:bg-brown-deep hover:text-off-white flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
              >
                <Calendar aria-hidden="true" className="h-4 w-4" />
                Adicionar ao calendário
              </button>
              <button
                type="button"
                className="bg-brown-deep/6 text-brown-deep hover:bg-brown-deep/10 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
              >
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                Reagendar
              </button>
              <button type="button" className="text-brown-warm/60 hover:text-brown-deep font-sans text-sm">
                Cancelar aula
              </button>
            </div>
          </div>
        ) : (
          <p className="text-brown-warm/70 font-sans text-sm">Você não tem nenhuma aula confirmada.</p>
        )}
      </Card>

      {otherUpcoming.length > 0 && (
        <Card>
          <h3 className="font-serif text-lg">Próximas aulas</h3>
          <p className="text-brown-warm/70 mb-1 font-sans text-sm">
            Outros horários já confirmados na sua agenda.
          </p>
          <div className="flex flex-col">
            {otherUpcoming.map((booking) => (
              <div
                key={booking.id}
                className="border-brown-deep/8 flex flex-wrap items-center justify-between gap-3 border-t py-3.5 first:border-t-0"
              >
                <div>
                  <p className="font-sans text-sm font-semibold">
                    {formatShortDate(booking.date)} · {booking.time}
                  </p>
                  <p className="text-brown-warm/70 font-sans text-sm">
                    {booking.categoryLabel} — {booking.instructor}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="text-brown-warm hover:text-brown-deep font-sans text-sm font-medium"
                  >
                    Reagendar
                  </button>
                  <button
                    type="button"
                    className="text-brown-warm/60 hover:text-brown-deep font-sans text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="font-serif text-lg">Agendar nova aula</h3>
        <p className="text-brown-warm/70 mb-4 font-sans text-sm">
          Escolha a modalidade e um horário disponível.
        </p>

        {bookingConfirmation ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="bg-beige-light text-brown-warm flex h-14 w-14 items-center justify-center rounded-full">
              <Check aria-hidden="true" className="h-7 w-7" />
            </div>
            <p className="font-sans text-base">
              Aula agendada para{' '}
              <strong>
                {bookingConfirmation.dayLabel} às {bookingConfirmation.time}
              </strong>
              !
            </p>
            <button
              type="button"
              onClick={() => setBookingConfirmation(null)}
              className="border-brown-deep text-brown-deep hover:bg-brown-deep hover:text-off-white rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              Agendar outra aula
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <Tabs
                options={classCategories}
                value={category}
                onChange={handleCategoryChange}
                aria-label="Modalidade"
              />
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {slots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={slot.full}
                    onClick={() => setSelectedSlot(slot)}
                    className={`relative flex flex-col gap-0.5 rounded-2xl border px-3.5 py-2.5 text-left font-sans text-sm transition-colors motion-reduce:transition-none ${
                      slot.full
                        ? 'border-brown-deep/10 cursor-default opacity-45'
                        : isSelected
                          ? 'border-brown-deep bg-beige-light border-2'
                          : 'border-brown-deep/15 hover:border-brown-warm'
                    }`}
                  >
                    {isSelected && (
                      <Check
                        aria-hidden="true"
                        className="text-brown-deep absolute top-2.5 right-2.5 h-4 w-4"
                      />
                    )}
                    <strong>{slot.dayLabel}</strong>
                    <span className="text-brown-warm/70 text-xs">
                      {slot.time} · {slot.full ? 'Esgotado' : 'Disponível'}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!selectedSlot || isBooking}
                onClick={handleConfirmBooking}
                className={`rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors motion-reduce:transition-none ${
                  selectedSlot
                    ? 'bg-brown-deep text-off-white hover:bg-brown-warm'
                    : 'bg-brown-deep/6 text-brown-deep/50 cursor-default'
                }`}
              >
                {selectedSlot
                  ? isBooking
                    ? 'Agendando…'
                    : `Confirmar: ${selectedSlot.dayLabel} às ${selectedSlot.time}`
                  : 'Selecione um horário disponível'}
              </button>
            </div>
          </>
        )}
      </Card>

      <Card>
        <h3 className="mb-4 font-serif text-lg">Histórico e frequência</h3>
        <div className="mb-6 grid grid-cols-7 gap-1.5">
          {streakDays.map((day) => (
            <div
              key={day.date}
              title={day.attended ? 'Aula registrada' : 'Sem aula'}
              className={`aspect-square rounded-md ${day.attended ? 'bg-brown-deep' : 'bg-beige-light'}`}
            />
          ))}
        </div>
        <div className="border-brown-deep/8 mb-6 flex flex-wrap gap-6 border-t pt-5">
          <div>
            <strong className="block font-serif text-2xl font-semibold">{user.stats.totalClasses}</strong>
            <span className="text-brown-warm/70 font-sans text-sm">aulas totais</span>
          </div>
          <div>
            <strong className="block font-serif text-2xl font-semibold">{user.stats.totalMinutes}</strong>
            <span className="text-brown-warm/70 font-sans text-sm">minutos de prática</span>
          </div>
          <div>
            <strong className="block font-serif text-2xl font-semibold">
              {user.stats.recordStreakWeeks}
            </strong>
            <span className="text-brown-warm/70 font-sans text-sm">semanas — sequência recorde</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-brown-deep/10 text-brown-warm/70 border-b text-xs tracking-wide uppercase">
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Aula</th>
                <th className="px-4 py-3 text-left">Instrutora</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastBookings.slice(0, 4).map((booking) => (
                <tr key={booking.id} className="border-brown-deep/6 border-b">
                  <td className="px-4 py-3.5">{formatShortDate(booking.date)}</td>
                  <td className="px-4 py-3.5">{booking.categoryLabel}</td>
                  <td className="px-4 py-3.5">{booking.instructor}</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-beige-light text-brown-deep rounded-full px-3 py-1 text-xs font-semibold">
                      Concluída
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  )
}
