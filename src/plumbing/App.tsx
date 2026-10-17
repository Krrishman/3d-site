import { SmoothScroll } from './scroll/SmoothScroll'
import { Bar } from './ui/Bar'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Questions } from './sections/Questions'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
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
        <Questions />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
