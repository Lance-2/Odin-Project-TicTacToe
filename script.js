const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const placeMark = (index, symbol) => {
    if (board[index] !== "") {
      return false; // Square already occupied
    } else {
      board[index] = symbol;

      return true;
    }
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning symbol
      }
    }

    return null; // No winner
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, placeMark, checkWin, resetBoard };
})();

const createPlayer = (name, symbol) => {
  return { name, symbol };
};
const displayController = (() => {
  const render = () => {
    let boardHTML = "";
    const board = gameBoard.getBoard();
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.addEventListener("click", game.handleClick);
    });
    document.querySelector("#message").textContent = `Player ${game.getCurrentPlayer().name}'s turn`;
  };

  return { render };
})();
const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver = false;

  const getCurrentPlayer = () => players[currentPlayerIndex];
  const start = () => {
    gameOver = false;
    players = [
      createPlayer(document.querySelector("#player1-name").value, "X"),
      createPlayer(document.querySelector("#player2-name").value, "O"),
    ];
    currentPlayerIndex = 0;
    displayController.render();
  };
  const switchPlayerTurn = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (gameOver) {
      return;
    }
    if (gameBoard.placeMark(index, players[currentPlayerIndex].symbol)) {
      const winner = gameBoard.checkWin();
      if (winner) {
        gameOver = true;
        document.querySelector("#result-display").textContent =
          `Player ${players[currentPlayerIndex].name} wins!`;
      } else if (gameBoard.getBoard().every((square) => square !== "")) {
        document.querySelector("#result-display").textContent = "It's a draw!";
      } else {
        switchPlayerTurn();
      }
      displayController.render();
    }
  };
  return { start, handleClick, getCurrentPlayer };
})();

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  game.start();
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  gameBoard.resetBoard();
  document.querySelector("#result-display").textContent = "";
  document.querySelector("#message").textContent = "";
  game.start();
});
