import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    if (!blogs) {
      return res.status(200).json({
        success: true,
        message: "No Blog Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched Blog",
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    if (!comments) {
      return res.status(200).json({
        success: true,
        message: "No Comment Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched Comments",
      comments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const totalBlog = await Blog.countDocuments();
    const totalComment = await Comment.countDocuments();

    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      totalBlog,
      totalComment,
      drafts,
    };
    return res.status(200).json({
      success: true,
      message: "Successfully fetched Dashboard Data",
      dashboardData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findById(id);
    if (comment) {
      return res.status(404).json({
        success: false,
        message: "No Comment Found",
      });
    }
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Comment deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "No Comment Found",
      });
    }
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.status(201).json({
      success: true,
      message: "Comment Approved Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
