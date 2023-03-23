import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 10)

export const createTransaction = asyncHandler( async (req, res)=>{ 
    const user = req.user
    console.log(user);
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    const transaction_id = nanoid()
    const data = {user, transaction_id, ...req.body}

    const transaction = await Transaction.create(data)

    res.status(200).json({
        success: true,
        message: "Transaction created with success",
        transaction
    })
})