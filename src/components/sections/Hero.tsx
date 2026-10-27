import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useSiteConfig } from '../../config/useSiteConfig'
import heroImage from '../../assets/images/photos/hero.jpg'
import { BlurText } from '../motion/BlurText'
import { EASE } from '../motion/constants'
import { MagneticButton } from '../motion/MagneticButton'
import { Reveal } from '../motion/Reveal'
import { ScrollIndicator } from '../motion/ScrollIndicator'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'

export function Hero() {
  const { company } = useSiteConfig()
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen items-end overflow-hidden pb-32"
    >
      <motion.img
        src={heroImage}
        alt="Pessoa praticando pilates em estúdio iluminado"
        initial={prefersReducedMotion ? undefined : { scale: 1.15 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="from-brown-deep via-brown-deep/50 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="from-brown-deep/80 absolute inset-0 bg-gradient-to-r to-transparent" />

      <motion.div style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
        <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
          <h1 className="text-off-white font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            <BlurText text={company.name} trigger="mount" stagger={0.08} layout="stacked" />
          </h1>

          <div className="flex flex-col gap-6">
            <Reveal
              as="p"
              delay={0.7}
              className="text-off-white/80 max-w-md font-sans text-base text-pretty sm:text-lg"
            >
              Movimente-se com controle, ganhe força e encontre equilíbrio. Cada sessão é pensada para apoiar
              seu corpo e o seu bem-estar.
            </Reveal>

            <Reveal delay={0.9} className="flex flex-wrap gap-4">
              <MagneticButton>
                <LinkButton variant="outlineLight" href="#planos">
                  Agendar Aula
                </LinkButton>
              </MagneticButton>
              <MagneticButton>
                <LinkButton variant="light" href="#planos">
                  Começar Agora ↗
                </LinkButton>
              </MagneticButton>
            </Reveal>
          </div>
        </Container>
      </motion.div>

      <ScrollIndicator className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex" />
    </section>
  )
}
