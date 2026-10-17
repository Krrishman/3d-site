# 3D Site

A smooth-scroll 3D marketing site. Vite, React 19, TypeScript, Tailwind v4.

## Stack and who owns what

- **Scroll:** Lenis owns scrolling. GSAP's ticker drives Lenis and every Lenis
  scroll event calls `ScrollTrigger.update()`. This lives in
  `src/scroll/SmoothScroll.tsx`. Do not add a second smooth-scroll library or
  Drei `ScrollControls`; the DOM owns the scroll and the canvas reads from it.
- **Page motion:** GSAP (`gsap`, `ScrollTrigger`, `SplitText`) via `@gsap/react`'s
  `useGSAP`. Import GSAP from `src/scroll/gsap.ts` so plugins register once.
  Do not add Framer Motion / Motion for the same elements.
- **3D:** React Three Fiber + Drei, with `@react-three/postprocessing` in
  `src/scene/Effects.tsx`. The canvas is fixed behind the page (`Scene.tsx`).
  Scroll progress (0..1) is written once to the Zustand store in
  `src/store/useScene.ts` and read per frame in `Experience.tsx`.
- **Per-frame smoothing:** `maath/easing` `damp` toward scroll-driven targets.
  Do not tween Three.js values with GSAP inside `useFrame`.
- **State shared between DOM and canvas:** Zustand only.
- **Styling:** Tailwind v4 via `@tailwindcss/vite`. Design tokens live in the
  `@theme` block in `src/index.css`.
- **Shaders:** `.glsl`/`.vert`/`.frag` files import via `vite-plugin-glsl`.

## Rules

- Honor `prefers-reduced-motion`: use `useReducedMotion()` and skip or shorten
  animations. Lenis falls back to native scroll when it is set.
- One canvas, one scene, many scroll-driven states. Do not mount extra canvases.
- Assets: compress GLB with `npx gltf-transform optimize`, convert to JSX with
  `npx gltfjsx`. Keep models under `public/models`.
- No `Environment` presets that fetch HDRIs from a CDN without checking the
  network policy; bundle HDRIs under `public/` instead.

## Commands

- `npm run dev` starts Vite.
- `npm run build` runs `tsc -b` and builds. Run it before every push.
- `npm run lint` runs oxlint.
- `npm run preview` serves the build.

## Verifying visually

Headless Chromium here renders WebGL through SwiftShader (software). Use it to
screenshot scroll positions and check layout, not to judge frame rate.
Judge performance on a real GPU via a deployed preview.

## Images

Work tiles and project images are placeholders until `scripts/generate-assets.mjs`
(Kie.ai, needs `KIE_API_KEY`) writes renders into `public/renders/` and
`src/renders.generated.ts`. Never commit an API key; read it from the environment.
