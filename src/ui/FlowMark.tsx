/** The F made of connected lines, as a flat drawing. */
export function FlowMark({ className = '', title = 'FlowForge mark' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} fill="none">
      <path
        d="M14 58 V12 Q14 6 20 6 H50 Q56 6 54 12 Q52 18 44 24 Q34 32 24 32 H14"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
