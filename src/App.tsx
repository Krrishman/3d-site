import { lazy, Suspense } from 'react'
import { SmoothScroll } from './scroll/SmoothScroll'
import { Nav } from './ui/Nav'
import { Hero } from './sections/Hero'
import { Problems } from './sections/Problems'
import { Services } from './sections/Services'
import { Demo } from './sections/Demo'
import { Process } from './sections/Process'
import { Cta } from './sections/Cta'

const Scene = lazy(() => import('./scene/Scene'))

export default function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Problems />
        <Services />
        <Demo />
        <Process />
        <Cta />
      </main>
    </SmoothScroll>
  )
}
