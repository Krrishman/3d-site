/** Copy for The Automatic Group: one group page and six division pages. Figures are the ones the group publishes on its own sites. */
const base = import.meta.env.BASE_URL
export const photo = (name: string) => `${base}automatic/photos/${name}.jpg`

export const GROUP = {
  name: 'The Automatic Group',
  short: 'Automatic',
  since: 1958,
  address: '333 Baldwin Road, Hempstead, NY 11550',
  phone: '(516) 486-7500',
  phoneHref: 'tel:5164867500',
  email: 'info@automaticgroup.com',
  area: 'Manhattan to Montauk',
  motto: 'Nobody does it better.',
  headline: ['Six crafts.', 'One family. Since 1958.'],
  support: 'Lawn sprinklers, tennis and pickleball courts, gunite pools, fine landscaping and masonry, construction management and real estate, all under the same original ownership on Long Island.',
  about: 'In 1958 Stewart Senter installed an in-ground sprinkler system and started a company. Sixty-six years later the same family runs six divisions from the same address in Hempstead, with crews on the payroll rather than subcontracted, and a reputation built one property at a time, from Manhattan to the Hamptons.',
  facts: [
    { label: 'Founded', value: '1958' },
    { label: 'Ownership', value: 'Same family, three generations' },
    { label: 'Staff', value: '88 full-time professionals' },
    { label: 'Fleet', value: '36 branded trucks' },
  ],
  cta: 'Request a consultation',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/stewartsenterinc' },
    { label: 'Facebook', href: 'https://www.facebook.com/AutomaticGroup' },
    { label: 'Google', href: 'https://g.page/r/CZsiPqGpJ1YYEBM/' },
  ],
}

export type Division = {
  id: string
  nav: string
  brand: string
  name: [string, string]
  tagline: string
  intro: string
  intro2: string
  hero: string
  heroAlt: string
  stats: { value: string; label: string }[]
  services: { title: string; body: string }[]
  process: { lead: string; body: string }[]
  gallery: { src: string; alt: string; ratio: 'portrait' | 'landscape' }[]
  quote?: { text: string; who: string }
  contact: { phone: string; phoneHref: string; email: string }
  external: string
}

const main = { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'info@automaticgroup.com' }

