import { create } from 'zustand'

/**
 * Shared state between the DOM, GSAP timelines, and the canvas.
 * Keep it small: values the scene reads every frame.
 */
type SceneState = {
  /** 0 at the top of the page, 1 at the bottom. Written by ScrollTrigger. */
  progress: number
  setProgress: (p: number) => void
}

export const useScene = create<SceneState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}))
