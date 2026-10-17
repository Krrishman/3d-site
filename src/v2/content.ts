import { RENDERS } from '../renders.generated'

/** Copy for the new site. Short on purpose: one idea per block. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}`

export const HERO = {
  wordmark: 'FlowForge Digital',
  line1: 'Make work',
  accent: 'flow.',
  body: 'Websites and simple apps for local businesses.',
  primary: 'Book a free call',
  secondary: 'See the work',
}

export const STATEMENT = {
  words: 'Your leads should not live in missed calls, text threads and spreadsheets.',
  chaos: [
    { kind: 'Missed call', text: '(555) 014-2026 · no voicemail' },
    { kind: 'Text', text: '“did you get the photos??”' },
    { kind: 'Spreadsheet', text: 'leads_v3_FINAL.xlsx' },
    { kind: 'Sticky note', text: 'call Dana re: fence quote' },
    { kind: 'Email', text: 'Re: Re: Re: deck estimate' },
  ],
  after: 'One place. Every lead.',
}

export const SERVICES = {
  title: 'What I build',
  items: [
    { name: 'Websites', line: 'Fast, mobile, built to get the call.' },
    { name: 'Dashboards', line: 'Leads, jobs and customers in one view.' },
    { name: 'Operations tools', line: 'Inventory, scheduling, reorders.' },
    { name: 'Automation', line: 'Spreadsheets cleaned up and connected.' },
  ],
}

export const DEMO = {
  kicker: 'Try it',
  title: 'A lead dashboard',
  line: 'Quote requests land here, not in your voicemail.',
}

export const PROCESS = {
  title: 'How it works',
  steps: [
    { name: 'Call', line: 'Fifteen minutes. You talk, I listen.' },
    { name: 'Plan', line: 'Scope, timeline and price, in writing.' },
    { name: 'Build', line: 'You see it come together.' },
    { name: 'Launch', line: 'Live, hosted, supported.' },
  ],
}

export const ABOUT = {
  title: 'About',
  text: 'One builder, not an agency. I make every system myself, around how your business already works.',
}

export const CTA = {
  line1: 'Let’s make your business',
  accent: 'easier to run.',
  body: 'A free 15-minute call. Tell me what is slowing you down.',
  button: 'Book my free call',
}

const render = (id: string) => (RENDERS[id] ? import.meta.env.BASE_URL + RENDERS[id].replace(/^\//, '') : undefined)
const list = (ids: string[]) => ids.map(render).filter((s): s is string => Boolean(s))

export const WORK_TILES = list(Array.from({ length: 12 }, (_, i) => `work-${String(i + 1).padStart(2, '0')}`))

export const PROJECTS = {
  title: 'Projects',
  items: [
    { n: '01', category: 'Client project', name: 'Contractor lead dashboard', href: '#demo', cta: 'Try the demo', images: list(['p1-a', 'p1-b', 'p1-c']) },
    { n: '02', category: 'Product', name: 'Inventory & reorder tracker', href: BOOK_HREF, cta: 'Ask about it', images: list(['p2-a', 'p2-b', 'p2-c']) },
    { n: '03', category: 'Client project', name: 'Client portal & scheduling', href: BOOK_HREF, cta: 'Ask about it', images: list(['p3-a', 'p3-b', 'p3-c']) },
  ],
}
