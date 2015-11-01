var db = require('../db');
var sql = require('mysql');


module.exports = {
  messages: {
    getFromDB: function () {
      return db.getAllMessages();
      
    }, // a function which produces all the messages
    postToDB: function (data) {
      return db.addMessage(data);
    },
  },
  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

module.exports.messages.postToDB({roomname: 'seed room', username: 'seed user', text: 'seed text'});
