import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { damp } from 'maath/easing'
import type { Group, Mesh } from 'three'
import { gsap, ScrollTrigger } from '../scroll/gsap'
import { useScene } from '../store/useScene'

/**
 * The hero object. Scroll progress drives its rotation and the camera's
 * distance; the per-frame loop only smooths toward those targets.
 */
export function Experience() {
  const group = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)
  const setProgress = useScene((s) => s.setProgress)

  // One ScrollTrigger for the whole page writes progress into the store.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => trigger.kill()
  }, [setProgress])

  // Re-measure when the page changes height.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    return () => window.removeEventListener('resize', refresh)
  }, [])

  useFrame((state, delta) => {
    const p = useScene.getState().progress
    if (group.current) {
      damp(group.current.rotation, 'y', p * Math.PI * 2, 0.25, delta)
      damp(group.current.rotation, 'x', p * Math.PI * 0.5, 0.25, delta)
      damp(group.current.position, 'x', gsap.utils.interpolate(0, -1.5, p), 0.3, delta)
    }
    damp(state.camera.position, 'z', gsap.utils.interpolate(6, 3.5, p), 0.3, delta)
    if (mesh.current) mesh.current.rotation.z += delta * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} color="#fff4e6" />
      <directionalLight position={[-6, -2, -4]} intensity={1.2} color="#ff5a1f" />
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={group}>
          <mesh ref={mesh}>
            <torusKnotGeometry args={[1, 0.32, 220, 32]} />
            <meshStandardMaterial color="#e9e5dc" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </Float>
    </>
  )
}
