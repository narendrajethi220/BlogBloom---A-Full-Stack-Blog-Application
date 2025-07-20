import mongoose from "mongoose";

const newletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Newsletter = mongoose.model("newsletter", newletterSchema);
export default Newsletter;
