import { Sign } from '../enum/Sign';
import { Board } from './Board';
import { Cell } from './Cell';
import { Player } from './Player';

export class TicTacToe {
  private _board: Board = new Board();
  private _playerX: Player;
  private _playerO: Player;
  private _currentPlayer: Player;
  private _winner: Player | null = null;
  private _isDraw: boolean = false;

  constructor(playerX: string, playerO: string) {
    this._playerX = new Player(playerX, Sign.X);
    this._playerO = new Player(playerO, Sign.O);
    this._currentPlayer = this._playerX;
  }

  get board(): Cell[][] {
    return this._board.cells;
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  get winner(): Player | null {
    return this._winner;
  }

  get isDraw(): boolean {
    return this._isDraw;
  }

  public makeMove(row: number, column: number) {
    if (this._gameIsOver()) {
      throw new Error('Game is over. Please start a new game.');
    }

    this._board.fillCell(this._currentPlayer.sign, row, column);

    this._winner = this._checkWinner();
    if (this._winner) return;

    this._isDraw = this._board.isFull();
    if (this._isDraw) return;

    this._togglePlayer();
  }

  private _gameIsOver() {
    return this._winner || this._isDraw;
  }

  public gameIsOver() {
    return this._gameIsOver();
  }

  private _checkWinner() {
    const winnerSign = this._board.checkWinner();
    if (winnerSign && this._currentPlayer.sign === winnerSign) {
      return this.currentPlayer;
    }
    return null;
  }

  private _togglePlayer() {
    this._currentPlayer =
      this._currentPlayer === this._playerX ? this._playerO : this._playerX;
  }
}
