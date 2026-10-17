import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/** Statements marked [data-words] light up word by word as they cross the viewport. */
export function useWords(scope: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  useGSAP(() => {
    if (reduced || !scope.current) return
    const els = gsap.utils.toArray<HTMLElement>('[data-words]', scope.current)
    const splits = els.map((el) => {
      const split = SplitText.create(el, { type: 'words' })
      gsap.fromTo(split.words, { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.04, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } })
      return split
    })
    return () => splits.forEach((s) => s.revert())
  }, { scope, dependencies: [reduced] })
}
