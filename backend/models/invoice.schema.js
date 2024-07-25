import mongoose from "mongoose";
import Counter from './counter.schema.js'
import config from "../config/index.js";

const invoiceSchema = mongoose.Schema({
  invoiceNo: {
    type: String,
  },
  transaction: {
    type: String,
    // ref: "Transaction",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status:{
    type: String,
            enum: ["active", "deleted"],
            default:"active"
  }

  
},{
    timestamps:true
});

invoiceSchema.pre("save", function (next) {
  var doc = this;
  Counter.findOneAndUpdate(
    { user: doc.user },
    { $inc: { seq: 1 } },
    {new:true}
  )
  .then(counter =>{
    doc.invoiceNo = config.INVOICE_INITIALS.concat("-", String(counter.seq).padStart(3, '0'));
    next();
  })
  .catch(err =>{
    next(err);
  });
});

export default mongoose.model("Invoice", invoiceSchema);
