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
        updateDisplay();
        enableBoard();
        document.getElementById('status').textContent = "Player 1's turn (X)";
    };
    
    const updateDisplay = () => {
        const board = gameBoard.getBoard();
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = board[i] === '-' ? '' : board[i];
        }
    };

    const makeMove = (index) => {
        const currentSign = currentPlayer === 1 ? player1.getSign() : player2.getSign();
        if (gameBoard.setTile(index, currentSign)) {
            updateDisplay();
            if (checkWin()) {
                document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
                disableBoard();
            } else if (checkDraw()) {
                document.getElementById('status').textContent = "It's a draw!";
                disableBoard();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                document.getElementById('status').textContent = `Player ${currentPlayer}'s turn (${currentPlayer === 1 ? 'X' : 'O'})`;
            }
        }
    };



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

    const disableBoard = () => {
        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.removeEventListener('click', cellClickHandler);
        }
    };

    const enableBoard = () => {
        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.removeEventListener('click', cellClickHandler);
            cell.addEventListener('click', cellClickHandler);
        }
    };

    const cellClickHandler = function() {
        const index = this.dataset.index;
        makeMove(parseInt(index));
    };

    const initBoard = () => {
        const board = document.getElementById('board');
        board.innerHTML = ''; 
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            board.appendChild(cell);
        }
        enableBoard();
    };

    return { gameStart, initBoard};

})();

//this will be 'X' or 'O'
const Player = (sign) => {
    const getSign = () => sign;
    return { getSign };
};

window.onload = () => {
    displayController.initBoard();
    displayController.gameStart();
    document.getElementById('restartButton').addEventListener('click', () => {
        displayController.initBoard();
        displayController.gameStart();
    });
};