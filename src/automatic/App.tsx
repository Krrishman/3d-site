import { useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import { SmoothScroll } from './scroll/SmoothScroll'
import { ScrollTrigger } from './scroll/gsap'
import { Bar } from './ui/Bar'
import { Hub } from './pages/Hub'
import { DivisionPage } from './pages/Division'
import { Footer } from './ui/Footer'
import { DIVISIONS } from './content'
import { useRoute } from './router'

/** Every page opens at its top. Lenis keeps its own smoothed position, so it is reset too, not just the window. */
function ScrollTop({ route }: { route: string }) {
  const lenis = useLenis()
  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [route, lenis])
  return null
}

export default function App() {
  const route = useRoute()
  const division = DIVISIONS.find((d) => d.id === route)
  return (
    <SmoothScroll>
      <ScrollTop route={route} />
      <Bar current={route} />
      <main key={route}>{division ? <DivisionPage d={division} /> : <Hub />}</main>
      <Footer />
    </SmoothScroll>
  )
}
