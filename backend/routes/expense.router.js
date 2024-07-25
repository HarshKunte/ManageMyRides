import express from 'express';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { createOtherExpense, deleteOtherExpenseById, getAllOtherExpense, getFilteredOtherExpenses } from '../controllers/expense.controller.js';
const router = express.Router()

//create
router.post('/expense/other/', isLoggedIn, createOtherExpense);

//get All 
router.get('/expenses/other/:limit/:skip', isLoggedIn, getAllOtherExpense);

//get filtered  expenses and limited expenses
router.get('/expenses/other/filter/:startDate/:endDate/:limit/:skip', isLoggedIn, getFilteredOtherExpenses);

//delete expense by id 
router.delete('/expense/other/:id', isLoggedIn, deleteOtherExpenseById);

export default router