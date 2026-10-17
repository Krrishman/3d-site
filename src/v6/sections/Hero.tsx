import { BOOK, BOOK_HREF, HERO } from '../content'

/** The river opens the page. The type sits over it, nothing else does. */
export function Hero() {
  const i = (n: number) => ({ '--i': n } as React.CSSProperties)
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="hero-top">
        <p className="meta" data-rise style={i(0)}>{HERO.kicker}</p>
        <p className="meta" data-rise style={i(0)}>{HERO.index}</p>
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
            <a href="#services" className="button button-ghost">{HERO.secondary}</a>
          </div>
        </div>
        <a href="#statement" className="scroll-cue" data-rise style={i(3)}><span>{HERO.scroll}</span><span className="scroll-line" aria-hidden="true" /></a>
      </div>
    </section>
  )
}
