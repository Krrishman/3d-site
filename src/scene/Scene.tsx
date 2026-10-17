import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import { Experience } from './Experience'
import { Effects } from './Effects'

/** Lives inside the hero's lower field, beneath the headline. */
export default function Scene() {
  return (
    <Canvas
      className="pointer-events-none"
      camera={{ position: [0, 0, 6.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <Experience />
        <Effects />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
