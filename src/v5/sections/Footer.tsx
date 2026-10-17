import { FOOTER } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name" aria-label="FlowForge Digital">Flow<span className="serif-i">Forge</span></p>
      <div className="footer-row">
        {FOOTER.columns.map((c) => (
          <ul key={c.title} className="footer-col" aria-label={c.title}>
            <li className="meta">{c.title}</li>
            {c.links.map((l) => <li key={l.label}><a href={l.href} className="link">{l.label}</a></li>)}
          </ul>
        ))}
      </div>
      <div className="footer-legal meta"><span>{FOOTER.legal}</span><a href="#top" className="link">Back to top</a></div>
    </footer>
  )
}
