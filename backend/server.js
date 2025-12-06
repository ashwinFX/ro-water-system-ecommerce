const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ro-water-system')
  .then(() => console.log('✓ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('inventory:update', (data) => {
    io.emit('inventory:changed', {
      productId: data.productId,
      newInventory: data.newInventory,
      timestamp: new Date()
    });
  });
  
  socket.on('order:statusUpdate', (data) => {
    io.emit('order:updated', {
      orderId: data.orderId,
      status: data.status,
      timestamp: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };
