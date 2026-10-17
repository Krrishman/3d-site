import { RENDERS } from '../renders.generated'

export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK = 'Book a free call'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}&body=${encodeURIComponent('Hi,\n\nMy business: \nWhat slows the week down: \nA good time to call: \n\nThanks,')}`

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
  kicker: 'Websites, apps & internal tools',
  line1: 'Work that',
  accent: 'flows.',
  support: 'One builder, start to finish. Websites that bring the enquiry in, dashboards that keep every customer, and small custom tools shaped around how your team already works.',
  secondary: 'See the work',
  live: { label: 'This month', items: ['3 products live', '1 app in build', '2 slots open'] },
  scroll: 'Scroll to descend',
}

export const MARQUEE = ['Local services', 'Clinics & studios', 'Retail & cafés', 'Agencies', 'Logistics', 'Property', 'Trades', 'Nonprofits']

export const STATEMENT = {
  index: '02 — The problem',
  words: 'Your best customers are stuck in inboxes, group chats and a spreadsheet called final_v3.',
  after: 'Every unanswered enquiry is a sale somebody else made. The fix is not more software. It is one small system where requests land, get answered and get done, built around the way your team already works.',
  points: ['Every request in one place', 'Answers out the same day', 'Files, notes and history together', 'Nothing typed in twice'],
  photo: media('whiteboard.jpg'),
  alt: 'A flow diagram drawn on a glass wall in a dark office at night',
}

export const WORK = {
  index: '03 — Selected work',
  heading: ['Built for the', 'people who build.'],
  intro: 'Six recent projects across different kinds of business. Scroll sideways.',
  items: [
    { n: '01', src: render('work-07'), name: 'Lead dashboard', kind: 'Web app', line: 'Every enquiry in one list with a status, a history and the files the customer sent.', result: 'Zero enquiries lost since launch' },
    { n: '02', src: render('work-02'), name: 'Online booking', kind: 'Website', line: 'Customers pick a slot this week instead of leaving a voicemail or an email.', result: '40% of bookings now arrive after hours' },
    { n: '03', src: render('work-09'), name: 'Team scheduler', kind: 'Internal tool', line: 'A week view of three teams, colour by job, built to replace a whiteboard.', result: 'Monday planning down from an hour to ten minutes' },
    { n: '04', src: render('work-11'), name: 'Quote builder', kind: 'Internal tool', line: 'Line items, quantities and a total, sent as a clean PDF in two taps from a phone.', result: 'Quotes out the same day' },
    { n: '05', src: render('work-12'), name: 'Spreadsheet to database', kind: 'Migration', line: 'Years of messy rows cleaned, duplicates merged, and a proper customer record for each.', result: '11,000 rows, one afternoon' },
    { n: '06', src: render('work-01'), name: 'Service company site', kind: 'Website', line: 'One page, one job: get the enquiry. A request form that takes photos and a number one tap away.', result: '2× more requests in the first month' },
  ],
}

export const SERVICES = {
  index: '04 — What I build',
  heading: ['Four things,', 'done properly.'],
  intro: 'Most businesses start with the website and add the app once the enquiries pick up. Every project is a fixed price with a written scope, and you own the code.',
  cards: [
    { title: 'Websites', body: 'A fast site with one job: bring the enquiry in. Mobile first, with a form that takes files or photos and a number or booking link one tap away.', includes: ['Enquiry or booking form', 'File and photo upload', 'Hours, locations, reviews', 'Hosting and domain'], photo: media('phone.jpg'), alt: 'A phone on a counter showing an app with one teal button, at closing time' },
    { title: 'Dashboards & web apps', body: 'Every customer, order or request in one list with a status, a history and the files that came with it. Search anything in a second.', includes: ['Lists with status', 'Customer history', 'Files and notes per record', 'Works on the phone'], photo: media('studio.jpg'), alt: 'Two monitors showing a dashboard in a dark studio' },
    { title: 'Internal tools', body: 'Scheduling, stock, approvals, check-ins. Built around how your team already runs the week rather than how a generic app thinks you should.', includes: ['Scheduling and rotas', 'Stock and reorder alerts', 'Customer portals', 'Role-based access'], photo: media('tablet.jpg'), alt: 'Hands holding a tablet with a dark app in a dim warehouse' },
    { title: 'Data & automation', body: 'Spreadsheets cleaned, duplicates merged, systems connected, and the copy-paste between apps removed so nothing is typed in twice.', includes: ['Spreadsheet to database', 'Integrations and syncs', 'Reminders and follow-ups', 'Backups'], photo: media('server.jpg'), alt: 'A small server rack with warm status lights in a dark room' },
  ],
}

export const PROCESS = {
  index: '05 — How it runs',
  heading: ['No slides.', 'No surprises.'],
  steps: [
    { n: '01', name: 'Call', time: '15 minutes', body: 'You tell me what slows the week down. If software is not the answer, I will say so.' },
    { n: '02', name: 'Plan', time: 'Within days', body: 'A one-page plan: what gets built, what it costs, when it lands. The price is fixed and the scope is written down.' },
    { n: '03', name: 'Build', time: '2 to 6 weeks', body: 'In the open. You get a link to the working version in week one and see every change after that.' },
    { n: '04', name: 'Run', time: 'Ongoing', body: 'Hosting, updates and a phone number that answers, included for the first year and month to month after.' },
  ],
}

export const DEMO = {
  index: '06 — Try it',
  heading: ['A lead dashboard,', 'live.'],
  body: 'This is the real thing, not a picture. Requests land here instead of in your inbox. Press the buttons.',
}

export const QUESTIONS = {
  index: '07 — Questions',
  heading: 'Things people ask on the first call',
  items: [
    { q: 'What does it cost?', a: 'A fixed price, written in the plan before anything starts. A website and a small app sit in different ranges, and the first call is free, so you leave it with a number either way.' },
    { q: 'How long does it take?', a: 'A website is usually live in two to four weeks. A dashboard or an internal tool takes four to eight, and the plan says exactly how long.' },
    { q: 'What do you build with?', a: 'Modern, boring, well-supported tools: React and TypeScript on the front, a managed database behind it, hosted on infrastructure that scales without anyone babysitting it. Nothing exotic you would struggle to hire for later.' },
    { q: 'Who owns the code?', a: 'You do. The domain is in your name, the repository is yours, and if you ever want to take it elsewhere or hire a team, you can.' },
    { q: 'Can you work with what we already use?', a: 'Yes. Most projects start by importing the spreadsheet or connecting the tool you already have, and keeping it as an export so nothing is locked in.' },
    { q: 'What happens when something breaks at 7am?', a: 'You call or message me. Hosting, backups and fixes are part of the first year, and after that it is a small monthly amount with the same number.' },
  ],
}

export const CONTACT = {
  index: '08 — Start',
  heading: ['Tell me', 'about the job.'],
  sentence: 'Three lines is plenty. I read every message myself and reply within a working day.',
  fields: { name: 'Your name', trade: 'Your business', problem: 'What slows the week down', send: 'Send the details' },
  trades: ['Local service business', 'Clinic, studio or salon', 'Shop or café', 'Agency or consultancy', 'Something else'],
  or: 'Or email',
}

export const FOOTER = {
  columns: [
    { title: 'Site', links: LINKS },
    { title: 'Built for', links: MARQUEE.slice(0, 4).map((t) => ({ href: '#services', label: t })) },
    { title: 'Reach', links: [{ href: `mailto:${EMAIL}`, label: EMAIL }, { href: BOOK_HREF, label: BOOK }] },
  ],
  legal: `© ${new Date().getFullYear()} FlowForge Digital`,
}
