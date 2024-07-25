import Transaction from '../models/transaction.schema.js'
import Invoice from '../models/invoice.schema.js'
import Fuel from '../models/fuel.schema.js'
import OtherExpense from '../models/expense.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefg', 10)

export const createTransaction = asyncHandler( async (req, res)=>{ 
    const user = req.user
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    
    const data = {user, _id: nanoid(), ...req.body}
    const transaction = await Transaction.create(data)

    res.status(200).json({
        success: true,
        message: "Transaction created with success",
        transaction
    })
})

export const editTransaction = asyncHandler( async (req, res)=>{ 
    const user = req.user
    const id = req.params.id
    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {new:true})
    if(!transaction){
        return res.status(401).json({
            success: false, 
            message: "Invalid transaction Id.",
        })
    }

    res.status(200).json({
        success: true,
        message: "Transaction created with success",
        transaction
    })
})

export const deleteTransactionById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const transaction = await Transaction.findByIdAndUpdate(id, {status:"deleted"}, {new:true})
    if(!transaction){
        return res.status(401).json({
            success: false, 
            message: "Invalid transaction Id.",
        })
    }
    const invoice = await Invoice.findOneAndUpdate({transaction:transaction._id}, {status:"deleted"})
    
    res.status(200).json({
        success: true, 
        message: "Transaction deleted with success",
    })
})

export const getTransactionById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const transaction = await Transaction.findById(id)
    if(!transaction){
        return res.status(401).json({
            success: false, 
            message: "Invalid transaction Id.",
        })
    }
    res.status(200).json({
        success: true,
        message: "Transaction received with success",
        transaction,
        user
    })
})

export const getTransactions = asyncHandler(async (req, res)=>{
    const user = req.user
    const limit = req.params.limit
    const skip = req.params.skip
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    if(skip<0 || limit<0){
        throw new CustomError('Skip or Limit count should not be less than 0',401)
    }

    const transactions = await Transaction.find({user: user._id}).sort({"to_date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        transactions,
        user
    })
})

export const getFilteredTransactions = asyncHandler(async (req, res)=>{
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

    const transactions = await Transaction.find({user: user._id, to_date:{$gte: startDate, $lte: endDate}}).sort({"to_date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        transactions,
        user
    })
})

export const getTransactionsReport = asyncHandler(async (req, res)=>{
    const user = req.user
    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const report = await Transaction.aggregate([
        { 
            $match: { user: user._id, status:"active" } 
        },
        {
            $group: {
              _id: {
                year: {
                  $year: "$to_date"
                  },
                month: {
                  $month: "$to_date"
                  },
                  
                },
              total_earnings_month: {
                $sum: "$earnings"
              },
              total_kms_month: {
                $sum: "$total_kms"
              },
              
            }
          }
    ])
    const fuelReport = await Fuel.aggregate([
        { 
            $match: { user: user._id } 
        },
        {
            $group: {
              _id: {
                year: {
                  $year: "$date"
                  },
                month: {
                  $month: "$date"
                  },
                  
                },
              total_fuel_month: {
                $sum: "$amount"
              },
              
            }
          }
    ])
    const otherExpenseReport = await OtherExpense.aggregate([
        { 
            $match: { user: user._id } 
        },
        {
            $group: {
              _id: {
                year: {
                  $year: "$date"
                  },
                month: {
                  $month: "$date"
                  },
                  
                },
              total_expense_month: {
                $sum: "$amount"
              },
              
            }
          }
    ])

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        report,
        fuelReport,
        otherExpenseReport,
        user
    })
})
