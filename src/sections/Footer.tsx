import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { EMAIL, SITE } from '../content'

/** The F built from blocks, 4px gaps, bottoms on one line. */
function BlockMark() {
  return (
    <svg viewBox="0 0 400 240" className="h-[22svh] w-full md:h-[34svh]" role="img" aria-label="FlowForge mark built from blocks" preserveAspectRatio="xMinYMax meet">
      <rect x="0" y="0" width="72" height="240" fill="#0b1220" />
      <rect x="76" y="0" width="160" height="72" fill="#2f80ed" />
      <rect x="240" y="0" width="160" height="72" fill="#ffffff" />
      <rect x="76" y="104" width="110" height="64" fill="#ffffff" />
      <path d="M190 104 H230 A64 64 0 0 1 294 168 H230 A64 64 0 0 1 190 168 Z" fill="#2f80ed" />
      <rect x="0" y="0" width="72" height="72" fill="#2f80ed" />
    </svg>
  )
}

export function Footer() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, '[data-part]', 'rise')
  return (
    <footer ref={root} className="bg-teal px-4 pb-8 pt-20 text-navy md:px-7 md:pt-32">
      <div data-part><BlockMark /></div>
      <div data-part className="mt-14 grid grid-cols-2 gap-6 text-s1 md:grid-cols-12">
        <ul className="md:col-span-2"><li><a className="plain-link" href="#demo">Demo</a></li><li><a className="plain-link" href="#top">Top</a></li></ul>
        <ul className="md:col-span-2"><li>Websites</li><li>Dashboards</li></ul>
        <ul className="md:col-span-2"><li>Inventory</li><li>Client portals</li></ul>
        <ul className="md:col-span-2"><li>Scheduling</li><li>Data tools</li></ul>
        <address className="col-span-2 not-italic md:col-span-4 md:col-start-9">
          <a className="plain-link block" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span className="block">{SITE}</span>
        </address>
      </div>
      <div data-part className="mt-12 flex items-center justify-between text-s1">
        <span>FlowForge Digital</span>
        <a href="#top" className="action action-navy bg-navy text-paper min-h-11 px-4">Back to top</a>
      </div>
    </footer>
  )
}
