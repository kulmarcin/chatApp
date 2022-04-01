const express = require('express');
const cors = require('cors');
const { getCurrentUser, userDisconnect, joinUser } = require('./user');

const app = express();
app.use(express());

app.use(cors());

const port = process.env.PORT || 8000;

const server = app.listen(
  port,
  console.log(`Server is running on the port: ${port} `)
);

const socket = require('socket.io')(server, {
  cors: {
    origin: process.env.URI || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
const io = socket;

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, roomName }) => {
    //create user
    const user = joinUser(socket.id, username, roomName);
    socket.join(user.room);

    //Welcome message to user
    socket.emit('welcome', {
      userId: user.id,
      username: user.username,
      text: `Welcome ${user.username} in the room '${roomName}'!`
    });

    //others see that user joined the chat
    socket.to(user.room).emit('joining', {
      userId: user.id,
      username: user.username,
      text: `${user.username} has joined the chat`
    });
  });

  socket.on('chat', text => {
    //get user object
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', {
      userId: user.id,
      username: user.username,
      text: text
    });
  });

  socket.on('disconnect', () => {
    const user = userDisconnect(socket.id);

    if (user) {
      //message to all that user has disconnected
      io.to(user.room).emit('leave', {
        userId: user.id,
        username: user.username,
        text: `${user.username} has left the chat`
      });
    }
  });
});
