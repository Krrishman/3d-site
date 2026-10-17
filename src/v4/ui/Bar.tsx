import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { BOOK, BOOK_HREF, LINKS, NAME } from '../content'
import { FlowMark } from './FlowMark'

/** Wordmark left, the sections in the middle, one action right. White over the hero, paper after it. */
export function Bar() {
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const t = ScrollTrigger.create({ trigger: hero, start: 'top -45%', onEnter: () => setScrolled(true), onLeaveBack: () => setScrolled(false) })
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter((s): s is HTMLElement => Boolean(s))
    const ts = sections.map((s) => ScrollTrigger.create({ trigger: s, start: 'top 50%', end: 'bottom 50%', onToggle: (self) => { if (self.isActive) setCurrent('#' + s.id) } }))
    return () => { t.kill(); ts.forEach((x) => x.kill()) }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`bar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a href="#top" className="bar-name" aria-label={`${NAME}, top of page`} onClick={() => setOpen(false)}>
        <FlowMark className="bar-mark" title="" />
        <span>{NAME}</span>
      </a>
      <nav className="bar-links" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={current === l.href ? 'is-current' : ''} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href={BOOK_HREF} className="button bar-links-action" onClick={() => setOpen(false)}>{BOOK}</a>
      </nav>
      <a href={BOOK_HREF} className="button bar-action">{BOOK}</a>
      <button type="button" className="bar-menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
    </header>
  )
}
