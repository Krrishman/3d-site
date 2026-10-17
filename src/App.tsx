import { SmoothScroll } from './scroll/SmoothScroll'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Features } from './sections/Features'
import { Showcase } from './sections/Showcase'
import { HowItWorks } from './sections/HowItWorks'
import { Cta } from './sections/Cta'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <main id="top">
        <Hero />
        <Intro />
        <Features />
        <Showcase />
        <HowItWorks />
        <Cta />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
