import React from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Gauge, Battery, Wind } from 'lucide-react';

export const Controls = () => {
  const { depth, speed, oxygen, battery, dive, surface, accelerate, decelerate, turnLeft, turnRight } = useVehicleStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-lg rounded-t-2xl" />
        
        {/* Controls content */}
        <div className="relative grid grid-cols-3 gap-6 p-6">
          {/* Left section - Depth control */}
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-medium">DEPTH</span>
                </div>
                <span className="text-2xl font-bold text-white font-mono">{depth}m</span>
              </div>
              <Slider
                value={[depth]}
                max={1000}
                step={5}
                className="w-full"
                onValueChange={(value) => {
                  if (value[0] > depth) dive();
                  if (value[0] < depth) surface();
                }}
              />
            </div>
          </div>

          {/* Middle section - Direction controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div />
              <Button
                variant="outline"
                size="lg"
                onClick={accelerate}
                className="bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400"
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
              <div />
              <Button
                variant="outline"
                size="lg"
                onClick={turnLeft}
                className="bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={decelerate}
                className="bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={turnRight}
                className="bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Right section - Speed control */}
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-medium">SPEED</span>
                </div>
                <span className="text-2xl font-bold text-white font-mono">{speed}kts</span>
              </div>
              <Slider
                value={[speed]}
                max={50}
                step={2}
                className="w-full"
                onValueChange={(value) => {
                  if (value[0] > speed) accelerate();
                  if (value[0] < speed) decelerate();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};