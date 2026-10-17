import { useEffect } from 'react'
import { useScene } from '../store/useScene'
import { BOOK_HREF, HERO } from '../content'

export function Hero() {
  const setPointer = useScene((s) => s.setPointer)
  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [setPointer])
  const i = (n: number) => ({ '--i': n } as React.CSSProperties)

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
      <h1 data-rise style={i(0)} className="text-[clamp(3.4rem,11vw,11rem)] leading-[0.92]">
        {HERO.line1} <span className="accent text-teal glow-teal">{HERO.accent}</span>
      </h1>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p data-rise style={i(1)} className="max-w-[26rem] text-lg text-mist md:text-xl">{HERO.body}</p>
        <div data-rise style={i(2)} className="flex flex-wrap gap-3">
          <a href={BOOK_HREF} className="btn btn-primary">{HERO.primary}</a>
          <a href="#work" className="btn btn-ghost">{HERO.secondary}</a>
        </div>
      </div>
    </section>
  )
}
