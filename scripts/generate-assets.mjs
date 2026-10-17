#!/usr/bin/env node
/**
 * Generates FlowForge's work tiles and project images with Kie.ai (Flux 2 Pro),
 * downloads them to public/renders/, and writes src/renders.generated.ts so the
 * site uses them instead of the placeholders.
 *
 *   KIE_API_KEY=... node scripts/generate-assets.mjs            # only missing renders
 *   KIE_API_KEY=... node scripts/generate-assets.mjs --force    # regenerate everything
 *   KIE_API_KEY=... node scripts/generate-assets.mjs --only work-01,p1-a
 *
 * Docs: https://docs.kie.ai/market/flux2/pro-text-to-image
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const API = 'https://api.kie.ai/api/v1/jobs'
const MODEL = process.env.KIE_MODEL || 'flux-2/pro-text-to-image'
const OUT_DIR = path.resolve('public/renders')
const MAP_FILE = path.resolve('src/renders.generated.ts')
const KEY = process.env.KIE_API_KEY
const FORCE = process.argv.includes('--force')
const onlyArg = process.argv.indexOf('--only')
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1].split(',') : null

const BRAND =
  'Photorealistic screen render of a premium web product. Deep navy background #0B1220, electric blue #2F80ED and teal #24D1C2 accents, white text, clean geometric sans-serif typography, generous spacing, soft glow highlights, crisp edges. Minimal, legible labels only. No watermark, no logos of real companies, no people.'
const SITE = 'Website hero screenshot shown straight on, full browser viewport, dark theme.'
const APP = 'Business app dashboard interface shown straight on, dark theme, cards and tables with realistic sample data.'
const PHONE = 'Single smartphone screen shown straight on, dark theme app, filling the frame.'

/** id → { prompt, aspect } */
export const MANIFEST = {
  'work-01': { aspect: '16:9', prompt: `${SITE} Local fence and deck contractor: large headline, photo of a cedar fence, a short quote request form with a photo upload. ${BRAND}` },
  'work-02': { aspect: '16:9', prompt: `${SITE} Plumbing company with an online booking widget showing available times this week and a call button. ${BRAND}` },
  'work-03': { aspect: '16:9', prompt: `${SITE} Landscaping company with a before-and-after slider of a garden and a "get a quote" button. ${BRAND}` },
  'work-04': { aspect: '16:9', prompt: `${SITE} Heating and air conditioning service with a seasonal tune-up offer and a service area map. ${BRAND}` },
  'work-05': { aspect: '16:9', prompt: `${SITE} Neighbourhood bakery with online ordering, a grid of pastries and a pickup time picker. ${BRAND}` },
  'work-06': { aspect: '16:9', prompt: `${SITE} Dental clinic with an appointment booking form and a friendly hero photo of the clinic interior. ${BRAND}` },
  'work-07': { aspect: '16:9', prompt: `${APP} Contractor lead dashboard: counters for new, quoted, booked, completed; a list of quote requests with status chips. ${BRAND}` },
  'work-08': { aspect: '16:9', prompt: `${APP} Inventory tracker for a trades business: stock levels, reorder alerts highlighted in red, supplier column. ${BRAND}` },
  'work-09': { aspect: '16:9', prompt: `${APP} Crew scheduling calendar, week view, colour-coded jobs assigned to three crews. ${BRAND}` },
  'work-10': { aspect: '16:9', prompt: `${APP} Customer portal showing a job's status timeline: requested, quoted, booked, in progress, done; with photos. ${BRAND}` },
  'work-11': { aspect: '16:9', prompt: `${APP} Quote builder: line items with quantities and prices, a total, and a "send quote" button. ${BRAND}` },
  'work-12': { aspect: '16:9', prompt: `${APP} Spreadsheet import tool showing messy rows on the left turning into clean customer records on the right, duplicates merged. ${BRAND}` },

  'p1-a': { aspect: '16:9', prompt: `${APP} Contractor lead dashboard overview with four stat cards and a table of leads with status chips New, Contacted, Quoted, Booked. ${BRAND}` },
  'p1-b': { aspect: '4:3', prompt: `${APP} Lead detail panel: customer name, job description, three attached site photos, notes and a "send quote" action. ${BRAND}` },
  'p1-c': { aspect: '3:4', prompt: `${PHONE} Lead list with status chips and a big "mark contacted" button. ${BRAND}` },

  'p2-a': { aspect: '16:9', prompt: `${APP} Inventory and reorder tracker: stock table for fence pickets, screws, concrete and stain, with reorder thresholds. ${BRAND}` },
  'p2-b': { aspect: '4:3', prompt: `${APP} Reorder alerts panel listing three low-stock items with supplier and lead time, one marked ordered. ${BRAND}` },
  'p2-c': { aspect: '3:4', prompt: `${PHONE} Barcode scan screen for a stock count, item card with quantity stepper. ${BRAND}` },

  'p3-a': { aspect: '16:9', prompt: `${APP} Scheduling calendar, week view, jobs as colour blocks across Monday to Saturday, crew avatars. ${BRAND}` },
  'p3-b': { aspect: '4:3', prompt: `${APP} Client portal page: "Your job" status card showing Booked for Tuesday 9am, a map pin and a message thread. ${BRAND}` },
  'p3-c': { aspect: '3:4', prompt: `${PHONE} Customer view of upcoming appointment with reschedule and message buttons. ${BRAND}` },
}

