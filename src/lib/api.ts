const API_BASE_URL = 'http://localhost:4000'

export type NotificationPrefs = {
  classReminders: boolean
  promotions: boolean
  newVideos: boolean
}

export type UserStats = {
  currentStreakWeeks: number
  recordStreakWeeks: number
  totalClasses: number
  totalMinutes: number
  monthlyGoal: number
}

export type User = {
  id: number
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  birthDate: string
  preferredSchedule: string
  goal: string
  memberSince: string
  notifications: NotificationPrefs
  stats: UserStats
}

export type Subscription = {
  id: number
  userId: number
  planId: string
  status: 'active' | 'paused' | 'cancelled'
  nextBillingDate: string
  paymentMethodLabel: string
}

export type Invoice = {
  id: number
  userId: number
  date: string
  planId: string
  amount: number
  status: string
}

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled'

export type Booking = {
  id: number
  userId: number
  date: string
  time: string
  category: string
  categoryLabel: string
  instructor: string
  location?: string
  status: BookingStatus
}

export type Slot = {
  id: number
  category: string
  date: string
  dayLabel: string
  time: string
  full: boolean
}

export type Video = {
  id: number
  category: string
  title: string
  channel: string
  duration: string
}

export type WatchProgress = {
  id: number
  userId: number
  videoId: number
  progress: number
}

export type Achievement = {
  id: number
  userId: number
  label: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!response.ok) {
    throw new Error(
      `Falha ao acessar ${path} (${response.status}). O mock-api está rodando? (npm run mock:api)`,
    )
  }

  return response.json() as Promise<T>
}

/**
 * O json-server normaliza o campo `id` de todo recurso para string ao servi-lo,
 * mas mantém chaves estrangeiras (userId, videoId...) com o tipo original do
 * seed (number). Isso quebra comparações estritas entre `entidade.id` e uma
 * chave estrangeira apontando para ela (ex.: `video.id === progress.videoId`).
 * Por isso todo `id` é normalizado de volta para number no limite da API,
 * mantendo o resto do app livre desse detalhe de implementação do mock.
 */
function normalizeId<T extends { id: number | string }>(item: T): T {
  return { ...item, id: Number(item.id) }
}

function normalizeIds<T extends { id: number | string }>(items: T[]): T[] {
  return items.map(normalizeId)
}

export const api = {
  async findUserByEmail(email: string) {
    const users = await request<User[]>(`/users?email=${encodeURIComponent(email)}`)
    return users[0] ? normalizeId(users[0]) : null
  },

  getUser: async (id: number) => normalizeId(await request<User>(`/users/${id}`)),

  updateUser: async (id: number, patch: Partial<User>) =>
    normalizeId(await request<User>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })),

  async getSubscription(userId: number) {
    const subscriptions = await request<Subscription[]>(`/subscriptions?userId=${userId}`)
    return subscriptions[0] ? normalizeId(subscriptions[0]) : null
  },

  getInvoices: async (userId: number) =>
    normalizeIds(await request<Invoice[]>(`/invoices?userId=${userId}&_sort=-date`)),

  getBookings: async (userId: number) => normalizeIds(await request<Booking[]>(`/bookings?userId=${userId}`)),

  getSlots: async (category: string) => normalizeIds(await request<Slot[]>(`/slots?category=${category}`)),

  async bookSlot(slot: Slot, booking: Omit<Booking, 'id'>) {
    await request<Slot>(`/slots/${slot.id}`, { method: 'PATCH', body: JSON.stringify({ full: true }) })
    return normalizeId(await request<Booking>('/bookings', { method: 'POST', body: JSON.stringify(booking) }))
  },

  getVideos: async () => normalizeIds(await request<Video[]>('/videos')),

  getWatchProgress: async (userId: number) =>
    normalizeIds(await request<WatchProgress[]>(`/watchProgress?userId=${userId}`)),

  getAchievements: async (userId: number) =>
    normalizeIds(await request<Achievement[]>(`/achievements?userId=${userId}`)),
}
