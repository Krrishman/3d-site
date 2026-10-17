#!/usr/bin/env node
/**
 * Generates the photographs for the plumbing site with Kie.ai (Flux 2 Pro) into
 * public/plumbing/photos/. Same API as generate-assets.mjs, different manifest.
 *
 *   KIE_API_KEY=... node scripts/generate-photos.mjs            # only missing
 *   KIE_API_KEY=... node scripts/generate-photos.mjs --force
 *   KIE_API_KEY=... node scripts/generate-photos.mjs --only hero-fence
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API = 'https://api.kie.ai/api/v1/jobs'
const MODEL = process.env.KIE_MODEL || 'flux-2/pro-text-to-image'
const OUT_DIR = path.resolve('public/plumbing/photos')
const KEY = process.env.KIE_API_KEY
const FORCE = process.argv.includes('--force')
const onlyArg = process.argv.indexOf('--only')
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1].split(',') : null

const LOOK =
  'Documentary photograph, early morning light, soft long shadows, natural colour, slight haze, 35mm lens, real textures, no people looking at camera, no text, no logos, no watermark.'
const SKY = 'The subject sits low in the frame and off-centre; the upper half of the frame is empty open sky with nothing in it.'

export const MANIFEST = {
  'hero-fence': { aspect: '16:9', prompt: `A newly built cedar board fence running across a suburban back yard, fresh pale timber, a few tools left on the grass. ${SKY} ${LOOK}` },
  'hero-plumbing': { aspect: '16:9', prompt: `A plain white plumber's van with a roof ladder parked on a quiet suburban street at dawn, side door open showing copper pipe and tool bags. ${SKY} ${LOOK}` },
  'hero-landscape': { aspect: '16:9', prompt: `A freshly laid stone garden path with new turf and young planting, a wheelbarrow at the end of it, suburban garden. ${SKY} ${LOOK}` },
  'hero-hvac': { aspect: '16:9', prompt: `A technician crouched beside a rooftop air-conditioning condenser unit at sunrise, tool bag open, flat roof, seen from behind. ${SKY} ${LOOK}` },
  'how-call': { aspect: '3:4', prompt: `A contractor leaning on a pickup truck tailgate on a job site, talking on a phone, morning light, a coffee cup on the tailgate. ${LOOK}` },
  'how-plan': { aspect: '1:1', prompt: `Top-down photograph of a hand-drawn plan on white paper on a plywood workbench: simple boxes and arrows in pencil, a tape measure, a pencil and a mug beside it. ${LOOK}` },
  'how-build': { aspect: '16:9', prompt: `A tablet propped on a pickup tailgate at a job site showing a simple dark blue app screen with a list, work gloves and a drill beside it, morning light. ${LOOK}` },
  'about-desk': { aspect: '16:9', prompt: `A quiet home studio desk by a window: a laptop, a paper notebook with pencil notes, a mug, morning light across the desk, plants on the sill. ${LOOK}` },
}

async function api(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, { ...init, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' } })
  const body = await res.json()
  if (body.code !== 200) throw new Error(`${pathname}: ${body.code} ${body.msg || ''}`)
  return body.data
}

async function generate(id, { prompt, aspect }) {
  const { taskId } = await api('/createTask', { method: 'POST', body: JSON.stringify({ model: MODEL, input: { prompt, aspect_ratio: aspect, resolution: '1K' } }) })
  const started = Date.now()
  let delay = 3000
  while (Date.now() - started < 8 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, delay))
    delay = Math.min(delay * 1.4, 15000)
    const task = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`)
    if (task.state === 'success') {
      const url = JSON.parse(task.resultJson || '{}').resultUrls?.[0]
      if (!url) throw new Error(`${id}: success without a result url`)
      const img = await fetch(url)
      const type = img.headers.get('content-type') || ''
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg'
      await writeFile(path.join(OUT_DIR, `${id}.${ext}`), Buffer.from(await img.arrayBuffer()))
      return `${id}.${ext}`
    }
    if (task.state === 'fail') throw new Error(`${id}: task failed ${task.failMsg || ''}`)
  }
  throw new Error(`${id}: timed out`)
}

async function main() {
  if (!KEY) { console.error('KIE_API_KEY is not set.'); process.exit(1) }
  await mkdir(OUT_DIR, { recursive: true })
  const have = new Set((await readdir(OUT_DIR)).map((f) => f.replace(/\.[a-z]+$/, '')))
  const queue = Object.keys(MANIFEST).filter((id) => (ONLY ? ONLY.includes(id) : true)).filter((id) => FORCE || !have.has(id))
  console.log(`${queue.length} photo(s) to generate with ${MODEL}.`)
  const failures = []
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const id = queue.shift()
      try { console.log(`ok   ${await generate(id, MANIFEST[id])}`) } catch (e) { failures.push(id); console.error(`fail ${e.message}`) }
    }
  }))
  console.log(failures.length ? `Done with ${failures.length} failure(s): ${failures.join(', ')}` : 'Done.')
}
main()
