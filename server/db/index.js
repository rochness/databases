var mysql = require('mysql');
var Promise = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rodam',
  database: 'testDB'
});

// var connect = function(){
//   return new Promise(function(resolve, reject){
//     con.connect(function(err){
//       if(err){
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

con.connect();

// var disconnect = function(passAlong){
//   return new Promise(function(resolve, reject){
//     con.end(function(err){
//       if(err){
//         reject(err);
//       } else {
//         resolve(passAlong);
//       }
//     });
//   });
// };

var getId = function(name, roomOrUser){
  return new Promise(function(resolve, reject){
    con.query('SELECT ' + roomOrUser + 'Id FROM ' + roomOrUser + 's WHERE ' + roomOrUser + 'name = "' + name + '"', 
      function(err, rows, fields){
      if(err){
        reject(err);
      } else {
        if(rows.length > 0){
          resolve(rows[0][roomOrUser + 'Id']);
        } else {
          resolve(null);
        }
      }
    });
  });
};

var addRow = function(table, cols, values){
  var colsString = ' (' + cols.join(',') + ') ';
  var valuesString = ' ("' + values.join('","') + '") ';

  return new Promise(function(resolve, reject){
    con.query('INSERT INTO ' + table + colsString + 'VALUES' + valuesString +';', 
      function(err, result){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


module.exports.getRoomId = function(roomname){
  return getId(roomname, 'room');
};

module.exports.getUserId = function(username){
  return getId(username, 'user');
};


module.exports.addUser = function(username){
  return addRow('users', ['username'], [username]);
};

module.exports.addRoom = function(roomname){
  return addRow('rooms', ['roomname'], [roomname]);
};

module.exports.getAllmessagesFromDB = function(){

};

module.exports.addMessage = function(message){
  var messageCols = ['userId', 'roomId', 'msgtext'];
  var messageVals = [];
  
  console.log('1');

  module.exports.getUserId(message.username).then(function(userId){
    if (!userId){
      return module.exports.addUser(message.username).then(function(){
        return module.exports.getUserId(message.username).then(function(userId){
          messageVals.push(userId);
        });
      });
    } else {
      messageVals.push(userId);
    }
  }).then(function(){
    return module.exports.getRoomId(message.roomname).then(function(roomId){
      if (!roomId){
        return module.exports.addRoom(message.roomname).then(function(){
          return module.exports.getRoomId(message.roomname).then(function(roomId){
            console.log('pushing ' + roomId);
            messageVals.push(roomId);
          });
        });
      } else {
        console.log('roomId ', roomId);
        messageVals.push(roomId);
      }
    });
  }).then(function(){
    messageVals.push(message.text);
    return addRow('messages', messageCols, messageVals);
  });
};
 




