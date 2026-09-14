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

  const render = () => {
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.addEventListener("click", game.handleClick);
    });
  };

  return { render, getBoard, placeMark };
})();

const createPlayer = (name, symbol) => {
  return { name, symbol };
};

const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1-name").value, "X"),
      createPlayer(document.querySelector("#player2-name").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.render();
  };
  const switchPlayerTurn = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (gameBoard.placeMark(index, players[currentPlayerIndex].symbol)) {
      switchPlayerTurn();
      gameBoard.render();
    }
  };
  return { start, handleClick };
})();

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  game.start();
});
