var db = require('../db');
var sql = require('mysql');



var entry = {
  messageId : 1,
  userId : 4,
  msgtext : 'sup',
  roomId : 14
};

module.exports = {
  messages: {
    getFromDB: function () {
      
      db.thing(arguments)

      
    }, // a function which produces all the messages
    postToDB: function (data) {
      con.connect(function(err){
        if(err){
          console.log('we got an error in our post function');
        } else {
          con.query('INSERT INTO messages SET ?', entry, function(req2, res2){
            if(err){
              console.log('our con.query errored');
            } else {
              console.log('it worked?');
            }
          })
        }
      })
    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

