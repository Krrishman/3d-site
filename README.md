# 3D Site

Smooth-scroll 3D website. React Three Fiber, Drei, post-processing, GSAP with
ScrollTrigger and SplitText, Lenis, Tailwind v4, Vite.

```sh
npm install
npm run dev
```

See `CLAUDE.md` for the architecture and conventions.

## Generating the images

The work tiles and project images ship as placeholders. Generate FlowForge's
own renders with Kie.ai (Flux 2 Pro) and they replace the placeholders:

```sh
KIE_API_KEY=your-key node scripts/generate-assets.mjs
```

Renders land in `public/renders/` and `src/renders.generated.ts` maps them
into the page. Re-run with `--force` to regenerate, or `--only work-01,p1-a`
for specific ones. The prompts live in `scripts/generate-assets.mjs`.
