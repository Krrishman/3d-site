import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { BOOK, BOOK_HREF, HERO, media } from '../content'

/** A river of molten metal in the dark, looping. The type sits in the empty upper half and the bottom-left corner. */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const film = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = film.current, sec = root.current
    if (!el || !sec) return
    let raf = 0, x = 0, y = 0
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect()
      x = ((e.clientX - r.left) / r.width - 0.5) * 2
      y = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `scale(1.08) translate(${-x * 1.2}%, ${-y * 0.8}%)` })
    }
    sec.addEventListener('pointermove', onMove, { passive: true })
    return () => { sec.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [reduced])

  const i = (n: number) => ({ '--i': n } as React.CSSProperties)

  return (
    <section ref={root} id="top" className="hero" aria-label="Introduction">
      <div ref={film} className="hero-film" aria-hidden="true">
        <video className="hero-video" autoPlay={!reduced} muted loop playsInline poster={media('hero-poster.jpg')} preload="auto">
          <source src={media('hero-web.mp4')} type="video/mp4" />
        </video>
      </div>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-top">
        <p className="meta" data-rise style={i(0)}>{HERO.kicker}</p>
        <p className="meta meta-right" data-rise style={i(0)}>{HERO.index}</p>
      </div>

      <div className="hero-foot">
        <div className="hero-left">
          <h1 className="hero-title lines">
            <span className="line"><span data-line style={i(0)}>{HERO.line1}</span></span>
            <span className="line"><span data-line style={i(1)} className="serif-i accent-ink">{HERO.accent}</span></span>
          </h1>
          <p className="hero-support" data-rise style={i(2)}>{HERO.support}</p>
          <div className="hero-actions" data-rise style={i(3)}>
            <a href={BOOK_HREF} className="button">{BOOK}</a>
            <a href="#work" className="button button-ghost">{HERO.secondary}</a>
          </div>
        </div>
        <div className="hero-right" data-rise style={i(3)}>
          <div className="chip" data-ui>
            <span className="chip-dot" aria-hidden="true" />
            <span className="chip-label">{HERO.live.label}</span>
            <ul className="chip-list">{HERO.live.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
          <a href="#statement" className="scroll-cue"><span>{HERO.scroll}</span><span className="scroll-line" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
