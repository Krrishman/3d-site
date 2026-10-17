import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { QUESTIONS } from '../content'

/** Six questions; one open at a time, the first by default. */
export function Questions() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)
  useReveal(root)
  return (
    <section ref={root} id="questions" className="questions">
      <div className="questions-head">
        <p className="meta" data-reveal>{QUESTIONS.index}</p>
        <h2 className="h-section" data-reveal>{QUESTIONS.heading}</h2>
      </div>
      <ul className="qa">
        {QUESTIONS.items.map((it, i) => {
          const isOpen = open === i
          return (
            <li key={it.q} className={`qa-item${isOpen ? ' is-open' : ''}`} data-reveal>
              <button type="button" className="qa-q" aria-expanded={isOpen} aria-controls={`qa-${i}`} id={`qa-btn-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="meta qa-n">0{i + 1}</span>
                <span className="qa-text">{it.q}</span>
                <span className="qa-plus" aria-hidden="true" />
              </button>
              <div id={`qa-${i}`} role="region" aria-labelledby={`qa-btn-${i}`} className="qa-a" hidden={!isOpen}><p>{it.a}</p></div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
