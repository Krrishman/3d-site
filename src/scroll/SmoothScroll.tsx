import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Lenis drives the scroll. GSAP's ticker drives Lenis, and every Lenis
 * scroll event updates ScrollTrigger. This is the one sync step that keeps
 * scroll-scrubbed animations from stuttering.
 */
function LenisScrollTriggerBridge() {
  useLenis(() => ScrollTrigger.update())
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // Native scroll when the visitor asks for less motion.
        lerp: reduced ? 1 : 0.1,
        smoothWheel: !reduced,
        // Touch devices keep native scrolling. This is Lenis's default and
        // the right call for mobile.
        syncTouch: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
