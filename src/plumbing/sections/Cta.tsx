import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { BOOK, BOOK_HREF, CTA, EMAIL } from '../content'

/** The page ends on an almost empty screen: one plain sentence and one small button. */
export function Cta() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="contact" className="cta">
      <p className="cta-sentence" data-reveal>{CTA.sentence}</p>
      <div className="cta-actions" data-reveal>
        <a href={BOOK_HREF} className="button">{BOOK}</a>
        <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a>
      </div>
    </section>
  )
}
