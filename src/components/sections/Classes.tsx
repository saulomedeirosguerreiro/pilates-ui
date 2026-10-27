import { useState } from 'react'
import classFoundation from '../../assets/images/photos/class-foundation.jpg'
import classGroup from '../../assets/images/photos/class-group.jpg'
import classPrivate from '../../assets/images/photos/class-private.jpg'
import classReformer from '../../assets/images/photos/class-reformer.jpg'
import { classCategories, classesContent, type ClassCategory, type ClassItem } from '../../content/classes'
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

function ClassCard({ item, isHighlighted }: { item: ClassItem; isHighlighted: boolean }) {
  return (
    <div
      className={`group relative min-h-64 overflow-hidden rounded-3xl transition-shadow motion-reduce:transition-none ${SPAN_BY_CATEGORY[item.category]} ${
        isHighlighted ? 'ring-off-white ring-offset-brown-deep ring-2 ring-offset-4' : ''
      }`}
    >
      <img
        src={IMAGE_BY_CATEGORY[item.category]}
        alt={item.imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div className="from-brown-deep/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

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
    </div>
  )
}

export function Classes() {
  const [activeCategory, setActiveCategory] = useState<ClassCategory>('essencial')

  return (
    <section id="aulas" className="bg-brown-deep py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
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
          {classesContent.map((item) => (
            <ClassCard key={item.index} item={item} isHighlighted={item.category === activeCategory} />
          ))}
        </div>
      </Container>
    </section>
  )
}
