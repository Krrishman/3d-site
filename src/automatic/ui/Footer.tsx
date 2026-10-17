import { DIVISIONS, GROUP } from '../content'
import { href } from '../router'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer band">
      <p className="footer-name">Automatic</p>
      <div className="footer-row">
        <ul className="footer-places">
          <li><a href={GROUP.phoneHref} className="link">{GROUP.phone}</a></li>
          <li><a href={`mailto:${GROUP.email}`} className="link">{GROUP.email}</a></li>
          <li><span>{GROUP.address}</span></li>
        </ul>
        <div className="footer-cols">
          <ul aria-label="Divisions">{DIVISIONS.map((d) => <li key={d.id}><a href={href(d.id)} className="link">{d.nav}</a></li>)}</ul>
          <ul aria-label="Group"><li><a href={href('')} className="link">The group</a></li><li><a href="#contact" className="link">Contact</a></li></ul>
          <ul aria-label="Social">{GROUP.social.map((s) => <li key={s.label}><a href={s.href} className="link" target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
        </div>
      </div>
      <div className="footer-legal small"><span>© {YEAR} {GROUP.name}. Same original ownership since {GROUP.since}.</span><a href="#top" className="link">Back to top</a></div>
    </footer>
  )
}
