import mongoose from "mongoose";
import "dotenv/config";
import { dbName } from "../utils/utils.js";
import { InternalServerError } from "../utils/app.error.js";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.log("URI is not defined");
}

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Successfully Connected to Database")
    );
    await mongoose.connect(MONGO_URI, {
      dbName,
    });
  } catch (err) {
    throw new InternalServerError(err.message);
  }
};

export default connectDB;
