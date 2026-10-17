import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { DEMO } from '../content'

const STAGES = ['new', 'contacted', 'quoted', 'booked', 'completed'] as const
type Stage = (typeof STAGES)[number]
const LABEL: Record<Stage, string> = { new: 'New', contacted: 'Contacted', quoted: 'Quoted', booked: 'Booked', completed: 'Completed' }
const NEXT: Record<Stage, string> = { new: 'Mark contacted', contacted: 'Send quote', quoted: 'Mark booked', booked: 'Mark completed', completed: 'Done' }
type Lead = { id: number; name: string; job: string; town: string; photos: number; stage: Stage }
const START: Lead[] = [
  { id: 1, name: 'Dana Whitfield', job: 'Website and booking for a clinic', town: 'Oak Hill', photos: 3, stage: 'new' },
  { id: 2, name: 'Marcus Lee', job: 'Stock tool for two shops', town: 'Riverside', photos: 5, stage: 'contacted' },
  { id: 3, name: 'Priya Natarajan', job: 'Client portal for an agency', town: 'Elm Park', photos: 2, stage: 'quoted' },
  { id: 4, name: 'Tom Okafor', job: 'Spreadsheet to database', town: 'Oak Hill', photos: 1, stage: 'booked' },
]

function Dashboard() {
  const [leads, setLeads] = useState(START)
  const advance = (id: number) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: STAGES[Math.min(STAGES.indexOf(l.stage) + 1, STAGES.length - 1)] } : l)))
  const count = (s: Stage) => leads.filter((l) => l.stage === s).length
  return (
    <div className="dash" data-ui aria-live="polite">
      <div className="dash-top"><span>Lead dashboard</span><span className="meta">Live</span></div>
      <div className="dash-stats">
        {(['new', 'quoted', 'booked', 'completed'] as Stage[]).map((s) => (
          <div key={s}><div className="dash-num">{count(s)}</div><div className="meta">{LABEL[s]}</div></div>
        ))}
      </div>
      {leads.map((l) => (
        <div className="dash-row" key={l.id}>
          <div className="dash-who"><div className="dash-name">{l.name}</div><div className="dash-job">{l.job} · {l.town} · {l.photos} files</div></div>
          <span className={`chip-stage chip-${l.stage}`}>{LABEL[l.stage]}</span>
          <button type="button" className="dash-btn" disabled={l.stage === 'completed'} onClick={() => advance(l.id)}>{NEXT[l.stage]}</button>
        </div>
      ))}
    </div>
  )
}

export function Demo() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="demo" className="demo">
      <div className="sheet demo-words">
        <p className="meta" data-reveal>{DEMO.index}</p>
        <h2 className="h-display" data-reveal>{DEMO.heading[0]}<br /><span className="serif-i">{DEMO.heading[1]}</span></h2>
        <p className="demo-body" data-reveal>{DEMO.body}</p>
      </div>
      <div className="demo-panel sheet" data-reveal><Dashboard /></div>
    </section>
  )
}
