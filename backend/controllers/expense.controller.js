import Expense from '../models/expense.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'

export const createOtherExpense = asyncHandler( async (req, res)=>{ 
    const user = req.user

    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    
    const data = {user:user._id, ...req.body}
    const expense = await Expense.create(data)
    
    res.status(200).json({
        success: true,
        message: "Expense created with success",
        expense,      
    })
})

export const deleteOtherExpenseById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const expense = await Expense.findByIdAndDelete(id)
    if(!expense){
        return res.status(401).json({
            success: false, 
            message: "Invalid expense Id.",
        })
    }
    res.status(200).json({
        success: true, 
        message: "Expense deleted with success",
        expense
    })
})

export const getAllOtherExpense = asyncHandler(async (req, res)=>{
    const user = req.user
    const limit = req.params.limit
    const skip = req.params.skip
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    if(skip<0 || limit<0){
        throw new CustomError('Skip or Limit count should not be less than 0',401)
    }

    const expenses = await Expense.find({user: user._id}).sort({"date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        expenses,
        user
    })
})

export const getFilteredOtherExpenses = asyncHandler(async (req, res)=>{
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

    const expenses = await Expense.find({user: user._id, date:{$gte: startDate, $lte: endDate}}).sort({"date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Other expenses received with success",
        expenses,
        user
    })
})