import mongoose from "mongoose";
import { FuelModes } from "../util/enums.js";

const fuelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mode:{
        type: String,
        enum: Object.keys(FuelModes),
    },
    rate:{
        type: Number,
        required:true
    },
    date:{
      type:Date,
      required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    kms:{
      type: Number
    },
    amount:{
      type:Number,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Fuel", fuelSchema);