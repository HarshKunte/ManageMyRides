import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefg', 12)

export const createTransaction = asyncHandler( async (req, res)=>{ 
    const user = req.user
    console.log(user);
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

export const getTransactionById = asyncHandler(async (req, res)=>{
    const user = req.user
    const id = req.params.id

    if(!user){
        throw new CustomError('User not avaiable',401)
    }

    const transaction = await Transaction.findById(id)
    res.status(200).json({
        success: true,
        message: "Transaction received with success",
        transaction
    })
})