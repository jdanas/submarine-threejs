import { useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useVehicleStore } from '../store/vehicleStore';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

export const Submarine = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { depth, speed, rotation, setMovementInput } = useVehicleStore();
  const obj = useLoader(OBJLoader, 'public/models/submarine.obj');

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setMovementInput(1, 0);
          break;
        case 's':
        case 'arrowdown':
          setMovementInput(-1, 0);
          break;
        case 'a':
        case 'arrowleft':
          setMovementInput(0, -1);
          break;
        case 'd':
        case 'arrowright':
          setMovementInput(0, 1);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'w':
        case 's':
        case 'arrowup':
        case 'arrowdown':
          setMovementInput(0, 0);
          break;
        case 'a':
        case 'd':
        case 'arrowleft':
        case 'arrowright':
          setMovementInput(0, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setMovementInput]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Update submarine position based on movement input
      const forward = new THREE.Vector3(0, 0, -1)
        .applyEuler(new THREE.Euler(0, rotation, 0))
        .multiplyScalar(speed * delta);

      groupRef.current.position.add(forward);
      groupRef.current.position.y = -depth / 50;
      groupRef.current.rotation.y = rotation;

      // Update camera for top-down view
      state.camera.position.set(
        groupRef.current.position.x,
        groupRef.current.position.y + 10,
        groupRef.current.position.z + 5
      );
      state.camera.lookAt(groupRef.current.position);
      state.camera.rotation.x = -Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
};