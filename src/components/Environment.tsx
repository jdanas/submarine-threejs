import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVehicleStore } from '../store/vehicleStore';
import * as THREE from 'three';
import { Fish } from './Fish';

export const Environment = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { depth, speed } = useVehicleStore();

  // Create underwater particle effect
  const particleCount = 1500;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 100;
    particlePositions[i + 1] = (Math.random() - 0.5) * 100;
    particlePositions[i + 2] = (Math.random() - 0.5) * 100;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.position.z += speed * delta;
      if (particlesRef.current.position.z > 50) {
        particlesRef.current.position.z = -50;
      }
    }
  });

  return (
    <>
      {/* Scene background */}
      <color attach="background" args={['#001440']} />
      
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light simulating sun */}
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={Math.max(0.1, 1 - (depth / 500))} 
        color="#0055aa"
      />
      
      {/* Underwater fog */}
      <fog attach="fog" args={['#001440', 1, Math.max(5, 20 - depth/20)]} />
      
      {/* Underwater particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.03} 
          color="#ffffff" 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Fish schools */}
      {Array.from({ length: 20 }).map((_, index) => (
        <Fish 
          key={index}
          position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 60
          ]}
          color="#4a9fff"
          speed={Math.random() * 0.5 + 0.5}
          size={Math.random() * 0.5 + 0.5}
        />
      ))}
    </>
  );
};