const fs = require('fs');
const { promisify } = require('util');
const folderPath = 'gameFiles';

//Creates a promisified require
const write = promisify(fs.writeFile);

async function writeInFile(gameData) {
    try {
        //Create the string that contains the path where the file will be writed into
        const fileName = folderPath + '/' + gameData.id + '.json';
        //Turns the data into a JSON object
        const fileData = JSON.stringify(gameData, null, 1);

        await write(fileName, fileData);
    } catch (error) {
        return "Error";
    }
};

module.exports = { writeInFile }




