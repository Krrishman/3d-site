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

const LOOK = 'Cinematic still, near-black teal darkness, one warm copper-orange light source against cold teal-blue rim light, volumetric haze, shallow depth of field, anamorphic feel, fine film grain, photoreal, no readable text, no logos, no watermark.'

export const MANIFEST = {
  hero: {
    kind: 'video', model: 'kling-2.6/text-to-video',
    input: { sound: false, aspect_ratio: '16:9', duration: '10', prompt: 'Extreme macro cinematography: a slow river of molten copper-orange metal flows through total darkness, its surface smooth and glassy, catching cold teal-blue rim light from above. The stream glides from lower left to upper right with calm, continuous, unhurried motion, tiny glowing sparks drift upward like embers, soft volumetric haze. Very slow locked camera with a subtle push-in, shallow depth of field, photoreal, dark background with plenty of empty space in the upper half. One uninterrupted shot, no cuts, no text, no flicker.' },
  },
  // Hero candidates (stills). Pick one and it can be turned into a clip later.
  'hero-threads': { kind: 'image', aspect: '16:9', prompt: `Thousands of thin glowing copper filaments of light converge from the dark left edge into one bright braided stream that sweeps toward the upper right, like data becoming a single signal, cold teal haze, tiny embers, upper half mostly empty darkness. ${LOOK}` },
  'hero-glass': { kind: 'image', aspect: '16:9', prompt: `A dark glass surface seen at a low angle, with a luminous copper-orange circuit-like network of lines flowing beneath it toward a bright node in the lower right, reflections, teal rim light along the edges, upper half empty darkness. ${LOOK}` },
  'hero-core': { kind: 'image', aspect: '16:9', prompt: `A slowly rotating torus of molten copper light suspended in dark teal space, fine particles orbiting it, soft volumetric glow, seen slightly from below, composition weighted to the right with empty darkness on the left. ${LOOK}` },
  // Section stills: software, not trades.
  'studio': { kind: 'image', aspect: '16:9', prompt: `A dark studio desk at night with two monitors showing an unreadable dark blue dashboard interface with charts, a copper desk lamp as the only warm light, a notebook and coffee, window with teal city dusk behind. ${LOOK}` },
  'tablet': { kind: 'image', aspect: '16:9', prompt: `Close-up of hands holding a tablet showing an unreadable dark app interface with a list and status chips, in a dim warehouse or workshop lit by one warm lamp, teal ambient light, shallow focus. ${LOOK}` },
  'server': { kind: 'image', aspect: '4:3', prompt: `A small server rack in a dark room, rows of tiny copper-orange and teal status lights, cables neatly routed, soft haze, shallow depth of field. ${LOOK}` },
  'whiteboard': { kind: 'image', aspect: '3:2', prompt: `A dark meeting room at night: a glass wall covered in a hand-drawn flow diagram of boxes and arrows in marker, lit from one side by a warm lamp, teal city lights blurred behind the glass. ${LOOK}` },
  'phone': { kind: 'image', aspect: '3:2', prompt: `A phone resting on a dark wooden counter showing an unreadable dark app with a big teal button, a warm pendant light above, a small shop or cafe at closing time blurred behind, teal dusk through the window. ${LOOK}` },
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
