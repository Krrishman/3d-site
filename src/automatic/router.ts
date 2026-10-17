import { useEffect, useState } from 'react'
import { DIVISIONS } from './content'

/** Hash routing with plain tokens: '' is the group page, '#pools' a division. Works on any static host. */
export function routeFromHash(): string {
  const h = location.hash.replace(/^#/, '')
  return DIVISIONS.some((d) => d.id === h) ? h : ''
}
export function useRoute() {
  const [route, setRoute] = useState(routeFromHash)
  useEffect(() => {
    const on = () => setRoute(routeFromHash())
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return route
}
export const href = (id: string) => (id ? `#${id}` : '#')
