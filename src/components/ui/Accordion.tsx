import { useState } from 'react'

export type AccordionItem = {
  question: string
  answer: string
}

export function Accordion({ items, idPrefix }: { items: AccordionItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-brown-medium/20 divide-y">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${idPrefix}-button-${index}`
        const panelId = `${idPrefix}-panel-${index}`

        return (
          <div key={item.question} className="py-4">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-brown-deep focus-visible:ring-brown-medium flex w-full items-center justify-between gap-4 text-left font-sans text-base font-medium focus-visible:ring-2 focus-visible:outline-none"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="text-brown-medium text-xl">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="text-brown-warm/80 pt-3 font-sans text-sm sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
