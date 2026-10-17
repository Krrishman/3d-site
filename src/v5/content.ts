import { RENDERS } from '../renders.generated'

export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK = 'Book a free call'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}&body=${encodeURIComponent('Hi,\n\nMy trade: \nWhat slows the week down: \nA good time to call: \n\nThanks,')}`

const base = import.meta.env.BASE_URL
export const media = (name: string) => `${base}v5/media/${name}`
const render = (id: string) => (RENDERS[id] ? base + RENDERS[id].replace(/^\//, '') : '')

export const NAME = 'FlowForge Digital'
export const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#demo', label: 'Demo' },
  { href: '#questions', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
]

export const HERO = {
  index: '01 — Forge',
  kicker: 'Websites & apps for the trades',
  line1: 'Work that',
  accent: 'flows.',
  support: 'One builder. Websites that get the call, dashboards that keep every lead, and tools shaped around how your crew already runs the week.',
  secondary: 'See the work',
  live: { label: 'This month', items: ['3 sites live', '1 dashboard in build', '2 slots open'] },
  scroll: 'Scroll to descend',
}

export const MARQUEE = ['Fencing & decks', 'Plumbing', 'Landscaping', 'Heating & cooling', 'Roofing', 'Electrical', 'Painting', 'Tree care']

export const STATEMENT = {
  index: '02 — The problem',
  words: 'Your best leads are dying in voicemail, text threads and a spreadsheet called final_v3.',
  after: 'Every missed call is a job somebody else quoted. The fix is not more software. It is one place where enquiries land, get answered and get booked, built around the way you already work.',
  points: ['Every enquiry in one list', 'Quotes out the same day', 'Jobs, photos and notes together', 'Nothing typed in twice'],
  photo: media('fence.jpg'),
  alt: 'A new cedar fence lit by a work lamp at blue hour',
}

export const WORK = {
  index: '03 — Selected work',
  heading: ['Built for the', 'people who build.'],
  intro: 'Six recent projects. Drag or scroll sideways.',
  items: [
    { n: '01', src: render('work-01'), name: 'Fence & deck contractor', kind: 'Website', line: 'A quote form that takes photos of the yard, so the first call is already a real quote.', result: '2× more quote requests in the first month' },
    { n: '02', src: render('work-07'), name: 'Contractor lead dashboard', kind: 'Dashboard', line: 'New, quoted, booked and completed at a glance, with a searchable customer history.', result: 'Zero leads lost since launch' },
    { n: '03', src: render('work-02'), name: 'Plumbing bookings', kind: 'Website', line: 'Customers pick a time slot this week instead of leaving a voicemail.', result: '40% of bookings now arrive after hours' },
    { n: '04', src: render('work-09'), name: 'Crew schedule', kind: 'Dashboard', line: 'A week view of three crews, colour by job, built to replace a whiteboard.', result: 'Monday planning down from an hour to ten minutes' },
    { n: '05', src: render('work-11'), name: 'Quote builder', kind: 'Tool', line: 'Line items, quantities and a total, sent as a clean PDF in two taps from the van.', result: 'Quotes out the same day' },
    { n: '06', src: render('work-03'), name: 'Landscaping company', kind: 'Website', line: 'A before-and-after slider does the selling; one button asks for a quote.', result: 'First page of Google for the town name' },
  ],
}

export const SERVICES = {
  index: '04 — What I build',
  heading: ['Four things,', 'done properly.'],
  intro: 'Most businesses start with the website and add the dashboard once the enquiries pick up. Every project is a fixed price with a written scope.',
  cards: [
    { title: 'Websites', body: 'A fast site with one job: get the call. Mobile first, with a quote form that takes photos and a number that is always one tap away.', includes: ['Quote or booking form', 'Photo upload', 'Service area and hours', 'Reviews pulled in', 'Hosting and domain'], photo: media('van.jpg'), alt: 'A plumber’s van with its interior lit at dusk' },
    { title: 'Lead dashboards', body: 'Every lead in one list: new, contacted, quoted, booked, done. Search any past customer in a second and see every photo they sent.', includes: ['Lead list with status', 'Customer history', 'Photos and notes per job', 'Works on the phone'], photo: media('rooftop.jpg'), alt: 'A rooftop air-conditioning unit at dusk' },
    { title: 'Operations tools', body: 'Stock, reorders, crews and schedules, built around how you already run the week rather than how a generic app thinks you should.', includes: ['Stock counts and reorder alerts', 'Crew scheduling', 'Client portal with job status'], photo: media('garden.jpg'), alt: 'A garden path lit by low lights at dusk' },
    { title: 'Automation', body: 'Spreadsheets cleaned, duplicates merged, and the copy-paste between apps removed, so the same customer is never typed in twice.', includes: ['Spreadsheet clean-up', 'Quote to invoice hand-off', 'Reminders and follow-ups'], photo: media('desk.jpg'), alt: 'A desk at night with a glowing laptop and a lamp' },
  ],
}

export const PROCESS = {
  index: '05 — How it runs',
  heading: ['No slides.', 'No surprises.'],
  steps: [
    { n: '01', name: 'Call', time: '15 minutes', body: 'You tell me what slows the week down. If a website or an app is not the answer, I will say so.' },
    { n: '02', name: 'Plan', time: 'Within days', body: 'A one-page plan: what gets built, what it costs, when it lands. The price is fixed and the scope is written down.' },
    { n: '03', name: 'Build', time: '2 to 6 weeks', body: 'In the open. You get a link to the working version in week one and see every change after that.' },
    { n: '04', name: 'Run', time: 'Ongoing', body: 'Hosting, updates and a phone number that answers, included for the first year and month to month after.' },
  ],
}

export const DEMO = {
  index: '06 — Try it',
  heading: ['A lead dashboard,', 'live.'],
  body: 'This is the real thing, not a picture. Quote requests land here instead of in your voicemail. Press the buttons.',
}

export const QUESTIONS = {
  index: '07 — Questions',
  heading: 'Things people ask on the first call',
  items: [
    { q: 'What does a website cost?', a: 'A fixed price, written in the plan before anything starts. It depends on the number of pages and whether booking or a dashboard is part of it. The first call is free and you leave it with a number.' },
    { q: 'How long does it take?', a: 'A website is usually live in two to four weeks. A dashboard or an operations tool takes longer, and the plan says how long.' },
    { q: 'Do I need to write the words or supply photos?', a: 'Bring what you have. Photos from your phone of real jobs beat stock pictures every time. I write the first draft of the words from our call and you correct it.' },
    { q: 'Who owns the site?', a: 'You do. The domain is in your name, the code is yours, and if you ever want to take it elsewhere, you can.' },
    { q: 'Can you work with the spreadsheets we already use?', a: 'Yes. Most dashboards start by importing the spreadsheet you have, cleaning it up, and keeping it as the export.' },
    { q: 'What happens when something breaks at 7am?', a: 'You call or text me. Hosting, backups and fixes are part of the first year, and after that it is a small monthly amount with the same phone number.' },
  ],
}

export const CONTACT = {
  index: '08 — Start',
  heading: ['Tell me', 'about the job.'],
  sentence: 'Three lines is plenty. I read every message myself and reply within a working day.',
  fields: { name: 'Your name', trade: 'Your trade', problem: 'What slows the week down', send: 'Send the details' },
  trades: ['Fencing or decking', 'Plumbing', 'Landscaping', 'Heating and cooling', 'Something else'],
  or: 'Or email',
}

export const FOOTER = {
  columns: [
    { title: 'Site', links: LINKS },
    { title: 'Trades', links: MARQUEE.slice(0, 4).map((t) => ({ href: '#services', label: t })) },
    { title: 'Reach', links: [{ href: `mailto:${EMAIL}`, label: EMAIL }, { href: BOOK_HREF, label: BOOK }] },
  ],
  legal: `© ${new Date().getFullYear()} FlowForge Digital`,
}
