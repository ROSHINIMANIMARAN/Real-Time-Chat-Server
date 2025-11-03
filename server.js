const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
// Serve the test client
app.use(express.static(path.join(__dirname, 'public')));
// In-memory map of socket.id -> username
const users = new Map();
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  // Expect client to emit 'join' with a username immediately after connecting
  socket.on('join', (username) => {
    username = String(username || 'Anonymous').trim();
    users.set(socket.id, username);
    console.log(`${username} joined (id: ${socket.id})`);
    // Notify the joining user with current users and a welcome
    socket.emit('joined', {
      yourId: socket.id,
      users: Array.from(users.values())
    });
    // Broadcast to others that a user joined
    socket.broadcast.emit('notification', {
      type: 'join',
      message: `${username} has joined the chat.`,
      users: Array.from(users.values())
    });
  });
  // When a client sends a chat message
  socket.on('message', (payload) => {
    const username = users.get(socket.id) || 'Anonymous';
    const message = String(payload?.message ?? '').trim();
    if (!message) return;
    const data = {
      fromId: socket.id,
      from: username,
      message,
      ts: Date.now()
    };
    // Broadcast message to all clients (including sender)
    io.emit('message', data);
  });
  // Client requested current user list
  socket.on('getUsers', () => {
    socket.emit('usersList', Array.from(users.values()));
  });
  socket.on('disconnect', (reason) => {
    const username = users.get(socket.id) || 'Anonymous';
    users.delete(socket.id);
    console.log(`${username} disconnected (id: ${socket.id}). Reason: ${reason}`);
 // Notify remaining clients
    socket.broadcast.emit('notification', {
      type: 'leave',
      message: `${username} has left the chat.`,
      users: Array.from(users.values())
    });
  });
});
// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});