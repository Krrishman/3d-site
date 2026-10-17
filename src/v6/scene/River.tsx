import { useEffect, useRef } from 'react'
import { useScene } from '../store/useScene'
import { useReducedMotion } from '../scroll/useReducedMotion'

/**
 * The river. One fixed canvas behind the whole page draws a stream of molten
 * light that meanders down the page. Scroll moves the page over the river, so
 * the same stream you see in the hero is the one you follow to the footer.
 * Colours come from the active theme's CSS tokens, so it recolours itself.
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uScroll; uniform float uLight;
uniform vec3 uBg; uniform vec3 uBg2; uniform vec3 uHot; uniform vec3 uWarm; uniform vec3 uCool;
uniform sampler2D uVideo; uniform float uHasVideo; uniform float uVideoAspect; uniform vec2 uPointer;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i=0;i<5;i++){ v += a*noise(p); p = m*p; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  // Page space: y grows downward as you scroll. One unit = one viewport height.
  float py = (1.0 - uv.y) + uScroll;
  float px = (uv.x - uPointer.x * 0.003) * aspect;
  py += uPointer.y * 0.002;
  // The river's centre line meanders slowly down the page. It starts where the
  // film's lava leaves the bottom of the hero (about a fifth of the way in from the left).
  float t = py - 1.0;
  float cx = aspect * (0.20 + 0.30 * (1.0 - cos(t * 0.75)) + 0.06 * sin(t * 2.6));
  float w = (0.085 + 0.03 * sin(t * 1.7 + 0.8)) * max(aspect, 0.9);
  float d = abs(px - cx);
  // Molten texture flowing down the stream.
  vec2 q = vec2(px * 2.2, py * 1.9 - uTime * 0.22);
  vec2 warp = vec2(fbm(q + vec2(1.7, 9.2) + uTime * 0.04), fbm(q + vec2(8.3, 2.8) - uTime * 0.03));
  float n = fbm(q + 0.7 * warp);
  float edge = d - 0.035 * (n - 0.5) * 4.0 * w;
  float core = 1.0 - smoothstep(w * 0.55, w, edge);
  float halo = exp(-(edge * edge) / (w * w * 5.0));
  float cracks = smoothstep(0.48, 0.70, n);
  float veins = smoothstep(0.62, 0.66, fbm(q * 2.3 + warp * 1.5)) ;
  float dark = smoothstep(0.30, 0.42, n);
  // Ground: a soft field with slow cloudiness.
  float cloud = fbm(vec2(px * 0.7, py * 0.6 + uTime * 0.01));
  vec3 col = mix(uBg, uBg2, 0.35 + 0.65 * cloud);
  // Cool rim around the stream, then the stream itself.
  col = mix(col, mix(col, uCool, 0.55), halo * (1.0 - core) * 0.9);
  vec3 river = mix(uWarm * 0.72, uWarm, dark);
  river = mix(river, uHot, cracks * 0.85);
  river = mix(river, uHot * 1.25, veins * core);
  // Inside the stream, use the film's own lava as the texture: a strip taken
  // across the river in the lower part of the frame, carried along with the flow.
  if (uHasVideo > 0.5) {
    float across = clamp(0.5 + (px - cx) / (2.0 * w), 0.0, 1.0);
    float along = fract(t * 0.55 - uTime * 0.02);
    vec3 lava = texture2D(uVideo, vec2(0.20 + 0.42 * along, 0.62 + 0.36 * across)).rgb;
    float lum = dot(lava, vec3(0.3, 0.59, 0.11));
    river = mix(river, lava * 1.35, 0.75 * smoothstep(0.08, 0.5, lum));
  }
  // A bright thread down the very centre.
  river += uHot * 0.35 * exp(-(d * d) / (w * w * 0.08));
  col = mix(col, river, core);
  // Glow bleeds outward; on a light theme it tints instead of brightening.
  col += uHot * halo * mix(0.28, 0.10, uLight);
  // Embers drifting up and sideways from the stream.
  vec2 g = vec2(px * 26.0, (py - uTime * 0.06) * 26.0);
  vec2 gi = floor(g), gf = fract(g);
  float h = hash(gi);
  vec2 c = vec2(hash(gi + 3.1), hash(gi + 7.7));
  float ember = smoothstep(0.08, 0.0, length(gf - c)) * step(0.93, h) * halo * 2.0;
  ember *= 0.5 + 0.5 * sin(uTime * 3.0 + h * 40.0);
  col += uHot * ember * mix(1.0, 0.5, uLight);
  // The hero is the film itself, anchored to the top of the page. It hands
  // over to the drawn river across the last fifth of the first screen.
  if (uHasVideo > 0.5 && py < 1.05) {
    // Cover-fit the 16:9 film to the viewport.
    // Zoomed in a touch and leaning with the pointer, like a camera on a slow gimbal.
    vec2 vuv = vec2(uv.x, py);
    float sa = aspect / uVideoAspect;
    if (sa > 1.0) { vuv.y = (vuv.y - 0.5) / sa + 0.5; } else { vuv.x = (vuv.x - 0.5) * sa + 0.5; }
    vuv = (vuv - 0.5) / 1.06 + 0.5 + vec2(-uPointer.x * 0.006, -uPointer.y * 0.004);
    vec3 film = texture2D(uVideo, clamp(vuv, 0.0, 1.0)).rgb;
    // A soft shade where the headline and buttons sit, so the type reads over the lava.
    float shade = smoothstep(0.38, 1.0, py) * (1.0 - smoothstep(0.35, 0.75, uv.x)) * 0.62;
    film = mix(film, uBg, shade);
    float hand = smoothstep(0.80, 1.02, py);
    col = mix(film, col, hand);
  }
  // Film grain.
  col += (hash(uv * uRes + uTime) - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}`

function cssColor(name: string): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const m = v.match(/^#?([0-9a-f]{6})$/i)
  if (!m) return [0, 0, 0]
  const n = parseInt(m[1], 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function River() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = u('uRes'), uTime = u('uTime'), uScroll = u('uScroll'), uLight = u('uLight')
    const uVideo = u('uVideo'), uHasVideo = u('uHasVideo'), uVideoAspect = u('uVideoAspect'), uPointer = u('uPointer')
    // Pointer, -1..1 from the centre, eased per frame.
    let tx = 0, ty = 0, sx = 0, sy = 0
    const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1 }
    const onLeave = () => { tx = 0; ty = 0 }
    if (!reduced) { addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerleave', onLeave) }
    // The film. Only used on the dark palette; the light ones keep the drawn river.
    const video = document.createElement('video')
    video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'auto'; video.crossOrigin = 'anonymous'
    video.src = `${import.meta.env.BASE_URL}v6/media/hero-web.mp4`
    const tex = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([7, 10, 16]))
    gl.uniform1i(uVideo, 0); gl.uniform1f(uHasVideo, 0); gl.uniform1f(uVideoAspect, 16 / 9)
    let videoReady = false, dark = false
    const poster = new Image(); poster.src = `${import.meta.env.BASE_URL}v6/media/hero-poster.jpg`
    poster.onload = () => { if (!videoReady) { gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, poster); gl.uniform1f(uVideoAspect, poster.width / poster.height); videoReady = true; gl.uniform1f(uHasVideo, dark ? 1 : 0) } }
    video.addEventListener('loadeddata', () => { gl.uniform1f(uVideoAspect, video.videoWidth / video.videoHeight) })
    if (!reduced) video.play().catch(() => { /* poster stays */ })
    const onVis = () => { if (reduced) return; if (document.hidden) video.pause(); else video.play().catch(() => {}) }
    document.addEventListener('visibilitychange', onVis)
    const colors = { uBg: u('uBg'), uBg2: u('uBg2'), uHot: u('uHot'), uWarm: u('uWarm'), uCool: u('uCool') }
    const applyTheme = () => {
      gl.uniform3fv(colors.uBg, cssColor('--river-bg')); gl.uniform3fv(colors.uBg2, cssColor('--river-bg2'))
      gl.uniform3fv(colors.uHot, cssColor('--river-hot')); gl.uniform3fv(colors.uWarm, cssColor('--river-warm')); gl.uniform3fv(colors.uCool, cssColor('--river-cool'))
      dark = getComputedStyle(document.documentElement).getPropertyValue('--river-light').trim() !== '1'
      gl.uniform1f(uLight, dark ? 0 : 1)
      gl.uniform1f(uHasVideo, dark && videoReady ? 1 : 0)
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.floor(innerWidth * dpr); canvas.height = Math.floor(innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize(); applyTheme()
    const mo = new MutationObserver(applyTheme); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    addEventListener('resize', resize)
    let raf = 0, smooth = 0
    const t0 = performance.now()
    const frame = (now: number) => {
      const target = useScene.getState().scrollVh
      smooth += (target - smooth) * 0.12
      gl.uniform1f(uTime, reduced ? 0 : (now - t0) / 1000)
      gl.uniform1f(uScroll, smooth)
      sx += (tx - sx) * 0.04; sy += (ty - sy) * 0.04
      gl.uniform2f(uPointer, sx, sy)
      if (dark && !reduced && video.readyState >= 3 && !video.paused && !video.seeking) {
        gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video)
        if (!videoReady) { videoReady = true; gl.uniform1f(uHasVideo, 1) }
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); mo.disconnect(); document.removeEventListener('visibilitychange', onVis); removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); video.pause(); video.removeAttribute('src'); video.load() }
  }, [reduced])
  return <canvas ref={ref} className="river" aria-hidden="true" />
}
