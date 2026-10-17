import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { CONTACT, EMAIL } from '../content'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [trade, setTrade] = useState(CONTACT.trades[0])
  const [problem, setProblem] = useState('')
  useReveal(root)
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${trade}: ${name || 'a new enquiry'}`)}&body=${encodeURIComponent(`Hi,\n\nMy name: ${name}\nMy business: ${trade}\nWhat slows the week down: ${problem}\n\nThanks,\n${name}`)}`
  return (
    <section ref={root} id="contact" className="contact">
      <div className="sheet contact-words">
        <p className="meta" data-reveal>{CONTACT.index}</p>
        <h2 className="h-display" data-reveal>{CONTACT.heading[0]}<br /><span className="serif-i">{CONTACT.heading[1]}</span></h2>
        <p className="contact-sentence" data-reveal>{CONTACT.sentence}</p>
        <p className="contact-or" data-reveal>{CONTACT.or} <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a></p>
      </div>
      <form className="sheet form" data-ui data-reveal onSubmit={(e) => { e.preventDefault(); window.location.href = href }}>
        <label className="field"><span className="meta">{CONTACT.fields.name}</span><input id="c-name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label className="field"><span className="meta">{CONTACT.fields.trade}</span><select id="c-trade" name="trade" value={trade} onChange={(e) => setTrade(e.target.value)}>{CONTACT.trades.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="field field-wide"><span className="meta">{CONTACT.fields.problem}</span><textarea id="c-problem" name="problem" rows={4} value={problem} onChange={(e) => setProblem(e.target.value)} required /></label>
        <button type="submit" className="button">{CONTACT.fields.send}</button>
      </form>
    </section>
  )
}
