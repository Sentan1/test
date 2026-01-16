
import React, { useRef } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  RoundedBox, 
  Float, 
  MeshTransmissionMaterial, 
  Environment, 
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

// Correct React 19 JSX extension for Three.js elements
// We extend both React.JSX and the global JSX namespace to ensure compatibility with various compiler settings for React 19
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const BreathalyserModel = () => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[1.2, 2.5, 0.4]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial 
          color="#1A1A1A" 
          roughness={0.2} 
          metalness={0.8} 
          emissive="#000000"
        />
      </RoundedBox>

      <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#A4D266" roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.5, 0.21]}>
        <planeGeometry args={[0.9, 0.7]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.5} 
          chromaticAberration={0.02} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          color="#111"
        />
      </mesh>

      <mesh position={[0, -0.2, 0.21]}>
        <circleGeometry args={[0.03, 32]} />
        <meshStandardMaterial 
          color="#A4D266" 
          emissive="#A4D266" 
          emissiveIntensity={4} 
        />
      </mesh>

      <mesh position={[0, -0.8, 0.21]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial color="#444" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export const DeviceCanvas: React.FC = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={2} />
        <Environment preset="city" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <BreathalyserModel />
        </Float>

        <ContactShadows 
          position={[0, -1.8, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
    </div>
  );
};
