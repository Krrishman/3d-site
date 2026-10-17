import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { DEMO } from '../content'

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
  const advance = (id: number) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: STAGES[Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1)] } : l)))
  const count = (s: Stage) => leads.filter((l) => l.stage === s).length
  return (
    <div className="glass ui overflow-hidden" aria-live="polite">
      <div className="grid grid-cols-4">
        {(['new', 'quoted', 'booked', 'completed'] as Stage[]).map((s) => (
          <div key={s} className="px-4 py-4">
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
  useReveal(root)
  return (
    <section ref={root} id="demo" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-reveal className="eyebrow mb-4">{DEMO.kicker}</p>
          <h2 data-reveal className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1]">{DEMO.title}</h2>
          <p data-reveal className="mt-5 text-lg text-mist">{DEMO.line}</p>
        </div>
        <div data-reveal className="md:col-span-7 md:col-start-6"><Dashboard /></div>
      </div>
    </section>
  )
}
