import express from 'express';
const router = express.Router()

//controller imports
import {changePassword, forgotPassword, login, logout, resetPassword, signUp} from '../controllers/auth.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

//user signup
router.post('/auth/signup', signUp);

//login
router.post('/auth/login', login);

//logout
router.post('/auth/logout', logout);

//forgot password
router.post('/auth/password/forgot', forgotPassword);

//reset password (email reveived by forgot password)
router.post('/auth/password/reset/:token', resetPassword);

//change password
router.post('/auth/password/change',isLoggedIn, changePassword);

export default router