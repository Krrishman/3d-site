/** All copy for the page lives here, so wording is reviewed in one place. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute workflow review')}&body=${encodeURIComponent(
  'Hi,\n\nMy business is: \nWhat slows us down most: \nBest time for a 15-minute call: \n\nThanks,',
)}`
export const ACTION = 'Book a free call'

export const SERVICES = [
  { key: 'web', name: 'Lead-generating websites', fact: 'Call, book or ask for a quote from any phone.' },
  { key: 'leads', name: 'Lead and quote dashboards', fact: 'Leads, quotes, photos and follow-ups in one place.', wide: true },
  { key: 'stock', name: 'Inventory and operations tools', fact: 'Stock counts, reorder alerts and supplier data.' },
  { key: 'schedule', name: 'Scheduling and client portals', fact: 'Jobs on a calendar the crew and the customer can see.' },
  { key: 'data', name: 'Data cleanup and migration', fact: 'Old spreadsheets become a system people trust.' },
] as const

export const STEPS = [
  {
    name: 'Discovery call',
    body: 'Fifteen minutes, free. You show me what slows the business down: the missed calls, the spreadsheet, the texts you have to scroll back through.',
  },
  {
    name: 'Simple plan',
    body: 'I recommend a practical website or app, with a clear scope, a timeline and a price. Nothing you do not need.',
  },
  {
    name: 'Build and review',
    body: 'I build the first version and show you progress as it comes together, so what you get is shaped by how you actually work.',
  },
  {
    name: 'Launch and support',
    body: 'Your system goes live. If you want them, I provide updates, hosting and ongoing support after that.',
  },
] as const
