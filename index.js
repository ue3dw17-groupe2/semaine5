const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ue3dw17s5');

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// En activant cette fonction nous pouvons accéder à un formulaire afin de faire des recherches via le navigateur
// Cependant elle n'est pas encore totalement fonctionnelle et seul la partie "recherche user by email" est active
/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
*/
var userRoutes = require('./api/routes/user-routes');
userRoutes(app);

var gameRoutes = require('./api/routes/game-routes');
gameRoutes(app);

var reviewRoutes = require('./api/routes/review-routes');
reviewRoutes(app);

app.listen(port);

console.log('GameTracker REST API started on: ' + port);