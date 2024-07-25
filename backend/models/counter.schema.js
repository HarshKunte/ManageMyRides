import mongoose from "mongoose";

const counterSchema = mongoose.Schema(
  {
    seq: { type: Number, default: 0 },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
);

export default mongoose.model("Counter", counterSchema);
