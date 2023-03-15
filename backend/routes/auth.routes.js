import express from 'express';
const router = express.Router()

//controller imports
import {changePassword, forgotPassword, login, logout, signUp} from '../controllers/auth.controller.js'

//user signup
router.post('/auth/signup', signUp);

//login
router.post('/auth/login', login);

//logout
router.post('/auth/logout', logout);

//change password
router.post('/auth/password/forgot', forgotPassword);

export default router