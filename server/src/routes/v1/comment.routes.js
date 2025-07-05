import express from "express";
import {
  addComment,
  getBlogComments,
} from "../../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/", addComment);
commentRouter.get("/:blogId", getBlogComments);

export default commentRouter;
