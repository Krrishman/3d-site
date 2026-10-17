#!/usr/bin/env node
/**
 * The follow shot: from the last frame of the hero film, Kling continues the
 * scene with the camera tilting down and gliding along the river. The page
 * scrubs this clip as you scroll.
 *
 *   KIE_API_KEY=... node scripts/generate-follow.mjs            # upload frame, generate, save
 *   --frame scratch/last-frame.jpg   --out public/v6/media/follow.mp4
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const KEY = process.env.KIE_API_KEY
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d }
const FRAME = path.resolve(arg('--frame', 'scratch/last-frame.jpg'))
const OUT = path.resolve(arg('--out', 'public/v6/media/follow.mp4'))
const PROMPT = arg('--prompt',
  'Continue this exact scene. The camera begins to move: a slow, smooth cinematic tilt downward and a gentle dolly forward, gliding along the molten lava river as it flows away from the waterfall and winds into the distance, following the stream downstream like a drone drifting low over it. The molten surface keeps flowing with glowing cracks, embers drift upward, cold teal rim light on the dark rock, volumetric haze. Constant slow camera speed, no shake, no cuts, no zoom bursts, photoreal, the river always stays in frame.')

const hdr = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }
async function main() {
  if (!KEY) { console.error('KIE_API_KEY is not set.'); process.exit(1) }
  const b64 = (await readFile(FRAME)).toString('base64')
  const up = await (await fetch('https://kieai.redpandaai.co/api/file-base64-upload', { method: 'POST', headers: hdr, body: JSON.stringify({ base64Data: `data:image/jpeg;base64,${b64}`, uploadPath: 'flowforge/frames', fileName: `last-frame-${Date.now()}.jpg` }) })).json()
  if (up.code !== 200) throw new Error(`upload: ${up.code} ${up.msg}`)
  const imageUrl = up.data.downloadUrl
  console.log('frame uploaded:', imageUrl)
  const created = await (await fetch('https://api.kie.ai/api/v1/jobs/createTask', { method: 'POST', headers: hdr, body: JSON.stringify({ model: 'kling-2.6/image-to-video', input: { prompt: PROMPT, image_urls: [imageUrl], sound: false, duration: '10' } }) })).json()
  if (created.code !== 200) throw new Error(`createTask: ${created.code} ${created.msg}`)
  const { taskId } = created.data
  console.log('task', taskId)
  const started = Date.now()
  while (Date.now() - started < 20 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, 10000))
    const info = await (await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, { headers: hdr })).json()
    if (info.code !== 200) throw new Error(`recordInfo: ${info.code} ${info.msg}`)
    const t = info.data
    if (t.state === 'success') {
      const url = JSON.parse(t.resultJson || '{}').resultUrls?.[0]
      await mkdir(path.dirname(OUT), { recursive: true })
      await writeFile(OUT, Buffer.from(await (await fetch(url)).arrayBuffer()))
      console.log(`saved ${OUT} in ${Math.round((Date.now() - started) / 1000)}s`)
      return
    }
    if (t.state === 'fail') throw new Error(`failed: ${t.failMsg || ''}`)
    process.stdout.write('.')
  }
  throw new Error('timed out')
}
main().catch((e) => { console.error(e.message); process.exit(1) })
