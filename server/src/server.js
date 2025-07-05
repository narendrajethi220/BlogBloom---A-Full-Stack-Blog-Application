import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/index.js";
import { genericErrorHandler } from "./middlewares/error.middleware.js";
import v1Router from "./routes/v1/index.js";

const app = express();

await connectDB();

const PORT = process.env.PORT || 5050;

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Router);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
