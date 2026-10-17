import { SmoothScroll } from './scroll/SmoothScroll'
import { River } from './scene/River'
import { Bar } from './ui/Bar'
import { Hero } from './sections/Hero'
import { Statement } from './sections/Statement'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Demo } from './sections/Demo'
import { Questions } from './sections/Questions'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <River />
      <Bar />
      <main>
        <Hero />
        <Statement />
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
