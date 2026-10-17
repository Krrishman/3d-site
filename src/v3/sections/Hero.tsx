import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { BOOK, BOOK_HREF, HERO, TRADES } from '../content'

const HOLD = 5500

/**
 * One photograph fills the screen: a job site at seven in the morning, the sky
 * left empty for the type. Pick a trade and the photograph crossfades to that
 * trade's site, and the card shows the website I would build for it.
 */
export function Hero() {
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)
  const reduced = useReducedMotion()
  const card = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLElement>(null)

  // Slow crossfade until the visitor picks; paused while the tab is hidden.
  useEffect(() => {
    if (reduced || picked) return
    let id = 0
    const start = () => { stop(); id = window.setInterval(() => setActive((a) => (a + 1) % TRADES.length), HOLD) }
    const stop = () => { if (id) window.clearInterval(id); id = 0 }
    const vis = () => (document.hidden ? stop() : start())
    start()
    document.addEventListener('visibilitychange', vis)
    return () => { stop(); document.removeEventListener('visibilitychange', vis) }
  }, [reduced, picked])

  // The card leans with the pointer. Transform only.
  useEffect(() => {
    if (reduced) return
    const el = card.current, sec = root.current
    if (!el || !sec) return
    let raf = 0, tx = 0, ty = 0
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `perspective(1200px) rotateY(${tx * 7}deg) rotateX(${-ty * 5}deg)` })
    }
    const onLeave = () => { el.style.transform = '' }
    sec.addEventListener('pointermove', onMove, { passive: true })
    sec.addEventListener('pointerleave', onLeave)
    return () => { sec.removeEventListener('pointermove', onMove); sec.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf) }
  }, [reduced])

  const pick = (i: number) => { setActive(i); setPicked(true) }
  const t = TRADES[active]

  return (
    <section ref={root} id="top" className="hero" aria-label="Introduction">
      <div className="hero-photos" aria-hidden="true">
        {TRADES.map((tr, i) => (
          <img key={tr.id} src={tr.photo} alt="" width={1920} height={1080} className={`hero-photo${i === active ? ' is-active' : ''}`} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-card-wrap">
        <div ref={card} className="hero-card" data-ui>
          {TRADES.map((tr, i) => (
            <img key={tr.id} src={tr.site} alt={i === active ? `The website for a ${tr.caption.toLowerCase()}` : ''} width={1280} height={800} className={i === active ? 'is-active' : ''} loading="lazy" />
          ))}
        </div>
        <p className="hero-card-caption small" aria-live="polite">{t.caption}</p>
      </div>

      <div className="hero-foot">
        <div className="hero-left">
          <h1 className="hero-title lines">
            <span className="line"><span data-line style={{ '--i': 0 } as React.CSSProperties}>{HERO.headline[0]}</span></span>
            <span className="line"><span data-line style={{ '--i': 1 } as React.CSSProperties}>{HERO.headline[1]}</span></span>
          </h1>
          <div className="hero-pick" data-rise style={{ '--i': 2 } as React.CSSProperties} role="group" aria-label={HERO.pick}>
            <span className="small hero-pick-label">{HERO.pick}</span>
            {TRADES.map((tr, i) => (
              <button key={tr.id} type="button" className={`pick${i === active ? ' is-active' : ''}`} aria-pressed={i === active} onClick={() => pick(i)}>{tr.label}</button>
            ))}
          </div>
        </div>
        <div className="hero-right" data-rise style={{ '--i': 3 } as React.CSSProperties}>
          <p className="hero-support">{HERO.support}</p>
          <a href={BOOK_HREF} className="button button-light">{BOOK}</a>
        </div>
      </div>
    </section>
  )
}
