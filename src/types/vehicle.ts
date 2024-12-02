export interface VehicleState {
  depth: number;
  speed: number;
  oxygen: number;
  battery: number;
  rotation: number;
  isFirstPerson: boolean;
  movementInput: { forward: number; side: number };
  dive: () => void;
  surface: () => void;
  accelerate: () => void;
  decelerate: () => void;
  turnLeft: () => void;
  turnRight: () => void;
  toggleView: () => void;
}