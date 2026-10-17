import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { PROBLEMS } from '../content'

/**
 * Pinned sequence: the scattered mess (calls, texts, spreadsheets) gathers
 * into one ordered list as the visitor scrolls.
 */
export function Problems() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 1)

  useGSAP(
    () => {
      if (reduced || !root.current) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-chaos]', root.current!)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=180%', scrub: 0.6, pin: true },
        })
        tl.to(cards, {
          x: 0, y: (i) => i * 76, rotate: 0, scale: 1, opacity: 1,
          duration: 1, ease: 'power3.inOut', stagger: 0.04,
        }, 0)
        tl.to('[data-mess-title]', { opacity: 0, y: -20, duration: 0.4 }, 0)
        tl.from('[data-order]', { opacity: 0, y: 24, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, 0.45)
        tl.to('[data-chaos] .kind', { color: '#24d1c2', duration: 0.3 }, 0.6)
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced] },
  )

  // Starting positions for the scattered cards (desktop). On phones they stack.
  const scatter = [
    { x: -40, y: 20, r: -8 }, { x: 160, y: 140, r: 6 }, { x: -120, y: 260, r: 4 },
    { x: 200, y: 330, r: -5 }, { x: 20, y: 420, r: 9 },
  ]

  return (
    <section ref={root} className="relative min-h-svh px-5 py-24 md:px-10 md:py-0">
      <div className="grid min-h-svh grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02]">
            {PROBLEMS.headline[0]} <span className="text-mist">{PROBLEMS.headline[1]}</span>
          </h2>
          <p className="mt-8 text-lg text-mist" data-order>{PROBLEMS.intro}</p>
          <ul className="mt-5 space-y-3">
            {PROBLEMS.points.map((p) => (
              <li key={p} data-order className="flex items-start gap-3 text-lg">
                <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-teal shadow-[0_0_14px_rgba(36,209,194,0.9)]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden h-[560px] md:col-span-6 md:col-start-7 md:block">
          <p data-mess-title className="absolute -top-10 left-0 text-sm font-semibold uppercase tracking-[0.2em] text-mist">Where leads go today</p>
          {PROBLEMS.chaos.map((c, i) => (
            <div
              key={c.kind}
              data-chaos
              className="panel absolute left-0 top-0 w-[22rem] px-5 py-4"
              style={{ transform: `translate(${scatter[i].x}px, ${scatter[i].y}px) rotate(${scatter[i].r}deg) scale(0.96)`, opacity: 0.75 }}
            >
              <div className="kind text-xs font-bold uppercase tracking-[0.14em] text-mist">{c.kind}</div>
              <div className="mt-1 text-base">{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
