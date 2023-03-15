import express from 'express';
const router = express.Router()

//controller imports
import {forgotPassword, login, logout, resetPassword, signUp} from '../controllers/auth.controller.js'

//user signup
router.post('/auth/signup', signUp);

//login
router.post('/auth/login', login);

//logout
router.post('/auth/logout', logout);

//change password
router.post('/auth/password/forgot', forgotPassword);

//change password
router.post('/auth/password/reset/:token', resetPassword);

export default router