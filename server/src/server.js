import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/index.js";

const app = express();

await connectDB();

const PORT = process.env.PORT || 5050;

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From the Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
