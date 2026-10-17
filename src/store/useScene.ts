import { create } from 'zustand'

/**
 * Shared between the DOM, GSAP and the canvas.
 * `stage` is a float: 0 = hero, 1 = problems, 2 = services, 3 = demo,
 * 4 = process, 5 = close. Each section writes its own progress into it.
 */
type SceneState = {
  stage: number
  setStage: (s: number) => void
  pointer: { x: number; y: number }
  setPointer: (x: number, y: number) => void
}

export const useScene = create<SceneState>((set) => ({
  stage: 0,
  setStage: (stage) => set({ stage }),
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),
}))
