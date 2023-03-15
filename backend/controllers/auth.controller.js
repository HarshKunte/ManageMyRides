import User from '../models/user.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/customError.js'

import crypto from 'crypto'
import mailHelper from '../util/mailHelper.js'

export const cookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000), //3 days
    httpOnly: true
}


export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }

    //check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError('User already exists', 400)  
    }
    let user = await User.create(req.body );

    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})



export const login = asyncHandler(async(req,res)=>{

    const {email, password } = req.body

    if ( !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        throw new CustomError('Invalid credentials', 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        throw new CustomError("Invalid credentials - password", 400)
    }

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })
})



export const logout = asyncHandler(async (_req, res) => {
    // res.clearCookie()
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})


export const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body

    if(!email || email == ""){
        throw new CustomError('Email is required', 404)
    }

    const user = await User.findOne({email})
    if(!user){
        throw new CustomError('User not found', 404)
    }

    const resetToken = user.generateForgotPasswordToken()

    //save the token to the db
    await user.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`
    const text = `Your password reset url is
    \n\n ${resetUrl}\n\n
    `
    try {
        await mailHelper({
            email: user.email,
            subject: "Password reset email for website",
            text:text,
        })
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email}`
        })
        
    } catch (error) {
        //roll back - clear fields and save
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({validateBeforeSave:false})
        console.log(error)
        throw new CustomError(error.message || "Email couldn't be sent!!", 500)
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    const {token: resetToken} = req.params
    const {password, confirmPassword } = req.body

    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()}
    })

    if(!user){
        throw new CustomError("Password token is invalid or expired", 400)
    }

    if(password !== confirmPassword){
        throw new CustomError("Password and confirm password does not match!", 400)
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save()

    //create token and send as response
    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOptions)
    res.status(200).json({
        success:true,
        user
    })
})

export const changePassword = asyncHandler(async(req,res) => {
    const {oldPassword, newPassword} = req.body;
    const {user} = req.user;

    if(oldPassword === newPassword){
        throw new CustomError("Old and new password shouldn't be same", 401)
    }

    const dbUser = await User.findOne({_id:user._id}).select('+password')
    if(!dbUser){
        throw new CustomError('User not found!',401)
    }

    const isOldPasswordMatched = await dbUser.comparePassword(oldPassword)

    if(!isOldPasswordMatched){
        throw new CustomError("Old password does not match", 400)
    }

    dbUser.password = newPassword;

    await dbUser.save()

    //create token and send as response
    const token = dbUser.getJwtToken()
    dbUser.password = undefined

    res.cookie("token", token, cookieOptions)
    res.status(200).json({
        success:true,
        dbUser
    })

})