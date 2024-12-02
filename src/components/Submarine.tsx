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
  
  // Create direction vector for movement
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Calculate movement direction
      const submarineRotation = new THREE.Euler(0, rotation, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .applyEuler(submarineRotation)
        .multiplyScalar(speed * delta);

      // Update submarine position
      groupRef.current.position.add(direction);
      groupRef.current.position.y = -depth / 50;
      groupRef.current.rotation.y = rotation;

      // Update camera position for top-down view
      state.camera.position.set(
        groupRef.current.position.x,
        groupRef.current.position.y + 10, // Height above submarine
        groupRef.current.position.z + 5 // Distance behind submarine
      );

      // Make camera look at submarine
      state.camera.lookAt(groupRef.current.position);
      
      // Tilt camera down slightly for better view
      state.camera.rotation.x = -Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
};