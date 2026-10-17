import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.6} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.15} darkness={0.75} />
    </EffectComposer>
  )
}
