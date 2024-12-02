export interface VehicleState {
  depth: number;
  speed: number;
  oxygen: number;
  battery: number;
  rotation: number;
  isFirstPerson: boolean;
  dive: () => void;
  surface: () => void;
  accelerate: () => void;
  decelerate: () => void;
  turnLeft: () => void;
  turnRight: () => void;
  toggleView: () => void;
}