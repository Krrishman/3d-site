import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { damp } from 'maath/easing'
import { CatmullRomCurve3, Vector3, type Group, type Mesh } from 'three'
import { useScene } from '../store/useScene'

/**
 * The F drawn as one connected flowing line, with a lead (the bead) that
 * travels along it as the hero scrolls out.
 */
const STEM = [
  [-1.0, -1.75, 0], [-1.0, -1.0, 0.06], [-1.0, 0.0, 0], [-1.0, 0.95, 0.04],
  [-0.98, 1.4, 0], [-0.78, 1.62, 0.05], [-0.2, 1.66, 0.1], [0.6, 1.64, 0.04], [1.3, 1.6, 0],
].map(([x, y, z]) => new Vector3(x, y, z))
const BAR = [
  [-1.05, 0.22, 0], [-0.4, 0.26, 0.1], [0.3, 0.24, 0.06], [0.85, 0.2, 0],
].map(([x, y, z]) => new Vector3(x, y, z))

export function Experience() {
  const group = useRef<Group>(null)
  const bead = useRef<Mesh>(null)
  const curve = useMemo(() => new CatmullRomCurve3(STEM, false, 'catmullrom', 0.5), [])
  const bar = useMemo(() => new CatmullRomCurve3(BAR, false, 'catmullrom', 0.5), [])
  const aspect = useThree((s) => s.viewport.aspect)
  // Half the visible width at the origin, so the mark sits inside any canvas shape.
  const halfW = Math.tan((35 / 2) * (Math.PI / 180)) * 6.5 * aspect
  const t = useRef(0)

  useFrame((state, delta) => {
    const p = useScene.getState().heroProgress
    const wide = aspect > 1.4
    if (group.current) {
      // Scale with the canvas, then sit in the right half with a clear right margin.
      const s = Math.min(1.05, Math.max(0.62, halfW * 0.25))
      damp(group.current.position, 'x', Math.max(0.4, Math.min(halfW * 0.56, halfW - 1.5 * s - 0.3)), 0.3, delta)
      damp(group.current.position, 'y', wide && halfW > 5 ? 0 : 0.42, 0.3, delta)
      damp(group.current.rotation, 'y', -0.35 + p * 1.1, 0.25, delta)
      damp(group.current.rotation, 'x', 0.08 - p * 0.5, 0.25, delta)
      damp(group.current.scale, 'x', s, 0.3, delta)
      damp(group.current.scale, 'y', s, 0.3, delta)
      damp(group.current.scale, 'z', s, 0.3, delta)
    }
    // The bead flows from the bottom of the stem to the end of the mid bar.
    t.current += (Math.min(0.999, 0.02 + p * 0.98) - t.current) * Math.min(1, delta * 4)
    if (bead.current) bead.current.position.copy(curve.getPointAt(t.current))
    damp(state.camera.position, 'z', 6.5 - p * 1.2, 0.3, delta)
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-5, -3, -4]} intensity={1.6} color="#2f80ed" />
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.45}>
        <group ref={group} position={[2.9, 0.1, 0]} scale={1.15}>
          <mesh>
            <tubeGeometry args={[curve, 320, 0.17, 24, false]} />
            <meshStandardMaterial color="#f4f6f9" metalness={0.9} roughness={0.22} />
          </mesh>
          <mesh>
            <tubeGeometry args={[bar, 120, 0.17, 24, false]} />
            <meshStandardMaterial color="#f4f6f9" metalness={0.9} roughness={0.22} />
          </mesh>
          {/* Round the free ends. */}
          <mesh position={[1.3, 1.6, 0]}><sphereGeometry args={[0.17, 24, 24]} /><meshStandardMaterial color="#f4f6f9" metalness={0.9} roughness={0.22} /></mesh>
          <mesh position={[0.85, 0.2, 0]}><sphereGeometry args={[0.17, 24, 24]} /><meshStandardMaterial color="#f4f6f9" metalness={0.9} roughness={0.22} /></mesh>
          <mesh position={[-1.0, -1.75, 0]}><sphereGeometry args={[0.17, 24, 24]} /><meshStandardMaterial color="#f4f6f9" metalness={0.9} roughness={0.22} /></mesh>
          <mesh ref={bead}>
            <sphereGeometry args={[0.27, 48, 48]} />
            <meshStandardMaterial color="#2f80ed" metalness={0.35} roughness={0.25} emissive="#2f80ed" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>
    </>
  )
}
