import { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, Grid, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload the car model
useGLTF.preload('/models/car.glb');

/**
 * Real Car Model loaded from GLB
 * Auto-scales and centers the model so it fits the scene regardless of its original export size.
 */
function RealCarModel(props) {
  const { scene } = useGLTF('/models/car.glb');
  
  const transform = useMemo(() => {
    // 1. Calculate the bounding box of the loaded model
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // 2. Find the largest dimension (length, width, or height)
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim === 0) return { scale: 1, position: [0, 0, 0] };
    
    // 3. Force the car to be exactly 4.0 units across its largest dimension
    const targetSize = 4.0;
    const scaleFactor = targetSize / maxDim;
    
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    return {
      scale: scaleFactor,
      // 4. Center the car, and place its bottom exactly at Y=0
      position: [
        -center.x * scaleFactor,
        -box.min.y * scaleFactor,
        -center.z * scaleFactor
      ]
    };
  }, [scene]);

  return (
    <group {...props}>
      <group position={transform.position} scale={transform.scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/**
 * Scene camera — controlled by GSAP ScrollTrigger.
 * Camera positions are defined per scroll milestone.
 */
function SceneCamera({ mouseRef }) {
  const { camera } = useThree();
  const cameraState = useRef({
    x: 3, y: 1.5, z: 5,
    targetX: 0, targetY: 0.5, targetZ: 0,
  });

  useEffect(() => {
    camera.fov = 42;
    camera.updateProjectionMatrix();

    // Initial position: Front-quarter angle of the car
    camera.position.set(3, 1.5, 5);
    camera.lookAt(0, 0.5, 0);

    const cs = cameraState.current;

    // Scroll-driven camera animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Keyframe 0 → 25%: Orbit to the front
    tl.to(cs, { x: 0, y: 1.0, z: 5.5, targetX: 0, targetY: 0.3, targetZ: 0, ease: 'none' }, 0);

    // Keyframe 25% → 50%: Orbit to the left side, slightly lower
    tl.to(cs, { x: -5, y: 0.8, z: 2, targetX: 0, targetY: 0.4, targetZ: 0, ease: 'none' }, 0.25);

    // Keyframe 50% → 75%: Pull back and high for a wide shot
    tl.to(cs, { x: -4, y: 3.5, z: -4, targetX: 0, targetY: 0.2, targetZ: 0, ease: 'none' }, 0.5);

    // Keyframe 75% → 100%: Dramatic rear shot
    tl.to(cs, { x: 2, y: 1.2, z: -5, targetX: 0, targetY: 0.6, targetZ: 0, ease: 'none' }, 0.75);

    return () => tl.kill();
  }, [camera]);

  useFrame(() => {
    const cs = cameraState.current;

    // Mouse parallax (subtle)
    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.15;

    camera.position.x += (cs.x + mx - camera.position.x) * 0.06;
    camera.position.y += (cs.y + my - camera.position.y) * 0.06;
    camera.position.z += (cs.z - camera.position.z) * 0.06;

    camera.lookAt(
      cs.targetX + mx * 0.1,
      cs.targetY + my * 0.1,
      cs.targetZ,
    );
  });

  return null;
}

/**
 * Lighting rig — automotive studio look with orange rim light.
 */
function SceneLighting() {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.08} />

      {/* Key light — cool white from upper front */}
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.2}
        color="#E8EEF5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />

      {/* Orange rim light — rear left */}
      <pointLight
        position={[-4, 1.5, -2]}
        color="#D9622B"
        intensity={4}
        distance={8}
        decay={2}
      />

      {/* Soft fill — right side */}
      <pointLight
        position={[4, 1, 2]}
        color="#B0C4DE"
        intensity={1.5}
        distance={8}
        decay={2}
      />

      {/* Ground bounce — warm subtle */}
      <pointLight
        position={[0, -1.5, 0]}
        color="#1A1208"
        intensity={1}
        distance={5}
        decay={2}
      />
    </>
  );
}

/**
 * Ground plane with grid lines — engineering floor aesthetic.
 */
function GroundPlane() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Infinite grid */}
      <Grid
        position={[0, 0, 0]}
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={0.3}
        cellColor="#1A1614"
        sectionSize={2}
        sectionThickness={0.5}
        sectionColor="#2A2218"
        fadeDistance={18}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid
      />
    </group>
  );
}

/**
 * Master automotive scene — ONE reusable R3F canvas.
 * Camera is GSAP/scroll driven. All 3D objects live here.
 */
export default function AutomotiveScene({ scrollProgress = 0, mouseRef }) {
  return (
    <>
      <SceneLighting />
      <GroundPlane />
      <SceneCamera mouseRef={mouseRef} />
      
      {/* Essential for realistic car models (PBR materials) to reflect something! */}
      <Environment preset="studio" environmentIntensity={1.5} />

      {/* Stars in far background */}
      <Stars
        radius={40}
        depth={30}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Real Vehicle GLB — Moved to center focus */}
      <Suspense fallback={null}>
        <RealCarModel
          position={[0, -0.2, 0]}
          rotation={[0, Math.PI * 0.15, 0]}
          scale={1}
        />
      </Suspense>
    </>
  );
}


