import { Observable } from '@nativescript/core';

export class UnderwaterVehicle extends Observable {
  private _depth: number = 0;
  private _speed: number = 0;
  private _oxygen: number = 100;
  private _battery: number = 100;

  constructor() {
    super();
    this.startEnvironmentUpdates();
  }

  get depth(): number {
    return this._depth;
  }

  get speed(): number {
    return this._speed;
  }

  get oxygen(): number {
    return this._oxygen;
  }

  get battery(): number {
    return this._battery;
  }

  dive() {
    if (this._depth < 1000) {
      this._depth += 5;
      this.notifyPropertyChange('depth', this._depth);
    }
  }

  surface() {
    if (this._depth > 0) {
      this._depth -= 5;
      this.notifyPropertyChange('depth', this._depth);
    }
  }

  accelerate() {
    if (this._speed < 50) {
      this._speed += 2;
      this._battery -= 0.5;
      this.notifyPropertyChange('speed', this._speed);
      this.notifyPropertyChange('battery', this._battery);
    }
  }

  decelerate() {
    if (this._speed > 0) {
      this._speed -= 2;
      this.notifyPropertyChange('speed', this._speed);
    }
  }

  private startEnvironmentUpdates() {
    setInterval(() => {
      // Simulate oxygen consumption
      if (this._oxygen > 0) {
        this._oxygen -= 0.1;
        this.notifyPropertyChange('oxygen', this._oxygen);
      }

      // Simulate battery consumption
      if (this._battery > 0) {
        this._battery -= 0.05;
        this.notifyPropertyChange('battery', this._battery);
      }
    }, 1000);
  }
}