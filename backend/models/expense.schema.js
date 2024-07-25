import mongoose from "mongoose";
import { FuelModes } from "../util/enums.js";

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expense_name:{
        type: String,
        required:true
    },
    date:{
      type:Date,
      required:true
    },
    amount:{
        type: Number,
        required:true
    },
    kms:{
      type: Number
    },
    description:{
      type:String,
    },
    bill_no:{
      type:String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);