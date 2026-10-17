import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

/** Post-processing stack. Tune or remove effects here, not in the scene. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.6} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur />
      <Noise opacity={0.04} />
      <Vignette eskil={false} offset={0.2} darkness={0.9} />
    </EffectComposer>
  )
}
