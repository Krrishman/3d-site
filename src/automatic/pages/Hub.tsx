import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { DIVISIONS, GROUP, photo } from '../content'
import { href } from '../router'
import { Contact } from '../ui/Contact'

/** The group page: one estate at golden hour, the six divisions as a gallery wall, the family's story, one form. */
export function Hub() {
  const root = useRef<HTMLElement>(null)
  const story = useRef<HTMLElement>(null)
  useReveal(root)
  useReveal(story)
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
            <a href="#contact" className="button button-light">{GROUP.cta}</a>
          </div>
        </div>
      </section>

      <section ref={root} id="divisions" className="work band">
        <div className="work-grid">
          <div className="work-head" style={{ gridArea: 't' }}>
            <h2 className="work-heading" data-reveal>Six<br />divisions</h2>
            <p className="work-intro" data-reveal>Each with its own crews, its own craft and its own page. Choose one.</p>
          </div>
          {DIVISIONS.map((d, n) => {
            const areas = ['a', 'b', 'c', 'd', 'f', 'h'] as const
            const span = ['wide', 'tall', 'tall', 'tall', 'wide', 'wide'][n]
            return (
              <a key={d.id} href={href(d.id)} className={`tile tile-${span} tile-link`} style={{ gridArea: areas[n] }}>
                <div className="tile-pic" data-shutter><img src={d.hero} alt={d.heroAlt} width={span === 'wide' ? 1200 : 800} height={span === 'wide' ? 800 : 1000} loading="lazy" /></div>
                <div className="tile-caption" data-reveal>
                  <div className="tile-row small"><span>{d.name.join(' ')}</span><span>{d.brand}</span></div>
                  <p className="tile-line small">{d.tagline}</p>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <section ref={story} id="about" className="about">
        <h2 className="about-heading" data-reveal>Same address, same family, since {GROUP.since}</h2>
        <p className="about-lead lead" data-reveal>{GROUP.about}</p>
        <dl className="about-facts about-facts-row">
          {GROUP.facts.map((f) => <div key={f.label} data-reveal><dt className="small muted">{f.label}</dt><dd>{f.value}</dd></div>)}
        </dl>
      </section>

      <Contact />
    </>
  )
}
