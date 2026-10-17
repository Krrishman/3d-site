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
      // Hold this section's keyframe while it is read; move only in its last third.
      onUpdate: (self) => setStage(index + Math.max(0, (self.progress - 0.7) / 0.3)),
    })
    return () => t.kill()
  }, [ref, index, setStage])
}
