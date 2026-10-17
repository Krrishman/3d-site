import { lazy, Suspense, useEffect, useRef } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { useScene } from '../store/useScene'
import { FlowMark } from '../ui/FlowMark'
import { ACTION, BOOK_HREF } from '../content'

const Scene = lazy(() => import('../scene/Scene'))

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const setHeroProgress = useScene((s) => s.setHeroProgress)

  useEffect(() => {
    if (!root.current) return
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => setHeroProgress(self.progress),
    })
    return () => trigger.kill()
  }, [setHeroProgress])


  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-paper text-navy">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 md:p-7">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap text-s1 font-extrabold tracking-tight md:text-s2" aria-label="FlowForge Digital, home">
          <FlowMark className="h-6 w-6 text-blue md:h-7 md:w-7" />
          <span>FlowForge Digital</span>
        </a>
        <a href={BOOK_HREF} className="action action-blue bg-blue text-paper min-h-11 whitespace-nowrap px-3.5 text-s1 md:min-h-14 md:px-6 md:text-s2">{ACTION}</a>
      </header>

      {/* Lower field, with the 3D mark beneath the headline. */}
      <div className="absolute inset-x-0 bottom-0 top-[46svh] bg-teal md:top-1/2">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <h1 className="waterline">
        <span className="line"><span data-line style={{ '--i': 0 } as React.CSSProperties}>Make work</span></span>
        <span className="line"><span data-line data-below="Flow" style={{ '--i': 1 } as React.CSSProperties}>Flow</span></span>
      </h1>

      <p
        data-rise
        className="absolute bottom-10 left-4 right-4 z-20 max-w-[36rem] text-navy md:left-1/2 md:right-auto md:-translate-x-1/2 md:text-center"
      >
        Custom websites and business apps that help local businesses capture more leads, organize their work and
        replace spreadsheet chaos.
      </p>
    </section>
  )
}
