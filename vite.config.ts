import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// Pages: `/` is the original site, kept as is; `/v2/` the dark film version; `/plumbing/` the light site kept for the plumbing client; `/v5/` the current FlowForge site.
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  build: {
    rolldownOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), v2: resolve(import.meta.dirname, 'v2/index.html'), plumbing: resolve(import.meta.dirname, 'plumbing/index.html'), v5: resolve(import.meta.dirname, 'v5/index.html') },
    },
  },
})
