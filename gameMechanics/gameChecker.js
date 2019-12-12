const { writeInFile } = require('./../persistence/fileWriter.js');

function gameCheck(gameData) {
    const movements = gameData.movements;

    if (checkLines(movements) == 'X' || checkCollumns(movements) == 'X' || checkDiagonals(movements) == 'X') {
        gameData.winner = "X";
        gameData.gameState = false;
        writeInFile(gameData);
    } else if (checkLines(movements) == 'O' || checkCollumns(movements) == 'O' || checkDiagonals(movements) == 'O') {
        gameData.winner = "O";
        gameData.gameState = false;
        writeInFile(gameData);
    } else if (movements.length == 9 && gameData.winner == null) {
        gameData.winner = "Draw";
        gameData.gameState = false;
        writeInFile(gameData);
    }

    return !gameData.gameState;
};


function checkLines(movements) {
    let countX;
    let countO;

    for (let i = 0; i < 3; i++) {
        countX = 0;
        countO = 0;
        for (let move of movements) {
            if (move.positionY == i && move.player == 'X') {
                countX++;
            } else if (move.positionY == i && move.player == 'O') {
                countO++;
            }

            if (countX == 3)
                return 'X';
            if (countO == 3)
                return 'O';
        }
    }


    return null;
};

function checkCollumns(movements) {
    let countX;
    let countO;

    for (let i = 0; i < 3; i++) {
        countX = 0;
        countO = 0;
        for (let move of movements) {
            if (move.positionX == i && move.player == 'X') {
                countX++;
            } else if (move.positionX == i && move.player == 'O') {
                countO++;
            }

            if (countX == 3)
                return 'X';
            if (countO == 3)
                return 'O';
        }
    }

    return null;
};

function checkDiagonals(movements) {
    let countX = 0;
    let countO = 0;

    //Check the main diagonal
    for (let i = 0; i < 3; i++) {
        for (let move of movements) {
            if (move.positionX == i && move.positionY == i && move.player == 'X') {
                countX++;
            } else if (move.positionX == i && move.positionY == i && move.player == 'O') {
                countO++;
            }

            if (countX == 3)
                return 'X';
            if (countO == 3)
                return 'O';
        }
    }
   
    //Check the secondary diagonal
    countX = 0;
    countO = 0;
    for (let i = 0; i < 3; i++) {
        for (let move of movements) {
            if (move.positionX == i && move.positionY == (2-i) && move.player == 'X') {
                countX++;
            } else if (move.positionX == i && move.positionY == (2-i) && move.player == 'O') {
                countO++;
            }

            if (countX == 3)
                return 'X';
            if (countO == 3)
                return 'O';
        }
    }

    return null;
};

module.exports = { gameCheck }