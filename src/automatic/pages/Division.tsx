import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { useWords } from '../scroll/useWords'
import { GROUP, type Division } from '../content'
import { Contact } from '../ui/Contact'

/** One division: hero, statement and figures, six services, what is included, two pictures, how a job runs, questions, the form. */
export function DivisionPage({ d }: { d: Division }) {
  const a = useRef<HTMLElement>(null), b = useRef<HTMLElement>(null), c = useRef<HTMLElement>(null), e = useRef<HTMLElement>(null), f = useRef<HTMLElement>(null)
  useReveal(a); useReveal(b); useReveal(c); useReveal(e); useReveal(f); useWords(a)
  const [open, setOpen] = useState(0)
  const i = (n: number) => ({ '--i': n } as React.CSSProperties)
  return (
    <>
      <section id="top" className="hero hero-division" aria-label={d.name.join(' ')}>
        <div className="hero-photos" aria-hidden="true"><img src={d.hero} alt="" width={1920} height={1080} className="hero-photo is-active" fetchPriority="high" /></div>
        <div className="hero-scrim" aria-hidden="true" />
        <p className="hero-crumb small" data-rise style={i(0)}>{d.brand}</p>
        <div className="hero-foot">
          <div className="hero-left">
            <h1 className="hero-title lines">
              <span className="line"><span data-line style={i(0)}>{d.name[0]}</span></span>
              <span className="line"><span data-line style={i(1)}>{d.name[1]}</span></span>
            </h1>
          </div>
          <div className="hero-right" data-rise style={i(2)}>
            <p className="hero-support">{d.tagline}</p>
            <a href={d.contact.phoneHref} className="button button-light">Call {d.contact.phone}</a>
          </div>
        </div>
      </section>

      <section ref={a} className="stats">
        <p className="statement-words statement-words-sm" data-words>{d.intro}</p>
        <dl className="stats-row">
          {d.stats.map((s) => <div key={s.label} className="stat" data-reveal><dt className="stat-value">{s.value}</dt><dd className="small muted">{s.label}</dd></div>)}
        </dl>
      </section>

      <section ref={b} className="services">
        <div className="section-head">
          <h2 className="h-section" data-reveal>What we do</h2>
          <p className="lead" data-reveal>{d.intro2}</p>
        </div>
        <ul className="svc-grid">
          {d.services.map((s, n) => <li key={s.title} className="svc" data-reveal><span className="svc-n small muted">0{n + 1}</span><h3 className="svc-title">{s.title}</h3><p className="svc-body">{s.body}</p></li>)}
        </ul>
      </section>

      <section ref={c} className="includes band">
        <div className="includes-grid">
          <div>
            <h2 className="h-section" data-reveal>What every project includes</h2>
            <p className="lead" data-reveal>Service area: {d.areas}</p>
          </div>
          <ul className="points" data-reveal>{d.includes.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="gallery">
          {d.gallery.map((g) => <figure key={g.src} className="gallery-item" data-shutter><img src={g.src} alt={g.alt} width={1500} height={1000} loading="lazy" /></figure>)}
        </div>
      </section>

      <section ref={e} className="process-simple">
        <div className="section-head">
          <h2 className="h-section" data-reveal>How a job runs</h2>
          {d.quote && <blockquote className="quote" data-reveal><p>“{d.quote.text}”</p><footer className="small muted">{d.quote.who}</footer></blockquote>}
        </div>
        <ol className="steps">
          {d.process.map((p, n) => <li key={p.lead} className="step" data-reveal><span className="step-n">0{n + 1}</span><p><strong>{p.lead}</strong> {p.body}</p></li>)}
        </ol>
      </section>

      <section ref={f} className="questions">
        <div className="section-head">
          <h2 className="h-section" data-reveal>Questions we are asked</h2>
          <p className="division-links small" data-reveal>
            <a href={d.contact.phoneHref} className="link">{d.contact.phone}</a> · <a href={`mailto:${d.contact.email}`} className="link">{d.contact.email}</a>
          </p>
        </div>
        <ul className="qa">
          {d.faq.map((it, n) => {
            const isOpen = open === n
            return (
              <li key={it.q} className={`qa-item${isOpen ? ' is-open' : ''}`} data-reveal>
                <button type="button" className="qa-q" aria-expanded={isOpen} aria-controls={`qa-${n}`} id={`qa-btn-${n}`} onClick={() => setOpen(isOpen ? -1 : n)}>
                  <span className="qa-text">{it.q}</span><span className="qa-plus" aria-hidden="true" />
                </button>
                <div id={`qa-${n}`} role="region" aria-labelledby={`qa-btn-${n}`} className="qa-a" hidden={!isOpen}><p>{it.a}</p></div>
              </li>
            )
          })}
        </ul>
      </section>

      <Contact preset={d.id} />
    </>
  )
}
