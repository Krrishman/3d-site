export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK = 'Book a free call'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute call')}&body=${encodeURIComponent('Hi,\n\nMy business: \nWhat slows the week down: \nA good time to call: \n\nThanks,')}`
export const NAME = 'FlowForge Digital'

export const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#demo', label: 'Demo' },
  { href: '#questions', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
]

export const THEMES = [
  { id: 'paper', label: 'Paper' },
  { id: 'forge', label: 'Forge' },
  { id: 'ice', label: 'Ice' },
]

export const HERO = {
  index: '01 — Forge',
  kicker: 'Websites, apps & internal tools',
  line1: 'Work that',
  accent: 'flows.',
  support: 'One builder, start to finish. Websites that bring the enquiry in, dashboards that keep every customer, and small custom tools shaped around how your team already works.',
  secondary: 'See the services',
  scroll: 'Follow the river',
}

export const STATEMENT = {
  index: '02 — The problem',
  words: 'Your best customers are stuck in inboxes, group chats and a spreadsheet called final_v3.',
  after: 'Every unanswered enquiry is a sale somebody else made. The fix is not more software. It is one small system where requests land, get answered and get done, built around the way your team already works.',
  points: ['Every request in one place', 'Answers out the same day', 'Files, notes and history together', 'Nothing typed in twice'],
}

