import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FishProps {
  position: [number, number, number];
  color?: string;
  speed?: number;
  size?: number;
}

export const Fish: React.FC<FishProps> = ({ 
  position, 
  color = '#4a9fff', 
  speed = 1,
  size = 1 
}) => {
  const fishRef = useRef<THREE.Group>(null);
  const startPosition = useRef(position);
  const time = useRef(Math.random() * 100);

  useFrame((state) => {
    if (fishRef.current) {
      time.current += state.clock.deltaTime * speed;
      
      // More natural swimming motion
      const x = startPosition.current[0] + Math.sin(time.current) * 2;
      const y = startPosition.current[1] + Math.cos(time.current * 0.5) * 0.5;
      const z = startPosition.current[2] + Math.sin(time.current * 0.3) * 2;
      
      fishRef.current.position.set(x, y, z);
      fishRef.current.rotation.y = Math.sin(time.current) * 0.2 - Math.PI / 2;
      fishRef.current.rotation.x = Math.cos(time.current * 0.5) * 0.1;
    }
  });

  return (
    <group ref={fishRef} scale={size}>
      {/* Fish body */}
      <mesh>
        <coneGeometry args={[0.2, 1, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Tail fin */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Side fins */}
      {[-0.1, 0.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, y > 0 ? -0.5 : 0.5]}>
          <planeGeometry args={[0.2, 0.1]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};