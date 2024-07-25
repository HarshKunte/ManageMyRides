import express from 'express';
import { createFuelExpense, deleteFuelExpenseById, getAllFuelExpense, getFilteredFuelExpenses } from '../controllers/fuel.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

//create
router.post('/expense/fuel/', isLoggedIn, createFuelExpense);

//get All 
router.get('/expenses/fuel/:limit/:skip', isLoggedIn, getAllFuelExpense);

//get filtered  expenses and limited expenses
router.get('/expenses/fuel/filter/:startDate/:endDate/:limit/:skip', isLoggedIn, getFilteredFuelExpenses);

//delete fuel expense by id 
router.delete('/expense/fuel/:id', isLoggedIn, deleteFuelExpenseById);

export default router