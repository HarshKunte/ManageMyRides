import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index.js'

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50 chars"],
            trim: true
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique:true,
        },
        password:{
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be atleast 8 chars"],
            select: false // This makes sure whenever query data is returned password is not returned with it.
        },
        mobile:{
            type:String,
            required :[true, "Mobile number is required"],
            maxLength:[10,"Mobile number is invalid"],
        },
        company_name:{
            type:String,
        },
        vehicle_number:{
            type:String,
        },

        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,

        //these fields will be calculated later based on transaction data
        total_kms:{
            type:Number,
            default:0
        },
        total_transactions:{
            type:Number,
            default:0
        },
        total_earnings:{
            type:Number,
            default:0
        },
        total_bills_amt:{
            type:Number,
            default:0
        },
        total_no_of_days:{
            type:Number,
            default:0
        },
        
    },
    {
        timestamps: true
    }
)

//pre method to encrypt password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) 
    return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})


// schema methods
userSchema.methods = {
    //compare password
    comparePassword : async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    
    //generate JWT token
    getJwtToken: function () {
        return JWT.sign(
            {
                _id: this._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
        
    },

    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString('hex')

        //encrypt and save to DB
        this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest('hex')

        this.forgotPasswordExpiry = Date.now()+20*60*1000

        return forgotToken
    }
}

export default mongoose.model('User', userSchema)