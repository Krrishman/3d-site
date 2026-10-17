import { lazy, Suspense } from 'react'
import { SmoothScroll } from './scroll/SmoothScroll'
import { Nav } from './ui/Nav'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { Statement } from './sections/Statement'
import { Services } from './sections/Services'
import { Projects } from './sections/Projects'
import { Demo } from './sections/Demo'
import { Process } from './sections/Process'
import { About } from './sections/About'
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
        <Work />
        <Statement />
        <Services />
        <Projects />
        <Demo />
        <Process />
        <About />
        <Cta />
      </main>
    </SmoothScroll>
  )
}
