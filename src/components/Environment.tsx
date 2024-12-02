import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVehicleStore } from '../store/vehicleStore';
import * as THREE from 'three';
import { Fish } from './Fish';
import React from 'react';

export const Environment = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { depth, speed } = useVehicleStore();

  // Increase particle count
  const particleCount = 3000; // Doubled from 1500
  const particlePositions = new Float32Array(particleCount * 3);
  
  // Spread particles across a larger area
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 200;    // Wider spread
    particlePositions[i + 1] = (Math.random() - 0.5) * 100; // Higher spread
    particlePositions[i + 2] = (Math.random() - 0.5) * 200; // Deeper spread
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.position.z += speed * delta;
      if (particlesRef.current.position.z > 100) {
        particlesRef.current.position.z = -100;
      }
    }
  });

  return (
    <>
      <color attach="background" args={['#001440']} />
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={Math.max(0.1, 1 - (depth / 500))} 
        color="#0055aa"
      />
      <fog attach="fog" args={['#001440', 1, Math.max(5, 20 - depth/20)]} />
      
      {/* Particles */}
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
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Multiple fish schools with different characteristics */}
      {/* Small fish school */}
      {Array.from({ length: 30 }).map((_, index) => (
        <Fish 
          key={`small-${index}`}
          position={[
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 100
          ]}
          color="#4a9fff"
          speed={Math.random() * 0.3 + 0.2}
          size={Math.random() * 0.3 + 0.2}
        />
      ))}

      {/* Medium fish school */}
      {Array.from({ length: 20 }).map((_, index) => (
        <Fish 
          key={`medium-${index}`}
          position={[
            (Math.random() - 0.5) * 120,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 120
          ]}
          color="#00ff87"
          speed={Math.random() * 0.4 + 0.3}
          size={Math.random() * 0.5 + 0.5}
        />
      ))}

      {/* Large fish school */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Fish 
          key={`large-${index}`}
          position={[
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 70,
            (Math.random() - 0.5) * 150
          ]}
          color="#ff6b6b"
          speed={Math.random() * 0.3 + 0.2}
          size={Math.random() * 0.7 + 0.8}
        />
      ))}
    </>
  );
};