import mongoose from 'mongoose'
import PaymentModes from '../util/paymentModes'
import RideModes from '../util/rideModes'

const transactionSchema = mongoose.Schema(
    {
        customer_name:{
            type: String,
            required: true
        },
        customer_mobile:{
            type: String
        },
        company_crn:{
            type:String
        },
        from_address:{
            type: String,
            required: true
        },
        to_address:{
            type: String,
            required: true
        },
        from_date:{
            type: Date,
            required: true
        },
        to_date:{
            type: Date,
            required: true
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
        ride_mode:{
            type: String,
            enum: Object.keys(RideModes),
        },
        total_fare_amt:{
            type:Number,
            required: true
        },
        expenses_amt:{
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
            required: true
        }
        
    }
)

export default mongoose.model('Transaction', transactionSchema)