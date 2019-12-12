const express = require('express');
const router = express.Router();
const { writeInFile } = require('./../../persistence/fileWriter.js');
const { readFileById } = require('./../../persistence/fileReader.js');
const { validateMove } = require('./../../gameMechanics/moveValidator.js');
const { gameCheck } = require('./../../gameMechanics/gameChecker.js');
const { generateId } = require('./../../gameMechanics/idGenerator.js');
const { chooseFirstPlayer } = require('./../../gameMechanics/firstPlayerChooser.js');

//Set the treatment to POST requisitions for the /game route
router.post('/', (req, res, next) => {
    const newGame = {
        id: generateId(),
        firstPlayer: chooseFirstPlayer(),
        gameState: true,
        movements: [],
        winner: null
    };
 
    if (writeInFile(newGame) != "Error" ) {
        res.status(201).json({
            "id": newGame.id,
            "firstPlayer": newGame.firstPlayer
        });
    } else {
        const error = new Error('Error while creating the file');
        error.status = 500;
        next(error);
    }     
}); 

//Set the treatment to POST requisitions for the /game/{id}/movement route
router.post('/:id/movement', (req, res, next) => {
    const id = req.body.id;
    const userMovement = {
        player: req.body.player,
        positionX: req.body.position.x,
        positionY: req.body.position.y
    };

    let fileData = readFileById(id);

    //Checks if the file with the id exists
    if (fileData != "Not Found") {
        fileData = JSON.parse(fileData);
    } else {
        res.status(404).json({
            "msg": 'Partida não encontrada'
        });
    }

    //If the gameState is False the game had ended
    if (!fileData.gameState) {
        res.status(400).json({
            "msg": "Partida finalizada",
            "winner": fileData.winner
        })
    }

    //Validate the move
    if (validateMove(fileData, userMovement)) {
        fileData.movements.push(userMovement);
        //Actualizing the file
        writeInFile(fileData);
        if (gameCheck(fileData))
            res.status(200).json({
            "msg": "Partida finalizada",
            "winner": fileData.winner
        })
        else
            res.status(200).json();
    } else {
        res.status(400).json({
            "msg": 'Não é o turno do jogador'
        });
    }

});

module.exports = router;