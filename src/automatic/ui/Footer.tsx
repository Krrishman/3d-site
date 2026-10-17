import { DIVISIONS, GROUP } from '../content'
import { href } from '../router'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer band">
      <div className="footer-top">
        <div>
          <p className="footer-name">The Automatic Group</p>
          <p className="footer-tag small">Six crafts. One family. Since {GROUP.since}.</p>
          <p className="footer-addr">{GROUP.address}</p>
          <ul className="footer-reach">
            <li><a href={GROUP.phoneHref} className="link">{GROUP.phone}</a></li>
            <li><a href={`mailto:${GROUP.email}`} className="link">{GROUP.email}</a></li>
          </ul>
        </div>
        <div />
        <ul className="footer-cols" aria-label="Divisions">{DIVISIONS.map((d) => <li key={d.id}><a href={href(d.id)} className="link">{d.name.join(' ')}</a></li>)}</ul>
        <ul className="footer-cols" aria-label="Elsewhere">{GROUP.social.map((s) => <li key={s.label}><a href={s.href} className="link" target="_blank" rel="noreferrer">{s.label}</a></li>)}<li><a href={href('')} className="link">The group</a></li></ul>
      </div>
      <div className="footer-legal small"><span>© {YEAR} {GROUP.name}</span><a href="#top" className="link">Back to top</a></div>
    </footer>
  )
}
