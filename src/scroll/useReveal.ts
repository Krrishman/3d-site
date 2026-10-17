import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/** One entrance per section, once, as it enters. */
export function useReveal(scope: RefObject<HTMLElement | null>, selector = '[data-reveal]') {
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !scope.current) return
      const targets = gsap.utils.toArray<HTMLElement>(selector, scope.current)
      if (!targets.length) return
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true },
      })
    },
    { scope, dependencies: [reduced, selector] },
  )
}
