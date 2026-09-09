
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
  };
  return { render };  
})();

const createPlayer = (name, symbol) => {
  return { name, symbol };
}

const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1-name").value, "X"),
      createPlayer(document.querySelector("#player2-name").value, "O")
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.render();
  }
  return { start };
})();

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  game.start()
});
