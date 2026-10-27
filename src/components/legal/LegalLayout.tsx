import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { Container } from '../ui/Container'

type LegalLayoutProps = {
  eyebrow: string
  title: string
  updatedAtLabel: string
  children: ReactNode
}

/**
 * Casco tipográfico compartilhado pelas páginas legais (Termos, Privacidade).
 * Cada seção do conteúdo usa <LegalSection> abaixo para título + corpo.
 */
export function LegalLayout({ eyebrow, title, updatedAtLabel, children }: LegalLayoutProps) {
  return (
    <div className="bg-off-white pt-36 pb-20 sm:pt-44 sm:pb-28">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex max-w-2xl flex-col gap-3">
          <span className="text-sage font-sans text-sm font-medium tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
          <h1 className="text-brown-deep font-serif text-4xl text-balance sm:text-5xl">{title}</h1>
          <p className="text-brown-warm/70 font-sans text-sm">{updatedAtLabel}</p>
        </Reveal>

        <Reveal delay={0.1} className="flex max-w-3xl flex-col gap-10">
          {children}
        </Reveal>
      </Container>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-brown-deep font-serif text-xl sm:text-2xl">{title}</h2>
      <div className="text-brown-warm/90 flex flex-col gap-3 font-sans text-sm leading-relaxed sm:text-base">
        {children}
      </div>
    </section>
  )
}
