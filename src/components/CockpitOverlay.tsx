import React from 'react';
import { useVehicleStore } from '../store/vehicleStore';

export const CockpitOverlay: React.FC = () => {
  const { depth, speed, oxygen, battery } = useVehicleStore();

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Cockpit frame */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 border-[100px] border-black opacity-80" />
        <div className="absolute inset-0 border-[98px] border-zinc-900 opacity-70" />
        <div className="absolute inset-[98px] border-2 border-zinc-800/50" />
      </div>
      
      {/* HUD Elements */}
      <div className="absolute inset-0 p-24">
        {/* Top HUD */}
        <div className="flex justify-between items-start text-cyan-500/80 font-mono">
          <div className="space-y-2">
            <div className="text-sm">DEPTH</div>
            <div className="text-3xl font-bold">{depth}m</div>
          </div>
          <div className="space-y-2 text-right">
            <div className="text-sm">SPEED</div>
            <div className="text-3xl font-bold">{speed}kts</div>
          </div>
        </div>

        {/* Center crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-32 h-32">
            <div className="absolute w-full h-px bg-red-500/40 top-1/2" />
            <div className="absolute h-full w-px bg-red-500/40 left-1/2" />
            <div className="absolute w-6 h-6 border-2 border-red-500/40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="absolute w-2 h-2 bg-red-500/40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </div>

        {/* Bottom status indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded px-4 py-2">
            <div className="text-sm text-cyan-400">O₂</div>
            <div className="text-2xl font-bold text-cyan-500">{oxygen.toFixed(1)}%</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded px-4 py-2">
            <div className="text-sm text-green-400">POWER</div>
            <div className="text-2xl font-bold text-green-500">{battery.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Glass reflections */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/5 via-transparent to-blue-200/5" />
      </div>
    </div>
  );
};