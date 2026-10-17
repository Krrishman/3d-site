import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { Frames } from './Frames'
import { Particles } from './Particles'
import { Effects } from './Effects'

/** One canvas, fixed behind the page. The page scrolls over it and the canvas reads the scroll. */
export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#070b14']} />
        <Suspense fallback={null}>
          <Frames />
          <Particles />
          <Effects />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
