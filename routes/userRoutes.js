import {Router} from 'express';
import login from  '../Controllers/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.post("/login",authMiddleware,login);

export default router;