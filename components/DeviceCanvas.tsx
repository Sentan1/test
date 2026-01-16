import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

// Use type-safe aliases for Three.js intrinsic elements to resolve JSX namespace errors
const ThreeGroup = 'group' as any;
const ThreeMesh = 'mesh' as any;
const ThreeMeshPhysicalMaterial = 'meshPhysicalMaterial' as any;
const ThreeMeshStandardMaterial = 'meshStandardMaterial' as any;
const ThreeCylinderGeometry = 'cylinderGeometry' as any;
const ThreePlaneGeometry = 'planeGeometry' as any;
const ThreeCircleGeometry = 'circleGeometry' as any;
const ThreeAmbientLight = 'ambientLight' as any;
const ThreeSpotLight = 'spotLight' as any;
const ThreePointLight = 'pointLight' as any;

const BreathalyserModel = () => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <ThreeGroup ref={meshRef}>
      <RoundedBox args={[1.2, 2.5, 0.4]} radius={0.1} smoothness={4}>
        <ThreeMeshPhysicalMaterial 
          color="#1A1A1A" 
          roughness={0.2} 
          metalness={0.8} 
          emissive="#000000"
        />
      </RoundedBox>

      <ThreeMesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ThreeCylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <ThreeMeshStandardMaterial color="#A4D266" roughness={0.1} />
      </ThreeMesh>

      <ThreeMesh position={[0, 0.5, 0.21]}>
        <ThreePlaneGeometry args={[0.9, 0.7]} />
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
      </ThreeMesh>

      <ThreeMesh position={[0, -0.2, 0.21]}>
        <ThreeCircleGeometry args={[0.03, 32]} />
        <ThreeMeshStandardMaterial 
          color="#A4D266" 
          emissive="#A4D266" 
          emissiveIntensity={4} 
        />
      </ThreeMesh>

      <ThreeMesh position={[0, -0.8, 0.21]}>
        <ThreePlaneGeometry args={[0.4, 0.1]} />
        <ThreeMeshStandardMaterial color="#444" transparent opacity={0.5} />
      </ThreeMesh>
    </ThreeGroup>
  );
};

export const DeviceCanvas: React.FC = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <ThreeAmbientLight intensity={0.5} />
        <ThreeSpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
        <ThreePointLight position={[-10, -10, -10]} intensity={2} />
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