import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { ACTION, BOOK_HREF, EMAIL } from '../content'

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

/** The live thing: move a lead to its next stage and watch the board update. */
function Dashboard() {
  const [leads, setLeads] = useState(START)
  const advance = (id: number) =>
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: STAGES[Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1)] } : l)))
  const count = (s: Stage) => leads.filter((l) => l.stage === s).length
  return (
    <div data-ui className="h-full w-full flex flex-col" aria-live="polite">
      <div className="ui-bar"><span>Contractor lead dashboard</span><span className="ui-dim">Demo, try it</span></div>
      <div className="ui-counts">
        {(['new', 'quoted', 'booked', 'completed'] as Stage[]).map((s) => (
          <div className="ui-count" key={s}><b>{count(s)}</b><span className="ui-dim">{LABEL[s]}</span></div>
        ))}
      </div>
      <div className="flex-1">
        {leads.map((l) => (
          <div className="ui-row" key={l.id}>
            <span className="ui-cell">
              <span className="font-bold block">{l.name}</span>
              <span className="ui-dim block">{l.job} · {l.town} · {l.photos} photos</span>
            </span>
            <span className={`ui-chip ui-chip-${l.stage}`}>{LABEL[l.stage]}</span>
            <button type="button" className="ui-button" disabled={l.stage === 'completed'} onClick={() => advance(l.id)}>
              {NEXT[l.stage]}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Showcase() {
  const root = useRef<HTMLElement>(null)
  const [tab, setTab] = useState<'Leads' | 'Quotes' | 'Jobs'>('Leads')
  useReveal(root, '[data-part]', 'rise')
  return (
    <section ref={root} id="demo" className="grid min-h-[88svh] grid-cols-1 bg-teal text-navy md:grid-cols-2">
      <div className="flex items-center p-4 md:p-10">
        <div data-part className="aspect-square w-full">
          <Dashboard />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 p-4 pb-10 md:p-10">
        <div data-part className="flex gap-6 text-s2 font-bold" role="tablist" aria-label="Views in the demo">
          {(['Leads', 'Quotes', 'Jobs'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`plain-link bg-transparent p-0 ${tab === t ? 'text-navy' : 'text-navy-tint-1'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div data-part>
          <h2 className="text-s4">One dashboard, every lead</h2>
          <p className="mt-12 max-w-[34ch] text-s2">
            {tab === 'Leads' &&
              'A contractor takes quote requests on the website. Each one lands here with the photos and the job details, and the owner moves it along with one tap.'}
            {tab === 'Quotes' &&
              'Quotes go out from the same screen, with the photos attached, and the follow-up date is set the moment a quote is sent.'}
            {tab === 'Jobs' &&
              'Booked jobs land on the calendar the crew sees, and past customers can be searched or exported whenever you need them.'}
          </p>
        </div>
        <div data-part className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <a href={BOOK_HREF} className="action action-navy bg-navy text-paper min-h-[72px]">{ACTION}</a>
          <a href={`mailto:${EMAIL}`} className="action action-paper bg-paper text-navy min-h-[72px]">Email me</a>
        </div>
      </div>
    </section>
  )
}
