import type { ReactNode } from 'react'
import { useSiteConfig } from '../../config/useSiteConfig'
import { Container } from '../ui/Container'

const CONTACT_EMAIL = 'psilatesestudios@gmail.com'

const SOCIAL_LINKS: { key: 'instagram' | 'facebook' | 'whatsapp'; label: string; path: string }[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    path: 'M12 2.2c2.7 0 3 .01 4 .06 1 .05 1.7.2 2.3.45.6.25 1.1.6 1.6 1.1.5.5.85 1 1.1 1.6.25.6.4 1.3.45 2.3.05 1 .06 1.3.06 4s-.01 3-.06 4c-.05 1-.2 1.7-.45 2.3-.25.6-.6 1.1-1.1 1.6-.5.5-1 .85-1.6 1.1-.6.25-1.3.4-2.3.45-1 .05-1.3.06-4 .06s-3-.01-4-.06c-1-.05-1.7-.2-2.3-.45a4.4 4.4 0 0 1-1.6-1.1 4.4 4.4 0 0 1-1.1-1.6c-.25-.6-.4-1.3-.45-2.3-.05-1-.06-1.3-.06-4s.01-3 .06-4c.05-1 .2-1.7.45-2.3.25-.6.6-1.1 1.1-1.6.5-.5 1-.85 1.6-1.1.6-.25 1.3-.4 2.3-.45 1-.05 1.3-.06 4-.06Zm0 1.8c-2.65 0-2.96.01-4 .06-.8.04-1.24.17-1.53.28-.38.15-.66.33-.95.62-.29.29-.47.57-.62.95-.11.29-.24.73-.28 1.53-.05 1.04-.06 1.35-.06 4s.01 2.96.06 4c.04.8.17 1.24.28 1.53.15.38.33.66.62.95.29.29.57.47.95.62.29.11.73.24 1.53.28 1.04.05 1.35.06 4 .06s2.96-.01 4-.06c.8-.04 1.24-.17 1.53-.28.38-.15.66-.33.95-.62.29-.29.47-.57.62-.95.11-.29.24-.73.28-1.53.05-1.04.06-1.35.06-4s-.01-2.96-.06-4c-.04-.8-.17-1.24-.28-1.53a2.6 2.6 0 0 0-.62-.95 2.6 2.6 0 0 0-.95-.62c-.29-.11-.73-.24-1.53-.28-1.04-.05-1.35-.06-4-.06Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.13-1.98a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    path: 'M13.5 21v-7.2h2.4l.36-2.8h-2.76V9.1c0-.8.23-1.36 1.38-1.36h1.48V5.2A20 20 0 0 0 14.2 5c-2.14 0-3.6 1.3-3.6 3.69v2.11H8.2v2.8h2.4V21h2.9Z',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    path: 'M12 2.4a9.6 9.6 0 0 0-8.26 14.5L2.4 21.6l4.86-1.28A9.6 9.6 0 1 0 12 2.4Zm0 1.8a7.8 7.8 0 0 1 6.76 11.72.9.9 0 0 0-.09.6l.68 2.5-2.56-.67a.9.9 0 0 0-.6.08A7.8 7.8 0 1 1 12 4.2Zm-3.1 3.9c-.2 0-.52.07-.8.38-.27.3-1.04 1-1.04 2.45s1.07 2.86 1.22 3.06c.15.2 2.07 3.26 5.12 4.44 2.54.98 3.05.78 3.6.74.55-.05 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.65-.95-2.25-.25-.58-.5-.5-.68-.5Z',
  },
]

function PreLaunchHeader() {
  const { company } = useSiteConfig()

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-brown-deep/95 shadow-sm backdrop-blur">
      <Container className="flex h-20 items-center justify-center">
        <span className="text-off-white font-serif text-xl font-medium">{company.name}</span>
      </Container>
    </header>
  )
}

function PreLaunchFooter() {
  const { company, social } = useSiteConfig()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brown-deep pt-16 pb-10">
      <Container className="flex flex-col gap-8">
        <div className="grid gap-8 font-sans text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <p className="text-off-white/50 text-xs font-medium tracking-wide uppercase">Endereço</p>
            <p className="text-off-white/80">{company.address ?? 'Endereço a divulgar em breve.'}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-off-white/50 text-xs font-medium tracking-wide uppercase">E-mail</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-off-white/80 hover:text-off-white">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="border-off-white/10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
            <a href="/privacidade" className="text-off-white/60 hover:text-off-white">
              Política de privacidade
            </a>
            <a href="/termos" className="text-off-white/60 hover:text-off-white">
              Termos de contratação
            </a>
            <span className="text-off-white/40">
              © {year} {company.name} — todos os direitos reservados.
            </span>
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((item) => {
              const href = social[item.key]

              return (
                <a
                  key={item.key}
                  href={href ?? '#'}
                  aria-label={item.label}
                  aria-disabled={!href}
                  tabIndex={href ? 0 : -1}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors motion-reduce:transition-none ${
                    href
                      ? 'bg-off-white/10 text-off-white hover:bg-off-white hover:text-brown-deep'
                      : 'bg-off-white/5 text-off-white/30 pointer-events-none'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export function PreLaunchChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <PreLaunchHeader />
      <main>{children}</main>
      <PreLaunchFooter />
    </>
  )
}
