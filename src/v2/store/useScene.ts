import { create } from 'zustand'

/**
 * Shared between the DOM and the canvas.
 * `progress` is the page scroll, 0 at the top and 1 at the bottom. The canvas
 * scrubs the background frames and drifts the particles from it.
 */
type SceneState = {
  progress: number
  setProgress: (p: number) => void
  pointer: { x: number; y: number }
  setPointer: (x: number, y: number) => void
}

export const useScene = create<SceneState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),
}))
