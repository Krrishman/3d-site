import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { STATEMENT } from '../content'

/**
 * One sentence, lit word by word as you scroll, while the scattered mess
 * (calls, texts, spreadsheets) gathers into a single tidy stack.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !root.current) return
      const split = SplitText.create('[data-words]', { type: 'words' })
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-chaos]', root.current!)
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', scrub: 0.6, pin: true } })
        tl.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, stagger: 0.05, duration: 0.6, ease: 'none' }, 0)
        tl.to(cards, { x: 0, y: (i) => i * 76 - 152, rotate: 0, opacity: 1, duration: 0.8, ease: 'power3.inOut', stagger: 0.03 }, 0.3)
        tl.from('[data-after]', { opacity: 0, y: 16, duration: 0.3, ease: 'power3.out' }, 0.95)
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 45%', scrub: true } })
      })
      return () => { mm.revert(); split.revert() }
    },
    { scope: root, dependencies: [reduced] },
  )

  const scatter = [{ x: -60, y: -140, r: -9 }, { x: 140, y: -40, r: 6 }, { x: -150, y: 60, r: 5 }, { x: 120, y: 150, r: -6 }, { x: -20, y: 230, r: 8 }]

  return (
    <section ref={root} id="statement" className="relative min-h-svh px-5 py-24 md:px-10 md:py-0">
      <div className="grid min-h-svh grid-cols-1 items-center gap-12 md:grid-cols-12">
        <h2 data-words className="text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.02] md:col-span-7">{STATEMENT.words}</h2>
        <div className="relative hidden h-[420px] md:col-span-4 md:col-start-9 md:block">
          <div className="absolute left-1/2 top-1/2 h-0 w-full -translate-x-1/2 -translate-y-1/2">
            {STATEMENT.chaos.map((c, i) => (
              <div key={c.kind} data-chaos className="glass-solid absolute left-0 top-0 w-full px-5 py-4" style={{ transform: `translate(${scatter[i].x}px, ${scatter[i].y}px) rotate(${scatter[i].r}deg)`, opacity: 0.8 }}>
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal">{c.kind}</div>
                <div className="mt-1 truncate text-base">{c.text}</div>
              </div>
            ))}
          </div>
          <p data-after className="absolute inset-x-0 -bottom-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-mist">{STATEMENT.after}</p>
        </div>
      </div>
    </section>
  )
}
