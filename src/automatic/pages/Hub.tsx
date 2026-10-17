import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { useWords } from '../scroll/useWords'
import { DIVISIONS, GROUP, photo } from '../content'
import { href } from '../router'
import { Contact } from '../ui/Contact'
import { Count } from '../ui/Count'

/** The group page: the estate, one statement, six divisions in a clean grid, the numbers, why the group, the timeline, the form. */
export function Hub() {
  const a = useRef<HTMLElement>(null), b = useRef<HTMLElement>(null), c = useRef<HTMLElement>(null), d = useRef<HTMLElement>(null), e = useRef<HTMLElement>(null)
  useReveal(a); useReveal(b); useReveal(c); useReveal(d); useReveal(e); useWords(a)
  const i = (n: number) => ({ '--i': n } as React.CSSProperties)
  return (
    <>
      <section id="top" className="hero" aria-label="Introduction">
        <div className="hero-photos" aria-hidden="true"><img src={photo('hub-hero')} alt="" width={1920} height={1080} className="hero-photo is-active" fetchPriority="high" /></div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-foot">
          <div className="hero-left">
            <h1 className="hero-title lines">
              <span className="line"><span data-line style={i(0)}>{GROUP.headline[0]}</span></span>
              <span className="line"><span data-line style={i(1)}>{GROUP.headline[1]}</span></span>
            </h1>
          </div>
          <div className="hero-right" data-rise style={i(2)}>
            <p className="hero-support">{GROUP.support}</p>
            <a href={GROUP.phoneHref} className="button button-light">Call {GROUP.phone}</a>
          </div>
        </div>
      </section>

      <section ref={a} className="statement">
        <p className="statement-words" data-words>{GROUP.statement}</p>
        <ul className="statement-clients" data-reveal>
          <li className="small muted">Trusted by</li>
          {GROUP.clients.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section ref={b} id="divisions" className="divisions band">
        <div className="section-head">
          <h2 className="h-section" data-reveal>Six divisions, one phone number</h2>
          <p className="lead" data-reveal>Each with its own crews, its own craft and its own page. Choose one, or ask for all of them.</p>
        </div>
        <ol className="div-grid">
          {DIVISIONS.map((dv, n) => (
            <li key={dv.id} className="div-card">
              <a href={href(dv.id)} className="div-link">
                <div className="div-pic" data-shutter><img src={dv.hero} alt={dv.heroAlt} width={1200} height={800} loading="lazy" /></div>
                <div className="div-body" data-reveal>
                  <div className="div-row small"><span>0{n + 1}</span><span>{dv.brand}</span></div>
                  <h3 className="div-title">{dv.name.join(' ')}</h3>
                  <p className="div-line">{dv.tagline}</p>
                  <ul className="div-stats small">{dv.stats.slice(0, 2).map((s) => <li key={s.label}><strong>{s.value}</strong> {s.label}</li>)}</ul>
                  <span className="div-go">See the division</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section ref={c} className="numbers">
        <dl className="numbers-grid">
          {GROUP.numbers.map((n) => <div key={n.label} className="number" data-reveal><dt className="number-value"><Count value={n.value} suffix={n.suffix} /></dt><dd className="small muted">{n.label}</dd></div>)}
        </dl>
      </section>

      <section ref={d} id="about" className="why">
        <div className="section-head">
          <h2 className="h-section" data-reveal>Why one group</h2>
          <p className="lead" data-reveal>Most estates end up with five contractors who have never met. Ours have shared a yard in Hempstead since 1958.</p>
        </div>
        <ul className="why-grid">
          {GROUP.why.map((w, n) => <li key={w.title} className="why-item" data-reveal><span className="why-n">0{n + 1}</span><h3 className="why-title">{w.title}</h3><p className="why-body">{w.body}</p></li>)}
        </ul>
      </section>

      <section ref={e} className="timeline band">
        <div className="section-head">
          <h2 className="h-section" data-reveal>Sixty-six years in six lines</h2>
        </div>
        <ol className="tl">
          {GROUP.timeline.map((t) => <li key={t.year} className="tl-item" data-reveal><span className="tl-year">{t.year}</span><p className="tl-text">{t.text}</p></li>)}
        </ol>
      </section>

      <Contact />
    </>
  )
}
