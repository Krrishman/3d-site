import { EMAIL, FOOTER, SITE } from '../content'

/** The name first, at full width; then the ways to reach me; then the small print. */
export function Footer() {
  return (
    <footer className="footer field">
      <p className="footer-name" aria-label="FlowForge Digital">FlowForge Digital</p>
      <div className="footer-row">
        <ul className="footer-places">
          <li><a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a></li>
          <li><span>{SITE}</span></li>
        </ul>
        <div className="footer-cols">
          {FOOTER.columns.map((c) => (
            <ul key={c.title} aria-label={c.title}>
              {c.links.map((l) => (
                <li key={l.label}><a href={l.href} className="link">{l.label}</a></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="footer-legal small">
        <span>{FOOTER.legal}</span>
        <a href="#top" className="link">Back to top</a>
      </div>
    </footer>
  )
}