export type Service = { n: string; title: string; tagline: string; body: string; groups: { title: string; items: string[] }[]; stack: string[] }
export const SERVICES: { index: string; heading: [string, string]; intro: string; items: Service[] } = {
  index: '03 — Services',
  heading: ['Four things,', 'done properly.'],
  intro: 'Most businesses start with the website and add the app once the enquiries pick up. Every project is a fixed price with a written scope, and you own the code.',
  items: [
    {
      n: '01', title: 'Websites', tagline: 'Fast, found, and built to bring the enquiry in.',
      body: 'A marketing site, an online shop, a booking site or a publication. Built as a real codebase rather than a theme, so it loads in under a second, scores green on Core Web Vitals, and can grow into the app later without starting over.',
      groups: [
        { title: 'Kinds of site', items: ['Marketing and service sites', 'E-commerce with cart, checkout and stock', 'Booking and appointment sites', 'Publications, blogs and documentation', 'Landing pages and campaign microsites'] },
        { title: 'What is included', items: ['Enquiry or booking forms with file upload', 'Payments through Stripe', 'Search engine basics: structure, speed, sitemap, schema', 'Analytics without cookie banners where possible', 'Accessibility to WCAG AA', 'Hosting, domain, SSL and backups'] },
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Stripe', 'Vercel or Cloudflare'],
    },
    {
      n: '02', title: 'Dashboards & web apps', tagline: 'Every customer, order or request in one place.',
      body: 'A private app your team signs in to. Lists with status, a history for every record, the files that came with it, and search that finds anything in a second. Works on a phone in the field as well as on a desk.',
      groups: [
        { title: 'Typical features', items: ['Lead and customer pipelines with status', 'Orders, jobs or cases with timelines and notes', 'File and photo storage per record', 'Roles: owner, staff, read-only, customer', 'Reports and exports to spreadsheet or PDF', 'Email and text notifications'] },
        { title: 'How it helps', items: ['Nothing falls through: every request has an owner and a next step', 'New staff learn the business from the record, not from memory', 'The owner sees the week on one screen instead of six apps'] },
      ],
      stack: ['React', 'TypeScript', 'Postgres', 'Supabase or Node', 'Auth with passkeys and magic links'],
    },
    {
      n: '03', title: 'Internal tools', tagline: 'Built around how your team already runs the week.',
      body: 'The small, specific tools that generic software never quite gets right: scheduling, stock, approvals, check-ins, quoting. Each one replaces a whiteboard, a shared spreadsheet or a group chat with something that fits the job.',
      groups: [
        { title: 'Examples', items: ['Team and rota scheduling', 'Stock counts with reorder alerts', 'Quote and invoice builders', 'Customer portals with job status', 'Inspection and check-in forms that work offline', 'Approval flows with an audit trail'] },
        { title: 'Built in', items: ['Security: encrypted at rest and in transit, least-privilege access, regular dependency updates', 'Testing: automated checks on every change before it ships', 'Monitoring: errors and slow pages reported to me before you notice', 'Support: a named person, not a ticket queue'] },
      ],
      stack: ['React Native or PWA for mobile', 'TypeScript', 'Postgres', 'Background jobs and queues'],
    },
    {
      n: '04', title: 'Data & automation', tagline: 'Connect what you have, stop typing things twice.',
      body: 'Years of spreadsheets cleaned into a proper database. Systems that did not talk to each other, connected. The copy-paste between apps removed, and the reminders you keep forgetting, sent on time.',
      groups: [
        { title: 'What gets automated', items: ['Spreadsheet to database migration with duplicates merged', 'Syncs between your website, your accounting and your calendar', 'Quote to invoice to payment hand-off', 'Follow-ups, reminders and review requests', 'Weekly reports that write themselves'] },
        { title: 'Why it pays', items: ['An hour of admin a day is five weeks a year', 'One customer record means one truth about every customer', 'Fewer mistakes, because nothing is retyped'] },
      ],
      stack: ['Node and TypeScript', 'Postgres', 'Stripe, Xero and QuickBooks APIs', 'Google Workspace and Microsoft 365'],
    },
  ],
}

export const PROCESS = {
  index: '04 — How it runs',
  heading: ['No slides.', 'No surprises.'],
  steps: [
    { n: '01', name: 'Call', time: '15 minutes', body: 'You tell me what slows the week down. If software is not the answer, I will say so.' },
    { n: '02', name: 'Plan', time: 'Within days', body: 'A one-page plan: what gets built, what it costs, when it lands. Fixed price, written scope.' },
    { n: '03', name: 'Build', time: '2 to 8 weeks', body: 'In the open. A link to the working version in week one, and every change after that.' },
    { n: '04', name: 'Run', time: 'Ongoing', body: 'Hosting, updates and a person who answers, included for the first month, then month to month.' },
  ],
}

export const DEMO = {
  index: '05 — Try it',
  heading: ['A lead dashboard,', 'live.'],
  body: 'This is the real thing, not a picture. Requests land here instead of in your inbox. Press the buttons.',
}

export const QUESTIONS = {
  index: '06 — Questions',
  heading: 'Things people ask on the first call',
  items: [
    { q: 'What does it cost?', a: 'A fixed price, written in the plan before anything starts. A website and a small app sit in different ranges, and the first call is free, so you leave it with a number either way.' },
    { q: 'How long does it take?', a: 'A website is usually live in two to four weeks. A dashboard or an internal tool takes four to eight, and the plan says exactly how long.' },
    { q: 'What do you build with?', a: 'Modern, boring, well-supported tools: React and TypeScript on the front, Postgres behind it, hosted on infrastructure that scales without anyone babysitting it. Nothing exotic you would struggle to hire for later.' },
    { q: 'Who owns the code?', a: 'You do. The domain is in your name, the repository is yours, and if you ever want to take it elsewhere or hire a team, you can.' },
    { q: 'Can you work with what we already use?', a: 'Yes. Most projects start by importing the spreadsheet or connecting the tool you already have, and keeping an export so nothing is locked in.' },
    { q: 'What happens when something breaks at 7am?', a: 'You call or message me. Hosting, backups and fixes are part of the first month, and after that it is a small monthly amount with the same number.' },
  ],
}

export const CONTACT = {
  index: '07 — Start',
  heading: ['Tell me', 'about the job.'],
  sentence: 'Three lines is plenty. I read every message myself and reply within a working day.',
  fields: { name: 'Your name', trade: 'Your business', problem: 'What slows the week down', send: 'Send the details' },
  trades: ['Local service business', 'Clinic, studio or salon', 'Shop or café', 'Agency or consultancy', 'Something else'],
  or: 'Or email',
}

export const FOOTER = {
  columns: [
    { title: 'Site', links: LINKS },
    { title: 'Services', links: SERVICES.items.map((s) => ({ href: '#services', label: s.title })) },
    { title: 'Reach', links: [{ href: `mailto:${EMAIL}`, label: EMAIL }, { href: BOOK_HREF, label: BOOK }] },
  ],
  legal: `© ${new Date().getFullYear()} FlowForge Digital`,
}
