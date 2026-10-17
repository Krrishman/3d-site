import { useEffect } from 'react'
import { SmoothScroll } from './scroll/SmoothScroll'
import { ScrollTrigger } from './scroll/gsap'
import { Bar } from './ui/Bar'
import { Hub } from './pages/Hub'
import { DivisionPage } from './pages/Division'
import { Footer } from './ui/Footer'
import { DIVISIONS } from './content'
import { useRoute } from './router'

export default function App() {
  const route = useRoute()
  const division = DIVISIONS.find((d) => d.id === route)
  useEffect(() => { ScrollTrigger.refresh() }, [route])
  return (
    <SmoothScroll>
      <Bar current={route} />
      <main key={route}>{division ? <DivisionPage d={division} /> : <Hub />}</main>
      <Footer />
    </SmoothScroll>
  )
}
