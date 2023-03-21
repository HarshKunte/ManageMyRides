import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'

export const createTransaction = asyncHandler( async (req, res)=>{ 
    const user = req.user
    console.log(user);
    if(!user){
        throw new CustomError('User not avaiable',401)
    }
    const data = {user, ...req.body}

    const transaction = await Transaction.create(data)

    res.status(200).json({
        success: true,
        message: "Transaction created with success",
        transaction
    })
})