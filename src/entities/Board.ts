import { Sign } from '../enum/Sign';
import { Cell } from './Cell';

export class Board {
  readonly ROW_SIZE = 3;
  readonly COLUMN_SIZE = 3;
  private _cells: Cell[][] = [];

  constructor() {
    this._initialize();
  }

  get cells(): Cell[][] {
    return this._cells;
  }

  private _initialize() {
    this._cells = [];
    for (let i = 0; i < this.ROW_SIZE; i++) {
      this._cells[i] = [];
      for (let j = 0; j < this.COLUMN_SIZE; j++) {
        this._cells[i][j] = new Cell(i, j);
      }
    }
  }

  public fillCell(sign: Sign, row: number, column: number) {
    if (
      row < 0 ||
      row >= this.ROW_SIZE ||
      column < 0 ||
      column >= this.COLUMN_SIZE
    ) {
      throw new Error('Invalid move');
    }

    this._cells[row][column].sign = sign;
  }

  public checkWinner(): Sign | null {
    const checks = [
      this._checkWinByRows.bind(this),
      this._checkWinByColumns.bind(this),
      this._checkWinByDiagonals.bind(this)
    ];

    for (const check of checks) {
      const winner = check();
      if (winner) {
        return winner;
      }
    }

    return null;
  }

  private _checkWinByRows(): Sign | null {
    for (let i = 0; i < this.ROW_SIZE; i++) {
      if (
        this._cells[i][0].sign === this._cells[i][1].sign &&
        this._cells[i][0].sign === this._cells[i][2].sign
      ) {
        return this._cells[i][0].sign;
      }
    }

    return null;
  }

  private _checkWinByColumns(): Sign | null {
    for (let i = 0; i < this.COLUMN_SIZE; i++) {
      if (
        this._cells[0][i].sign === this._cells[1][i].sign &&
        this._cells[0][i].sign === this._cells[2][i].sign
      ) {
        return this._cells[0][i].sign;
      }
    }

    return null;
  }

  private _checkWinByDiagonals(): Sign | null {
    if (
      this._cells[0][0].sign === this._cells[1][1].sign &&
      this._cells[0][0].sign === this._cells[2][2].sign
    ) {
      return this._cells[0][0].sign;
    }

    if (
      this._cells[0][2].sign === this._cells[1][1].sign &&
      this._cells[0][2].sign === this._cells[2][0].sign
    ) {
      return this._cells[0][2].sign;
    }

    return null;
  }

  public isFull(): boolean {
    for (let i = 0; i < this.ROW_SIZE; i++) {
      for (let j = 0; j < this.COLUMN_SIZE; j++) {
        if (this._cells[i][j].sign === null) {
          return false;
        }
      }
    }

    return true;
  }
}
