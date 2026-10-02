import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import AutomotiveScene from './AutomotiveScene.jsx';
import SceneFallback from './SceneFallback.jsx';

/**
 * R3F Canvas wrapper.
 * Handles WebGL error boundary, fallback, and post-processing.
 */
export default function SceneCanvas({ webglSupported, scrollProgress, mouseRef }) {
  if (!webglSupported) {
    return <SceneFallback />;
  }

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
      shadows
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 1.5, 4.5] }}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        pointerEvents: 'none',
      }}
      aria-label="Interactive 3D automotive ECU scene"
    >
      <Suspense fallback={<mesh><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="red" /></mesh>}>
        <AutomotiveScene scrollProgress={scrollProgress} mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}
