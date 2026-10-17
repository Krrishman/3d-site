import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { QUESTIONS } from '../content'

/** Six real questions with plain answers, two to a row. */
export function Questions() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="questions" className="questions band">
      <h2 className="questions-heading" data-reveal>{QUESTIONS.heading}</h2>
      <dl className="questions-list">
        {QUESTIONS.items.map((it) => (
          <div key={it.q} className="question" data-reveal>
            <dt className="question-q">{it.q}</dt>
            <dd className="question-a">{it.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
