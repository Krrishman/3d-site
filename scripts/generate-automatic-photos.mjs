#!/usr/bin/env node
/** Photographs for the Automatic Group site (Kie.ai, Flux 2 Pro) into public/automatic/photos/. */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
const API = 'https://api.kie.ai/api/v1/jobs', KEY = process.env.KIE_API_KEY, OUT = path.resolve('public/automatic/photos')
const FORCE = process.argv.includes('--force'); const o = process.argv.indexOf('--only'); const ONLY = o > -1 ? process.argv[o + 1].split(',') : null
const LOOK = 'Editorial architecture and landscape photograph, Long Island North Shore estate, late golden-hour light, long soft shadows, natural colour, medium-format look, crisp detail, no people facing camera, no text, no logos, no watermark.'
export const MANIFEST = {
  'hub-hero': { aspect: '16:9', prompt: `Wide view across a manicured estate lawn toward a shingle-style mansion at golden hour; in the foreground a gunite pool with a spillover spa, to one side a red clay tennis court behind clipped hedges, sprinkler mist catching the light at the far edge of the lawn. ${LOOK}` },
  'sprinklers-hero': { aspect: '16:9', prompt: `Dawn over a vast estate lawn, dozens of pop-up sprinkler heads throwing arcs of water that catch the low sun, mist drifting, a grand house soft in the background, upper third open sky. ${LOOK}` },
  'sprinklers-detail': { aspect: '3:4', prompt: `Macro of a brass pop-up sprinkler head rising from perfect turf, water fanning out in a fine arc, backlit droplets, shallow depth of field. ${LOOK}` },
  'sprinklers-fleet': { aspect: '3:2', prompt: `A row of identical plain white service trucks parked in a tidy yard at sunrise, ladder racks and pipe, no lettering on the trucks, long shadows. ${LOOK}` },
  'courts-hero': { aspect: '16:9', prompt: `A private red clay tennis court set among tall oaks and clipped hedges on an estate, fresh white lines, late afternoon light raking across the surface, a bench and a windscreen, upper third sky and trees. ${LOOK}` },
  'courts-detail': { aspect: '3:4', prompt: `Close-up of a pickleball court corner: deep blue acrylic surface, crisp white lines, a net post, afternoon light, shallow depth of field. ${LOOK}` },
  'courts-build': { aspect: '3:2', prompt: `A tennis court under construction on an estate: graded stone base, laser screed, surveying tripod, fencing posts being set, golden light. ${LOOK}` },
  'pools-hero': { aspect: '16:9', prompt: `A custom gunite swimming pool with a raised spillover spa and a dark tile band at dusk, underwater lights glowing, bluestone coping, a shingle house lit warm behind, upper third dusk sky. ${LOOK}` },
  'pools-detail': { aspect: '3:4', prompt: `Close-up of water spilling over the edge of a tiled spa into a pool, glass mosaic tile band, marble-finish shell visible under clear water, evening light. ${LOOK}` },
  'pools-build': { aspect: '3:2', prompt: `A gunite pool shell under construction: a lattice of tied steel rebar in the shape of a freeform pool, freshly sprayed concrete on one side, workers' tools, bright daylight. ${LOOK}` },
  'landscape-hero': { aspect: '16:9', prompt: `A layered estate garden: bluestone path between boxwood, hydrangeas and ornamental grasses, a dry-laid fieldstone wall, mature specimen trees, a glimpse of a house, soft golden light, upper third sky. ${LOOK}` },
  'landscape-detail': { aspect: '3:4', prompt: `Close-up of a mason's hands setting a bluestone cap on a fieldstone wall, mortar and level beside, warm light. ${LOOK}` },
  'landscape-night': { aspect: '3:2', prompt: `An estate garden at blue hour with landscape lighting: uplit specimen trees, path lights along a stone walk, a lit pergola, warm pools of light in deep blue dusk. ${LOOK}` },
  'construction-hero': { aspect: '16:9', prompt: `A newly completed shingle-style house on Long Island's North Shore at golden hour, white trim, standing-seam roof accents, bluestone terrace, fresh landscaping, upper third sky. ${LOOK}` },
  'construction-detail': { aspect: '3:4', prompt: `Interior of a house under construction: clean timber framing of a double-height room, sunlight through openings, sawdust in the air, a set of rolled drawings on a sawhorse. ${LOOK}` },
  'construction-interior': { aspect: '3:2', prompt: `A finished high-end kitchen opening onto a terrace through tall steel-framed doors, marble island, oak floor, evening light. ${LOOK}` },
  'realestate-hero': { aspect: '16:9', prompt: `A brick Georgian colonial estate on a tree-lined North Shore lane at golden hour, circular gravel drive, mature maples, boxwood, upper third sky. ${LOOK}` },
  'realestate-detail': { aspect: '3:4', prompt: `An elegant living room with tall windows onto a garden, linen sofas, a marble fireplace, afternoon light. ${LOOK}` },
  'realestate-aerial': { aspect: '3:2', prompt: `Aerial view at golden hour of a leafy Long Island waterfront village: estates among trees, a harbour with sailboats, Long Island Sound beyond. ${LOOK}` },
}
async function api(p, init = {}) { const r = await fetch(`${API}${p}`, { ...init, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' } }); const b = await r.json(); if (b.code !== 200) throw new Error(`${p}: ${b.code} ${b.msg || ''}`); return b.data }
async function gen(id, { prompt, aspect }) {
  const { taskId } = await api('/createTask', { method: 'POST', body: JSON.stringify({ model: 'flux-2/pro-text-to-image', input: { prompt, aspect_ratio: aspect, resolution: '1K' } }) })
  const t0 = Date.now(); let d = 3000
  while (Date.now() - t0 < 8 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, d)); d = Math.min(d * 1.4, 15000)
    const t = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`)
    if (t.state === 'success') { const url = JSON.parse(t.resultJson || '{}').resultUrls?.[0]; const img = await fetch(url); const ty = img.headers.get('content-type') || ''; const ext = ty.includes('png') ? 'png' : ty.includes('webp') ? 'webp' : 'jpg'; await writeFile(path.join(OUT, `${id}.${ext}`), Buffer.from(await img.arrayBuffer())); return `${id}.${ext}` }
    if (t.state === 'fail') throw new Error(`${id}: ${t.failMsg || 'failed'}`)
  }
  throw new Error(`${id}: timed out`)
}
async function main() {
  if (!KEY) { console.error('KIE_API_KEY is not set.'); process.exit(1) }
  await mkdir(OUT, { recursive: true })
  const have = new Set((await readdir(OUT)).map((f) => f.replace(/\.[a-z]+$/, '')))
  const q = Object.keys(MANIFEST).filter((id) => (ONLY ? ONLY.includes(id) : true)).filter((id) => FORCE || !have.has(id))
  console.log(`${q.length} photo(s) to generate.`); const fails = []
  await Promise.all(Array.from({ length: 3 }, async () => { while (q.length) { const id = q.shift(); try { console.log('ok  ', await gen(id, MANIFEST[id])) } catch (e) { fails.push(id); console.error('fail', e.message) } } }))
  console.log(fails.length ? `Done with failures: ${fails.join(', ')}` : 'Done.')
}
main()
