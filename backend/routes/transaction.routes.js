import express from 'express';
const router = express.Router()

//controller imports
import { createTransaction, deleteTransactionById, editTransaction, getFilteredTransactions, getTransactionById, getTransactions, getTransactionsReport } from '../controllers/transaction.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

//create
router.post('/transaction', isLoggedIn, createTransaction);
//get transaction by id
router.get('/transaction/:id', isLoggedIn, getTransactionById);
//edit transaction by id
router.put('/transaction/:id', isLoggedIn, editTransaction);
//delete transaction by id
router.delete('/transaction/:id', isLoggedIn, deleteTransactionById);
//get All transactions or limited transactions
router.get('/transactions/:limit/:skip', isLoggedIn, getTransactions);
//get filtered  transactions and limited transactions
router.get('/transactions/filter/:startDate/:endDate/:limit/:skip', isLoggedIn, getFilteredTransactions);

//get analytics of all transactions for the logged in user
router.get('/transactions/report', isLoggedIn, getTransactionsReport);


export default router