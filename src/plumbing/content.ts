import { RENDERS } from '../renders.generated'

/** Copy deck for the plumbing template. Every headline fits two lines at every width. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}&body=${encodeURIComponent('Hi,\n\nMy trade: \nWhat slows the week down: \nA good time to call: \n\nThanks,')}`
export const BOOK = 'Book a free call'

const base = import.meta.env.BASE_URL
const photo = (name: string) => `${base}plumbing/photos/${name}.jpg`
const render = (id: string) => (RENDERS[id] ? base + RENDERS[id].replace(/^\//, '') : '')

export const NAME = ['FlowForge', 'Digital']
export const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
]

/** The live thing: pick a trade, and the hero shows that trade's job site and the site I would build for it. */
export const TRADES = [
  { id: 'fence', label: 'Fencing', photo: photo('hero-fence'), alt: 'A new cedar fence across a back yard at dawn', site: render('work-01'), caption: 'Fence and deck contractor' },
  { id: 'plumbing', label: 'Plumbing', photo: photo('hero-plumbing'), alt: 'A plumber’s van parked on a quiet street at dawn', site: render('work-02'), caption: 'Plumbing company with online booking' },
  { id: 'landscape', label: 'Landscaping', photo: photo('hero-landscape'), alt: 'A freshly laid stone path and new turf', site: render('work-03'), caption: 'Landscaping company' },
  { id: 'hvac', label: 'Heating', photo: photo('hero-hvac'), alt: 'A technician at a rooftop air-conditioning unit at sunrise', site: render('work-04'), caption: 'Heating and cooling service' },
]

export const HERO = {
  headline: ['Websites & apps', 'for the trades'],
  support: 'Built by one person for fencing, plumbing, landscaping and heating businesses.',
  pick: 'Pick your trade',
}

export const WORK = {
  heading: ['Recent', 'work'],
  tiles: [
    { src: render('work-01'), name: 'Fence and deck contractor', kind: 'Website', span: 'wide', area: 'a' },
    { src: render('p1-c'), name: 'Lead list on the phone', kind: 'App', span: 'tall', area: 'b' },
    { src: render('work-02'), name: 'Plumbing bookings', kind: 'Website', span: 'tall', area: 'c' },
    { src: render('work-09'), name: 'Crew schedule', kind: 'Dashboard', span: 'tall', area: 'd' },
    { src: render('work-11'), name: 'Quote builder', kind: 'Tool', span: 'tall', area: 'e' },
    { src: render('work-07'), name: 'Contractor lead dashboard', kind: 'Dashboard', span: 'wide', area: 'f' },
    { src: render('p2-c'), name: 'Stock count', kind: 'App', span: 'tall', area: 'g' },
    { src: render('work-03'), name: 'Landscaping company', kind: 'Website', span: 'wide', area: 'h' },
  ],
}

export const SERVICES = {
  statement: 'Four things I build',
  rows: [
    { title: 'Websites', body: 'A fast site with one job: get the call. Mobile first, with a quote form that takes photos.', src: render('p1-c'), shape: 'portrait' },
    { title: 'Dashboards', body: 'Every lead in one list: new, contacted, quoted, booked, done. Search any past customer in a second.', src: render('work-07'), shape: 'landscape' },
    { title: 'Operations tools', body: 'Stock, reorders, crews and schedules, built around how you already run the week.', src: render('work-09'), shape: 'square' },
    { title: 'Automation', body: 'Spreadsheets cleaned, duplicates merged, and the copy-paste between apps removed.', src: render('work-12'), shape: 'portrait' },
  ],
}

export const PROCESS = {
  heading: 'How a project runs',
  stages: [
    { lead: 'On the first call,', body: 'fifteen minutes, you tell me what slows the week down. No slides and no pitch.', src: photo('how-call'), alt: 'A contractor on the phone at a pickup tailgate' },
    { lead: 'Within a few days', body: 'you get a one-page plan: what gets built, what it costs, and when it lands.', src: photo('how-plan'), alt: 'A hand-drawn plan on a workbench' },
    { lead: 'Then it gets built', body: 'in the open. You see every version, and it goes live with hosting and support included.', src: photo('how-build'), alt: 'A tablet on a tailgate showing the finished app' },
  ],
}

export const ABOUT = {
  heading: 'One builder, start to finish',
  lead: 'FlowForge Digital is one person. I take the call, draw the plan, write the code and answer the phone after launch.',
  note: 'Built for local trades: fencing and decks, plumbing, landscaping, heating and cooling. Small teams with real work and no time for software that gets in the way.',
  photo: photo('about-desk'),
  alt: 'A desk by a window with a laptop and a paper notebook',
  facts: [
    { label: 'First call', value: '15 minutes' },
    { label: 'Plan', value: 'One page, fixed price' },
    { label: 'Build', value: 'You see every version' },
    { label: 'After launch', value: 'Hosting and updates' },
  ],
}

export const CTA = {
  sentence: 'If missed calls and spreadsheets are running the business, let’s talk for fifteen minutes.',
}

export const FOOTER = {
  columns: [
    { title: 'Site', links: LINKS },
    { title: 'Trades', links: TRADES.map((t) => ({ href: '#top', label: t.label })) },
    { title: 'Reach', links: [{ href: `mailto:${EMAIL}`, label: 'Email' }, { href: BOOK_HREF, label: BOOK }] },
  ],
  legal: `© ${new Date().getFullYear()} FlowForge Digital`,
}
