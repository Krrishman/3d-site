import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

const CA = new Vector2(0.0008, 0.0008)

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={1.1} luminanceThreshold={0.55} luminanceSmoothing={0.25} mipmapBlur />
      <ChromaticAberration offset={CA} radialModulation modulationOffset={0.6} />
      <Noise opacity={0.045} />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  )
}
