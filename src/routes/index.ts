import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();

// Auth Routes
router.post('/auth/login', AuthController.login);
router.get('/', (_, res) => {
  res.send('login api working');
});
export default router;
