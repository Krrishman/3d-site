import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'

/** Post-processing stack. Tune or remove effects here, not in the scene. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.5} luminanceThreshold={0.85} luminanceSmoothing={0.3} mipmapBlur />
      <Noise opacity={0.035} />
    </EffectComposer>
  )
}
