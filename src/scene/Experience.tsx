import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { damp3, dampE } from 'maath/easing'
import { Color, Euler, InstancedMesh, Matrix4, Object3D, Quaternion, Vector3, type Group } from 'three'
import { useScene } from '../store/useScene'

/**
 * The ribbon: a stream of flat cards flowing along a wave. Each card is a
 * lead moving through the system. Scroll pushes the wave along; the ribbon
 * itself moves through per-section keyframes.
 */
const CARD_COUNT = 72
const CARD_COLORS = ['#2f80ed', '#24d1c2', '#ffffff', '#8fb8ff', '#b7c2d3', '#2f80ed', '#24d1c2', '#ffffff'].map((c) => new Color(c))
const CUBE_COUNT = 42

type Key = { pos: [number, number, number]; rot: [number, number, number]; scale: number; amp: number; tint: number }
const KEYS: Key[] = [
  { pos: [0.8, 1.9, -1.4], rot: [0.35, -0.25, -0.12], scale: 1.0, amp: 0.9, tint: 0 }, // 0 hero: across the top, above the headline
  { pos: [0, 3.2, -6], rot: [0.5, 0.1, 0], scale: 1.1, amp: 1.0, tint: 0.2 }, // 1 work: high backdrop
  { pos: [0, 4.4, -9], rot: [0.6, 0.2, 0.05], scale: 1.0, amp: 0.6, tint: 0.3 }, // 2 problems: along the top edge, far
  { pos: [0, 0, -9], rot: [0.6, 0.4, 0.1], scale: 1.0, amp: 1.0, tint: 0.4 }, // 3 services: hidden behind white
  { pos: [0, 3.4, -5], rot: [0.4, -0.2, 0.1], scale: 1.0, amp: 1.0, tint: 0.6 }, // 4 projects: above the cards
  { pos: [-3.0, 2.6, -5.5], rot: [0.5, -0.6, 0.2], scale: 0.7, amp: 0.9, tint: 1 }, // 5 demo: upper left
  { pos: [0, -4.6, -5], rot: [0.9, 0.2, 0], scale: 1.0, amp: 0.8, tint: 0.8 }, // 6 about: along the bottom edge
  { pos: [1.0, 2.6, -6.5], rot: [-0.3, 0.3, 0.1], scale: 0.9, amp: 1.1, tint: 0.5 }, // 7 process: above the cards
  { pos: [0.5, -2.2, -1.5], rot: [0.5, -0.1, -0.1], scale: 1.0, amp: 0.7, tint: 0 }, // 8 close: lower half, under the copy
]
function lerpKey(stage: number): Key {
  const i = Math.max(0, Math.min(KEYS.length - 2, Math.floor(stage)))
  const t = Math.max(0, Math.min(1, stage - i))
  const e = t * t * (3 - 2 * t)
  const a = KEYS[i], b = KEYS[i + 1]
  const m = (x: number, y: number) => x + (y - x) * e
  return {
    pos: [m(a.pos[0], b.pos[0]), m(a.pos[1], b.pos[1]), m(a.pos[2], b.pos[2])],
    rot: [m(a.rot[0], b.rot[0]), m(a.rot[1], b.rot[1]), m(a.rot[2], b.rot[2])],
    scale: m(a.scale, b.scale), amp: m(a.amp, b.amp), tint: m(a.tint, b.tint),
  }
}

/** Seeded random so the layout is the same on every load. */
function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
}

