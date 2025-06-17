import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/index.js";
import router from "./routes/index.routes.js";

const app = express();

await connectDB();

const PORT = process.env.PORT || 5050;

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
