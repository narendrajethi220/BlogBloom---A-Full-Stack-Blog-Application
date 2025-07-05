import express from "express";
import {
  addBlog,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../../controllers/blog.controller.js";
import upload from "../../middlewares/multer.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/", authMiddleware, upload.single("image"), addBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/:blogId", authMiddleware, deleteBlogById);
blogRouter.post("/toggle-publish", authMiddleware, togglePublish);
blogRouter.post("/generate", authMiddleware, generateContent);

export default blogRouter;
