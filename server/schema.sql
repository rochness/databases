DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  userId int(3) AUTO_INCREMENT,
  username varchar(75) UNIQUE,
  PRIMARY KEY(userId)
);

CREATE TABLE rooms (
  roomId int(3) AUTO_INCREMENT,
  roomname varchar(75) UNIQUE,
  PRIMARY KEY(roomId) 
);

CREATE TABLE messages (
  objectId int(3) AUTO_INCREMENT,
  userId int(3),
  text varchar(140),
  roomId int(3),
  PRIMARY KEY(objectId),
  FOREIGN KEY(userId) REFERENCES users(userId),
  FOREIGN KEY(roomId) REFERENCES rooms(roomId)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

