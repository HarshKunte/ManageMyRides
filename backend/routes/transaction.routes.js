import express from 'express';
const router = express.Router()

//controller imports
import { createTransaction, deleteTransactionById, editTransaction, getTransactionById } from '../controllers/transaction.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

//create
router.post('/transaction', isLoggedIn, createTransaction);
//get transaction by id
router.get('/transaction/:id', isLoggedIn, getTransactionById);
//edit transaction by id
router.put('/transaction/:id', isLoggedIn, editTransaction);
//delete transaction by id
router.delete('/transaction/:id', isLoggedIn, deleteTransactionById);

export default router