import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { DIVISIONS, GROUP } from '../content'
import { href } from '../router'

/** Group name left, the six divisions across, one action right. Paper after the hero. */
export function Bar({ current }: { current: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = ScrollTrigger.create({ start: 0, onUpdate: (self) => setScrolled(self.scroll() > innerHeight * 0.55) })
    return () => t.kill()
  }, [current])
  return (
    <header className={`bar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a href={href('')} className="bar-name" aria-label={`${GROUP.name}, home`}>
        <span className="bar-mark" aria-hidden="true">A</span>
        <span>{GROUP.name}</span>
      </a>
      <nav className="bar-links" aria-label="Divisions">
        {DIVISIONS.map((d) => <a key={d.id} href={href(d.id)} className={current === d.id ? 'is-current' : ''} onClick={() => setOpen(false)}>{d.nav}</a>)}
        <a href={GROUP.phoneHref} className="button bar-links-action">{GROUP.phone}</a>
      </nav>
      <a href="#contact" className="button bar-action">{GROUP.cta}</a>
      <button type="button" className="bar-menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
    </header>
  )
}
