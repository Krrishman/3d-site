import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { WORK } from '../content'

/** Eight pieces of work as tiles on a four-column board; each says what it did for the business. */
export function Work() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="work" className="work band">
      <div className="work-grid">
        <div className="work-head" style={{ gridArea: 't' }}>
          <h2 className="work-heading" data-reveal>{WORK.heading[0]}<br />{WORK.heading[1]}</h2>
          <p className="work-intro" data-reveal>{WORK.intro}</p>
        </div>
        {WORK.tiles.map((t) => (
          <figure key={t.area} className={`tile tile-${t.span}`} style={{ gridArea: t.area }}>
            <div className="tile-pic" data-shutter>
              <img src={t.src} alt={t.name} width={t.span === 'wide' ? 1200 : 800} height={t.span === 'wide' ? 800 : 1000} loading="lazy" />
            </div>
            <figcaption className="tile-caption" data-reveal>
              <div className="tile-row small"><span>{t.name}</span><span>{t.kind}</span></div>
              <p className="tile-line small">{t.line}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
