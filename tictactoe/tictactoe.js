//game board for tic tac toe, only one is needed, so IIFE
const gameBoard = (function() {
    const board = [ '-', '-', '-',
                    '-', '-', '-',
                    '-', '-', '-' ];
    return {board}
})();

console.log(gameBoard.board)
console.log(gameBoard.board.length)
//dictates turn logic, win conditions, rules, etc, also only one is needed
//while game is not over, if player 1: ...  if player 2: ...
//needs to take in gameBoard, and players as parameters, how?

const gameController = (function() {
    // const winCon = 
})();
//player object

function createPlayer () {

}