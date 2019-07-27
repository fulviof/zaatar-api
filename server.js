const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Zaatar API."});
});

// Require photos routes
require('./app/routes/photo.routes.js')(app);

// listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});
