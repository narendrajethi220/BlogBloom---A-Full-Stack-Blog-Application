import express from "express";
import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/blog", authMiddleware, upload.single("image"), addBlog);
blogRouter.get("/blog", getAllBlogs);
blogRouter.get("/blog/:blogId", getBlogById);
blogRouter.delete("/blog", authMiddleware, deleteBlogById);
blogRouter.post("/blog/toggle-publish", authMiddleware, togglePublish);

export default blogRouter;
