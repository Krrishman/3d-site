import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { PROCESS } from '../content'

export function Process() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="process" className="process">
      <div className="sheet sheet-wide">
        <p className="meta" data-reveal>{PROCESS.index}</p>
        <h2 className="h-display" data-reveal>{PROCESS.heading[0]} <span className="serif-i">{PROCESS.heading[1]}</span></h2>
        <ol className="steps">
          {PROCESS.steps.map((s) => (
            <li key={s.n} className="step" data-reveal>
              <span className="step-n">{s.n}</span>
              <div className="step-top"><h3 className="step-name">{s.name}</h3><span className="meta">{s.time}</span></div>
              <p className="step-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
