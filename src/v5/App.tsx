import { SmoothScroll } from './scroll/SmoothScroll'
import { Bar } from './ui/Bar'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Statement } from './sections/Statement'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Demo } from './sections/Demo'
import { Questions } from './sections/Questions'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <Bar />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Work />
        <Services />
        <Process />
        <Demo />
        <Questions />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
