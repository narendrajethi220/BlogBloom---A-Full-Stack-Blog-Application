import express from "express";
import adminRouter from "./admin.routes.js";
import blogRouter from "./blog.routes.js";
import commentRouter from "./comment.routes.js";

const router = express.Router();

router.use("/v1/admin", adminRouter);
router.use("/v1", blogRouter);
router.use("/v1", commentRouter);

router.get("/ping", (req, res) => {
  res.send("Pong");
});

export default router;
