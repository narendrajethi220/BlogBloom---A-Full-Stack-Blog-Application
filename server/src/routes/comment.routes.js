import express from "express";
import {
  addComment,
  getBlogComments,
} from "../controllers/comment.controller.js";
import { deleteCommentById } from "../controllers/admin.controller.js";

const commentRouter = express.Router();

commentRouter.post("/comment", addComment);
commentRouter.get("/:blogId/comment", getBlogComments);

export default commentRouter;
