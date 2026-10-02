import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural ECU unit — black anodized metal box with PCB visible inside.
 * Represents an NXP S32K144-style automotive ECU housing.
 */
export default function ECUMesh({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  const pcbLightRef = useRef();

  // Subtle float animation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

    // Pulse the PCB emissive
    if (pcbLightRef.current) {
      pcbLightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  // Materials
  const blackMetal = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0D0C0A',
    roughness: 0.3,
    metalness: 0.8,
  }), []);

  const pcbGreen = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A1A0A',
    roughness: 0.6,
    metalness: 0.2,
  }), []);

  const copperTrace = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B87333',
    roughness: 0.4,
    metalness: 0.9,
    emissive: '#D9622B',
    emissiveIntensity: 0.3,
  }), []);

  const connectorPlastic = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1614',
    roughness: 0.9,
    metalness: 0.1,
  }), []);

  const connectorPin = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C0C0C0',
    roughness: 0.2,
    metalness: 0.95,
  }), []);

  const orangeLed = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D9622B',
    emissive: '#D9622B',
    emissiveIntensity: 2.5,
    roughness: 0.1,
    metalness: 0.0,
  }), []);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Main ECU housing body */}
      <mesh material={blackMetal} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.4, 1.6]} />
      </mesh>

      {/* Housing lid — slightly lighter to show seam */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#141210', roughness: 0.4, metalness: 0.7 })}
        position={[0, 0.22, 0]}
        castShadow
      >
        <boxGeometry args={[2.38, 0.04, 1.58]} />
      </mesh>

      {/* PCB inside (visible from top as slightly recessed) */}
      <mesh material={pcbGreen} position={[0, 0.06, 0]}>
        <boxGeometry args={[2.1, 0.02, 1.3]} />
      </mesh>

      {/* PCB traces — horizontal lines */}
      {[-0.4, -0.1, 0.2, 0.5].map((z, i) => (
        <mesh key={i} material={copperTrace} position={[0, 0.08, z]}>
          <boxGeometry args={[1.8, 0.005, 0.02]} />
        </mesh>
      ))}
      {/* PCB traces — vertical lines */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} material={copperTrace} position={[x, 0.08, 0]}>
          <boxGeometry args={[0.02, 0.005, 1.1]} />
        </mesh>
      ))}

      {/* Main MCU chip (S32K144 footprint) */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.5, metalness: 0.6 })}
        position={[-0.3, 0.1, 0]}
      >
        <boxGeometry args={[0.55, 0.04, 0.55]} />
      </mesh>
      {/* MCU label silkscreen */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#1A1A1A', roughness: 0.8, metalness: 0.1 })}
        position={[-0.3, 0.125, 0]}
      >
        <boxGeometry args={[0.45, 0.005, 0.08]} />
      </mesh>

      {/* CAN transceiver IC */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#0D0D0D', roughness: 0.5, metalness: 0.5 })}
        position={[0.55, 0.1, -0.2]}
      >
        <boxGeometry args={[0.25, 0.035, 0.15]} />
      </mesh>

      {/* Power IC */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: '#0D0D0D', roughness: 0.5, metalness: 0.5 })}
        position={[0.55, 0.1, 0.25]}
      >
        <boxGeometry args={[0.2, 0.04, 0.2]} />
      </mesh>

      {/* Capacitors */}
      {[
        [0.1, 0.13, -0.45],
        [0.2, 0.13, -0.45],
        [0.3, 0.13, -0.45],
        [0.7, 0.13, 0],
        [0.7, 0.13, 0.15],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          material={new THREE.MeshStandardMaterial({ color: '#1A3A1A', roughness: 0.6, metalness: 0.3 })}
          position={[x, y, z]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
        </mesh>
      ))}

      {/* Status LEDs */}
      {[
        [-0.9, 0.12, 0.55],
        [-0.75, 0.12, 0.55],
      ].map(([x, y, z], i) => (
        <mesh key={i} material={orangeLed} position={[x, y, z]}>
          <sphereGeometry args={[0.022, 8, 8]} />
        </mesh>
      ))}

      {/* Point light inside ECU for LED glow */}
      <pointLight
        ref={pcbLightRef}
        position={[-0.82, 0.2, 0.55]}
        color="#D9622B"
        intensity={0.8}
        distance={1.2}
        decay={2}
      />

      {/* CAN connector block (26-pin header) */}
      <group position={[1.2, 0.04, 0]}>
        <mesh material={connectorPlastic} castShadow>
          <boxGeometry args={[0.15, 0.28, 0.9]} />
        </mesh>
        {/* Connector pins — two rows */}
        {Array.from({ length: 13 }, (_, i) => i).map(i => (
          <group key={i}>
            <mesh material={connectorPin} position={[-0.05, -0.04, -0.4 + i * 0.064]}>
              <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            <mesh material={connectorPin} position={[0.05, -0.04, -0.4 + i * 0.064]}>
              <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Smaller diagnostic connector (OBD/UART) */}
      <group position={[1.2, 0.04, -0.55]}>
        <mesh material={connectorPlastic}>
          <boxGeometry args={[0.15, 0.2, 0.25]} />
        </mesh>
      </group>

      {/* Heat sink fins (top, rear) */}
      {[-0.5, -0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh
          key={i}
          material={new THREE.MeshStandardMaterial({ color: '#161412', roughness: 0.4, metalness: 0.7 })}
          position={[x, 0.28, -0.5]}
        >
          <boxGeometry args={[0.08, 0.2, 0.04]} />
        </mesh>
      ))}

      {/* Mounting holes (corner embellishments) */}
      {[
        [-1.0, 0.22, -0.65],
        [-1.0, 0.22,  0.65],
        [ 1.0, 0.22, -0.65],
        [ 1.0, 0.22,  0.65],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          material={new THREE.MeshStandardMaterial({ color: '#0A0806', roughness: 0.5, metalness: 0.8 })}
          position={[x, y, z]}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.06, 12]} />
        </mesh>
      ))}
    </group>
  );
}
