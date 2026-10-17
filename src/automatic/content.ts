/** Copy for The Automatic Group: one group page and six division pages. Figures are the ones the group publishes on its own sites. */
const base = import.meta.env.BASE_URL
export const photo = (name: string) => `${base}automatic/photos/${name}.jpg`

export const GROUP = {
  name: 'The Automatic Group',
  since: 1958,
  address: '333 Baldwin Road, Hempstead, NY 11550',
  phone: '(516) 486-7500',
  phoneHref: 'tel:5164867500',
  email: 'info@automaticgroup.com',
  headline: ['Six crafts.', 'One family. Since 1958.'],
  support: 'Lawn sprinklers, tennis and pickleball courts, gunite pools, fine landscaping and masonry, construction management and real estate. One family, one address, from Manhattan to Montauk.',
  statement: 'One call reaches a sprinkler designer, a court builder, a pool engineer, a landscape architect, a construction manager and a broker who all answer to the same family.',
  numbers: [
    { value: 66, suffix: '', label: 'years, same ownership' },
    { value: 88, suffix: '', label: 'full-time professionals' },
    { value: 36, suffix: '', label: 'branded trucks' },
    { value: 41637, suffix: '', label: 'irrigation systems installed' },
    { value: 1018, suffix: '', label: 'courts built and serviced' },
    { value: 536, suffix: '', label: 'gunite pools built and restored' },
  ],
  why: [
    { title: 'Our own crews', body: 'Eighty-eight people on the payroll, some with fifty years of tenure. No subcontracted technicians on your property.' },
    { title: 'One address since 1958', body: 'Three generations have run the business from Baldwin Road in Hempstead. The phone number has not changed.' },
    { title: 'Designed together', body: 'A pool, a court, a garden and the irrigation that keeps it green are planned as one project, not four contractors arguing over a lawn.' },
    { title: 'A reputation to protect', body: 'Repeat clients include country clubs, estates and one tennis legend. We do it right or we do not do it at all.' },
  ],
  timeline: [
    { year: '1958', text: 'Stewart Senter installs an in-ground sprinkler system and founds Automatic Irrigation Design.' },
    { year: '1970s', text: 'Clients ask for courts and pools. Tennis Planning Corp. is born and builds its first red clay courts.' },
    { year: '1990s', text: 'Landscape architects join. Gardens, masonry and lighting are designed alongside the pools and courts.' },
    { year: '2000s', text: 'Stewart Senter Inc. begins managing whole-house projects for the estates the group already serves.' },
    { year: '2010s', text: 'Automatic Real Estate Associates opens in Roslyn Heights. Wi-Fi irrigation controls arrive.' },
    { year: 'Today', text: 'Six divisions, 88 professionals, 36 trucks, and the same family answering the phone.' },
  ],
  clients: ['Cherry Valley Club', 'Woodside Club', 'Cold Spring Country Club', 'Private estates from Great Neck to Montauk', 'Manhattan rooftops and terraces'],
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
  includes: string[]
  process: { lead: string; body: string }[]
  gallery: { src: string; alt: string }[]
  faq: { q: string; a: string }[]
  quote?: { text: string; who: string }
  areas: string
  contact: { phone: string; phoneHref: string; email: string }
  external: string
}

const crew = 'Every job is done by our own crews, planned by our own designers, and backed by the same phone number afterwards.'

