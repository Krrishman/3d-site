import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { BOOK, BOOK_HREF, LINKS, NAME } from '../content'

/** Letterhead over the hero photograph; a plain paper bar once the hero has gone. */
export function Bar() {
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const t = ScrollTrigger.create({ trigger: hero, start: 'top -45%', onEnter: () => setScrolled(true), onLeaveBack: () => setScrolled(false) })
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter((s): s is HTMLElement => Boolean(s))
    const ts = sections.map((s) => ScrollTrigger.create({ trigger: s, start: 'top 50%', end: 'bottom 50%', onToggle: (self) => { if (self.isActive) setCurrent('#' + s.id) } }))
    return () => { t.kill(); ts.forEach((x) => x.kill()) }
  }, [])
  return (
    <header ref={ref} className={`bar${scrolled ? ' is-scrolled' : ''}`}>
      <a href="#top" className="bar-name" aria-label="FlowForge Digital, top of page">
        <span>{NAME[0]}</span>
        <span>{NAME[1]}</span>
      </a>
      <nav className="bar-links" aria-label="Sections">
        {LINKS.map((l, i) => (
          <span key={l.href}>
            <a href={l.href} className={current === l.href ? 'is-current' : ''}>{l.label}</a>
            {i < LINKS.length - 1 ? <span className="sep">, </span> : null}
          </span>
        ))}
      </nav>
      <a href={BOOK_HREF} className="button bar-action">{BOOK}</a>
    </header>
  )
}
