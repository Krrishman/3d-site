import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// Three pages: `/` is the original site, kept as is; `/v2/` and `/v3/` are the newer ones.
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  build: {
    rolldownOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), v2: resolve(import.meta.dirname, 'v2/index.html'), v3: resolve(import.meta.dirname, 'v3/index.html') },
    },
  },
})
