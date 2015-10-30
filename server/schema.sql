CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageId int(3),
  userId int(3),
  msgtext varchar(140),
  roomId int(3),
  PRIMARY KEY(messageId) 
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  userId int(3),
  username varchar(75),
  PRIMARY KEY(userId) 
);

CREATE TABLE rooms (
  roomId int(3),
  roomname varchar(75),
  PRIMARY KEY(roomId) 
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