async function api(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  const body = await res.json()
  if (body.code !== 200) throw new Error(`${pathname}: ${body.code} ${body.msg || ''}`)
  return body.data
}

async function generate(id, { prompt, aspect }) {
  const { taskId } = await api('/createTask', {
    method: 'POST',
    body: JSON.stringify({ model: MODEL, input: { prompt, aspect_ratio: aspect, resolution: '1K' } }),
  })
  const started = Date.now()
  let delay = 3000
  while (Date.now() - started < 8 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, delay))
    delay = Math.min(delay * 1.4, 15000)
    const task = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`)
    if (task.state === 'success') {
      const result = JSON.parse(task.resultJson || '{}')
      const url = result.resultUrls?.[0]
      if (!url) throw new Error(`${id}: success without a result url`)
      const img = await fetch(url)
      const type = img.headers.get('content-type') || ''
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg'
      const file = path.join(OUT_DIR, `${id}.${ext}`)
      await writeFile(file, Buffer.from(await img.arrayBuffer()))
      return `/renders/${id}.${ext}`
    }
    if (task.state === 'fail') throw new Error(`${id}: task failed ${task.failMsg || ''}`)
  }
  throw new Error(`${id}: timed out`)
}

async function existing() {
  await mkdir(OUT_DIR, { recursive: true })
  const map = {}
  for (const f of await readdir(OUT_DIR)) {
    const id = f.replace(/\.[a-z]+$/, '')
    if (MANIFEST[id]) map[id] = `/renders/${f}`
  }
  return map
}

async function writeMap(map) {
  const body = `/** Generated by scripts/generate-assets.mjs. Do not edit by hand. */\nexport const RENDERS: Record<string, string> = ${JSON.stringify(map, null, 2)}\n`
  await writeFile(MAP_FILE, body)
}

async function main() {
  if (!KEY) {
    console.error('KIE_API_KEY is not set. Add it as an environment secret (cloud) or export it in your shell, then rerun.')
    process.exit(1)
  }
  const map = await existing()
  const todo = Object.keys(MANIFEST).filter((id) => (ONLY ? ONLY.includes(id) : true)).filter((id) => FORCE || !map[id])
  console.log(`${todo.length} render(s) to generate with ${MODEL}; ${Object.keys(map).length} already present.`)
  const queue = [...todo]
  const failures = []
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      while (queue.length) {
        const id = queue.shift()
        try {
          map[id] = await generate(id, MANIFEST[id])
          await writeMap(map)
          console.log(`ok   ${id} -> ${map[id]}`)
        } catch (e) {
          failures.push(id)
          console.error(`fail ${id}: ${e.message}`)
        }
      }
    }),
  )
  await writeMap(map)
  console.log(failures.length ? `Done with ${failures.length} failure(s): ${failures.join(', ')}` : 'Done.')
  if (!existsSync(MAP_FILE)) process.exit(1)
}

main()
