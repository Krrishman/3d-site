import { SmoothScroll } from './scroll/SmoothScroll'
import { Bar } from './ui/Bar'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Cta } from './sections/Cta'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <Bar />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <About />
        <Cta />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
