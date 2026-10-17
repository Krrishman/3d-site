/**
 * Cropped fragments of the interfaces FlowForge builds, in HTML at true size.
 * Each root carries data-ui so the page's house rules do not apply inside.
 */

export function QuoteForm() {
  return (
    <div data-ui className="w-full max-w-[20rem]">
      <div className="ui-bar"><span>Request a quote</span><span className="ui-dim">2 of 3</span></div>
      <div className="p-3.5 grid gap-3">
        <label><span className="ui-label">What needs doing?</span><span className="ui-field">Replace back fence, about 40 ft</span></label>
        <label><span className="ui-label">Photos</span><span className="ui-field">3 photos attached</span></label>
        <span className="ui-button">Send request</span>
      </div>
    </div>
  )
}

export function LeadRows() {
  const rows = [
    ['Dana Whitfield', 'Back fence, 40 ft', 'Oak Hill', 'new'],
    ['Marcus Lee', 'Deck stain and repair', 'Riverside', 'contacted'],
    ['Priya Natarajan', 'Kitchen cabinets', 'Elm Park', 'quoted'],
    ['Tom Okafor', 'Garage door frame', 'Oak Hill', 'booked'],
  ] as const
  return (
    <div data-ui className="w-full max-w-[34rem]">
      <div className="ui-bar"><span>Quote requests</span><span className="ui-dim">Today, 4 new</span></div>
      {rows.map(([name, job, town, stage]) => (
        <div className="ui-row" key={name}>
          <span className="ui-cell font-bold">{name}</span>
          <span className="ui-cell ui-dim">{job}</span>
          <span className="ui-cell ui-dim hidden sm:block">{town}</span>
          <span className={`ui-chip ui-chip-${stage}`}>{stage[0].toUpperCase() + stage.slice(1)}</span>
        </div>
      ))}
    </div>
  )
}

export function Inventory() {
  const rows = [
    ['Cedar pickets, 6 ft', 212, 150, false],
    ['Galvanised screws, 3 in', 14, 40, true],
    ['Post concrete, 50 lb', 9, 20, true],
    ['Exterior stain, 1 gal', 31, 12, false],
  ] as const
  return (
    <div data-ui className="w-full max-w-[20rem]">
      <div className="ui-bar"><span>Stock</span><span className="ui-dim">Reorder at</span></div>
      {rows.map(([item, qty, min, low]) => (
        <div className="ui-row" key={item}>
          <span className="ui-cell">{item}</span>
          <span className="font-bold">{qty}</span>
          <span className="ui-dim">{min}</span>
          {low ? <span className="ui-chip ui-chip-alert">Reorder</span> : <span className="ui-chip ui-chip-booked">OK</span>}
        </div>
      ))}
    </div>
  )
}

export function Schedule() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeks: Record<string, [string, boolean][]>[] = [
    { Mon: [['Whitfield fence', false]], Tue: [['Whitfield fence', false], ['Lee deck, 2pm', true]], Thu: [['Okafor frame', true]], Fri: [['Natarajan cabinets', false]] },
    { Mon: [['Natarajan cabinets', false]], Wed: [['Lee deck, final', true]], Thu: [['Estimate, Elm Park', false]], Sat: [['Okafor frame', true]] },
  ]
  return (
    <div data-ui className="w-full max-w-[20rem]">
      <div className="ui-bar"><span>Next two weeks</span><span className="ui-dim">8 jobs</span></div>
      {weeks.map((jobs, w) => (
        <div className="ui-grid" key={w}>
          {days.map((d) => (
            <div className="ui-day" key={d}>
              <span className="ui-dim">{d}</span>
              {(jobs[d] ?? []).map(([j, teal]) => (
                <div className={`ui-job${teal ? ' ui-job-teal' : ''}`} key={j}>{j}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Migration() {
  return (
    <div data-ui className="w-full max-w-[20rem]">
      <div className="ui-bar"><span>Import customers.xlsx</span><span className="ui-dim">312 rows</span></div>
      <div className="ui-row"><span className="ui-cell ui-strike">dana w.   OAK HILL  5550142026</span></div>
      <div className="ui-row"><span className="ui-cell">Dana Whitfield · Oak Hill · (555) 014-2026</span></div>
      <div className="ui-row"><span className="ui-cell ui-strike">LEE,MARCUS,,riverside</span></div>
      <div className="ui-row"><span className="ui-cell">Marcus Lee · Riverside</span></div>
      <div className="ui-row"><span className="ui-cell ui-dim">18 duplicates merged · 7 missing phones flagged</span></div>
    </div>
  )
}

export function Inbox() {
  const rows = [
    ['Website form', 'Dana Whitfield', 'new'],
    ['Missed call', 'Unknown, Oak Hill', 'new'],
    ['Text message', 'Marcus Lee', 'contacted'],
    ['Website form', 'Priya Natarajan', 'quoted'],
    ['Phone', 'Tom Okafor', 'booked'],
  ] as const
  return (
    <div data-ui className="w-full h-full">
      <div className="ui-bar"><span>All leads</span><span className="ui-dim">One inbox</span></div>
      {rows.map(([src, who, stage]) => (
        <div className="ui-row" key={who}>
          <span className="ui-cell ui-dim">{src}</span>
          <span className="ui-cell font-bold">{who}</span>
          <span className={`ui-chip ui-chip-${stage}`}>{stage[0].toUpperCase() + stage.slice(1)}</span>
        </div>
      ))}
    </div>
  )
}
