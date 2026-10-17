import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { PROCESS } from '../content'

/** Three stages as three photographs of different sizes down a falling diagonal. */
export function Process() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="process" className="process">
      {PROCESS.stages.map((s, i) => (
        <div key={s.lead} className={`stage stage-${i + 1}`}>
          {i === 0 && <h2 className="process-heading" data-reveal>{PROCESS.heading}</h2>}
          <div className="stage-pic" data-shutter>
            <img src={s.src} alt={s.alt} width={i === 1 ? 900 : i === 2 ? 1600 : 900} height={i === 1 ? 900 : i === 2 ? 1000 : 1200} loading="lazy" />
          </div>
          <p className="stage-text" data-reveal><strong>{s.lead}</strong> {s.body}</p>
        </div>
      ))}
    </section>
  )
}
