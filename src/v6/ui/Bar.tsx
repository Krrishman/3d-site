import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { BOOK, BOOK_HREF, LINKS, NAME, THEMES } from '../content'
import { FlowMark } from './FlowMark'

function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'forge' }

/** Wordmark left, the sections in a pill, one action right, and a small palette switch. */
export function Bar() {
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    const t = ScrollTrigger.create({ start: 80, onUpdate: (self) => setScrolled(self.scroll() > 80) })
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
  const pick = (id: string) => { document.documentElement.setAttribute('data-theme', id); try { localStorage.setItem('ff-theme', id) } catch { /* private mode */ } setTheme(id) }

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
      <div className="bar-right">
        <div className="swatches" role="group" aria-label="Colour theme">
          {THEMES.map((t) => <button key={t.id} type="button" className={`swatch swatch-${t.id}${theme === t.id ? ' is-on' : ''}`} aria-pressed={theme === t.id} title={t.label} onClick={() => pick(t.id)}><span className="sr">{t.label}</span></button>)}
        </div>
        <a href={BOOK_HREF} className="button button-ghost bar-action">{BOOK}</a>
        <button type="button" className="bar-menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
      </div>
    </header>
  )
}
