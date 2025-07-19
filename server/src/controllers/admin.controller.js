import jwt from "jsonwebtoken";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/app.error.js";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/app.error.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "iAmSecretKey";

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    if (!blogs) {
      throw new NotFoundError("No Blog Found");
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched Blog",
      blogs,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    if (!comments) {
      throw new NotFoundError("No Comments Found");
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched Comments",
      comments,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
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
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
      throw new NotFoundError("No Comments Found");
    }
    await Comment.findByIdAndDelete({ _id: commentId });
    return res.status(200).json({
      success: true,
      message: "Comment deleted Successfully",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new NotFoundError(`No Comments Found with id ${id}`);
    }
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.status(201).json({
      success: true,
      message: "Comment Approved Successfully",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const getAllCreators = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name email isApproved role _id")
      .sort({ createdAt: -1 });
    if (!users) {
      return res.status(200).json({
        success: true,
        message: "No Creator found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Users fetched Successfully",
        users,
      });
    }
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const approveCreatorById = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError(`No Creator Found with id ${id}`);
    }
    await User.findByIdAndUpdate(id, { isApproved: true });
    res.status(201).json({
      success: true,
      message: "Creator Approved ✅",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const revokeCreatorApproval = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError(`No Creator Found with id ${id}`);
    }
    await User.findByIdAndUpdate(id, { isApproved: false });
    res.status(201).json({
      success: true,
      message: "Creator approval revoked.",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};
