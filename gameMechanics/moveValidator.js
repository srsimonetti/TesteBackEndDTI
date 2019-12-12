//Check if it's the player's turn
function validateMove(gameData, movement) {
    const gameMovements = gameData.movements;
    const gameFirstPlayer = gameData.firstPlayer;

    if (checkPositionValidity(gameMovements, movement)) {
        if (gameMovements.length == 0) {
            if (movement.player == gameFirstPlayer)
                return true;
            else
                return false;
        } else {
            const lastMovement = gameMovements[gameMovements.length - 1];
            if (lastMovement.player != movement.player)
                return true;
            else
                return false;
        }
        return true;
    }
};

//Check if the movement don't break any position rules
function checkPositionValidity(movements, movement) {
    //Check if position X is in a valid spot
    if ( movement.positionX < 0 || movement.positionY > 2)
        return false;
    //Check if position Y is in a valid spot
    if (movement.positionY < 0 || movement.positionY > 2)
        return false;

    //Check if there is any movement in the position
    if (movements.length > 0) {
        for (let move of movements) {
            if (move.positionX == movement.positionX && move.positionY == movement.positionY)
                return false;
        }
    }

    return true;
}

module.exports = { validateMove }