function Ribbon({ group }: { group: React.RefObject<Group | null> }) {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const up = useMemo(() => new Vector3(0, 1, 0), [])
  const q = useMemo(() => new Quaternion(), [])
  const m4 = useMemo(() => new Matrix4(), [])
  const phase = useRef(0)

  useFrame((state, delta) => {
    if (!mesh.current) return
    const { stage } = useScene.getState()
    const k = lerpKey(stage)
    phase.current += delta * 0.25 + 0 // constant drift
    const t0 = state.clock.elapsedTime
    const flow = phase.current + stage * 1.6 // scroll pushes the stream along
    for (let i = 0; i < CARD_COUNT; i++) {
      const u = i / (CARD_COUNT - 1) // 0..1 along the ribbon
      const x = (u - 0.5) * 16
      const w = Math.sin(u * Math.PI * 2.2 - flow) * 1.1 * k.amp + Math.sin(u * Math.PI * 5.1 + t0 * 0.6) * 0.18
      const z = Math.cos(u * Math.PI * 1.6 - flow * 0.7) * 1.4
      // Tangent of the wave for orientation.
      const du = 0.002
      const x2 = (u + du - 0.5) * 16
      const w2 = Math.sin((u + du) * Math.PI * 2.2 - flow) * 1.1 * k.amp + Math.sin((u + du) * Math.PI * 5.1 + t0 * 0.6) * 0.18
      const z2 = Math.cos((u + du) * Math.PI * 1.6 - flow * 0.7) * 1.4
      const tangent = new Vector3(x2 - x, w2 - w, z2 - z).normalize()
      m4.lookAt(new Vector3(0, 0, 0), tangent, up)
      q.setFromRotationMatrix(m4)
      dummy.position.set(x, w, z)
      dummy.quaternion.copy(q)
      dummy.rotateY(Math.PI / 2)
      dummy.rotateX(Math.sin(u * Math.PI * 3 - flow) * 0.35)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    if (group.current) {
      damp3(group.current.position, k.pos, 0.4, delta)
      dampE(group.current.rotation, new Euler(k.rot[0], k.rot[1], k.rot[2]), 0.4, delta)
      damp3(group.current.scale, [k.scale, k.scale, k.scale], 0.4, delta)
    }
  })

  // Per-card colours, set once.
  const colors = useMemo(() => {
    const arr = new Float32Array(CARD_COUNT * 3)
    for (let i = 0; i < CARD_COUNT; i++) {
      const c = CARD_COLORS[Math.floor(i / 3) % CARD_COLORS.length]
      arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b
    }
    return arr
  }, [])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CARD_COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.16, 1.5, 1.0]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshPhysicalMaterial vertexColors roughness={0.38} metalness={0.05} clearcoat={0.6} clearcoatRoughness={0.3} />
    </instancedMesh>
  )
}

function Cubes() {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const seeds = useMemo(() => {
    const r = rng(11)
    return Array.from({ length: CUBE_COUNT }, () => ({ x: (r() - 0.5) * 18, y: (r() - 0.5) * 11, z: -r() * 7 - 0.5, s: 0.08 + r() * 0.16, rx: r() * 6, ry: r() * 6, sp: 0.1 + r() * 0.3 }))
  }, [])
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const { stage } = useScene.getState()
    seeds.forEach((c, i) => {
      dummy.position.set(c.x, c.y + Math.sin(t * c.sp + i) * 0.25 - stage * 0.6, c.z)
      dummy.rotation.set(c.rx + t * c.sp, c.ry + t * c.sp * 0.7, 0)
      dummy.scale.setScalar(c.s)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CUBE_COUNT]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9fb3cf" roughness={0.5} metalness={0.2} />
    </instancedMesh>
  )
}

export function Experience() {
  const group = useRef<Group>(null)
  const aspect = useThree((s) => s.viewport.aspect)
  useFrame((state, delta) => {
    const { pointer } = useScene.getState()
    damp3(state.camera.position, [pointer.x * 0.25, -pointer.y * 0.15, aspect < 1 ? 10 : 8], 0.6, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <>
      <hemisphereLight intensity={0.9} color="#dbe7ff" groundColor="#0b1220" />
      <directionalLight position={[4, 8, 6]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-6, -2, 4]} intensity={0.8} color="#24d1c2" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, -2]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#24d1c2" position={[6, 0, -4]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#2f80ed" position={[-6, -1, -4]} scale={[4, 6, 1]} />
      </Environment>
      <Cubes />
      <group ref={group} position={[0.6, 1.0, -1.2]}>
        <Ribbon group={group} />
      </group>
    </>
  )
}
