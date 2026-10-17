import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { LinearFilter, SRGBColorSpace, Texture, Vector2, type Mesh, type ShaderMaterial } from 'three'
import { useScene } from '../store/useScene'
import { useReducedMotion } from '../scroll/useReducedMotion'

/**
 * The background: a short generated film cut into 60 fps frames and scrubbed
 * by page scroll. Frames are packed four to a sheet (2x2). Two textures hold
 * the sheets either side of the current position and the shader blends the
 * two cells, so the motion stays smooth between frames.
 */
export const FRAME_COUNT = 600
const PER_SHEET = 4
const SHEET_COUNT = FRAME_COUNT / PER_SHEET
const ASPECT = 16 / 9

function sheetUrl(set: 'hd' | 'sd', i: number) {
  return `${import.meta.env.BASE_URL}v2/frames/${set}/s${String(i).padStart(3, '0')}.webp`
}

/** Loads sheets in order with a little concurrency; `sheets[i]` is set once sheet i is ready. */
function useSheets(set: 'hd' | 'sd') {
  const sheets = useMemo<(HTMLImageElement | null)[]>(() => Array(SHEET_COUNT).fill(null), [])
  useEffect(() => {
    let cancelled = false
    let next = 0
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => { if (!cancelled) sheets[i] = img; resolve() }
        img.onerror = () => resolve()
        img.src = sheetUrl(set, i)
      })
    const worker = async () => { while (!cancelled && next < SHEET_COUNT) await load(next++) }
    Promise.all(Array.from({ length: 4 }, worker))
    return () => { cancelled = true }
  }, [sheets, set])
  return sheets
}

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const fragment = /* glsl */ `
  uniform sampler2D texA;
  uniform sampler2D texB;
  uniform vec2 cellA;
  uniform vec2 cellB;
  uniform float mixAB;
  uniform float ready;
  uniform float exposure;
  varying vec2 vUv;
  // Inset a hair so neighbouring cells never bleed in at the edges.
  vec2 cell(vec2 uv, vec2 c) { return (clamp(uv, 0.001, 0.999) + c) * 0.5; }
  void main() {
    vec3 a = texture2D(texA, cell(vUv, cellA)).rgb;
    vec3 b = texture2D(texB, cell(vUv, cellB)).rgb;
    vec3 c = mix(a, b, mixAB) * exposure;
    // Keep the lower third quiet so the copy that sits on it reads.
    float shade = smoothstep(0.0, 0.55, vUv.y) * 0.55 + 0.45;
    c *= shade;
    c = mix(vec3(0.027, 0.043, 0.078), c, ready);
    gl_FragColor = vec4(c, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

function makeTexture() {
  const t = new Texture()
  t.colorSpace = SRGBColorSpace; t.minFilter = LinearFilter; t.magFilter = LinearFilter; t.generateMipmaps = false
  return t
}

/** Cell offset of frame i inside its sheet, in uv space (texture rows run bottom to top). */
function cellOf(i: number, out: Vector2) {
  const c = i % PER_SHEET
  out.set(c % 2, 1 - Math.floor(c / 2))
}

export function Frames() {
  const mesh = useRef<Mesh>(null)
  const material = useRef<ShaderMaterial>(null)
  const { width: vw, height: vh } = useThree((s) => s.viewport)
  const reduced = useReducedMotion()
  const set: 'hd' | 'sd' = typeof window !== 'undefined' && window.innerWidth * Math.min(window.devicePixelRatio, 1.5) >= 1400 ? 'hd' : 'sd'
  const sheets = useSheets(set)

  const uniforms = useMemo(() => ({
    texA: { value: makeTexture() }, texB: { value: makeTexture() },
    cellA: { value: new Vector2() }, cellB: { value: new Vector2() },
    mixAB: { value: 0 }, ready: { value: 0 }, exposure: { value: 1.0 },
  }), [])
  useEffect(() => () => { uniforms.texA.value.dispose(); uniforms.texB.value.dispose() }, [uniforms])

  const pos = useRef(0)
  const shown = useRef<[number, number]>([-1, -1])
  const fade = useRef(0)
  const has = (i: number) => Boolean(sheets[Math.floor(i / PER_SHEET)])

  useFrame((_, delta) => {
    const u = material.current?.uniforms
    if (!u) return
    const { progress, pointer } = useScene.getState()
    const target = progress * (FRAME_COUNT - 1)
    if (reduced) pos.current = target
    else damp(pos, 'current', target, 0.2, delta)
    // Nearest loaded frames either side of the position.
    let a = Math.floor(pos.current)
    let b = Math.min(FRAME_COUNT - 1, a + 1)
    while (a > 0 && !has(a)) a--
    while (b < FRAME_COUNT - 1 && !has(b)) b++
    if (!has(b)) b = a
    const sa = Math.floor(a / PER_SHEET), sb = Math.floor(b / PER_SHEET)
    if (sheets[sa] && shown.current[0] !== sa) { u.texA.value.image = sheets[sa]; u.texA.value.needsUpdate = true; shown.current[0] = sa }
    if (sheets[sb] && shown.current[1] !== sb) { u.texB.value.image = sheets[sb]; u.texB.value.needsUpdate = true; shown.current[1] = sb }
    cellOf(a, u.cellA.value); cellOf(b, u.cellB.value)
    u.mixAB.value = b > a ? Math.min(1, Math.max(0, (pos.current - a) / (b - a))) : 0
    if (has(a)) fade.current = Math.min(1, fade.current + delta * 1.2)
    u.ready.value = fade.current
    if (mesh.current) {
      // Cover the viewport with a margin, and drift a little with the pointer.
      const w = Math.max(vw, vh * ASPECT) * 1.08
      mesh.current.scale.set(w, w / ASPECT, 1)
      damp(mesh.current.position, 'x', -pointer.x * 0.06, 0.6, delta)
      damp(mesh.current.position, 'y', pointer.y * 0.04, 0.6, delta)
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -0.5]} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} depthWrite={false} depthTest={false} />
    </mesh>
  )
}
