import { RENDERS } from '../renders.generated'

/** Copy deck for the FlowForge site. Every headline fits two lines at every width. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK = 'Book a free call'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}&body=${encodeURIComponent('Hi,\n\nMy trade: \nWhat slows the week down: \nA good time to call: \n\nThanks,')}`

const base = import.meta.env.BASE_URL
const photo = (name: string) => `${base}v4/photos/${name}.jpg`
const render = (id: string) => (RENDERS[id] ? base + RENDERS[id].replace(/^\//, '') : '')

export const NAME = 'FlowForge Digital'
export const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#questions', label: 'Questions' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

/** The live thing: pick a trade, and the hero shows that trade's job site and the site I would build for it. */
export const TRADES = [
  { id: 'fence', label: 'Fencing', photo: photo('hero-fence'), alt: 'A new cedar fence across a back yard at dawn', site: render('work-01'), caption: 'Fence and deck contractor: quote form with photo upload' },
  { id: 'plumbing', label: 'Plumbing', photo: photo('hero-plumbing'), alt: 'A plumber’s van parked on a quiet street at dawn', site: render('work-02'), caption: 'Plumbing company: book a time slot online' },
  { id: 'landscape', label: 'Landscaping', photo: photo('hero-landscape'), alt: 'A freshly laid stone path and new turf', site: render('work-03'), caption: 'Landscaping company: before-and-after gallery' },
  { id: 'hvac', label: 'Heating', photo: photo('hero-hvac'), alt: 'A technician at a rooftop air-conditioning unit at sunrise', site: render('work-04'), caption: 'Heating and cooling: seasonal offer and service area' },
]

export const HERO = {
  headline: ['Websites & apps', 'for the trades'],
  support: 'Built by one person for fencing, plumbing, landscaping and heating businesses. A site that gets the call, and a dashboard that keeps every lead.',
  pick: 'Pick your trade',
}

export const WORK = {
  heading: ['Recent', 'work'],
  intro: 'Eight recent builds. Websites that bring the enquiry in, and the dashboards and tools that handle it afterwards.',
  tiles: [
    { src: render('work-01'), name: 'Fence and deck contractor', kind: 'Website', line: 'Quote form that takes photos of the yard, so the first call is already a real quote.', span: 'wide', area: 'a' },
    { src: render('p1-c'), name: 'Lead list on the phone', kind: 'App', line: 'Every new enquiry in one list, with a button to mark it contacted from the van.', span: 'tall', area: 'b' },
    { src: render('work-02'), name: 'Plumbing bookings', kind: 'Website', line: 'Customers pick a time slot this week instead of leaving a voicemail.', span: 'tall', area: 'c' },
    { src: render('work-09'), name: 'Crew schedule', kind: 'Dashboard', line: 'A week view of three crews, colour by job, built to replace a whiteboard.', span: 'tall', area: 'd' },
    { src: render('work-11'), name: 'Quote builder', kind: 'Tool', line: 'Line items, quantities and a total, sent as a clean PDF in two taps.', span: 'tall', area: 'e' },
    { src: render('work-07'), name: 'Contractor lead dashboard', kind: 'Dashboard', line: 'New, quoted, booked and completed at a glance, with a searchable customer history.', span: 'wide', area: 'f' },
    { src: render('p2-c'), name: 'Stock count', kind: 'App', line: 'Scan a barcode, count the shelf, and reorder alerts fire before the job stalls.', span: 'tall', area: 'g' },
    { src: render('work-03'), name: 'Landscaping company', kind: 'Website', line: 'A before-and-after slider does the selling; one button asks for a quote.', span: 'wide', area: 'h' },
  ],
}

