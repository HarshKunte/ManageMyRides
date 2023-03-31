import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/customError.js";

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

export const editUser = asyncHandler(async(req, res)=>{
    const user = req.user
    const data = req.body
    if(!user){
        throw new CustomError('User not found!', 400)
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, data, {new:true})
    if(!updatedUser){
        return res.status(401).json({
            success: false, 
            message: "Invalid user Id.",
        })
    }

    res.status(200).json({
        success: true,
        message: "User updated with success",
        user:updatedUser
    })
} )