export const DIVISIONS: Division[] = [
  {
    id: 'sprinklers', nav: 'Sprinklers', brand: 'Automatic Irrigation Design',
    name: ['Lawn', 'sprinklers'], tagline: 'The first thing the family ever built, and still the biggest.',
    intro: 'Design, installation and year-round service of irrigation systems for homes, estates and commercial properties, with full-time technicians rather than subcontractors and a 24-hour emergency line.',
    intro2: 'Every job is done by our own crews, planned by our own designers, and backed by the same phone number afterwards.',
    hero: photo('sprinklers-hero'), heroAlt: 'Sprinklers throwing arcs of water across an estate lawn at dawn',
    stats: [{ value: '41,637', label: 'systems installed' }, { value: '10,218', label: 'services a year' }, { value: '534', label: 'five-star reviews' }, { value: '24 hr', label: 'emergency line' }],
    services: [
      { title: 'Residential', body: 'Systems designed for the property, zoned for sun, shade, slope and planting, and tuned each season.' },
      { title: 'Commercial', body: 'Campuses, clubs, condominiums and municipal grounds, with service contracts that keep them green.' },
      { title: 'Engineering and design', body: 'Hydraulic design, pressure and flow analysis, and drawings for architects and landscape architects.' },
      { title: 'Wi-Fi control and backflow testing', body: 'Smart controllers that adjust to weather from your phone, and certified backflow testing on schedule.' },
      { title: 'Landscape lighting', body: 'Low-voltage lighting for paths, trees and façades, installed alongside the irrigation.' },
    ],
    process: [
      { lead: 'Walk the property.', body: 'A designer maps sun, shade, planting and water pressure and leaves you with a plan and a price.' },
      { lead: 'Install in days, not weeks.', body: 'Crews pull pipe with minimal disturbance to lawns and beds, and restore everything they touch.' },
      { lead: 'Open, close and adjust.', body: 'Spring start-up, mid-season adjustment and winterisation, year after year.' },
    ],
    gallery: [{ src: photo('sprinklers-detail'), alt: 'A brass pop-up sprinkler head in turf', ratio: 'portrait' }, { src: photo('sprinklers-fleet'), alt: 'A row of white service trucks at sunrise', ratio: 'landscape' }],
    quote: { text: 'On time, every time, and the lawn has never looked better.', who: 'Homeowner, Great Neck' },
    contact: { phone: '(516) 486-7515', phoneHref: 'tel:5164867515', email: 'debra@automaticgroup.com' },
    external: 'https://lawnsprinklers.com/',
  },
  {
    id: 'courts', nav: 'Courts', brand: 'Tennis Planning Corp.',
    name: ['Tennis &', 'pickleball courts'], tagline: 'Enjoy the love game in your own backyard.',
    intro: 'Design, construction and resurfacing of private and club courts across Long Island, from red clay and Har-Tru to cushioned hard courts and dedicated pickleball, with fencing, lighting and windscreens.',
    intro2: 'Every job is done by our own crews, planned by our own designers, and backed by the same phone number afterwards.',
    hero: photo('courts-hero'), heroAlt: 'A private red clay tennis court among oaks on an estate',
    stats: [{ value: '1,018', label: 'courts built and serviced' }, { value: '64', label: 'years on Long Island' }, { value: 'Great Neck', label: 'to Montauk' }],
    services: [
      { title: 'New courts', body: 'Site work, drainage, base and surface, built to the specification of the game you play.' },
      { title: 'Red clay and Har-Tru', body: 'The surfaces the clubs ask for, with the irrigation and maintenance to keep them playing true.' },
      { title: 'Pickleball', body: 'Purpose-built courts and conversions of existing hard courts, with correct lines and sound-conscious fencing.' },
      { title: 'Resurfacing and repair', body: 'Crack repair, colour coating, line painting, net posts and fencing on courts of any age.' },
      { title: 'Lighting and fencing', body: 'LED court lighting and fencing specified for the site and the neighbours.' },
    ],
    process: [
      { lead: 'Choose the surface.', body: 'We talk through how you play, who maintains it and how it sits with the garden, then recommend a build.' },
      { lead: 'Build it right.', body: 'In-house crews handle grading, base, drainage, surfacing and fencing. We do it right or we do not do it at all.' },
      { lead: 'Keep it playing.', body: 'Seasonal maintenance for clay, and resurfacing on schedule for hard courts.' },
    ],
    gallery: [{ src: photo('courts-detail'), alt: 'The corner of a blue pickleball court', ratio: 'portrait' }, { src: photo('courts-build'), alt: 'A court base being graded on an estate', ratio: 'landscape' }],
    quote: { text: 'Our red clay courts have never been in better shape.', who: 'Cherry Valley Club' },
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://www.tennisplanning.com/',
  },
  {
    id: 'pools', nav: 'Pools', brand: 'Tennis Planning Corp.',
    name: ['Gunite', 'swimming pools'], tagline: 'Any shape, any depth, built to outlast the house.',
    intro: 'Custom gunite pools and spas designed with landscape architects and engineers, built by in-house crews, and restored when older pools need a new life.',
    intro2: 'Every job is done by our own crews, planned by our own designers, and backed by the same phone number afterwards.',
    hero: photo('pools-hero'), heroAlt: 'A gunite pool with a spillover spa at dusk',
    stats: [{ value: '536', label: 'pools built and restored' }, { value: '50+', label: 'years building pools' }, { value: '100%', label: 'custom, no kits' }],
    services: [
      { title: 'New gunite pools', body: 'Steel-reinforced shells sprayed in place, finished with a tile band and a marble-coated interior.' },
      { title: 'Spas and water features', body: 'Spillover spas, beach entries, sun shelves, fire and water bowls, waterfalls, deck jets and bubblers.' },
      { title: 'Automation and safety', body: 'Pumps, heaters and lighting on your phone, and automatic safety covers that travel under the coping.' },
      { title: 'Restoration', body: 'Worn marble finishes replaced with upgraded products and techniques, often better than new.' },
      { title: 'Patios and surrounds', body: 'Bluestone, travertine and masonry coping and patios, planned with the landscape from day one.' },
    ],
    process: [
      { lead: 'Design with the house.', body: 'We assess orientation, privacy and how the family uses the garden, with landscape architects and engineers at the table.' },
      { lead: 'Permits and ground-breaking.', body: 'Once you approve the plan we handle permits and in-house crews break ground.' },
      { lead: 'Steel, gunite, finish.', body: 'Rebar is tied to the shape, concrete is sprayed, then tile and marble finish go on.' },
    ],
    gallery: [{ src: photo('pools-detail'), alt: 'Water spilling over a tiled spa edge', ratio: 'portrait' }, { src: photo('pools-build'), alt: 'A rebar pool shell under construction', ratio: 'landscape' }],
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://tennisplanning.com/our-services/gunite-pools/',
  },
  {
    id: 'landscape', nav: 'Landscape', brand: 'Tennis Planning Corp.',
    name: ['Fine landscaping', '& custom masonry'], tagline: 'You paint a portrait. We turn it landscape.',
    intro: 'Landscape design and planning by experienced landscape architects, built with stone, planting, drainage and lighting that are meant to last, and to last beautifully.',
    intro2: 'Every job is done by our own crews, planned by our own designers, and backed by the same phone number afterwards.',
    hero: photo('landscape-hero'), heroAlt: 'A bluestone path through a layered estate garden',
    stats: [{ value: '64', label: 'years of gardens' }, { value: 'Award', label: 'winning design' }, { value: 'In-house', label: 'crews and masons' }],
    services: [
      { title: 'Landscape design', body: 'Plans that suit the house, modern or classic, sketched at every stage so you see the garden before it is built.' },
      { title: 'Planting', body: 'Plants chosen to harmonise with each other and the site, staggered to flower across the seasons, safe for children and pets.' },
      { title: 'Custom masonry', body: 'Fieldstone walls, bluestone terraces, steps, pillars and outdoor kitchens, cut and laid by our own masons.' },
      { title: 'Drainage', body: 'Grading and drainage designed in from the start, so the garden survives a Long Island winter.' },
      { title: 'Landscape lighting', body: 'Balanced low-voltage lighting for paths, trees, walls and poolside walks.' },
    ],
    process: [
      { lead: 'Listen first.', body: 'The history of the site, how family and guests use the outdoors, and the look you are after.' },
      { lead: 'Design in detail.', body: 'Landscape architects and engineers draw the plan, planting and hardscape together.' },
      { lead: 'Build to last.', body: 'In-house crews and masons build it, and we stay involved through the first seasons.' },
    ],
    gallery: [{ src: photo('landscape-detail'), alt: 'A mason setting a bluestone cap on a fieldstone wall', ratio: 'portrait' }, { src: photo('landscape-night'), alt: 'An estate garden lit at blue hour', ratio: 'landscape' }],
    quote: { text: 'We build spaces to last, and last beautifully.', who: 'Glenn Katz, Vice President' },
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://tennisplanning.com/our-services/landscape-planning/',
  },
  {
    id: 'construction', nav: 'Construction', brand: 'Stewart Senter Inc.',
    name: ['Construction', 'management'], tagline: 'Exceptional service. Extraordinary homes.',
    intro: 'New homes, major renovations and estate projects managed from first drawing to final walkthrough, by the family that has been building on Long Island since 1958.',
    intro2: 'One manager from first drawing to final walkthrough, trusted trades, and the same phone number afterwards.',
    hero: photo('construction-hero'), heroAlt: 'A newly completed shingle-style house at golden hour',
    stats: [{ value: '1958', label: 'building since' }, { value: 'One', label: 'point of contact' }, { value: 'Open', label: 'books and schedule' }],
    services: [
      { title: 'New homes', body: 'Ground-up construction with your architect, or ours, from permits to keys.' },
      { title: 'Renovations and additions', body: 'Kitchens, wings, second storeys and whole-house renovations, phased so you can live through them.' },
      { title: 'Estate projects', body: 'Pool houses, garages, guest cottages, courts, pools and gardens coordinated as one project with our other divisions.' },
      { title: 'Pre-construction', body: 'Budgets, schedules, value engineering and permitting before a shovel goes in.' },
      { title: 'Management', body: 'One manager, weekly reports, a live schedule and an open book on cost.' },
    ],
    process: [
      { lead: 'Plan.', body: 'Drawings, budget and schedule agreed before anything starts.' },
      { lead: 'Build.', body: 'Trusted trades, a site manager every day, and a weekly report with photographs.' },
      { lead: 'Hand over.', body: 'A walkthrough, a warranty, and the same phone number afterwards.' },
    ],
    gallery: [{ src: photo('construction-detail'), alt: 'Timber framing of a double-height room', ratio: 'portrait' }, { src: photo('construction-interior'), alt: 'A finished kitchen opening onto a terrace', ratio: 'landscape' }],
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'info@stewartsenterinc.com' },
    external: 'https://stewartsenterinc.com/',
  },
  {
    id: 'realestate', nav: 'Real estate', brand: 'Automatic Real Estate Associates',
    name: ['Real estate', 'brokerage'], tagline: 'Make it Automatic.',
    intro: 'Residential sales and exclusive listings on the North Shore and across Long Island, from a brokerage that knows what a property is worth because the family has built so many of them.',
    intro2: 'A brokerage inside a building group: we know what a house costs to build, to fix and to run, and we price it accordingly.',
    hero: photo('realestate-hero'), heroAlt: 'A brick Georgian colonial on a tree-lined lane',
    stats: [{ value: 'North Shore', label: 'and beyond' }, { value: 'BBB', label: 'accredited' }, { value: 'Exclusive', label: 'listings' }],
    services: [
      { title: 'Selling', body: 'Pricing grounded in construction knowledge, presentation and a buyer network built over decades.' },
      { title: 'Buying', body: 'Off-market and exclusive listings, and an honest read on what a house will cost to own.' },
      { title: 'Estates and land', body: 'Properties with room for a court, a pool or a garden, with the group ready to build them.' },
      { title: 'Areas', body: 'East Hills, Old Westbury, Roslyn, Muttontown, Great Neck, Brookville, Port Washington, Dix Hills and Melville.' },
    ],
    process: [
      { lead: 'Value.', body: 'A valuation that accounts for the building, not just the comparables.' },
      { lead: 'Present.', body: 'Photography, staging advice and a listing that reaches the right buyers.' },
      { lead: 'Close.', body: 'Negotiation, inspections and attorneys managed to a clean closing.' },
    ],
    gallery: [{ src: photo('realestate-detail'), alt: 'A living room with tall windows onto a garden', ratio: 'portrait' }, { src: photo('realestate-aerial'), alt: 'A Long Island waterfront village from the air', ratio: 'landscape' }],
    contact: { phone: '(516) 626-4444', phoneHref: 'tel:5166264444', email: 'michaeljberman@automaticre.com' },
    external: 'http://www.automaticre.com',
  },
]

export const CONTACT = {
  heading: ['Tell us about', 'the property.'],
  sentence: 'One call reaches every division. We reply within one working day.',
  fields: { name: 'Your name', division: 'What you need', message: 'A few lines about the project', send: 'Send the request' },
}

export const MAIN = main