export const DIVISIONS: Division[] = [
  {
    id: 'sprinklers', nav: 'Sprinklers', brand: 'Automatic Irrigation Design',
    name: ['Lawn', 'Sprinklers'], tagline: 'The first thing the family ever built, and still the biggest.',
    intro: 'Design, installation and year-round service of irrigation systems for homes, estates and commercial properties, with full-time technicians rather than subcontractors and a 24-hour emergency line.',
    intro2: crew,
    hero: photo('sprinklers-hero'), heroAlt: 'Sprinklers throwing arcs of water across an estate lawn at dawn',
    stats: [{ value: '41,637', label: 'systems' }, { value: '10,218', label: 'services a year' }, { value: '534', label: 'five-star reviews' }, { value: '24 hr', label: 'emergency line' }],
    services: [
      { title: 'Residential systems', body: 'Designed for the property, zoned for sun, shade, slope and planting, and tuned each season so beds and lawn get what they need and nothing more.' },
      { title: 'Commercial and institutional', body: 'Campuses, clubs, condominiums and municipal grounds, with service contracts, reporting and the trucks to keep them green.' },
      { title: 'Engineering and design', body: 'Hydraulic design, pressure and flow analysis, and sealed drawings for architects and landscape architects on new builds.' },
      { title: 'Wi-Fi control', body: 'Smart controllers that adjust to the forecast, report leaks and run from your phone, retrofitted to any system we or anyone else installed.' },
      { title: 'Backflow testing', body: 'Certified annual backflow testing and filing with the water authority, scheduled so you never think about it.' },
      { title: 'Landscape lighting', body: 'Low-voltage lighting for paths, trees and façades, installed in the same trenches as the irrigation.' },
    ],
    includes: ['Free design visit and written quote', 'Permits and utility mark-outs', 'Lawn and bed restoration after install', 'Spring start-up and fall winterisation', 'Mid-season adjustment', '24-hour emergency line', 'Warranty on parts and labour'],
    process: [
      { lead: 'Walk the property.', body: 'A designer maps sun, shade, planting and water pressure and leaves you with a plan and a fixed price.' },
      { lead: 'Install in days.', body: 'Crews pull pipe with minimal disturbance to lawns and beds, and restore everything they touch.' },
      { lead: 'Open, close, adjust.', body: 'Spring start-up, mid-season adjustment and winterisation, year after year, on a schedule we keep.' },
    ],
    gallery: [{ src: photo('sprinklers-detail'), alt: 'A brass pop-up sprinkler head in turf' }, { src: photo('sprinklers-fleet'), alt: 'A row of white service trucks at sunrise' }],
    faq: [
      { q: 'How long does an installation take?', a: 'Most residential systems are installed in one to three days. Estates and commercial grounds are scheduled in phases so the property stays usable.' },
      { q: 'Will you tear up the lawn?', a: 'Pipe is pulled, not trenched, wherever the ground allows. Where we must cut, the turf is lifted and relaid the same day.' },
      { q: 'Can you service a system you did not install?', a: 'Yes. We take over systems of any age and brand, and most become service-contract customers.' },
      { q: 'What does the emergency line cover?', a: 'Breaks, leaks and controller failures, 24 hours a day, with a technician dispatched from our own fleet.' },
    ],
    quote: { text: 'On time, every time, and the lawn has never looked better.', who: 'Homeowner, Great Neck' },
    areas: 'Long Island and New York City, from Manhattan to the Hamptons.',
    contact: { phone: '(516) 486-7515', phoneHref: 'tel:5164867515', email: 'debra@automaticgroup.com' },
    external: 'https://lawnsprinklers.com/',
  },
  {
    id: 'courts', nav: 'Courts', brand: 'Tennis Planning Corp.',
    name: ['Tennis &', 'Pickleball Courts'], tagline: 'Enjoy the love game in your own backyard.',
    intro: 'Design, construction and resurfacing of private and club courts across Long Island, from red clay and Har-Tru to cushioned hard courts and dedicated pickleball, with fencing, lighting and windscreens.',
    intro2: crew,
    hero: photo('courts-hero'), heroAlt: 'A private red clay tennis court among oaks on an estate',
    stats: [{ value: '1,018', label: 'courts' }, { value: '64', label: 'years' }, { value: '3', label: 'surfaces: clay, Har-Tru, hard' }, { value: 'McEnroe', label: 'is a repeat client' }],
    services: [
      { title: 'New courts', body: 'Site work, drainage, stone base and surface, built to the specification of the game you play and the ground you have.' },
      { title: 'Red clay and Har-Tru', body: 'The surfaces the clubs ask for, with sub-surface irrigation and the daily and seasonal maintenance that keeps them playing true.' },
      { title: 'Hard and cushioned courts', body: 'Post-tensioned concrete or asphalt bases with acrylic or cushioned systems, in any colour combination.' },
      { title: 'Pickleball', body: 'Purpose-built courts and conversions of existing hard courts, with correct lines, nets and sound-conscious fencing for the neighbours.' },
      { title: 'Resurfacing and repair', body: 'Crack repair, colour coating, line painting, net posts and fencing on courts of any age, ours or not.' },
      { title: 'Lighting, fencing and extras', body: 'LED court lighting, fencing, windscreens, benches, ball machines and shade structures specified for the site.' },
    ],
    includes: ['Site survey and drainage plan', 'Permits and setbacks', 'Base, surface, lines and nets', 'Fencing and windscreens', 'Seasonal clay maintenance programmes', 'Resurfacing schedules for hard courts'],
    process: [
      { lead: 'Choose the surface.', body: 'We talk through how you play, who maintains it and how it sits with the garden, then recommend a build and a price.' },
      { lead: 'Build it right.', body: 'In-house crews handle grading, base, drainage, surfacing and fencing. We do it right or we do not do it at all.' },
      { lead: 'Keep it playing.', body: 'Seasonal maintenance for clay, and resurfacing on schedule for hard courts, by the people who built it.' },
    ],
    gallery: [{ src: photo('courts-detail'), alt: 'The corner of a blue pickleball court' }, { src: photo('courts-build'), alt: 'A court base being graded on an estate' }],
    faq: [
      { q: 'How much space does a court need?', a: 'A regulation tennis court with run-offs is about 60 by 120 feet. A pickleball court fits in 30 by 60. We will measure and tell you honestly what fits.' },
      { q: 'Clay or hard court?', a: 'Clay is easier on the body and what the clubs play on, but needs daily care. Hard courts need almost none between resurfacings. Most private clients choose on how often they will play.' },
      { q: 'How long does a new court take?', a: 'Six to ten weeks from ground-breaking, depending on surface and weather. Resurfacing takes a week.' },
      { q: 'Can you convert my tennis court for pickleball?', a: 'Yes, either with blended lines or a full conversion into up to four pickleball courts.' },
    ],
    quote: { text: 'Our red clay courts have never been in better shape.', who: 'Cherry Valley Club' },
    areas: 'Long Island, from Great Neck to Montauk.',
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://www.tennisplanning.com/',
  },
  {
    id: 'pools', nav: 'Pools', brand: 'Tennis Planning Corp.',
    name: ['Gunite', 'Swimming Pools'], tagline: 'Any shape, any depth, built to outlast the house.',
    intro: 'Custom gunite pools and spas designed with landscape architects and engineers, built by in-house crews, and restored when older pools need a new life.',
    intro2: crew,
    hero: photo('pools-hero'), heroAlt: 'A gunite pool with a spillover spa at dusk',
    stats: [{ value: '536', label: 'pools' }, { value: '50+', label: 'years' }, { value: '100%', label: 'custom, no kits' }, { value: 'Award', label: 'winning design' }],
    services: [
      { title: 'New gunite pools', body: 'Steel-reinforced shells sprayed in place, in any shape, depth or size, finished with a tile band and a marble-coated interior.' },
      { title: 'Spas and water features', body: 'Spillover spas, beach entries, sun shelves, fire and water bowls, waterfalls, swim-up bars, deck jets and bubblers.' },
      { title: 'Automation', body: 'Pumps, filters, heaters, salt systems and colour-changing lighting on one control system, run from your phone.' },
      { title: 'Safety covers', body: 'Automatic covers that travel under the coping: the most requested feature of the last decade, for children, pets, heat and cleanliness.' },
      { title: 'Restoration', body: 'Worn marble finishes, tile and coping replaced with upgraded products and techniques. Many come out better than new.' },
      { title: 'Patios and surrounds', body: 'Bluestone, travertine and masonry coping, patios and walls, planned with the landscape from day one.' },
    ],
    includes: ['Design with landscape architect and engineer', 'Permits and inspections', 'Excavation, steel and gunite by our crews', 'Tile band and marble finish', 'Equipment, automation and lighting', 'Start-up, balancing and a season of guidance'],
    process: [
      { lead: 'Design with the house.', body: 'We assess orientation, privacy and how the family uses the garden, with landscape architects and engineers at the table.' },
      { lead: 'Permits and ground-breaking.', body: 'Once you approve the plan we handle permits and in-house crews break ground.' },
      { lead: 'Steel, gunite, finish.', body: 'Rebar is tied to the shape, concrete is sprayed, then tile, coping and marble finish go on and the water goes in.' },
    ],
    gallery: [{ src: photo('pools-detail'), alt: 'Water spilling over a tiled spa edge' }, { src: photo('pools-build'), alt: 'A rebar pool shell under construction' }],
    faq: [
      { q: 'Why gunite rather than a liner or fibreglass?', a: 'Gunite is the only method that gives you any shape and depth, a tiled and marble-finished interior, and a shell that lasts for decades. It costs more up front and far less over its life.' },
      { q: 'How long does a pool take?', a: 'Twelve to sixteen weeks from ground-breaking to swimming, with permits before that. Spring starts fill fast, so plan in winter.' },
      { q: 'Can you restore a pool someone else built?', a: 'Yes. Refinishing, new tile and coping, new equipment and automation on pools of any age.' },
      { q: 'Do you build the patio and garden around it?', a: 'Yes. Our landscape and masonry teams design the surrounds with the pool so nothing is an afterthought.' },
    ],
    areas: 'Long Island, from Great Neck to Montauk.',
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://tennisplanning.com/our-services/gunite-pools/',
  },
  {
    id: 'landscape', nav: 'Landscape', brand: 'Tennis Planning Corp.',
    name: ['Fine Landscaping', '& Masonry'], tagline: 'You paint a portrait. We turn it landscape.',
    intro: 'Landscape design and planning by experienced landscape architects, built with stone, planting, drainage and lighting that are meant to last, and to last beautifully.',
    intro2: crew,
    hero: photo('landscape-hero'), heroAlt: 'A bluestone path through a layered estate garden',
    stats: [{ value: '64', label: 'years' }, { value: 'Award', label: 'winning' }, { value: 'In-house', label: 'architects, crews, masons' }, { value: '4', label: 'seasons planned for' }],
    services: [
      { title: 'Landscape architecture', body: 'Plans that suit the house, modern or classic, sketched at every stage so you see the garden before it is built.' },
      { title: 'Planting design', body: 'Plants chosen to harmonise with each other and the site, staggered to flower across the seasons, and safe where children and pets play.' },
      { title: 'Custom masonry', body: 'Fieldstone walls, bluestone terraces, steps, pillars, fire pits and outdoor kitchens, cut and laid by our own masons.' },
      { title: 'Drainage and grading', body: 'Designed in from the start, so the garden survives a Long Island winter and a summer storm.' },
      { title: 'Landscape lighting', body: 'Balanced low-voltage lighting for paths, trees, walls and poolside walks, with the fixtures hidden by day.' },
      { title: 'Pergolas and structures', body: 'Pergolas, arbours, pool houses and garden walls designed with the planting, not dropped on top of it.' },
    ],
    includes: ['Site history and use interview', 'Concept and planting plans', 'Hardscape drawings and material samples', 'Permits where required', 'Installation by in-house crews and masons', 'First-season establishment visits'],
    process: [
      { lead: 'Listen first.', body: 'The history of the site, how family and guests use the outdoors, and the look you are after.' },
      { lead: 'Design in detail.', body: 'Landscape architects and engineers draw the plan, planting and hardscape together, and show you samples of every stone.' },
      { lead: 'Build to last.', body: 'In-house crews and masons build it, and we stay involved through the first seasons as it grows in.' },
    ],
    gallery: [{ src: photo('landscape-detail'), alt: 'A mason setting a bluestone cap on a fieldstone wall' }, { src: photo('landscape-night'), alt: 'An estate garden lit at blue hour' }],
    faq: [
      { q: 'Do you work with my architect?', a: 'Often. We coordinate with architects, interior designers and pool and court teams, ours or yours.' },
      { q: 'What stone do you use?', a: 'Mostly Pennsylvania bluestone, local fieldstone and granite, with travertine and limestone where the house calls for it. You see samples before anything is ordered.' },
      { q: 'How long until the garden looks finished?', a: 'Hardscape is finished the day we leave. Planting is designed to look good at planting and better each season for three years.' },
      { q: 'Do you maintain the gardens you build?', a: 'We handle establishment visits in the first seasons and can recommend maintenance partners after that.' },
    ],
    quote: { text: 'We build spaces to last, and last beautifully.', who: 'Glenn Katz, Vice President' },
    areas: 'Long Island, from Great Neck to Montauk.',
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'glenn@automaticgroup.com' },
    external: 'https://tennisplanning.com/our-services/landscape-planning/',
  },
  {
    id: 'construction', nav: 'Construction', brand: 'Stewart Senter Inc.',
    name: ['Construction', 'Management'], tagline: 'Exceptional service. Extraordinary homes.',
    intro: 'New homes, major renovations and estate projects managed from first drawing to final walkthrough, by the family that has been building on Long Island since 1958.',
    intro2: 'One manager from first drawing to final walkthrough, trusted trades, open books, and the same phone number afterwards.',
    hero: photo('construction-hero'), heroAlt: 'A newly completed shingle-style house at golden hour',
    stats: [{ value: '1958', label: 'since' }, { value: 'One', label: 'manager' }, { value: 'Weekly', label: 'photo reports' }, { value: 'Open', label: 'book on cost' }],
    services: [
      { title: 'New homes', body: 'Ground-up construction with your architect, or one we introduce, from permits to keys.' },
      { title: 'Renovations and additions', body: 'Kitchens, wings, second storeys and whole-house renovations, phased so you can live through them.' },
      { title: 'Estate projects', body: 'Pool houses, garages, guest cottages, courts, pools and gardens coordinated as one project with our other divisions.' },
      { title: 'Pre-construction', body: 'Budgets, schedules, value engineering and permitting before a shovel goes in, so the number you approve is the number you pay.' },
      { title: 'Management', body: 'One manager, a site supervisor every day, a live schedule, weekly photographed reports and an open book on cost.' },
      { title: 'After hand-over', body: 'A walkthrough, a warranty, and a phone number that still answers a year later.' },
    ],
    includes: ['Budget and schedule before contract', 'Permits and inspections', 'Vetted trades with long relationships', 'Daily site supervision', 'Weekly written and photographed reports', 'Final walkthrough and warranty'],
    process: [
      { lead: 'Plan.', body: 'Drawings, budget and schedule agreed before anything starts.' },
      { lead: 'Build.', body: 'Trusted trades, a site manager every day, and a weekly report with photographs.' },
      { lead: 'Hand over.', body: 'A walkthrough, a warranty, and the same phone number afterwards.' },
    ],
    gallery: [{ src: photo('construction-detail'), alt: 'Timber framing of a double-height room' }, { src: photo('construction-interior'), alt: 'A finished kitchen opening onto a terrace' }],
    faq: [
      { q: 'Do you work on a fixed price or cost plus?', a: 'Either. Most clients choose a fixed price once drawings are complete; larger estates run cost plus with an open book and a capped fee.' },
      { q: 'Can we live in the house during a renovation?', a: 'Usually. We phase the work, seal off the site and schedule noisy work around your week.' },
      { q: 'Who is on site?', a: 'A Stewart Senter supervisor every day, and trades we have worked with for years.' },
      { q: 'Can you build the pool, court and garden too?', a: 'Yes, that is the point of the group. One manager coordinates every division so the property is finished together.' },
    ],
    areas: 'Nassau and Suffolk counties, with select projects in New York City.',
    contact: { phone: '(516) 486-7500', phoneHref: 'tel:5164867500', email: 'info@stewartsenterinc.com' },
    external: 'https://stewartsenterinc.com/',
  },
  {
    id: 'realestate', nav: 'Real estate', brand: 'Automatic Real Estate Associates',
    name: ['Real Estate', 'Brokerage'], tagline: 'Make it Automatic.',
    intro: 'Residential sales and exclusive listings on the North Shore and across Long Island, from a brokerage that knows what a property is worth because the family has built so many of them.',
    intro2: 'A brokerage inside a building group: we know what a house costs to build, to fix and to run, and we price it accordingly.',
    hero: photo('realestate-hero'), heroAlt: 'A brick Georgian colonial on a tree-lined lane',
    stats: [{ value: '11', label: 'villages' }, { value: 'BBB', label: 'accredited' }, { value: 'Exclusive', label: 'listings' }, { value: '1958', label: 'family on the Island since' }],
    services: [
      { title: 'Selling', body: 'Pricing grounded in construction knowledge, presentation and a buyer network built over decades.' },
      { title: 'Buying', body: 'Off-market and exclusive listings, and an honest read on what a house will cost to own.' },
      { title: 'Estates and land', body: 'Properties with room for a court, a pool or a garden, with the group ready to build them.' },
      { title: 'Pre-sale preparation', body: 'The repairs, landscaping and staging that move a price, done by our own divisions before the photographs.' },
      { title: 'Inspection with a builder', body: 'A construction manager reads the inspection report with you, so a scary line item becomes a number.' },
      { title: 'After the closing', body: 'Introductions to every division for the work the new house needs, with one call.' },
    ],
    includes: ['Valuation with a builder’s eye', 'Photography and staging advice', 'Exclusive and off-market access', 'Negotiation and attorney coordination', 'Inspection review by a construction manager', 'Fair housing compliance'],
    process: [
      { lead: 'Value.', body: 'A valuation that accounts for the building, not just the comparables.' },
      { lead: 'Present.', body: 'Photography, staging advice and a listing that reaches the right buyers.' },
      { lead: 'Close.', body: 'Negotiation, inspections and attorneys managed to a clean closing.' },
    ],
    gallery: [{ src: photo('realestate-detail'), alt: 'A living room with tall windows onto a garden' }, { src: photo('realestate-aerial'), alt: 'A Long Island waterfront village from the air' }],
    faq: [
      { q: 'Which areas do you cover?', a: 'East Hills, Old Westbury, Roslyn, Muttontown, Great Neck, Old Brookville, Brookville, Hewlett Neck, Port Washington, Dix Hills and Melville, and Long Island more broadly.' },
      { q: 'What makes a builder’s brokerage different?', a: 'We can tell you what the roof, the pool and the drainage will cost before you bid, and we can fix them after you close.' },
      { q: 'Do you handle rentals?', a: 'Select luxury rentals in the same villages. Ask.' },
      { q: 'How do I see exclusive listings?', a: 'Call the Roslyn Heights office. Several are never advertised.' },
    ],
    areas: 'The North Shore and Long Island, from the Roslyn Heights office.',
    contact: { phone: '(516) 626-4444', phoneHref: 'tel:5166264444', email: 'michaeljberman@automaticre.com' },
    external: 'http://www.automaticre.com',
  },
]

export const CONTACT = {
  heading: ['Tell us about', 'the property.'],
  sentence: 'One call reaches every division. We reply within one working day.',
  points: ['A designer or manager visits in person', 'A written plan and price, nothing to sign first', 'Our own crews from start to finish'],
  fields: { name: 'Your name', division: 'What you need', message: 'About the project', send: 'Send the request' },
}
