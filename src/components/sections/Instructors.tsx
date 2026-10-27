import instructorAldiceia from '../../assets/images/photos/instructor-aldiceia.jpg'
import instructorBruna from '../../assets/images/photos/instructor-bruna.jpg'
import { instructorsContent } from '../../content/instructors'
import { MagneticButton } from '../motion/MagneticButton'
import { Reveal } from '../motion/Reveal'
import { RevealImage } from '../motion/RevealImage'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const IMAGES = [instructorAldiceia, instructorBruna]
// As fotos são paisagem e recortadas em retrato — ajusta o foco horizontal
// para manter cada instrutora enquadrada (Aldiceia aparece à esquerda da foto original).
const IMAGE_POSITION = ['object-[20%_center]', 'object-center']

export function Instructors() {
  return (
    <section id="instrutores" className="bg-beige-light py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Instrutores"
            title="Escolha seu instrutor — vamos te guiar em cada etapa do caminho."
          />
          <Reveal delay={0.2}>
            <MagneticButton>
              <LinkButton variant="primary" href="#planos">
                Treinar →
              </LinkButton>
            </MagneticButton>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {instructorsContent.map((instructor, index) => (
            <Reveal
              key={instructor.index}
              delay={index * 0.1}
              y={32}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <RevealImage
                src={IMAGES[index]}
                alt={instructor.imageAlt}
                parallax
                hoverZoom
                grayscale
                className="absolute inset-0 h-full w-full"
                imgClassName={IMAGE_POSITION[index]}
              />
              <div className="from-brown-deep/90 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

              <span className="bg-off-white/15 text-off-white absolute top-4 left-4 rounded-full px-3 py-1 font-sans text-xs font-medium backdrop-blur">
                {instructor.index} {instructor.name}
              </span>

              {index === 0 && (
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-off-white font-serif text-lg">Comece sua jornada</h3>
                    <p className="text-off-white/70 mt-1 max-w-[12rem] font-sans text-sm text-pretty">
                      Mova-se com controle, ganhe força e encontre equilíbrio.
                    </p>
                  </div>
                  <a
                    href="#planos"
                    className="bg-off-white text-brown-deep hover:bg-beige-light shrink-0 rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
                  >
                    Treinar →
                  </a>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
