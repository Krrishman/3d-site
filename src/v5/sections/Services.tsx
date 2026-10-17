import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'

/** Four tall panels, each a blue-hour photograph with the words set into its dark half. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="services" className="services">
      <div className="services-head">
        <p className="meta" data-reveal>{SERVICES.index}</p>
        <h2 className="h-display" data-reveal>{SERVICES.heading[0]}<br /><span className="serif-i">{SERVICES.heading[1]}</span></h2>
        <p className="services-intro" data-reveal>{SERVICES.intro}</p>
      </div>
      <ul className="panels">
        {SERVICES.cards.map((c, i) => (
          <li key={c.title} className="panel" data-shutter>
            <img className="panel-photo" src={c.photo} alt={c.alt} width={1600} height={1000} loading="lazy" />
            <div className="panel-scrim" aria-hidden="true" />
            <div className="panel-body">
              <p className="meta">0{i + 1}</p>
              <h3 className="panel-title">{c.title}</h3>
              <p className="panel-text">{c.body}</p>
              <ul className="panel-includes">{c.includes.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
