import { Sign } from '../enum/Sign';

export class Cell {
  private _sign: Sign | null = null;

  get sign(): Sign | null {
    return this._sign;
  }

  set sign(sign: Sign) {
    if (this._sign !== null) {
      throw new Error('Cell already has a sign');
    }
    this._sign = sign;
  }
}
