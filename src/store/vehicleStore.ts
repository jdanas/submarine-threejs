import { create } from 'zustand';
import { VehicleState } from '../types/vehicle';

export const useVehicleStore = create<VehicleState>((set) => ({
  depth: 0,
  speed: 0,
  oxygen: 100,
  battery: 100,
  rotation: 0,
  isFirstPerson: true,
  movementInput: { forward: 0, side: 0 }, // Add movement input state

  dive: () => set((state) => ({
    depth: state.depth < 1000 ? state.depth + 5 : state.depth
  })),

  surface: () => set((state) => ({
    depth: state.depth > 0 ? state.depth - 5 : state.depth
  })),

  accelerate: () => set((state) => ({
    speed: state.speed < 50 ? state.speed + 2 : state.speed,
    battery: state.battery > 0 ? state.battery - 0.5 : state.battery
  })),

  decelerate: () => set((state) => ({
    speed: state.speed > 0 ? state.speed - 2 : state.speed
  })),

  turnLeft: () => set((state) => ({
    rotation: state.rotation - 0.1
  })),

  turnRight: () => set((state) => ({
    rotation: state.rotation + 0.1
  })),

  toggleView: () => set((state) => ({
    isFirstPerson: !state.isFirstPerson
  })),

  setMovementInput: (forward: number, side: number) => 
    set({ movementInput: { forward, side } })
}));