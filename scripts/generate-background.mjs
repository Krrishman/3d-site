#!/usr/bin/env node
/**
 * Generates the scroll-scrubbed background for the new site with Kie.ai:
 * a short abstract video, cut into WebP frames that the canvas scrubs by scroll.
 *
 *   KIE_API_KEY=... node scripts/generate-background.mjs                 # generate + cut frames
 *   KIE_API_KEY=... node scripts/generate-background.mjs --video a.mp4   # only cut frames from a file
 *   --model kling-2.6/text-to-video | bytedance/seedance-1.5-pro | wan/2-6-text-to-video
 *   --out <dir>   where the mp4 is kept (default scratch/background)
 *   --frames N    frames to extract (default 120)
 *
 * Frames land in public/v2/frames/{hd,sd}/NNN.webp. Needs ffmpeg on PATH.
 */
import { mkdir, writeFile, readdir, stat } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const API = 'https://api.kie.ai/api/v1/jobs'
const KEY = process.env.KIE_API_KEY
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d }
const MODEL = arg('--model', 'kling-2.6/text-to-video')
const OUT = path.resolve(arg('--out', 'scratch/background'))
const FRAMES = Number(arg('--frames', '120'))
const VIDEO = arg('--video', null)
const NAME = arg('--name', 'bg')
const FRAMES_DIR = path.resolve('public/v2/frames')

export const PROMPT = arg('--prompt',
  'Abstract macro cinematography in deep navy darkness. Thin luminous ribbons of electric blue and teal light drift slowly like silk underwater, soft volumetric glow, fine floating dust particles catching the light. Over time the scattered ribbons gather and align into one smooth, wide, flowing stream that sweeps gently from the lower left to the upper right of the frame, calm and orderly. Extremely slow continuous motion, one uninterrupted shot, locked camera with a very subtle slow push-in, shallow depth of field, soft bokeh, photoreal, cinematic lighting, dark background with plenty of empty space. No text, no logos, no people, no cuts, no flicker.')

async function api(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, { ...init, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' } })
  const body = await res.json()
  if (body.code !== 200) throw new Error(`${pathname}: ${body.code} ${body.msg || ''}`)
  return body.data
}

function inputFor(model) {
  if (model.startsWith('kling')) return { prompt: PROMPT, sound: false, aspect_ratio: '16:9', duration: '10' }
  if (model.startsWith('bytedance/seedance')) return { prompt: PROMPT, aspect_ratio: '16:9', resolution: '1080p', duration: 12, fixed_lens: true, generate_audio: false }
  if (model.startsWith('wan')) return { prompt: PROMPT, duration: '10', resolution: '1080p', multi_shots: false }
  throw new Error(`no input preset for ${model}`)
}

async function generate() {
  if (!KEY) { console.error('KIE_API_KEY is not set.'); process.exit(1) }
  const { taskId } = await api('/createTask', { method: 'POST', body: JSON.stringify({ model: MODEL, input: inputFor(MODEL) }) })
  console.log(`task ${taskId} (${MODEL})`)
  const started = Date.now()
  while (Date.now() - started < 20 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, 10000))
    const task = await api(`/recordInfo?taskId=${encodeURIComponent(taskId)}`)
    if (task.state === 'success') {
      const url = JSON.parse(task.resultJson || '{}').resultUrls?.[0]
      if (!url) throw new Error('success without a result url')
      await mkdir(OUT, { recursive: true })
      const file = path.join(OUT, `${NAME}.mp4`)
      await writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()))
      console.log(`saved ${file} in ${Math.round((Date.now() - started) / 1000)}s`)
      return file
    }
    if (task.state === 'fail') throw new Error(`task failed ${task.failMsg || ''}`)
    process.stdout.write('.')
  }
  throw new Error('timed out')
}

async function cut(video) {
  const probe = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).toString().trim()
  const duration = Number(probe)
  const fps = FRAMES / duration
  for (const [set, w, q] of [['hd', 1440, 72], ['sd', 960, 70]]) {
    const dir = path.join(FRAMES_DIR, set)
    await mkdir(dir, { recursive: true })
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', video, '-vf', `fps=${fps},scale=${w}:-2:flags=lanczos`, '-frames:v', String(FRAMES), '-c:v', 'libwebp', '-quality', String(q), '-start_number', '0', path.join(dir, '%03d.webp')])
    const files = await readdir(dir)
    let bytes = 0
    for (const f of files) bytes += (await stat(path.join(dir, f))).size
    console.log(`${set}: ${files.length} frames, ${(bytes / 1e6).toFixed(1)} MB`)
  }
}

const video = VIDEO ? path.resolve(VIDEO) : await generate()
await cut(video)
