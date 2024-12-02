import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useVehicleStore } from '../store/vehicleStore';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import React from 'react';

export const Submarine = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { depth, speed, rotation } = useVehicleStore();
  const obj = useLoader(OBJLoader, 'public/models/submarine.obj');

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Update submarine position
      groupRef.current.position.y = -depth / 50;
      groupRef.current.position.z += speed * delta * 0.1;
      groupRef.current.rotation.y = rotation;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
};