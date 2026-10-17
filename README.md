# 3D Site

Smooth-scroll 3D website. React Three Fiber, Drei, post-processing, GSAP with
ScrollTrigger and SplitText, Lenis, Tailwind v4, Vite.

```sh
npm install
npm run dev
```

See `CLAUDE.md` for the architecture and conventions.

## Versions

- `/` is the original site (`src/`). Kept as a backup; not being changed.
- `/v2/` (`src/v2/`): dark, with a scroll-scrubbed film background and dust particles.
- `/plumbing/` (`src/plumbing/`): the light editorial site, kept for a separate
  plumbing client. Do not change it unless that client asks.
- `/v5/` (`src/v5/`): the current FlowForge site. Cinematic dark theme: a
  looping molten-metal hero clip, blue-hour job-site photographs, a pinned
  sideways run of work, a live lead-dashboard demo, questions and a contact form.

## Generating the photographs (plumbing)

```sh
KIE_API_KEY=your-key node scripts/generate-photos.mjs
```

Writes the eight job-site and process photographs to `public/plumbing/photos/`.

## Generating the media (v5)

```sh
KIE_API_KEY=your-key node scripts/generate-v5-media.mjs
```

Generates the 10-second hero clip (Kling 2.6) and five blue-hour stills
(Flux 2 Pro) into `public/v5/media/`, and cuts a web-sized loop and a poster
frame from the clip with ffmpeg. The raw clip is ignored by git; the loop and
poster are committed. `--only hero` or `--only van,desk` regenerates some.

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
