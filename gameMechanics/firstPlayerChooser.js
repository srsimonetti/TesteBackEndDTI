//choose the first player based on a random number
function chooseFirstPlayer() {
    let rand = Math.floor((Math.random() * 1000) + 1);
    let firstPlayer = "";

    if (rand % 2 != 0)
        firstPlayer = "X";
    else
        firstPlayer = "O";

    return firstPlayer;
}

module.exports = { chooseFirstPlayer }