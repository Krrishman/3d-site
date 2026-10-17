import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'
import { Inventory, LeadRows, Migration, QuoteForm, Schedule } from '../ui/fragments'

const FRAGMENTS = { web: QuoteForm, leads: LeadRows, stock: Inventory, schedule: Schedule, data: Migration } as const
const FIELDS = ['bg-blue', 'bg-teal', 'bg-paper', 'bg-teal', 'bg-blue'] as const

export function Features() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, '[data-specimen]', 'settle')
  return (
    <section ref={root} className="bg-navy px-4 py-24 text-paper md:px-7 md:py-40">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <h2 className="text-s4">What I build</h2>
          <p className="mt-5 max-w-[30ch] text-s2">Tools shaped to the way your business already works.</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-8 md:col-span-9 md:grid-cols-3 md:gap-x-2.5 md:gap-y-10">
          {SERVICES.map((s, i) => {
            const Fragment = FRAGMENTS[s.key]
            const wide = 'wide' in s && s.wide
            return (
              <li key={s.key} data-specimen className={wide ? 'col-span-2 order-first md:order-none' : ''}>
                <div className={`flex items-center justify-center overflow-hidden p-3 ${FIELDS[i]} ${wide ? 'aspect-[8/5]' : 'aspect-[4/5]'}`}>
                  <div className="max-h-[70%] w-full flex justify-center"><Fragment /></div>
                </div>
                <h3 className="mt-3 text-s2 font-bold tracking-normal">{s.name}</h3>
                <p className="mt-1 text-s1 text-mist">{s.fact}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
