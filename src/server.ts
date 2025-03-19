import http from 'http';
import app from './app';
import connectDB from './configs/db';
import { initializeSocketIO } from './socket';
import { config } from './configs/env.configs';



const PORT = config.PORT || 5000;



// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);



// Initialize Socket.io
initializeSocketIO(server);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});