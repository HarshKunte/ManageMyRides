import express from 'express';
import { createInvoice, deleteInvoiceById, getAllInvoices, getFilteredInvoices } from '../controllers/invoice.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

//create
router.post('/invoice/:transactionId', isLoggedIn, createInvoice);

//get All 
router.get('/invoices/:limit/:skip', isLoggedIn, getAllInvoices);

//get filtered 
router.get('/invoices/filter/:startDate/:endDate/:limit/:skip', isLoggedIn, getFilteredInvoices);

//delete invoice by id 
router.delete('/invoice/:id', isLoggedIn, deleteInvoiceById);

export default router