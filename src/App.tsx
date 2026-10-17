import { lazy, Suspense } from 'react'
import { SmoothScroll } from './scroll/SmoothScroll'
import { Hero } from './sections/Hero'
import { Chapters } from './sections/Chapters'
import { Outro } from './sections/Outro'

// Three.js is the heaviest chunk. Load it after the page text has painted.
const Scene = lazy(() => import('./scene/Scene'))

export default function App() {
  return (
    <SmoothScroll>
      {/* The canvas is fixed behind the page. The DOM owns the scroll;
          GSAP ScrollTrigger scrubs scene values from it. */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <main className="relative z-10">
        <Hero />
        <Chapters />
        <Outro />
      </main>
    </SmoothScroll>
  )
}
