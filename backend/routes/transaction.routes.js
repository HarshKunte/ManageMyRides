import express from 'express';
const router = express.Router()

//controller imports
import { createTransaction, getTransactionById } from '../controllers/transaction.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

//create
router.post('/transaction', isLoggedIn, createTransaction);
//get transaction by id
router.get('/transaction/:id', isLoggedIn, getTransactionById);

export default router