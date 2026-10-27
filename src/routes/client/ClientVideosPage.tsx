import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import { Badge, TitleRule } from '../../components/client/ui'
import { Container } from '../../components/ui/Container'
import { Tabs } from '../../components/ui/Tabs'
import { classCategories, type ClassCategory } from '../../content/classes'
import { api, type Video, type WatchProgress } from '../../lib/api'

const GRADIENTS = [
  'linear-gradient(135deg,#4e331c,#916e4b)',
  'linear-gradient(135deg,#22190e,#4e331c)',
  'linear-gradient(135deg,#7d8170,#4e331c)',
  'linear-gradient(135deg,#916e4b,#e8e3d2)',
  'linear-gradient(135deg,#22190e,#916e4b)',
  'linear-gradient(135deg,#4e331c,#7d8170)',
]

function gradientForVideo(id: number) {
  return GRADIENTS[id % GRADIENTS.length]
}

export function ClientVideosPage() {
  const { user } = useAuth()
  const [category, setCategory] = useState<ClassCategory>('essencial')
  const [videos, setVideos] = useState<Video[]>([])
  const [progress, setProgress] = useState<WatchProgress[]>([])

  useEffect(() => {
    api.getVideos().then(setVideos)
  }, [])

  useEffect(() => {
    if (!user) return
    api.getWatchProgress(user.id).then(setProgress)
  }, [user])

  if (!user) return null

  const videosInCategory = videos.filter((video) => video.category === category)

  return (
    <Container className="flex flex-col gap-6 py-12">
      <div>
        <span className="text-sage font-sans text-sm font-semibold tracking-[0.18em] uppercase">
          Aprenda no seu ritmo
        </span>
        <h1 className="font-serif text-3xl">Biblioteca de Vídeos</h1>
        <TitleRule />
        <p className="text-brown-warm/80 max-w-xl font-sans text-base">
          Vídeos selecionados pela nossa equipe para você praticar, entender a técnica e evoluir entre as aulas.
        </p>
      </div>

      <div className="bg-brown-elevated flex flex-col gap-6 rounded-3xl p-5 sm:flex-row">
        <div
          className="relative flex flex-1 aspect-video items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#22190e,#4e331c_60%,#916e4b)]"
          style={{ minWidth: 0 }}
        >
          <button
            type="button"
            aria-label="Assistir: Bem-vinda à sua jornada de Pilates"
            className="bg-off-white/90 text-brown-deep flex h-16 w-16 items-center justify-center rounded-full"
          >
            <Play aria-hidden="true" className="h-6 w-6" fill="currentColor" />
          </button>
          <span className="bg-brown-deep/80 text-off-white absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-xs">
            6 min
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <Badge tone="sage">Comece por aqui</Badge>
          <h3 className="text-off-white font-serif text-xl">Bem-vinda à sua jornada de Pilates</h3>
          <p className="text-off-white/70 font-sans text-sm">
            Um guia rápido sobre como aproveitar ao máximo sua assinatura e a biblioteca de vídeos.
          </p>
          <p className="text-off-white/55 font-sans text-xs">Equipe Pilates Studio</p>
        </div>
      </div>

      <Tabs options={classCategories} value={category} onChange={setCategory} aria-label="Categorias de vídeo" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videosInCategory.map((video) => {
          const watch = progress.find((entry) => entry.videoId === video.id)
          return (
            <div key={video.id} className="group flex cursor-pointer flex-col gap-2">
              <div
                className="relative aspect-video overflow-hidden rounded-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                style={{ background: gradientForVideo(video.id) }}
              >
                <button
                  type="button"
                  aria-label={`Assistir: ${video.title}`}
                  className="bg-off-white/90 text-brown-deep absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                >
                  <Play aria-hidden="true" className="h-4.5 w-4.5" fill="currentColor" />
                </button>
                <span className="bg-brown-deep/80 text-off-white absolute right-2 bottom-2 rounded-full px-2 py-0.5 text-[11px]">
                  {video.duration}
                </span>
                {watch && (
                  <div className="bg-off-white/30 absolute inset-x-0 bottom-0 h-1">
                    <div className="bg-brown-medium h-full" style={{ width: `${watch.progress}%` }} />
                  </div>
                )}
              </div>
              <p className="font-sans text-sm leading-snug font-medium">{video.title}</p>
              <p className="text-brown-warm/70 font-sans text-xs">{video.channel}</p>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
