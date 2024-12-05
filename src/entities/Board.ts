import { Cell } from './Cell';
import { Player } from './Player';

export class Board {
  readonly ROW_SIZE = 3;
  readonly COLUMN_SIZE = 3;
  private _cells: Cell[][] = [];

  constructor() {
    this._initialize();
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

  public makeMove(player: Player, row: number, column: number) {
    if (
      row < 0 ||
      row >= this.ROW_SIZE ||
      column < 0 ||
      column >= this.COLUMN_SIZE
    ) {
      throw new Error('Invalid move');
    }

    this._cells[row][column].sign = player.sign;
  }
}
