import { Canvas } from '@react-three/fiber';
import { Environment } from './components/Environment';
import { Controls } from './components/Controls';
import { CameraControls } from './components/CameraControls';
import { CockpitOverlay } from './components/CockpitOverlay';
import { Submarine } from './components/Submarine';
import { OrbitControls, Stars } from '@react-three/drei';

function App() {
  return (
    <div className="h-screen w-screen bg-black relative">
      <Canvas shadows>
        {/* Add ambient light for general illumination */}
        <ambientLight intensity={0.5} />
        
        {/* Add a directional light to simulate sunlight */}
        <directionalLight 
          castShadow 
          position={[10, 10, 5]} 
          intensity={1.5} 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Add stars to the background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        {/* Add orbit controls for better interactivity */}
        <OrbitControls />
        
        <CameraControls />
        <Environment />
        <Submarine />
      </Canvas>
      <CockpitOverlay />
      <Controls />
    </div>
  );
}

export default App;