import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { GROUP, type Division } from '../content'
import { href } from '../router'
import { Contact } from '../ui/Contact'

/** One division: its hero, the numbers, what it does, how a job runs, two pictures, a word from a client, the form. */
export function DivisionPage({ d }: { d: Division }) {
  const stats = useRef<HTMLElement>(null)
  const services = useRef<HTMLElement>(null)
  const process = useRef<HTMLElement>(null)
  useReveal(stats); useReveal(services); useReveal(process)
  const i = (n: number) => ({ '--i': n } as React.CSSProperties)
  return (
    <>
      <section id="top" className="hero hero-division" aria-label={d.name.join(' ')}>
        <div className="hero-photos" aria-hidden="true"><img src={d.hero} alt="" width={1920} height={1080} className="hero-photo is-active" fetchPriority="high" /></div>
        <div className="hero-scrim" aria-hidden="true" />
        <p className="hero-crumb small" data-rise style={i(0)}><a href={href('')}>{GROUP.name}</a> · {d.brand}</p>
        <div className="hero-foot">
          <div className="hero-left">
            <h1 className="hero-title lines">
              <span className="line"><span data-line style={i(0)}>{d.name[0]}</span></span>
              <span className="line"><span data-line style={i(1)}>{d.name[1]}</span></span>
            </h1>
          </div>
          <div className="hero-right" data-rise style={i(2)}>
            <p className="hero-support">{d.tagline}</p>
            <a href="#contact" className="button button-light">{GROUP.cta}</a>
          </div>
        </div>
      </section>

      <section ref={stats} className="stats">
        <p className="stats-intro lead" data-reveal>{d.intro}</p>
        <dl className="stats-row">
          {d.stats.map((s) => <div key={s.label} data-reveal><dt className="stat-value">{s.value}</dt><dd className="small muted">{s.label}</dd></div>)}
        </dl>
      </section>

      <section ref={services} className="services">
        <div className="services-open">
          <h2 className="services-statement" data-reveal>What we do</h2>
          <p className="services-intro lead" data-reveal>{d.intro2}</p>
        </div>
        <ul className="svc-grid">
          {d.services.map((s) => <li key={s.title} className="svc" data-reveal><h3 className="svc-title">{s.title}</h3><p className="svc-body">{s.body}</p></li>)}
        </ul>
        <div className="gallery">
          {d.gallery.map((g) => <figure key={g.src} className={`gallery-${g.ratio}`} data-shutter><img src={g.src} alt={g.alt} width={g.ratio === 'portrait' ? 900 : 1500} height={g.ratio === 'portrait' ? 1200 : 1000} loading="lazy" /></figure>)}
        </div>
      </section>

      <section ref={process} className="process-simple">
        <h2 className="process-heading" data-reveal>How a job runs</h2>
        <ol className="steps">
          {d.process.map((p) => <li key={p.lead} className="step" data-reveal><p><strong>{p.lead}</strong> {p.body}</p></li>)}
        </ol>
        {d.quote && <blockquote className="quote" data-reveal><p>“{d.quote.text}”</p><footer className="small muted">{d.quote.who}</footer></blockquote>}
        <p className="division-links small" data-reveal>
          <a href={d.contact.phoneHref} className="link">{d.contact.phone}</a> · <a href={`mailto:${d.contact.email}`} className="link">{d.contact.email}</a> · <a href={d.external} className="link" target="_blank" rel="noreferrer">Current {d.brand} site</a>
        </p>
      </section>

      <Contact preset={d.id} />
    </>
  )
}
