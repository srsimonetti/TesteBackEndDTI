const fs = require('fs');
const folderPath = 'gameFiles';

function readFileById(fileId) {
    let fileName = folderPath + "/" + fileId + ".json";
    try {
        data = fs.readFileSync(fileName, 'UTF-8');
        return data;
    } catch (error) {
        return "Not Found";
    }
};

module.exports = { readFileById }