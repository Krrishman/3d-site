import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { ABOUT } from '../content'

/** A wide photograph with a paper note on it, a flat colour tile with the mark, and four facts. */
export function About() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="about" className="about">
      <h2 className="about-heading" data-reveal>{ABOUT.heading}</h2>
      <p className="about-lead lead" data-reveal>{ABOUT.lead}</p>
      <div className="about-tiles">
        <figure className="about-photo">
          <div className="about-photo-pic" data-shutter>
            <img src={ABOUT.photo} alt={ABOUT.alt} width={1600} height={1000} loading="lazy" />
          </div>
          <figcaption className="about-note" data-reveal>{ABOUT.note}</figcaption>
        </figure>
        <div className="about-side">
          <div className="about-tile" aria-hidden="true" data-reveal>
            <svg viewBox="0 0 64 64" className="about-mark">
              <path d="M12 60V4h44v12H26v12h24v12H26v20z" fill="currentColor" />
              <circle cx="54" cy="54" r="5" fill="var(--accent)" />
            </svg>
          </div>
          <dl className="about-facts">
            {ABOUT.facts.map((f) => (
              <div key={f.label} data-reveal>
                <dt className="small muted">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
