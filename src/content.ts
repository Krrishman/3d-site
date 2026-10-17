/** All copy for the page, taken from the FlowForge Digital brief. */
export const EMAIL = 'hello@flowforgedigital.com'
export const SITE = 'flowforgedigital.com'
export const BOOK_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Free 15-minute workflow review')}&body=${encodeURIComponent(
  'Hi,\n\nMy business: \nWhat slows us down most: \nBest time for a 15-minute call: \n\nThanks,',
)}`

export const HERO = {
  wordmark: 'FlowForge Digital',
  headline: ['Custom websites & business apps', 'that make work'],
  accent: 'flow.',
  tagline: 'Make work flow better.',
  body: 'We help local businesses capture more leads, organize their work, and replace spreadsheet chaos with simple tools built for the way they operate.',
  primary: 'Book a Free Call',
  secondary: 'See a demo',
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

/**
 * PLACEHOLDERS. These preview tiles and project images come from the
 * reference template and must be replaced with FlowForge's own renders
 * (Kie.ai) before launch.
 */
export const WORK_TILES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const HIGGS = (id: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${id}.png`)}&w=1280&q=85`

export const PROJECTS = {
  title: 'Projects',
  items: [
    {
      n: '01', category: 'Client project', name: 'Contractor Lead Dashboard', href: '#demo', cta: 'Live demo',
      images: [HIGGS('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'), HIGGS('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'), HIGGS('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327')],
    },
    {
      n: '02', category: 'Product', name: 'Inventory & Reorder Tracker', href: BOOK_HREF, cta: 'Ask about it',
      images: [HIGGS('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'), HIGGS('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'), HIGGS('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea')],
    },
    {
      n: '03', category: 'Client project', name: 'Client Portal & Scheduling', href: BOOK_HREF, cta: 'Ask about it',
      images: [HIGGS('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'), HIGGS('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'), HIGGS('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee')],
    },
  ],
}

export const ABOUT = {
  title: 'About',
  text: 'FlowForge Digital helps local businesses get more leads, organize their work, and save time with modern websites and simple custom business apps. I build every system myself, around the way your business already works, and show you progress as it comes together. Let’s make your business easier to run.',
}
