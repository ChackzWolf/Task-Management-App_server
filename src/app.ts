import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { config } from './configs/env.configs';



const app: Application = express();

app.use(cors({
  origin: config.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Basic route for testing API status
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;