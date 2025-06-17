import express from "express";
import adminRouter from "./admin.routes.js";

const router = express.Router();

router.use("/admin", adminRouter);
router.get("/ping", (req, res) => {
  res.send("Pong");
});

export default router;
