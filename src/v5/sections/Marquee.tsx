import { MARQUEE } from '../content'

/** The kinds of business, running slowly along the seam between the film and the page. */
export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-label="Who I build for">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= MARQUEE.length}>{t}<span className="marquee-dot" aria-hidden="true">·</span></span>
        ))}
      </div>
    </div>
  )
}
