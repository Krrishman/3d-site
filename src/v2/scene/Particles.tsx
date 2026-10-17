import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, CanvasTexture, Color, type Points } from 'three'
import { useScene } from '../store/useScene'
import { useReducedMotion } from '../scroll/useReducedMotion'

/** Fine dust drifting upward through the frame. It parts around the pointer and slips with the scroll. */
const COUNT = 1400
const DEPTH = 3

function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
}

function softDot() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new CanvasTexture(c)
}

export function Particles() {
  const points = useRef<Points>(null)
  const { width: vw, height: vh } = useThree((s) => s.viewport)
  const reduced = useReducedMotion()
  const map = useMemo(softDot, [])
  const lastProgress = useRef(0)

  const { positions, colors, speeds, sizes } = useMemo(() => {
    const r = rng(7)
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const sizes = new Float32Array(COUNT)
    const palette = ['#24d1c2', '#2f80ed', '#8fb8ff', '#ffffff', '#24d1c2'].map((c) => new Color(c))
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (r() - 0.5) * 2
      positions[i * 3 + 1] = (r() - 0.5) * 2
      positions[i * 3 + 2] = -r() * DEPTH
      const c = palette[Math.floor(r() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
      speeds[i] = 0.02 + r() * 0.05
      sizes[i] = 0.4 + r() * 1.2
    }
    return { positions, colors, speeds, sizes }
  }, [])

  useFrame((_, delta) => {
    const geo = points.current?.geometry
    if (!geo) return
    const { pointer, progress } = useScene.getState()
    const dp = progress - lastProgress.current
    lastProgress.current = progress
    const attr = geo.getAttribute('position') as BufferAttribute
    const arr = attr.array as Float32Array
    const hw = vw * 0.6, hh = vh * 0.6
    const px = pointer.x * hw, py = -pointer.y * hh
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const depthScale = 1 + arr[ix + 2] / DEPTH // far points move less
      if (!reduced) {
        arr[ix + 1] += speeds[i] * delta * depthScale * 0.6 - dp * 6 * depthScale
        arr[ix] += Math.sin(arr[ix + 1] * 1.3 + i) * delta * 0.03
        const dx = arr[ix] - px, dy = arr[ix + 1] - py
        const d2 = dx * dx + dy * dy
        if (d2 < 1.0) { const f = (1 - d2) * delta * 1.2; arr[ix] += dx * f; arr[ix + 1] += dy * f }
      }
      if (arr[ix + 1] > hh) arr[ix + 1] -= hh * 2
      if (arr[ix + 1] < -hh) arr[ix + 1] += hh * 2
      if (arr[ix] > hw) arr[ix] -= hw * 2
      if (arr[ix] < -hw) arr[ix] += hw * 2
    }
    attr.needsUpdate = true
  })

  // Spread the seed layout to the viewport on first render.
  const scaled = useMemo(() => {
    const out = positions.slice()
    for (let i = 0; i < COUNT; i++) { out[i * 3] *= vw * 0.6; out[i * 3 + 1] *= vh * 0.6 }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions])

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scaled, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial map={map} vertexColors size={0.045} sizeAttenuation transparent opacity={0.75} depthWrite={false} blending={AdditiveBlending} />
    </points>
  )
}
