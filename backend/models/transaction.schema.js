import mongoose from 'mongoose'
import {PaymentModes, RideModes, FuelModes} from '../util/enums'

const transactionSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        customer_name:{
            type: String,
            required: [true, "Customer name is required."]
        },
        customer_mobile:{
            type: String
        },
        company_crn:{
            type:String
        },
        from_address:{
            type: String,
            required: [true, "From address is required."]
        },
        to_address:{
            type: String,
            required: [true, "To address is required."]
        },
        from_date:{
            type: Date,
            required: [true, "From date is required."]
        },
        to_date:{
            type: Date,
            required: [true, "To date is required."]
        },
        journey_time:{
            type: String
        },
        starting_kms:{
            type: Number,
            default:0
        },
        closing_kms:{
            type: Number,
            default:0
        },
        total_kms:{
            type: Number,
            default:0
        },
        rate_per_km:{
            type: Number,
        },
        rate_per_hour:{
            type: Number,
        },
        driver_allowance:{
            type: Number,
        },
        
        fuel_mode:{
            type: String,
            enum: Object.keys(FuelModes),
        },
        fuel_rate:{
            type: Number
        },
        fuel_required:{
            type: Number
        },
        ride_mode:{
            type: String,
            enum: Object.keys(RideModes),
        },
        total_bill:{
            type:Number,
            required: [true, "Total amount is required."]
        },
        toll_amt:{
            type:Number,
            default:0
        },
        tax_amt:{
            type:Number,
            default:0
        },
        commission_amt:{
            type:Number,
            default:0
        },
        earnings:{
            type:Number,
            default:0
        },
        payment_mode:{
            type: String,
            enum: Object.keys(PaymentModes),
            required: [true, "Payment mode is required."]
        }
        
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Transaction', transactionSchema)