import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'

const CHAPTERS = [
  { n: '01', title: 'Material', body: 'Placeholder. Each chapter pins while the scene changes behind it.' },
  { n: '02', title: 'Motion', body: 'Placeholder. Scroll progress is the single clock for page and canvas.' },
  { n: '03', title: 'Light', body: 'Placeholder. Post-processing is tuned once, in one file.' },
]

export function Chapters() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root}>
      {CHAPTERS.map((c) => (
        <article
          key={c.n}
          data-chapter
          className="grid min-h-svh grid-cols-1 content-center gap-6 px-6 md:grid-cols-12 md:px-16"
        >
          <span data-reveal className="font-mono text-sm text-accent md:col-span-2">
            {c.n}
          </span>
          <h2 data-reveal className="text-4xl font-medium tracking-tight md:col-span-5 md:text-6xl">
            {c.title}
          </h2>
          <p data-reveal className="max-w-md text-paper/70 md:col-span-4 md:col-start-9">
            {c.body}
          </p>
        </article>
      ))}
    </section>
  )
}
