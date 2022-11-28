import { signIn, signUp } from '../controllers/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);

export { authRoutes };
