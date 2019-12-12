const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const gameRoutes = require('./api/routes/game');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dealing with CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Access, Authorization"
    );
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "POST");
        return res.status(200).json({});
    }
    next();
});

//Routing /game requisitions to the correct way
app.use('/game', gameRoutes);

//Dealing with not found requisitions
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Dealing with errors in general
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;