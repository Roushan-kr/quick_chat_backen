import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import authMiddleware  from '../middleware/AuthMiddleware.js';
import ChatGropController from '../controllers/ChatGroupController.js';

const router  = Router();
const middleware = [authMiddleware] as any;
// Auth Routes
router.post('/auth/login', AuthController.login);

// chat group routes
router.post('/chat-group', middleware, ChatGropController.store);
router.get('/chat-group', middleware, ChatGropController.index);
router.get('/chat-group/:id', ChatGropController.index);
router.put('/chat-group/:id', middleware, ChatGropController.update);
router.delete('/chat-group/:id', middleware, ChatGropController.destroy);

// test route
router.get('/', (_, res) => {
	res.send('api working');
});
export default router;
