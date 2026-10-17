import { create } from 'zustand'

/** Page scroll, in viewport heights, written once per Lenis scroll event and read per frame by the river. */
type SceneState = { scrollVh: number; setScrollVh: (v: number) => void }
export const useScene = create<SceneState>((set) => ({ scrollVh: 0, setScrollVh: (scrollVh) => set({ scrollVh }) }))
