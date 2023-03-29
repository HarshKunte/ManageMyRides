import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

router.get('/user', isLoggedIn, getUser);

export default router