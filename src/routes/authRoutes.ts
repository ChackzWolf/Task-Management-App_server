import express from 'express';
import { AuthController } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { AuthService } from '../services/authServices';
import { UserRepository } from '../repositories/user.repository';
import { JWT } from '../Utils/jwt.utils';

const router = express.Router();

const jwt = new JWT();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository,jwt);
const authController = new AuthController(authService);

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/api/auth/validate-token')
// Protected routes
router.get('/profile', protect, authController.getProfile.bind(authController));

export default router;

