import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural futuristic sports car body.
 * Low-poly but recognisably automotive: long hood, sloped roofline,
 * wheel arches, side skirts, tail-light strip.
 */
export default function VehicleBody({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  showLights = false,
}) {
  const groupRef = useRef();

  const bodyPaint = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A0A0C',
    roughness: 0.15,
    metalness: 0.9,
    envMapIntensity: 1,
  }), []);

  const glass = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0D1520',
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.7,
  }), []);

  const rubber = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A0A0A',
    roughness: 0.95,
    metalness: 0.05,
  }), []);

  const chrome = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A0A0A0',
    roughness: 0.05,
    metalness: 1.0,
  }), []);

  const tailLightMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: showLights ? '#D9622B' : '#3A1A0A',
    emissive: showLights ? '#D9622B' : '#000000',
    emissiveIntensity: showLights ? 2.0 : 0,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: showLights ? 1 : 0.8,
  }), [showLights]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>

      {/* ── Main body shell ─────────────────────────────────────── */}
      {/* Lower body — long slab */}
      <mesh material={bodyPaint} castShadow receiveShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[4.2, 0.28, 1.8]} />
      </mesh>

      {/* Upper body cabin / greenhouse */}
      <mesh material={bodyPaint} castShadow position={[0.1, 0.52, 0]}>
        <boxGeometry args={[2.0, 0.3, 1.55]} />
      </mesh>

      {/* Hood (tapered) */}
      <mesh material={bodyPaint} castShadow position={[1.6, 0.36, 0]}>
        <boxGeometry args={[1.0, 0.1, 1.7]} />
      </mesh>

      {/* Rear deck */}
      <mesh material={bodyPaint} castShadow position={[-1.4, 0.36, 0]}>
        <boxGeometry args={[0.8, 0.1, 1.7]} />
      </mesh>

      {/* Front bumper / splitter */}
      <mesh material={bodyPaint} castShadow position={[2.15, 0.12, 0]}>
        <boxGeometry args={[0.1, 0.22, 1.75]} />
      </mesh>
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.9, metalness: 0.1 })}
        position={[2.1, 0.08, 0]}
      >
        <boxGeometry args={[0.15, 0.06, 1.5]} />
      </mesh>

      {/* Rear diffuser */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#0A0806', roughness: 0.8, metalness: 0.2 })}
        position={[-2.15, 0.1, 0]}
      >
        <boxGeometry args={[0.06, 0.18, 1.6]} />
      </mesh>

      {/* Side skirts */}
      {[-1, 1].map((side) => (
        <mesh key={side} material={bodyPaint} castShadow position={[0, 0.12, side * 0.94]}>
          <boxGeometry args={[3.6, 0.08, 0.08]} />
        </mesh>
      ))}

      {/* ── Windscreens ─────────────────────────────────────────── */}
      {/* Front windscreen */}
      <mesh material={glass} position={[0.9, 0.55, 0]} rotation={[0, 0, Math.PI * 0.12]}>
        <boxGeometry args={[0.04, 0.5, 1.45]} />
      </mesh>
      {/* Rear windscreen */}
      <mesh material={glass} position={[-0.75, 0.55, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
        <boxGeometry args={[0.04, 0.45, 1.45]} />
      </mesh>

      {/* ── Wheels (4×) ─────────────────────────────────────────── */}
      {[
        [1.35, -0.08, 1.0],
        [1.35, -0.08, -1.0],
        [-1.25, -0.08, 1.0],
        [-1.25, -0.08, -1.0],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Tyre */}
          <mesh material={rubber} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.11, 12, 24]} />
          </mesh>
          {/* Rim */}
          <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 20]} />
          </mesh>
          {/* Spokes */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <mesh
              key={deg}
              material={chrome}
              rotation={[Math.PI / 2, 0, (deg * Math.PI) / 180]}
              position={[0, 0, 0]}
            >
              <boxGeometry args={[0.03, 0.38, 0.02]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Wheel arches ────────────────────────────────────────── */}
      {[
        [1.35, 0.02, 1.0],
        [1.35, 0.02, -1.0],
        [-1.25, 0.02, 1.0],
        [-1.25, 0.02, -1.0],
      ].map(([x, y, z], i) => (
        <mesh key={i} material={bodyPaint} position={[x, y, z]}>
          <torusGeometry args={[0.38, 0.06, 8, 16, Math.PI]} />
        </mesh>
      ))}

      {/* ── Tail lights (LED strip across rear) ─────────────────── */}
      <mesh material={tailLightMat} position={[-2.1, 0.32, 0]}>
        <boxGeometry args={[0.04, 0.06, 1.65]} />
      </mesh>

      {/* Tail light glow */}
      {showLights && (
        <pointLight
          position={[-2.2, 0.32, 0]}
          color="#D9622B"
          intensity={3}
          distance={3}
          decay={2}
        />
      )}

      {/* Front light strip */}
      <mesh
        material={new THREE.MeshStandardMaterial({
          color: '#E8E8FF',
          emissive: '#D0D8FF',
          emissiveIntensity: 0.5,
          roughness: 0.1,
        })}
        position={[2.12, 0.3, 0]}
      >
        <boxGeometry args={[0.04, 0.04, 1.4]} />
      </mesh>

      {/* ── Ground shadow plane ──────────────────────────────────── */}
      <mesh position={[0, -0.38, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 3]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}
