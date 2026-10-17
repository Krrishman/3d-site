# 3D Site

Smooth-scroll 3D website. React Three Fiber, Drei, post-processing, GSAP with
ScrollTrigger and SplitText, Lenis, Tailwind v4, Vite.

```sh
npm install
npm run dev
```

See `CLAUDE.md` for the architecture and conventions.

## Two versions

- `/` is the original site (`src/`). It is kept as a backup and is not being changed.
- `/v2/` is the new site (`src/v2/`): a scroll-scrubbed film background, dust
  particles that part around the pointer, and much shorter copy.

## Generating the background (v2)

```sh
KIE_API_KEY=your-key node scripts/generate-background.mjs
```

Generates a 10-second abstract clip with Kie.ai (Kling 2.6 by default), then
cuts it into 120 WebP frames at two sizes under `public/v2/frames/`. Pass
`--video path.mp4` to re-cut frames from a clip you already have, `--model`
to pick another Kie model, or `--prompt` to change the brief.

## Generating the images

The work tiles and project images ship as placeholders. Generate FlowForge's
own renders with Kie.ai (Flux 2 Pro) and they replace the placeholders:

```sh
KIE_API_KEY=your-key node scripts/generate-assets.mjs
```

Renders land in `public/renders/` and `src/renders.generated.ts` maps them
into the page. Re-run with `--force` to regenerate, or `--only work-01,p1-a`
for specific ones. The prompts live in `scripts/generate-assets.mjs`.
