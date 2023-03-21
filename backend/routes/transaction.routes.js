import express from 'express';
const router = express.Router()

//controller imports
import { createTransaction } from '../controllers/transaction.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

//create
router.post('/transaction', isLoggedIn, createTransaction);

export default router