import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Use type-safe aliases for Three.js intrinsic elements to resolve JSX namespace errors
const ThreeMesh = 'mesh' as any;
const ThreeSphereGeometry = 'sphereGeometry' as any;
const ThreeMeshStandardMaterial = 'meshStandardMaterial' as any;
const ThreeColor = 'color' as any;
const ThreeAmbientLight = 'ambientLight' as any;
const ThreeSpotLight = 'spotLight' as any;
const ThreeFog = 'fog' as any;

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
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
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

      <ThreeMesh ref={wireframeRef} position={[-5, -2, -4]}>
        <ThreeSphereGeometry args={[2, 32, 32]} />
        <ThreeMeshStandardMaterial 
          color="#A4D266" 
          wireframe 
          transparent 
          opacity={0.15} 
          emissive="#A4D266"
          emissiveIntensity={0.5}
        />
      </ThreeMesh>

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
      <ThreeColor attach="background" args={['#F9F8F4']} />
      <ThreeAmbientLight intensity={0.8} />
      <ThreeSpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <ThreeFog attach="fog" args={['#F9F8F4', 5, 25]} />
      <DataCloud />
      <AnimatedShapes />
    </Canvas>
  );
};