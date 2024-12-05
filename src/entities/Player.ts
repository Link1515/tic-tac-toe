import { Sign } from '../enum/Sign';

export class Player {
  private _name: string;
  private _sign: Sign;

  constructor(name: string, sign: Sign) {
    this._name = name;
    this._sign = sign;
  }

  get name(): string {
    return this._name;
  }

  get sign(): Sign {
    return this._sign;
  }
}
