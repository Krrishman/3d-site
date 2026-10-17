import { useEffect, useRef } from 'react'
import { useStage } from '../scroll/useStage'
import { useScene } from '../store/useScene'
import { BOOK_HREF, HERO } from '../content'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  useStage(root, 0)
  const setPointer = useScene((s) => s.setPointer)

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [setPointer])

  const i = (n: number) => ({ '--i': n } as React.CSSProperties)

  return (
    <section ref={root} id="top" className="relative min-h-svh px-5 pb-24 pt-28 md:px-10 md:pb-28">
      <p data-rise style={i(0)} className="accent absolute right-10 top-36 hidden max-w-[18ch] text-right text-[1.9rem] text-mist md:block">
        {HERO.tagline}
      </p>
      <div className="flex min-h-[calc(100svh-7rem)] flex-col justify-end">
        <h1 data-rise style={i(1)} className="max-w-[12ch] text-[clamp(2.9rem,7.6vw,7.5rem)] leading-[0.98]">
          {HERO.headline[0]}
          <br />
          {HERO.headline[1]} <span className="accent text-teal glow-teal">{HERO.accent}</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p data-rise style={i(2)} className="max-w-[32rem] text-lg text-mist md:text-xl">{HERO.body}</p>
          <div data-rise style={i(3)} className="flex flex-wrap gap-3">
            <a href={BOOK_HREF} className="btn btn-primary">{HERO.primary}</a>
            <a href="#demo" className="btn btn-ghost">{HERO.secondary}</a>
          </div>
        </div>
      </div>
      <a href="#problems" data-rise style={i(4)} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.7rem] font-semibold tracking-[0.3em] text-mist uppercase hover:text-paper md:flex">
        Explore
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="M1 1l6 6 6-6M1 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" /></svg>
      </a>
    </section>
  )
}
