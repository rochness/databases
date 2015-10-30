var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

app.get('/classes/chatterbox/', function(req, res){
  var msg = {results:[{username:'ro', text:'hello', roomname:'lobby', objectId:'1'}]};
  console.log('I got a get request from ' + req.url + ' sending back + ' + msg);
  res.header('Content-Type', 'application/json');
  res.status(200).send(msg);
});

app.post('/classes/chatterbox/', function(req, res){
  console.log('I got a post request from ' + req.url + ' with data ' + JSON.stringify(req.body));
  res.status(200).send();
});

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

