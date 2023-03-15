import express from 'express';
const router = express.Router()

//controller imports
import {login, logout, signUp} from '../controllers/auth.controller.js'

//user signup
router.post('/auth/signup', signUp);

//login
router.post('/auth/login', login);

//logout
router.post('/auth/logout', logout);

export default router