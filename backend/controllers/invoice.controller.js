import Invoice from '../models/invoice.schema.js'
import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'

export const createInvoice = asyncHandler( async (req, res)=>{ 
    const user = req.user
    const transactionId = req.params.transactionId
    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const existingInvoice = await Invoice.findOne({transaction: transactionId})
    if(existingInvoice){
        throw new CustomError("Invoice already exists",402)
    }
    
    const data = {user:user._id, transaction:transactionId}
    const invoice = await Invoice.create(data)
    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, {invoice_id: invoice.invoiceNo, invoice_date: invoice.createdAt}, {new:true})

    res.status(200).json({
        success: true,
        message: "Invoice created with success",
        invoice,
        updatedTransaction
    })
})

export const deleteInvoiceById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const invoice = await Invoice.findByIdAndUpdate(id, {status:"deleted"})
    if(!invoice){
        return res.status(401).json({
            success: false, 
            message: "Invalid invoice Id.",
        })
    }
    const transaction = await Transaction.findByIdAndUpdate(invoice.transaction, {invoice_id:null})
    if(!transaction){
        return res.status(401).json({
            success: false, 
            message: "Invalid transaction Id.",
        })
    }
    res.status(200).json({
        success: true, 
        message: "Invoice deleted with success",
        invoice
    })
})

export const getAllInvoices = asyncHandler(async (req, res)=>{
    const user = req.user
    const limit = req.params.limit
    const skip = req.params.skip
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    if(skip<0 || limit<0){
        throw new CustomError('Skip or Limit count should not be less than 0',401)
    }

    const invoices = await Invoice.find({user: user._id}).sort({"createdAt":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        invoices,
        user
    })
})

export const getFilteredInvoices = asyncHandler(async (req, res)=>{
    const user = req.user
    const limit = req.params.limit
    const skip = req.params.skip
    const startDate = req.params.startDate
    const endDate = req.params.endDate
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    if(skip<0 || limit<0){
        throw new CustomError('Skip or Limit count should not be less than 0',401)
    }

    const invoices = await Invoice.find({user: user._id, createdAt:{$gte: startDate, $lt: endDate}}).sort({"createdAt":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        invoices,
        user
    })
})