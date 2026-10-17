import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { WORK_TILES } from '../content'

/** Two rows of work previews that slide with the page scroll, in opposite directions. */
export function Work() {
  const root = useRef<HTMLElement>(null)
  const row1 = useRef<HTMLDivElement>(null)
  const row2 = useRef<HTMLDivElement>(null)
  useStage(root, 1)

  useEffect(() => {
    if (!root.current) return
    const update = () => {
      const top = root.current!.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - top + window.innerHeight) * 0.3
      if (row1.current) row1.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`
      if (row2.current) row2.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`
    }
    const t = ScrollTrigger.create({ trigger: root.current, start: 'top bottom', end: 'bottom top', onUpdate: update })
    update()
    return () => t.kill()
  }, [])

  return (
    <section ref={root} id="work" className="relative overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <Row items={WORK_TILES.slice(0, 11)} refEl={row1} />
        <Row items={WORK_TILES.slice(11)} refEl={row2} />
      </div>
    </section>
  )
}

function Row({ items, refEl }: { items: string[]; refEl: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={refEl} className="flex w-max gap-3 will-change-transform">
      {[...items, ...items, ...items].map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy" width={420} height={270} className="h-[170px] w-[264px] shrink-0 rounded-2xl bg-navy-2 object-cover md:h-[270px] md:w-[420px]" />
      ))}
    </div>
  )
}
