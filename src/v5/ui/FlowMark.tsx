/** The F made of connected lines, as a flat drawing. */
export function FlowMark({ className = '', title = 'FlowForge mark' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} fill="none">
      <path d="M16 58 V10 H52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 33 H42" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}
