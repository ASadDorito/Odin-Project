const readline = require('readline');

//game board for tic tac toe, only one is needed, so IIFE
const gameBoard = (function() {
    let board = [ '-', '-', '-',
                    '-', '-', '-',
                    '-', '-', '-' ];
    
    const getBoard = () => [...board];

    const setTile = (index, player) => {
        if (index >= 0 && index < 9 && board[index] === '-') {
            board[index] = player;
            return true;
        }
        return false
    };

    const resetBoard = () => {
        board = [ '-', '-', '-',
                  '-', '-', '-',
                  '-', '-', '-' ];
    };

    return { getBoard, setTile, resetBoard }
})();

//need winCons, gameStart, 
const displayController = (function() {
    let currentPlayer;
    let player1;
    let player2;

    const winCons = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6] 
    ];

    const gameStart = () => {
        //use currentPlayer as toggle, 1 is player 1, 2 is player 2
        currentPlayer = 1;
        player1 = Player('X');
        player2 = Player('O');
        gameBoard.resetBoard();
        console.log("gaming time bruh");
        displayBoard();
        playTurn();
    }
    
    const displayBoard = () => {
        const board = gameBoard.getBoard();
        console.log('\n' +
            ` ${board[0]} | ${board[1]} | ${board[2]} \n` +
            '-----------\n' +
            ` ${board[3]} | ${board[4]} | ${board[5]} \n` +
            '-----------\n' +
            ` ${board[6]} | ${board[7]} | ${board[8]} \n`
        );
    };

    const playTurn = () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Player ${currentPlayer}, enter your move (0-8): `, (answer) => {
            const move = parseInt(answer);
            if (isNaN(move) || move < 0 || move > 8) {
                console.log("Invalid move. Please enter a number between 0 and 8.");
                rl.close();
                playTurn();
            } else {
                rl.close();
                makeMove(move);
            }
        });
    };

    const makeMove = (index) => {
        const currentSign = currentPlayer === 1 ? player1.getSign() : player2.getSign();
        if (gameBoard.setTile(index, currentSign)) {
            displayBoard();
            if (checkWin()) {
                console.log(`Player ${currentPlayer} wins!`);
                askForNewGame();
            } else if (checkDraw()) {
                console.log("It's a draw!");
                askForNewGame();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                playTurn();
            }
        } else {
            console.log("That spot is already taken. Try again.");
            playTurn();
        }
    };

    const askForNewGame = () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Do you want to play again? (yes/no): ", (answer) => {
            rl.close();
            if (answer.toLowerCase() === 'yes') {
                gameStart();
            } else {
                console.log("Thanks for playing!");
            }
        });
    };

    // const updateDisplay = () => {
    //     const board = gameBoard.getBoard();
    // };

    // const makeMove = (index) => {
    //     //turn order
    //     const currentSign = currentPlayer  === 1 ? player1.getSign() : player2.getSign();
    //     if (gameBoard.setTile(index, currentSign)) {
    //         if (checkWin()) {
    //             // Handle win condition
    //             console.log(`Player ${currentPlayer} wins!`);
    //         } else if (checkDraw()) {
    //             // Handle draw condition
    //             console.log("It's a draw!");
    //         } else {
    //             currentPlayer = currentPlayer === 1 ? 2 : 1;
    //             updateDisplay();
    //         }
    //     }
    // };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        return winCons.some(condition => 
            board[condition[0]] !== '-' &&
            board[condition[0]] === board[condition[1]] && 
            board[condition[1]] === board[condition[2]]
        );
    };

    const checkDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== '-');
    };
    return {gameStart};
    // return { gameStart, makeMove };

})();

//this will be 'X' or 'O'
const Player = (sign) => {
    const getSign = () => sign;
    return { getSign };
};

displayController.gameStart();