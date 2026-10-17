import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from './useReducedMotion'

type Manner = 'rise' | 'rows' | 'settle' | 'lines'

/**
 * One entrance per section, triggered once as it enters. The manner varies
 * with the content; the timing is shared.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, selector: string, manner: Manner = 'rise') {
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !scope.current) return
      const targets = gsap.utils.toArray<HTMLElement>(selector, scope.current)
      if (!targets.length) return
      const from: gsap.TweenVars =
        manner === 'rows'
          ? { opacity: 0, x: -24 }
          : manner === 'settle'
            ? { opacity: 0, scale: 0.96, transformOrigin: '50% 100%' }
            : manner === 'lines'
              ? { opacity: 0, yPercent: 60 }
              : { opacity: 0, y: 24 }
      gsap.from(targets, {
        ...from,
        duration: manner === 'settle' ? 1.1 : 0.9,
        ease: 'power3.out',
        stagger: manner === 'rows' ? 0.06 : 0.08,
        scrollTrigger: { trigger: scope.current, start: 'top 72%', once: true },
      })
    },
    { scope, dependencies: [reduced, selector, manner] },
  )
}
