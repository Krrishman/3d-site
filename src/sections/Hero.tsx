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

  return (
    <section ref={root} id="top" className="relative flex min-h-svh flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
      <p data-rise style={{ '--i': 0 } as React.CSSProperties} className="eyebrow mb-6">{HERO.wordmark}</p>
      <h1 data-rise style={{ '--i': 1 } as React.CSSProperties} className="max-w-[14ch] text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.95]">
        {HERO.headline[0]}
        <br />
        <span className="text-teal glow-teal">{HERO.headline[1]}</span>
      </h1>
      <p data-rise style={{ '--i': 2 } as React.CSSProperties} className="mt-8 max-w-[34rem] text-lg text-mist md:text-xl">
        {HERO.body}
      </p>
      <div data-rise style={{ '--i': 3 } as React.CSSProperties} className="mt-10 flex flex-wrap gap-3">
        <a href={BOOK_HREF} className="btn btn-primary">{HERO.primary}</a>
        <a href="#demo" className="btn btn-ghost">{HERO.secondary}</a>
      </div>
      <div data-rise style={{ '--i': 4 } as React.CSSProperties} className="pointer-events-none absolute bottom-6 right-5 hidden items-center gap-3 text-xs font-semibold tracking-[0.2em] text-mist uppercase md:flex md:right-10">
        Scroll
        <span className="block h-10 w-px bg-gradient-to-b from-teal to-transparent" />
      </div>
    </section>
  )
}
