import React from 'react';
import { useVehicleStore } from '../store/vehicleStore';

export const Dashboard: React.FC = () => {
  const { 
    depth, 
    speed, 
    oxygen, 
    battery, 
    isFirstPerson,
    dive, 
    surface, 
    accelerate, 
    decelerate,
    toggleView 
  } = useVehicleStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* HUD-style overlay */}
      <div className="absolute top-4 left-4 right-4 grid grid-cols-4 gap-4 bg-black/40 backdrop-blur-sm p-4 rounded-lg text-white">
        <div className="text-center">
          <div className="text-cyan-300 text-sm">DEPTH</div>
          <div className="text-2xl font-bold font-mono">{depth}m</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-300 text-sm">SPEED</div>
          <div className="text-2xl font-bold font-mono">{speed}kts</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-300 text-sm">O₂</div>
          <div className="text-2xl font-bold font-mono">{oxygen.toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-300 text-sm">BATTERY</div>
          <div className="text-2xl font-bold font-mono">{battery.toFixed(1)}%</div>
        </div>
      </div>
      
      {/* Control panel */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4 pointer-events-auto">
        <div className="col-span-3">
          <button
            onClick={toggleView}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg font-semibold"
          >
            {isFirstPerson ? "Switch to External View" : "Switch to Cockpit View"}
          </button>
        </div>
        <button
          onClick={surface}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold"
        >
          ↑ Surface
        </button>
        <button
          onClick={accelerate}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-semibold"
        >
          + Speed Up
        </button>
        <button
          onClick={decelerate}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-semibold"
        >
          - Slow Down
        </button>
        <button
          onClick={dive}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold"
        >
          ↓ Dive
        </button>
      </div>
    </div>
  );
};