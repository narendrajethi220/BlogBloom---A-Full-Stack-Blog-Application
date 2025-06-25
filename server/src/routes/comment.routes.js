import express from "express";
import {
  addComment,
  getBlogComments,
  toggleComment,
} from "../controllers/comment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/comment", addComment);
commentRouter.get("/comment", getBlogComments);
commentRouter.post("/comment/toggle-comment", auth, toggleComment);

export default commentRouter;
