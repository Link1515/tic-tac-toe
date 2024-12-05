import { Sign } from '../enum/Sign';

export class Cell {
  private _sign: Sign | null = null;
  private _row: number;
  private _column: number;

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
  }

  get sign(): Sign | null {
    return this._sign;
  }

  set sign(sign: Sign) {
    if (this._sign !== null) {
      throw new Error('Cell already has a sign');
    }
    this._sign = sign;
  }

  get row(): number {
    return this._row;
  }

  get column(): number {
    return this._column;
  }
}
