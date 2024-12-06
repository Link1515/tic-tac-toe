import { TicTacToe } from './TicTacToe';

export class TicTacToeView {
  private ticTacToe: TicTacToe;
  private ticTacToeEl: HTMLElement;

  constructor(
    ticTacToeEl: string | HTMLElement,
    { playerX, playerO }: { playerX: string; playerO: string }
  ) {
    this.ticTacToe = new TicTacToe(playerX, playerO);

    this.ticTacToeEl =
      typeof ticTacToeEl === 'string'
        ? document.querySelector(ticTacToeEl)!
        : ticTacToeEl;
    if (!this.ticTacToeEl) {
      throw new Error('Tic Tac Toe Element not found');
    }

    this.refreshBoard();

    this.ticTacToeEl.addEventListener('click', event => {
      const target = event.target as HTMLDivElement;
      if (!target.classList.contains('cell')) return;

      const row = parseInt(target.dataset.row!);
      const column = parseInt(target.dataset.column!);
      this.ticTacToe.makeMove(row, column);

      this.refreshBoard();
      this.checkGameOver();
    });
  }

  private refreshBoard() {
    const board = this.ticTacToe.board;
    this.ticTacToeEl.innerHTML = '';
    for (let row = 0; row < board.length; row++) {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      for (let column = 0; column < board[row].length; column++) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.dataset.row = row.toString();
        cellEl.dataset.column = column.toString();
        const sign = board[row][column].sign ?? '';
        cellEl.textContent = sign;
        rowEl.appendChild(cellEl);
      }
      this.ticTacToeEl.appendChild(rowEl);
    }
  }

  private checkGameOver() {
    if (!this.ticTacToe.gameIsOver()) return;

    if (this.ticTacToe.isDraw) {
      alert('Game is a draw.');
    } else {
      alert(`Game is over. Winner: ${this.ticTacToe.winner?.name}`);
    }
  }
}
