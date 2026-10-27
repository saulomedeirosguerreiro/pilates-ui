import instructor1 from '../../assets/images/photos/instructor-1.jpg'
import instructor2 from '../../assets/images/photos/instructor-2.jpg'
import instructor3 from '../../assets/images/photos/instructor-3.jpg'
import instructor4 from '../../assets/images/photos/instructor-4.jpg'
import { instructorsContent } from '../../content/instructors'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const IMAGES = [instructor1, instructor2, instructor3, instructor4]

export function Instructors() {
  return (
    <section id="instrutores" className="bg-beige-light py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Instrutores"
            title="Escolha seu instrutor — vamos te guiar em cada etapa do caminho."
          />
          <LinkButton variant="primary" href="#planos">
            Treinar →
          </LinkButton>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructorsContent.map((instructor, index) => (
            <div key={instructor.index} className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <img
                src={IMAGES[index]}
                alt={instructor.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="from-brown-deep/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

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
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
