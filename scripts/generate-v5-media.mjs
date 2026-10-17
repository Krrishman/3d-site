#!/usr/bin/env node
/**
 * Media for the v5 site: one cinematic hero clip (Kling 2.6) and five
 * blue-hour stills (Flux 2 Pro), all from Kie.ai, into public/v5/media/.
 *   KIE_API_KEY=... node scripts/generate-v5-media.mjs [--only hero,fence] [--force]
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const API = 'https://api.kie.ai/api/v1/jobs'
const KEY = process.env.KIE_API_KEY
const OUT = path.resolve('public/v5/media')
const FORCE = process.argv.includes('--force')
const onlyArg = process.argv.indexOf('--only')
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1].split(',') : null

const NIGHT = 'Cinematic photograph at blue hour, deep navy dusk, one warm practical light source (work lamp, van interior light, porch light) glowing copper-orange against the cold blue, volumetric haze, shallow depth of field, anamorphic feel, film grain, photoreal, no people facing camera, no text, no logos, no watermark.'

export const MANIFEST = {
  hero: {
    kind: 'video', model: 'kling-2.6/text-to-video',
    input: { sound: false, aspect_ratio: '16:9', duration: '10', prompt: 'Extreme macro cinematography: a slow river of molten copper-orange metal flows through total darkness, its surface smooth and glassy, catching cold teal-blue rim light from above. The stream glides from lower left to upper right with calm, continuous, unhurried motion, tiny glowing sparks drift upward like embers, soft volumetric haze. Very slow locked camera with a subtle push-in, shallow depth of field, photoreal, dark background with plenty of empty space in the upper half. One uninterrupted shot, no cuts, no text, no flicker.' },
  },
  fence: { kind: 'image', aspect: '16:9', prompt: `A newly built cedar fence in a suburban back yard, one tripod work lamp lighting the fresh timber warm against the deep blue dusk sky, tools on the grass, upper half of the frame open sky. ${NIGHT}` },
  van: { kind: 'image', aspect: '16:9', prompt: `A white plumber's van parked on a quiet residential street at blue hour, side door open and the interior lit warm, copper pipe and tool bags inside, wet asphalt reflecting the light. ${NIGHT}` },
  garden: { kind: 'image', aspect: '4:3', prompt: `A freshly laid stone garden path with new planting, low garden lights glowing warm along it, blue dusk, a wheelbarrow at the end. ${NIGHT}` },
  rooftop: { kind: 'image', aspect: '16:9', prompt: `A rooftop air-conditioning unit at blue hour with a technician's headlamp glow and an open tool bag, city lights soft in the far distance, seen from behind. ${NIGHT}` },
  desk: { kind: 'image', aspect: '3:2', prompt: `A home studio desk at night: a laptop screen glowing teal-blue, a desk lamp glowing warm on a paper notebook with pencil notes and a mug, window with blue dusk behind. ${NIGHT}` },
}

async function api(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, { ...init, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' } })
  const body = await res.json()
  if (body.code !== 200) throw new Error(`${pathname}: ${body.code} ${body.msg || ''}`)
  return body.data
}
async function run(id, m) {
  const body = m.kind === 'video' ? { model: m.model, input: m.input } : { model: 'flux-2/pro-text-to-image', input: { prompt: m.prompt, aspect_ratio: m.aspect, resolution: '1K' } }
  const { taskId } = await api('/createTask', { method: 'POST', body: JSON.stringify(body) })
  const started = Date.now()
  while (Date.now() - started < 20 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, m.kind === 'video' ? 10000 : 4000))
    const task = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`)
    if (task.state === 'success') {
      const url = JSON.parse(task.resultJson || '{}').resultUrls?.[0]
      const res = await fetch(url)
      const type = res.headers.get('content-type') || ''
      const ext = m.kind === 'video' ? 'mp4' : type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg'
      const file = path.join(OUT, `${id}.${ext}`)
      await writeFile(file, Buffer.from(await res.arrayBuffer()))
      if (m.kind === 'video') {
        // Web-sized loop: 1280 wide, no audio, plus a poster frame.
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, '-an', '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-movflags', '+faststart', '-pix_fmt', 'yuv420p', path.join(OUT, `${id}-web.mp4`)])
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, '-vf', 'scale=1280:-2', '-frames:v', '1', '-q:v', '3', path.join(OUT, `${id}-poster.jpg`)])
      }
      return file
    }
    if (task.state === 'fail') throw new Error(`${id}: ${task.failMsg || 'failed'}`)
  }
  throw new Error(`${id}: timed out`)
}
async function main() {
  if (!KEY) { console.error('KIE_API_KEY is not set.'); process.exit(1) }
  await mkdir(OUT, { recursive: true })
  const have = new Set((await readdir(OUT)).map((f) => f.replace(/[.-].*$/, '')))
  const queue = Object.keys(MANIFEST).filter((id) => (ONLY ? ONLY.includes(id) : true)).filter((id) => FORCE || !have.has(id))
  console.log(`${queue.length} item(s) to generate.`)
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (queue.length) { const id = queue.shift(); try { console.log('ok  ', await run(id, MANIFEST[id])) } catch (e) { console.error('fail', e.message) } }
  }))
  console.log('Done.')
}
main()
