import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { WORK } from '../content'

/** Eight pieces of work as tiles on a four-column board, some cells left empty on purpose. */
export function Work() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="work" className="work field">
      <div className="work-grid">
        <h2 className="work-heading" style={{ gridArea: "t" }} data-reveal>
          {WORK.heading[0]}<br />{WORK.heading[1]}
        </h2>
        {WORK.tiles.map((t) => (
          <figure key={t.area} className={`tile tile-${t.span}`} style={{ gridArea: t.area }}>
            <div className="tile-pic" data-shutter>
              <img src={t.src} alt={t.name} width={t.span === 'wide' ? 1200 : 800} height={t.span === 'wide' ? 800 : 1000} loading="lazy" />
            </div>
            <figcaption className="tile-caption small" data-reveal>
              <span>{t.name}</span>
              <span>{t.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
