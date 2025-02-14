import { Router } from 'express';
import { loginUser, registerUser } from './controller.js';

const router = Router();

// Login route
router.post('/login', loginUser);

//Signup route
router.post('/signup', registerUser);

export default router;
