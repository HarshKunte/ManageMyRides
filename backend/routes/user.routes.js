import express from 'express';
import { editUser, getUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

router.get('/user', isLoggedIn, getUser);
router.put('/user', isLoggedIn, editUser);

export default router