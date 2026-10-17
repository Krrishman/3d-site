import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { damp, damp3, dampE } from 'maath/easing'
import { BufferGeometry, CatmullRomCurve3, Color, Euler, Float32BufferAttribute, Vector3, type Group, type Mesh, type MeshStandardMaterial, type Points } from 'three'
import { useScene } from '../store/useScene'

/** The F mark drawn as connected flowing tubes. */
const STEM = [
  [-1.0, -1.75, 0], [-1.0, -1.0, 0.06], [-1.0, 0.0, 0], [-1.0, 0.95, 0.04],
  [-0.98, 1.4, 0], [-0.78, 1.62, 0.05], [-0.2, 1.66, 0.1], [0.6, 1.64, 0.04], [1.3, 1.6, 0],
].map(([x, y, z]) => new Vector3(x, y, z))
const BAR = [[-1.05, 0.22, 0], [-0.4, 0.26, 0.1], [0.3, 0.24, 0.06], [0.85, 0.2, 0]].map(([x, y, z]) => new Vector3(x, y, z))

/** Where the mark sits at each stage of the page. */
type Key = { pos: [number, number, number]; rot: [number, number, number]; scale: number; bead: number; tint: number }
const KEYS: Key[] = [
  { pos: [3.6, -0.2, -0.4], rot: [0.15, -0.45, 0.05], scale: 1.1, bead: 0.08, tint: 0 }, // hero: right third
  { pos: [2.4, 1.8, -7.5], rot: [0.7, 0.9, 0.3], scale: 1.15, bead: 0.25, tint: 0.3 }, // problems: far backdrop
  { pos: [-3.3, -1.3, -3], rot: [0.2, 0.9, 0.1], scale: 0.9, bead: 0.45, tint: 0.6 }, // services: under the sticky title
  { pos: [-3.4, 2.3, -5], rot: [0.4, -0.9, 0.35], scale: 0.7, bead: 0.6, tint: 1 }, // demo: small, upper left
  { pos: [1.5, 2.4, -6.5], rot: [-0.4, 2.4, 0.1], scale: 0.9, bead: 0.8, tint: 0.5 }, // process: above the cards
  { pos: [3.0, 0.1, -0.8], rot: [0.05, 0.1, 0], scale: 1.25, bead: 1, tint: 0 }, // close: large, right half
]
const BLUE = new Color('#2f80ed')
const TEAL = new Color('#24d1c2')

function lerpKey(stage: number): Key {
  const i = Math.max(0, Math.min(KEYS.length - 2, Math.floor(stage)))
  const t = Math.max(0, Math.min(1, stage - i))
  const e = t * t * (3 - 2 * t)
  const a = KEYS[i], b = KEYS[i + 1]
  const mix = (x: number, y: number) => x + (y - x) * e
  return {
    pos: [mix(a.pos[0], b.pos[0]), mix(a.pos[1], b.pos[1]), mix(a.pos[2], b.pos[2])],
    rot: [mix(a.rot[0], b.rot[0]), mix(a.rot[1], b.rot[1]), mix(a.rot[2], b.rot[2])],
    scale: mix(a.scale, b.scale),
    bead: mix(a.bead, b.bead),
    tint: mix(a.tint, b.tint),
  }
}

/** The drifting particle field, built once at module load. */
const FLOW_GEOMETRY = (() => {
  const n = 900
  const pos = new Float32Array(n * 3)
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (rnd() - 0.5) * 16
    pos[i * 3 + 1] = (rnd() - 0.5) * 10
    pos[i * 3 + 2] = -rnd() * 10
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new Float32BufferAttribute(pos, 3))
  return g
})()

function Flow() {
  const points = useRef<Points>(null)
  const geometry = FLOW_GEOMETRY
  useFrame((_, delta) => {
    if (!points.current) return
    const p = points.current.geometry.attributes.position as Float32BufferAttribute
    const arr = p.array as Float32Array
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += delta * 0.35
      if (arr[i] > 8) arr[i] = -8
    }
    p.needsUpdate = true
  })
  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#24d1c2" size={0.035} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}

export function Experience() {
  const group = useRef<Group>(null)
  const bead = useRef<Mesh>(null)
  const beadMaterial = useRef<MeshStandardMaterial>(null)
  const curve = useMemo(() => new CatmullRomCurve3(STEM, false, 'catmullrom', 0.5), [])
  const bar = useMemo(() => new CatmullRomCurve3(BAR, false, 'catmullrom', 0.5), [])
  const aspect = useThree((s) => s.viewport.aspect)
  const t = useRef(0)
  const tint = useRef(new Color())

  useFrame((state, delta) => {
    const { stage, pointer } = useScene.getState()
    const k = lerpKey(stage)
    const narrow = aspect < 1
    if (group.current) {
      const target: [number, number, number] = narrow ? [k.pos[0] * 0.25, k.pos[1] + 0.9, k.pos[2] - 0.6] : k.pos
      damp3(group.current.position, target, 0.35, delta)
      dampE(group.current.rotation, new Euler(k.rot[0] + pointer.y * 0.08, k.rot[1] + pointer.x * 0.15, k.rot[2]), 0.35, delta)
      const s = k.scale * (narrow ? 0.62 : 1)
      damp3(group.current.scale, [s, s, s], 0.35, delta)
    }
    t.current += (Math.min(0.999, k.bead) - t.current) * Math.min(1, delta * 3)
    if (bead.current) bead.current.position.copy(curve.getPointAt(t.current))
    tint.current.copy(BLUE).lerp(TEAL, k.tint)
    if (beadMaterial.current) beadMaterial.current.emissive.copy(tint.current)
    damp(state.camera.position, 'z', 7 - (stage > 4 ? (stage - 4) * 0.8 : 0), 0.4, delta)
  })

  const body = { color: '#0d1830', metalness: 0.75, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.15 }

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-6, -2, 2]} intensity={40} color="#2f80ed" />
      <pointLight position={[5, 3, 3]} intensity={30} color="#24d1c2" />
      {/* Built-in environment: no network, just coloured light panels for reflections. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={6} color="#24d1c2" position={[4, 3, -4]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={5} color="#2f80ed" position={[-5, -2, -3]} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={4} color="#ffffff" position={[0, 6, -2]} scale={4} />
      </Environment>
      <Flow />
      <Float speed={1} rotationIntensity={0.12} floatIntensity={0.35}>
        <group ref={group} position={[2.5, -0.1, 0]} scale={1.15}>
          <mesh><tubeGeometry args={[curve, 320, 0.19, 32, false]} /><meshPhysicalMaterial {...body} /></mesh>
          <mesh><tubeGeometry args={[bar, 120, 0.19, 32, false]} /><meshPhysicalMaterial {...body} /></mesh>
          {[[1.3, 1.6, 0], [0.85, 0.2, 0], [-1.0, -1.75, 0]].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]}><sphereGeometry args={[0.19, 24, 24]} /><meshPhysicalMaterial {...body} /></mesh>
          ))}
          <mesh ref={bead}>
            <sphereGeometry args={[0.3, 48, 48]} />
            <meshStandardMaterial ref={beadMaterial} color="#9fd8ff" emissive="#2f80ed" emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </>
  )
}
