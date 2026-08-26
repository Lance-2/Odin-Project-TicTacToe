const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#game-status");
const restartButton = document.querySelector("#restart-button");

let currentPlayer = "X";

function handleCellClick(event) {
  const cell = event.currentTarget;

  if (cell.textContent) {
    return;
  }

  cell.textContent = currentPlayer;
  cell.setAttribute("aria-label", `${currentPlayer} played here`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.setAttribute(
      "aria-label",
      `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`,
    );
  });

  currentPlayer = "X";
  status.textContent = "Player X's turn";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
