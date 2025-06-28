import fs from "fs";
import Blog from "../models/Blog.js";
import imagekit from "../config/ImageKit.js";
import Comment from "../models/Comment.js";
import main from "../config/Gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        sucess: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //uploading Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogImages",
    });

    //optimization through imagekit URL transformation
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // modern format
        { width: "1280" }, // resizing width
      ],
    });

    const image = optimizedImageURL;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    return res.status(200).json({
      success: true,
      message: "Blog Added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({
      success: true,
      message: "Successfully fetched blogs",
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched blog",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }
    await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ blog: blogId });
    return res.status(200).json({
      success: true,
      message: `Blog "${blog.title}"Deleted Successfully`,
      blogId,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog Status Updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format."
    );
    return res.status(201).json({
      success: true,
      message: "Blog Generated Successfully",
      content,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
