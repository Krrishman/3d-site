import { create } from 'zustand'

/** Shared between the DOM, GSAP and the canvas. Values the scene reads every frame. */
type SceneState = {
  /** 0 while the hero is fully in view, 1 when it has scrolled out. */
  heroProgress: number
  setHeroProgress: (p: number) => void
}

export const useScene = create<SceneState>((set) => ({
  heroProgress: 0,
  setHeroProgress: (heroProgress) => set({ heroProgress }),
}))
