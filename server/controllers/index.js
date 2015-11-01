var models = require('../models');
var express = require('express')

module.exports = {
  messages: {
    get: function (req, res) {
      var data = {};
      return models.messages.getFromDB().then(function(rows){
        data.results = rows;
        res.header('Content-Type', 'application/json');
        res.status(200).send(data); 
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.postToDB(req.body).then(function(){
       // res.header('Content-Type', 'application/json');
       // res.status(200).end('');
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

