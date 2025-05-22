class TicTacToe {
  constructor(parentSelector) {
    this.container = document.querySelector(parentSelector);
    this.init();
  }

  init() {
    // state, variables
    this.currentPlayer = "X";
    this.isGameOver = false;
    this.K = 3;

    // rendering
    this.render();
  }

  // utils
  getWinner = () => {
    const cells = Array.from(this.grid.querySelectorAll(".grid__cell"));

    // is any row same
    for (let i = 0; i < this.K; i++) {
      const isRowSame = Array.from({ length: this.K }).every((_, idx) => {
        const cellId = i * this.K + idx;
        return cells[cellId].innerText === this.currentPlayer;
      });

      if (isRowSame) return 1;
    }

    // is any col same
    for (let i = 0; i < this.K; i++) {
      const isColSame = Array.from({ length: this.K }).every((_, idx) => {
        const cellId = idx * this.K + i;
        return cells[cellId].innerText === this.currentPlayer;
      });

      if (isColSame) return 1;
    }

    // are diagonals same
    const isMainDiagonalSame = Array.from({ length: this.K }).every(
      (_, idx) => {
        const cellId = idx * this.K + idx;
        return cells[cellId].innerText === this.currentPlayer;
      }
    );

    if (isMainDiagonalSame) return 1;

    const isAntiDiagonalSame = Array.from({ length: this.K }).every(
      (_, idx) => {
        const cellId = idx * this.K + this.K - 1 - idx;
        return cells[cellId].innerText === this.currentPlayer;
      }
    );

    if (isAntiDiagonalSame) return 1;

    // are all cells filled
    const isGridFull = cells.every((cell) => !!cell.innerText);

    return isGridFull ? -1 : 0;
  };

  // event handlers
  handleMove = (e) => {
    if (!e.target.classList.contains("grid__cell") || this.isGameOver) return;

    const cellId = Number(e.target.dataset.index);
    const cell = this.grid.querySelector(`.grid__cell[data-index="${cellId}"]`);

    if (cell.innerText) return;

    cell.innerText = this.currentPlayer;

    const winner = this.getWinner();

    if (winner == 1 || winner == -1) {
      this.isGameOver = true;

      if (winner === 1) {
        this.renderWinner(this.currentPlayer);
      } else if (winner === -1) {
        this.renderWinner("Draw");
      }
    }

    if (winner === 0) {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
    return;
  };

  // component rendering
  renderWinner(winner) {
    const element = document.createElement("p");
    element.innerText =
      winner === "Draw" ? "Match draw" : `Game over, ${winner} won the match !`;
    this.container.append(element);

    return;
  }

  getCell(cellId) {
    const cell = document.createElement("button");
    cell.setAttribute("class", "grid__cell");
    cell.setAttribute("data-index", cellId);

    return cell;
  }

  getRow(rowId) {
    const row = document.createElement("div");
    row.setAttribute("class", "grid__row");

    const cells = Array.from({ length: this.K }).map((_, idx) =>
      this.getCell(rowId * this.K + idx)
    );

    row.append(...cells);
    return row;
  }

  getGrid() {
    const grid = document.createElement("div");
    grid.setAttribute("class", "grid");

    const rows = Array.from({ length: this.K }).map((_, idx) =>
      this.getRow(idx)
    );

    grid.append(...rows);
    grid.addEventListener("click", this.handleMove);

    return grid;
  }

  render() {
    this.grid = this.getGrid();
    this.container.append(this.grid);
    return;
  }
}

new TicTacToe(".app__content");
