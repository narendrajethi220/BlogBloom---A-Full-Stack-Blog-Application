import express from "express";
import adminRouter from "./admin.routes.js";
import blogRouter from "./blog.routes.js";
import commentRouter from "./comment.routes.js";
import userRouter from "./user.routes.js";
import newsletterRouter from "./newsletter.routes.js";

const v1Router = express.Router();

v1Router.use("/admin", adminRouter);
v1Router.use("/blog", blogRouter);
v1Router.use("/comment", commentRouter);
v1Router.use("/creator", userRouter);
v1Router.use("/newsletter", newsletterRouter);

v1Router.get("/ping", (req, res) => {
  res.send("Pong");
});

export default v1Router;
