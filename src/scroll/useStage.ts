import { useEffect, type RefObject } from 'react'
import { ScrollTrigger } from './gsap'
import { useScene } from '../store/useScene'

/** Writes `index + progress` into the store while this section crosses the viewport centre. */
export function useStage(ref: RefObject<HTMLElement | null>, index: number) {
  const setStage = useScene((s) => s.setStage)
  useEffect(() => {
    if (!ref.current) return
    const t = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 60%',
      end: 'bottom 60%',
      onUpdate: (self) => setStage(index + self.progress),
    })
    return () => t.kill()
  }, [ref, index, setStage])
}
