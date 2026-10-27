import { useState } from 'react'
import classFoundation from '../../assets/images/photos/class-foundation.jpg'
import classGroup from '../../assets/images/photos/class-group.jpg'
import classPrivate from '../../assets/images/photos/class-private.jpg'
import classReformer from '../../assets/images/photos/class-reformer.jpg'
import { classCategories, classesContent, type ClassCategory, type ClassItem } from '../../content/classes'
import { Blob } from '../motion/Blob'
import { Reveal } from '../motion/Reveal'
import { RevealImage } from '../motion/RevealImage'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Tabs } from '../ui/Tabs'

const IMAGE_BY_CATEGORY: Record<ClassCategory, string> = {
  essencial: classFoundation,
  individual: classPrivate,
  grupo: classGroup,
  precisao: classReformer,
}

const SPAN_BY_CATEGORY: Record<ClassCategory, string> = {
  essencial: 'lg:row-span-2',
  individual: '',
  grupo: '',
  precisao: 'lg:col-span-2',
}

function ClassCard({
  item,
  isHighlighted,
  delay,
}: {
  item: ClassItem
  isHighlighted: boolean
  delay: number
}) {
  return (
    <Reveal
      delay={delay}
      y={32}
      className={`relative min-h-64 overflow-hidden rounded-3xl shadow-lg shadow-black/0 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-black/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${SPAN_BY_CATEGORY[item.category]} ${
        isHighlighted ? 'ring-off-white ring-offset-brown-deep ring-2 ring-offset-4' : ''
      }`}
    >
      <RevealImage
        src={IMAGE_BY_CATEGORY[item.category]}
        alt={item.imageAlt}
        parallax
        hoverZoom
        className="absolute inset-0 h-full w-full"
      />
      <div className="from-brown-deep/90 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

      <span className="bg-off-white/15 text-off-white absolute top-4 left-4 rounded-full px-3 py-1 font-sans text-xs font-medium backdrop-blur">
        {item.index} {item.categoryLabel}
      </span>

      <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-off-white font-serif text-xl">{item.title}</h3>
          <p className="text-off-white/70 mt-1 max-w-xs font-sans text-sm text-pretty">{item.description}</p>
        </div>
        <a
          href="#planos"
          className="bg-off-white text-brown-deep hover:bg-beige-light shrink-0 rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none"
        >
          Treinar →
        </a>
      </div>
    </Reveal>
  )
}

export function Classes() {
  const [activeCategory, setActiveCategory] = useState<ClassCategory>('essencial')

  return (
    <section id="aulas" className="bg-brown-deep relative overflow-hidden py-20 sm:py-28">
      <Blob color="sage" className="absolute -top-24 -left-24 h-80 w-80" duration={24} />
      <Blob color="brown-medium" className="absolute -right-32 bottom-0 h-96 w-96" duration={28} />

      <Container className="relative flex flex-col gap-12">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            eyebrow="Pilates sob medida para você"
            title="Ganhe força, melhore a flexibilidade e mova-se com confiança através de sessões personalizadas."
            align="center"
            tone="light"
          />
          <Tabs
            aria-label="Filtrar categorias de aulas"
            options={classCategories}
            value={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {classesContent.map((item, index) => (
            <ClassCard
              key={item.index}
              item={item}
              isHighlighted={item.category === activeCategory}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
