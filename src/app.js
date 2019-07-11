const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
require('./db/mongoose');
const userRouter = require('./routers/user');
const favourRouter = require('./routers/favour');
const favourRequests = require('./routers/favourRequests');

const setupDatabase = require('./db/dummy-data')

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors());

app.use('/users', userRouter);
app.use('/favour', favourRouter);
app.use('/favourRequests', favourRequests);


// Dummy Data
// setupDatabase()

module.exports = app;
