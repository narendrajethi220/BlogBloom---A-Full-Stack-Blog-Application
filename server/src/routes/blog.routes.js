import express from "express";
import {
  addBlog,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import auth from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/blog", authMiddleware, upload.single("image"), addBlog);
blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blog/:blogId", getBlogById);
blogRouter.delete("/blog/:blogId", authMiddleware, deleteBlogById);
blogRouter.post("/blog/toggle-publish", authMiddleware, togglePublish);
blogRouter.post("/blog/generate", auth, generateContent);

export default blogRouter;
