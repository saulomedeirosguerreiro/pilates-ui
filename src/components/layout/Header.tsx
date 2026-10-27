import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLocation } from 'react-router'
import { useSiteConfig } from '../../config/useSiteConfig'
import { MagneticButton } from '../motion/MagneticButton'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

const NAV_LINKS = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Aulas', href: '/#aulas' },
  { label: 'Instrutores', href: '/#instrutores' },
  { label: 'Planos', href: '/#planos' },
]

export function Header() {
  const { company } = useSiteConfig()
  const location = useLocation()
  const isCadastroPage = location.pathname === '/cadastro'
  const isHomePage = location.pathname === '/'
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24)

    const previous = scrollY.getPrevious() ?? 0
    const isScrollingDown = latest > previous

    setIsHidden(latest > 160 && isScrollingDown)
  })

  const headerSurface =
    isScrolled || isMenuOpen || !isHomePage ? 'bg-brown-deep/95 shadow-sm backdrop-blur' : 'bg-transparent'

  return (
    <motion.header
      animate={{ y: isHidden && !isMenuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors motion-reduce:transition-none ${headerSurface}`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="/" className="text-off-white font-serif text-xl font-medium">
          {company.name}
        </a>

        <nav
          aria-label="Navegação principal"
          className="bg-off-white/10 hidden items-center gap-1 rounded-full p-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-off-white/80 hover:bg-off-white hover:text-brown-deep rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isCadastroPage ? (
            <MagneticButton>
              <LinkButton variant="light" href="/entrar">
                Entrar
              </LinkButton>
            </MagneticButton>
          ) : (
            <>
              <a href="/entrar" className="text-off-white/80 hover:text-off-white font-sans text-sm font-medium">
                Entrar
              </a>
              <MagneticButton>
                <LinkButton variant="light" href="/cadastro">
                  Cadastrar
                </LinkButton>
              </MagneticButton>
            </>
          )}
        </div>

        <button
          type="button"
          className="text-off-white flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </Container>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação mobile"
          className="border-off-white/10 bg-brown-deep border-t md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-off-white hover:bg-off-white/10 rounded-full px-4 py-3 font-sans text-base"
              >
                {link.label}
              </a>
            ))}
            {isCadastroPage ? (
              <LinkButton
                variant="light"
                className="mt-2 w-full"
                href="/entrar"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </LinkButton>
            ) : (
              <LinkButton
                variant="light"
                className="mt-2 w-full"
                href="/cadastro"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar
              </LinkButton>
            )}
          </Container>
        </nav>
      )}
    </motion.header>
  )
}
