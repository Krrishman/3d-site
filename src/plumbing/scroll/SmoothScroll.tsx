import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/** Lenis drives the scroll, GSAP's ticker drives Lenis, and every scroll event updates ScrollTrigger. */
function Bridge() {
  useLenis(() => ScrollTrigger.update())
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
