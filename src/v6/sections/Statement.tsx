import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { useReveal } from '../scroll/useReveal'
import { STATEMENT } from '../content'

export function Statement() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useReveal(root)
  useGSAP(() => {
    if (reduced || !root.current) return
    const split = SplitText.create('[data-words]', { type: 'words' })
    gsap.fromTo(split.words, { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '[data-words]', start: 'top 75%', end: 'bottom 35%', scrub: true } })
    return () => split.revert()
  }, { scope: root, dependencies: [reduced] })
  return (
    <section ref={root} id="statement" className="statement">
      <div className="sheet sheet-wide">
        <p className="meta" data-reveal>{STATEMENT.index}</p>
        <p className="statement-words" data-words>{STATEMENT.words}</p>
        <div className="statement-grid">
          <p className="statement-after" data-reveal>{STATEMENT.after}</p>
          <ul className="points" data-reveal>{STATEMENT.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
