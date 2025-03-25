import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { config } from './configs/env.configs';

// Exported io variable to be used in other files
export let io: Server;

const allowedOrigins = [
  'https://task-management-app-one-blue.vercel.app',
  'https://task-management-4449px69v-jackson-cheriyans-projects.vercel.app'
];

// Initialize Socket.io
export const initializeSocketIO = (server: http.Server): void => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
    },
  });

  // Authentication middleware for Socket.io
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: Token required'));
    }
    
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET || 'secret') as { id: string };
      socket.data.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection event
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Join a room with the user ID for targeted updates
    socket.join(socket.data.userId);
    
    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};