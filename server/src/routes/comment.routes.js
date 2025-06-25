import express from "express";
import {
  addComment,
  getBlogComments,
} from "../controllers/comment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/comment", addComment);
commentRouter.get("/comment", getBlogComments);

export default commentRouter;
