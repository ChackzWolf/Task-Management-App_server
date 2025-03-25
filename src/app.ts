import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { config } from './configs/env.configs';



const app: Application = express();

const allowedOrigins = [
  'https://task-management-app-one-blue.vercel.app',
  'https://task-management-4449px69v-jackson-cheriyans-projects.vercel.app'
];

const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable cookies and HTTP authentication
};

app.use(cors(corsOptions));


// app.use(cors({
//   origin: config.CLIENT_URL ,
//   credentials: true,
// }));

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