import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { LinearFilter, SRGBColorSpace, Texture, type Mesh, type ShaderMaterial } from 'three'
import { useScene } from '../store/useScene'
import { useReducedMotion } from '../scroll/useReducedMotion'

/**
 * The background: a short generated film cut into frames, scrubbed by page
 * scroll. Two textures hold the frames either side of the current position
 * and the shader blends them, so the motion stays smooth between frames.
 */
export const FRAME_COUNT = 120
const ASPECT = 16 / 9

function frameUrl(set: 'hd' | 'sd', i: number) {
  return `${import.meta.env.BASE_URL}v2/frames/${set}/${String(i).padStart(3, '0')}.webp`
}

/** Loads frames in order with a little concurrency; `images[i]` is set once frame i is ready. */
function useFrameImages(set: 'hd' | 'sd') {
  const images = useMemo<(HTMLImageElement | null)[]>(() => Array(FRAME_COUNT).fill(null), [])
  useEffect(() => {
    let cancelled = false
    let next = 0
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => { if (!cancelled) images[i] = img; resolve() }
        img.onerror = () => resolve()
        img.src = frameUrl(set, i)
      })
    const worker = async () => { while (!cancelled && next < FRAME_COUNT) await load(next++) }
    Promise.all(Array.from({ length: 4 }, worker))
    return () => { cancelled = true }
  }, [images, set])
  return images
}

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const fragment = /* glsl */ `
  uniform sampler2D texA;
  uniform sampler2D texB;
  uniform float mixAB;
  uniform float ready;
  uniform float exposure;
  varying vec2 vUv;
  void main() {
    vec3 a = texture2D(texA, vUv).rgb;
    vec3 b = texture2D(texB, vUv).rgb;
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

export function Frames() {
  const mesh = useRef<Mesh>(null)
  const { width: vw, height: vh } = useThree((s) => s.viewport)
  const reduced = useReducedMotion()
  const set: 'hd' | 'sd' = typeof window !== 'undefined' && window.innerWidth * Math.min(window.devicePixelRatio, 1.5) >= 1400 ? 'hd' : 'sd'
  const images = useFrameImages(set)

  const material = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ texA: { value: makeTexture() }, texB: { value: makeTexture() }, mixAB: { value: 0 }, ready: { value: 0 }, exposure: { value: 1.0 } }), [])
  useEffect(() => () => { uniforms.texA.value.dispose(); uniforms.texB.value.dispose() }, [uniforms])

  const pos = useRef(0)
  const shown = useRef<[number, number]>([-1, -1])
  const fade = useRef(0)

  useFrame((_, delta) => {
    const { progress, pointer } = useScene.getState()
    const target = progress * (FRAME_COUNT - 1)
    if (reduced) pos.current = target
    else damp(pos, 'current', target, 0.25, delta)
    // Nearest loaded frames either side of the position.
    let a = Math.floor(pos.current)
    let b = Math.min(FRAME_COUNT - 1, a + 1)
    while (a > 0 && !images[a]) a--
    while (b < FRAME_COUNT - 1 && !images[b]) b++
    if (!images[b]) b = a
    const u = material.current?.uniforms
    if (!u) return
    if (images[a] && shown.current[0] !== a) { u.texA.value.image = images[a]; u.texA.value.needsUpdate = true; shown.current[0] = a }
    if (images[b] && shown.current[1] !== b) { u.texB.value.image = images[b]; u.texB.value.needsUpdate = true; shown.current[1] = b }
    u.mixAB.value = b > a ? Math.min(1, Math.max(0, (pos.current - a) / (b - a))) : 0
    if (images[a]) fade.current = Math.min(1, fade.current + delta * 1.2)
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
