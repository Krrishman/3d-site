import { useRef, useState } from 'react'
import { useReveal } from '../scroll/useReveal'
import { CONTACT, DIVISIONS, GROUP } from '../content'

/** One form for every division; sending opens a prepared email to the right address. */
export function Contact({ preset }: { preset?: string }) {
  const root = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [div, setDiv] = useState(preset || DIVISIONS[0].id)
  const [msg, setMsg] = useState('')
  useReveal(root)
  const d = DIVISIONS.find((x) => x.id === div) || DIVISIONS[0]
  const mail = `mailto:${d.contact.email}?cc=${GROUP.email}&subject=${encodeURIComponent(`${d.nav}: ${name || 'enquiry'}`)}&body=${encodeURIComponent(`Hi,\n\nName: ${name}\nDivision: ${d.nav}\n\n${msg}\n\nThanks,\n${name}`)}`
  return (
    <section ref={root} id="contact" className="contact">
      <div className="contact-words">
        <h2 className="contact-heading" data-reveal>{CONTACT.heading[0]}<br />{CONTACT.heading[1]}</h2>
        <p className="contact-sentence lead" data-reveal>{CONTACT.sentence}</p>
        <p className="contact-or" data-reveal>Or call <a href={GROUP.phoneHref} className="link">{GROUP.phone}</a></p>
      </div>
      <form className="contact-form" data-ui data-reveal onSubmit={(e) => { e.preventDefault(); window.location.href = mail }}>
        <label className="field"><span className="small">{CONTACT.fields.name}</span><input id="c-name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label className="field"><span className="small">{CONTACT.fields.division}</span><select id="c-div" name="division" value={div} onChange={(e) => setDiv(e.target.value)}>{DIVISIONS.map((x) => <option key={x.id} value={x.id}>{x.name.join(' ')}</option>)}</select></label>
        <label className="field field-wide"><span className="small">{CONTACT.fields.message}</span><textarea id="c-msg" name="message" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} required /></label>
        <button type="submit" className="button">{CONTACT.fields.send}</button>
      </form>
    </section>
  )
}
