import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { STEPS } from '../content'

const TINTS = ['bg-navy', 'bg-navy-tint-1', 'bg-navy-tint-2', 'bg-navy-tint-3'] as const

export function HowItWorks() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)
  useReveal(root, '[data-stage]', 'rows')
  return (
    <section ref={root} className="bg-paper px-4 py-24 text-navy md:px-7 md:py-40">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <h2 className="text-s4 md:col-span-5">How it works</h2>
        <p className="text-s2 md:col-span-5 md:col-start-7">
          Four stages from the first call to a system that is live. You see progress at every one of them, and
          the price is agreed before anything is built.
        </p>
      </div>
      <div className="mt-16 flex flex-col md:h-[520px] md:flex-row">
        {STEPS.map((step, i) => {
          const isOpen = open === i
          return (
            <div
              key={step.name}
              data-stage
              className={`acc-panel relative overflow-hidden text-paper ${TINTS[i]} ${isOpen ? 'md:basis-[58%]' : 'md:basis-[14%]'} md:min-w-0`}
              style={{ flexGrow: 0, flexShrink: 0 }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(i)}
                className="flex w-full items-center justify-between px-5 text-left text-s2 font-bold min-h-16 md:absolute md:inset-0 md:h-full md:items-end md:px-6 md:pb-6"
              >
                <span className={isOpen ? 'md:hidden' : 'md:[writing-mode:vertical-rl] md:rotate-180'}>{step.name}</span>
              </button>
              {isOpen && (
                <div className="grid px-5 pb-6 md:absolute md:inset-0 md:flex md:flex-col md:justify-between md:p-6">
                  <span className="hidden text-s4 md:block">{step.name}</span>
                  <p className="max-w-[36ch] text-s2">{step.body}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
