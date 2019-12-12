//generates a new Id based on Hex numbers
function generateId() {
    let id = "";
    id = randomHex() + randomHex() + "-" + randomHex() + "-"
        + randomHex() + "-" + randomHex() + "-" + randomHex() + randomHex() + randomHex();
    return id;
};

//generate a random hex number
function randomHex() {
    return (Math.random() * 0xFFFFFF << 0).toString(16)
};

module.exports = { generateId }