export const SERVICES = {
  statement: 'Four things I build',
  intro: 'Most businesses start with the website and add the dashboard once the enquiries pick up. Each one is a fixed-price project with a written scope.',
  rows: [
    { title: 'Websites', body: 'A fast site with one job: get the call. Mobile first, with a quote form that takes photos and a phone number that is always one tap away.', includes: ['Quote or booking form', 'Photo upload', 'Service area and hours', 'Google reviews pulled in', 'Hosting and a domain'], src: render('work-02'), shape: 'landscape' },
    { title: 'Dashboards', body: 'Every lead in one list: new, contacted, quoted, booked, done. Search any past customer in a second and see every photo they sent.', includes: ['Lead list with status', 'Customer history', 'Photos and notes per job', 'Works on the phone', 'Export to a spreadsheet'], src: render('p1-c'), shape: 'portrait' },
    { title: 'Operations tools', body: 'Stock, reorders, crews and schedules, built around how you already run the week rather than how a generic app thinks you should.', includes: ['Stock counts and reorder alerts', 'Crew scheduling', 'Client portal with job status', 'Supplier lists'], src: render('work-09'), shape: 'landscape' },
    { title: 'Automation', body: 'Spreadsheets cleaned, duplicates merged, and the copy-paste between apps removed, so the same customer is never typed in twice.', includes: ['Spreadsheet clean-up and import', 'Duplicate merging', 'Quote to invoice hand-off', 'Reminders and follow-ups'], src: render('work-12'), shape: 'square' },
  ],
}

export const PROCESS = {
  heading: 'How a project runs',
  intro: 'Four steps, in the open, with nothing to sign until you have seen the plan.',
  stages: [
    { lead: 'On the first call,', body: 'fifteen minutes, you tell me what slows the week down. No slides and no pitch. If a website or an app is not the answer, I will say so.', src: photo('how-call'), alt: 'A contractor on the phone at a pickup tailgate' },
    { lead: 'Within a few days', body: 'you get a one-page plan: what gets built, what it costs, and when it lands. The price is fixed and the scope is written down.', src: photo('how-plan'), alt: 'A hand-drawn plan on a workbench' },
    { lead: 'Then it gets built', body: 'in the open. You get a link to the working version in the first week and see every change after that, so there is no reveal at the end.', src: photo('how-build'), alt: 'A tablet on a tailgate showing the finished app' },
  ],
  after: { lead: 'After launch,', body: 'hosting, updates and a phone number that answers are included for the first year, then month to month.' },
}

export const QUESTIONS = {
  heading: 'Questions people ask',
  items: [
    { q: 'What does a website cost?', a: 'A fixed price, written in the plan before anything starts. It depends on the number of pages and whether booking or a dashboard is part of it. The first call is free and you leave it with a number.' },
    { q: 'How long does it take?', a: 'A website is usually live in two to four weeks. A dashboard or an operations tool takes longer, and the plan says how long.' },
    { q: 'Do I need to write the words or supply photos?', a: 'Bring what you have. Photos from your phone of real jobs beat stock pictures every time. I write the first draft of the words from our call and you correct it.' },
    { q: 'Who owns the site?', a: 'You do. The domain is in your name, the code is yours, and if you ever want to take it elsewhere, you can.' },
    { q: 'Can you work with the spreadsheets we already use?', a: 'Yes. Most dashboards start by importing the spreadsheet you have, cleaning it up, and keeping it as the export.' },
    { q: 'What happens when something breaks at 7am?', a: 'You call or text me. Hosting, backups and fixes are part of the first year, and after that it is a small monthly amount with the same phone number.' },
  ],
}

export const ABOUT = {
  heading: 'One builder, start to finish',
  lead: 'FlowForge Digital is one person. I take the call, draw the plan, write the code and answer the phone after launch.',
  note: 'Built for local trades: fencing and decks, plumbing, landscaping, heating and cooling. Small teams with real work and no time for software that gets in the way.',
  photo: photo('about-desk'),
  alt: 'A desk by a window with a laptop and a paper notebook',
  facts: [
    { label: 'First call', value: '15 minutes, free' },
    { label: 'Plan', value: 'One page, fixed price' },
    { label: 'Build', value: 'A working link in week one' },
    { label: 'After launch', value: 'Hosting and updates included' },
  ],
}

export const CONTACT = {
  heading: 'Tell me about the job',
  sentence: 'Three lines is plenty. I read every message myself and reply within a working day.',
  fields: { name: 'Your name', trade: 'Your trade', problem: 'What slows the week down', send: 'Send the details' },
  trades: ['Fencing or decking', 'Plumbing', 'Landscaping', 'Heating and cooling', 'Something else'],
  or: 'Or email',
}

export const FOOTER = {
  columns: [
    { title: 'Site', links: LINKS },
    { title: 'Trades', links: TRADES.map((t) => ({ href: '#top', label: t.label })) },
    { title: 'Reach', links: [{ href: `mailto:${EMAIL}`, label: 'Email' }, { href: BOOK_HREF, label: BOOK }] },
  ],
  legal: `© ${new Date().getFullYear()} FlowForge Digital`,
}
