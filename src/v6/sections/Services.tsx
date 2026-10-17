import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'

/** Four big text blocks: what it is, what kinds, what is included, what it runs on. No pictures; the river is the picture. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="services" className="services">
      <div className="sheet sheet-head">
        <p className="meta" data-reveal>{SERVICES.index}</p>
        <h2 className="h-display" data-reveal>{SERVICES.heading[0]}<br /><span className="serif-i">{SERVICES.heading[1]}</span></h2>
        <p className="intro" data-reveal>{SERVICES.intro}</p>
      </div>
      <ol className="service-list">
        {SERVICES.items.map((s, i) => (
          <li key={s.n} className={`sheet service${i % 2 ? ' service-right' : ''}`} id={`service-${i + 1}`}>
            <div className="service-head">
              <span className="service-n" aria-hidden="true">{s.n}</span>
              <div>
                <h3 className="service-title" data-reveal>{s.title}</h3>
                <p className="service-tag serif-i" data-reveal>{s.tagline}</p>
              </div>
            </div>
            <p className="service-body" data-reveal>{s.body}</p>
            <div className="service-groups">
              {s.groups.map((g) => (
                <div key={g.title} data-reveal>
                  <p className="meta group-title">{g.title}</p>
                  <ul className="points">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="service-stack" data-reveal>
              <span className="meta">Runs on</span>
              <ul className="pills">{s.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
