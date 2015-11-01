var express = require('express');
var db = require('./db');
var mods = require('./models/index.js');
var Promise = require('bluebird');
var controller = require('./controllers')

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');
var msg = {username:'busybee', text:'hello roach', roomname:'happy tree'};

var app = express();
module.exports.app = app;

//mods.messages.post();
//mods.messages.get();

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

//db.getRoomId('frank').then(function(roomId){console.log('I promise the room Id is', roomId)});
// db.getRoomId('no room')
// .then(function(iD){console.log('response is ' + iD)})
// .catch(function(err){
//   console.log('we got this error: ', err);
// });
//console.log('Does getRoomId return a promise? ', db.getRoomId('sally').instanceOf(Promise));

// db.addMessage(msg);
//db.getAllMessages();

app.get('/classes/chatterbox/', function(req, res){
  //console.log('I got a get request from ' + req.url + ' sending back + ' + msg);
  controller.messages.get(req,res);
});

app.post('/classes/chatterbox/', function(req, res){
  controller.messages.post(req,res);
});

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

