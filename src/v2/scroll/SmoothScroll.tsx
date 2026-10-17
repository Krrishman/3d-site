import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'
import { useScene } from '../store/useScene'

/**
 * Lenis drives the scroll. GSAP's ticker drives Lenis, every Lenis scroll
 * event updates ScrollTrigger, and the page progress is written to the store
 * once per scroll event for the canvas to read.
 */
function Bridge() {
  const setProgress = useScene((s) => s.setProgress)
  useLenis((lenis) => {
    ScrollTrigger.update()
    setProgress(lenis.limit > 0 ? lenis.scroll / lenis.limit : 0)
  })
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: reduced ? 1 : 0.1, smoothWheel: !reduced, syncTouch: false }}>
      <Bridge />
      {children}
    </ReactLenis>
  )
}
