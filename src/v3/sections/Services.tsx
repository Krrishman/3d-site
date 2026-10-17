import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'

/** Everything hangs from one axis a third of the way in; each row carries one picture of a different size at the right margin. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="services" className="services">
      <div className="services-open">
        <h2 className="services-statement" data-reveal>{SERVICES.statement}</h2>
      </div>
      <ul className="services-rows">
        {SERVICES.rows.map((r) => (
          <li key={r.title} className="service-row">
            <div className="service-text">
              <h3 className="service-title" data-reveal>{r.title}</h3>
              <p className="service-body" data-reveal>{r.body}</p>
            </div>
            <div className={`service-pic service-pic-${r.shape}`} data-shutter>
              <img src={r.src} alt={`${r.title}: a screen from a recent build`} width={800} height={800} loading="lazy" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
