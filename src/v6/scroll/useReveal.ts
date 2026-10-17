import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/** One entrance per section, once, in reading order. Text rises; pictures open from the top and settle from a slight scale. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !scope.current) return
      const root = scope.current
      const text = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      const pics = gsap.utils.toArray<HTMLElement>('[data-shutter]', root)
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 72%', once: true } })
      if (text.length) tl.from(text, { opacity: 0, y: 26, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0)
      pics.forEach((pic, i) => {
        const img = pic.querySelector('img, video')
        tl.from(pic, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut' }, 0.1 + i * 0.1)
        if (img) tl.from(img, { scale: 1.12, duration: 1.6, ease: 'power2.out' }, 0.1 + i * 0.1)
      })
    },
    { scope, dependencies: [reduced] },
  )
}
