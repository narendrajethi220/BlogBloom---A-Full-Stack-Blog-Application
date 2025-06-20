import express from "express";
import { addBlog } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/blog", authMiddleware, upload.single("image"), addBlog);

export default blogRouter;
