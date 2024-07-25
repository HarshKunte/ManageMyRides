import Fuel from '../models/fuel.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'

export const createFuelExpense = asyncHandler( async (req, res)=>{ 
    const user = req.user

    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    
    const data = {user:user._id, ...req.body}
    const expense = await Fuel.create(data)
    
    res.status(200).json({
        success: true,
        message: "Fuel expense created with success",
        expense,      
    })
})

export const deleteFuelExpenseById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const expense = await Fuel.findByIdAndDelete(id)
    if(!expense){
        return res.status(401).json({
            success: false, 
            message: "Invalid fuel expense Id.",
        })
    }
    res.status(200).json({
        success: true, 
        message: "Fuel expense deleted with success",
        expense
    })
})

export const getAllFuelExpense = asyncHandler(async (req, res)=>{
    const user = req.user
    const limit = req.params.limit
    const skip = req.params.skip
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    if(skip<0 || limit<0){
        throw new CustomError('Skip or Limit count should not be less than 0',401)
    }

    const expenses = await Fuel.find({user: user._id}).sort({"date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Transactions received with success",
        expenses,
        user
    })
})

export const getFilteredFuelExpenses = asyncHandler(async (req, res)=>{
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

    const expenses = await Fuel.find({user: user._id, date:{$gte: startDate, $lte: endDate}}).sort({"date":-1}).skip(skip).limit(limit)

    res.status(200).json({
        success: true,
        message: "Fuel expenses received with success",
        expenses,
        user
    })
})