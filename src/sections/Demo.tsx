import { useRef, useState } from 'react'
import { useStage } from '../scroll/useStage'
import { useReveal } from '../scroll/useReveal'
import { BOOK_HREF, DEMO, HERO } from '../content'

const STAGES = ['new', 'contacted', 'quoted', 'booked', 'completed'] as const
type Stage = (typeof STAGES)[number]
const LABEL: Record<Stage, string> = { new: 'New', contacted: 'Contacted', quoted: 'Quoted', booked: 'Booked', completed: 'Completed' }
const NEXT: Record<Stage, string> = { new: 'Mark contacted', contacted: 'Send quote', quoted: 'Mark booked', booked: 'Mark completed', completed: 'Done' }
type Lead = { id: number; name: string; job: string; town: string; photos: number; stage: Stage }
const START: Lead[] = [
  { id: 1, name: 'Dana Whitfield', job: 'Replace back fence, 40 ft', town: 'Oak Hill', photos: 3, stage: 'new' },
  { id: 2, name: 'Marcus Lee', job: 'Deck stain and repair', town: 'Riverside', photos: 5, stage: 'contacted' },
  { id: 3, name: 'Priya Natarajan', job: 'Kitchen cabinet install', town: 'Elm Park', photos: 2, stage: 'quoted' },
  { id: 4, name: 'Tom Okafor', job: 'Garage door frame', town: 'Oak Hill', photos: 1, stage: 'booked' },
]

function Dashboard() {
  const [leads, setLeads] = useState(START)
  const advance = (id: number) =>
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: STAGES[Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1)] } : l)))
  const count = (s: Stage) => leads.filter((l) => l.stage === s).length
  return (
    <div className="panel ui overflow-hidden" aria-live="polite">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold">Lead dashboard</span>
        <span className="text-mist">Live demo. Try the buttons.</span>
      </div>
      <div className="grid grid-cols-4 border-t border-white/10">
        {(['new', 'quoted', 'booked', 'completed'] as Stage[]).map((s) => (
          <div key={s} className="px-4 py-3">
            <div className="text-2xl font-bold leading-none">{count(s)}</div>
            <div className="mt-1 text-xs text-mist">{LABEL[s]}</div>
          </div>
        ))}
      </div>
      {leads.map((l) => (
        <div className="ui-row" key={l.id}>
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold">{l.name}</div>
            <div className="truncate text-mist">{l.job} · {l.town} · {l.photos} photos</div>
          </div>
          <span className={`ui-chip ui-chip-${l.stage}`}>{LABEL[l.stage]}</span>
          <button type="button" className="ui-button" disabled={l.stage === 'completed'} onClick={() => advance(l.id)}>{NEXT[l.stage]}</button>
        </div>
      ))}
    </div>
  )
}

export function Demo() {
  const root = useRef<HTMLElement>(null)
  useStage(root, 5)
  useReveal(root)
  return (
    <section ref={root} id="demo" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow mb-4">{DEMO.kicker}</p>
          <h2 data-reveal className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1]">Contractor <span className="accent text-teal">lead dashboard</span></h2>
          <p data-reveal className="mt-6 text-lg text-mist">{DEMO.body}</p>
          <p data-reveal className="mt-6 font-semibold">The owner can:</p>
          <ul data-reveal className="mt-3 space-y-2 text-mist">
            {DEMO.can.map((c) => (
              <li key={c} className="flex gap-3"><span className="text-teal">•</span>{c}</li>
            ))}
          </ul>
          <p data-reveal className="mt-6 text-teal font-semibold">{DEMO.result}</p>
          <a data-reveal href={BOOK_HREF} className="btn btn-primary mt-8">{HERO.primary}</a>
        </div>
        <div data-reveal className="md:col-span-7 md:col-start-6"><Dashboard /></div>
      </div>
    </section>
  )
}
