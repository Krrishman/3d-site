import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../scroll/useReducedMotion'

/** A number that counts up once when it scrolls into view. */
export function Count({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? value : 0)
  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const t0 = performance.now(), dur = 1400
      const tick = (now: number) => { const p = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - p, 3); setN(Math.round(value * e)); if (p < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, reduced])
  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>
}
