/** All copy for the page, taken from the FlowForge Digital brief. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute workflow review')}&body=${encodeURIComponent(
  'Hi,\n\nMy business: \nWhat slows us down most: \nBest time for a 15-minute call: \n\nThanks,',
)}`

export const HERO = {
  wordmark: 'FlowForge Digital',
  headline: ['Custom Websites & Business Apps', 'That Make Work Flow.'],
  body: 'We help local businesses capture more leads, organize their work, and replace spreadsheet chaos with simple tools built for the way they operate.',
  primary: 'Book a Free Call',
  secondary: 'See a Demo',
}

export const PROBLEMS = {
  headline: ['Your business should not run on missed calls,', 'text-message threads, and confusing spreadsheets.'],
  intro: 'FlowForge Digital creates practical systems that help you:',
  points: [
    'Capture every lead in one place',
    'Send faster quotes and follow up on time',
    'Organize jobs, clients, and documents',
    'Track inventory and supplies',
    'Reduce repetitive data entry',
    'Give customers a better online experience',
  ],
  chaos: [
    { kind: 'Missed call', text: '(555) 014-2026 · 2:14 pm · no voicemail' },
    { kind: 'Text thread', text: '“did you get the photos I sent??”' },
    { kind: 'Spreadsheet', text: 'leads_v3_FINAL_use_this_one.xlsx' },
    { kind: 'Sticky note', text: 'call Dana back re: fence quote' },
    { kind: 'Email', text: 'Re: Re: Re: deck estimate' },
  ],
}

export const SERVICES = {
  title: 'What I build',
  items: [
    { n: '1', name: 'Lead-Generating Websites', body: 'Fast, mobile-friendly websites that make it easy for customers to call, book, or request a quote.' },
    { n: '2', name: 'Customer & Job Dashboards', body: 'Simple systems for tracking leads, customers, quotes, job status, photos, notes, and follow-ups.' },
    { n: '3', name: 'Inventory & Operations Tools', body: 'Custom dashboards for stock tracking, reorder alerts, supplier data, scheduling, and reporting.' },
    { n: '4', name: 'Data Migration & Automation', body: 'I clean up spreadsheets, organize your data, and build easier workflows so your team wastes less time.' },
  ],
}

export const DEMO = {
  kicker: 'Example project',
  title: 'Contractor Lead Dashboard',
  body: 'A local contractor receives quote requests through a website. Each request automatically enters a private dashboard.',
  can: ['View new leads', 'See customer photos and job details', 'Mark leads as contacted, quoted, booked, or completed', 'Search past customers', 'Export information when needed'],
  result: 'Result: fewer missed leads and less time chasing information.',
}

export const PROCESS = {
  title: 'How it works',
  steps: [
    { n: '1', name: 'Free Discovery Call', body: 'You show me what is slowing the business down.' },
    { n: '2', name: 'Simple Plan', body: 'I recommend a practical website or app solution, with a clear scope, timeline, and price.' },
    { n: '3', name: 'Build & Review', body: 'I build the first version and show you the progress.' },
    { n: '4', name: 'Launch & Support', body: 'Your system goes live, and I can provide updates, hosting, and ongoing support if needed.' },
  ],
}

export const CTA = {
  headline: 'Let’s Make Your Business Easier to Run.',
  body: 'Book a free 15-minute workflow review. No pressure. Just tell me what is frustrating you, and we will see if a better system can help.',
  button: 'Book My Free Call',
}
