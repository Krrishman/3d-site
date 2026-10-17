import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'

/** Four rows: the words on the left, what is included beneath them, a picture of a different size on the right. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="services" className="services">
      <div className="services-open">
        <h2 className="services-statement" data-reveal>{SERVICES.statement}</h2>
        <p className="services-intro lead" data-reveal>{SERVICES.intro}</p>
      </div>
      <ul className="services-rows">
        {SERVICES.rows.map((r) => (
          <li key={r.title} className="service-row">
            <div className="service-text">
              <h3 className="service-title" data-reveal>{r.title}</h3>
              <p className="service-body" data-reveal>{r.body}</p>
              <ul className="service-includes" data-reveal aria-label={`Included in ${r.title}`}>
                {r.includes.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className={`service-pic service-pic-${r.shape}`} data-shutter>
              <img src={r.src} alt={`${r.title}: a screen from a recent build`} width={1200} height={800} loading="lazy" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
