import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useVehicleStore } from '../store/vehicleStore';

export const CameraControls = () => {
  const { camera } = useThree();
  const { depth, speed, rotation } = useVehicleStore();
  const submarineRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (submarineRef.current) {
      // Update camera position to follow the submarine
      camera.position.copy(submarineRef.current.position);
      camera.position.z += 5; // Adjust the distance from the submarine
      camera.lookAt(submarineRef.current.position);
    }
  });

  return <group ref={submarineRef} />;
};