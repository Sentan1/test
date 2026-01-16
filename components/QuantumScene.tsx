
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Robustly extend the global JSX namespace to include Three.js intrinsic elements provided by @react-three/fiber.
// In React 19, augmenting the React.JSX namespace ensures compatibility with the latest JSX transform.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

const DataCloud = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#A4D266"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const AnimatedShapes = () => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.3;
      sphereRef.current.rotation.z = t * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.2;
      wireframeRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1.8, 64, 64]} position={[4, 1, -3]}>
          <MeshDistortMaterial
            color="#A4D266"
            speed={2}
            distort={0.3}
            radius={1}
            opacity={0.1}
            transparent
          />
        </Sphere>
      </Float>

      {/* Scanning Wireframe Sphere */}
      <mesh ref={wireframeRef} position={[-5, -2, -4]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#A4D266" 
          wireframe 
          transparent 
          opacity={0.15} 
          emissive="#A4D266"
          emissiveIntensity={0.5}
        />
      </mesh>

      <Grid
        infiniteGrid
        fadeDistance={30}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#A4D266"
        cellColor="#222"
        position={[0, -4, 0]}
      />
    </>
  );
};

export const QuantumScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={['#F9F8F4']} />
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <fog attach="fog" args={['#F9F8F4', 5, 25]} />
      <DataCloud />
      <AnimatedShapes />
    </Canvas>
  );
};
