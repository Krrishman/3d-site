import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * One entrance per section, once, in reading order. Text rises; pictures
 * open from their top edge and settle from a slight scale. Nothing is hidden
 * until the section is near, so a failed script leaves everything readable.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !scope.current) return
      const root = scope.current
      const text = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      const pics = gsap.utils.toArray<HTMLElement>('[data-shutter]', root)
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 72%', once: true } })
      if (text.length) tl.from(text, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0)
      pics.forEach((pic, i) => {
        const img = pic.querySelector('img')
        tl.from(pic, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut' }, 0.15 + i * 0.12)
        if (img) tl.from(img, { scale: 1.1, duration: 1.5, ease: 'power2.out' }, 0.15 + i * 0.12)
      })
    },
    { scope, dependencies: [reduced] },
  )
}
