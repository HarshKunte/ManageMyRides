import asyncHandler from "../services/asyncHandler.js";

export const getUser = asyncHandler(async(req, res)=>{
    const user = req.user
    if(!user){
        throw new CustomError('User not found!', 400)
    }
    res.status(200).json({
        success: true,
        user
    })
} )