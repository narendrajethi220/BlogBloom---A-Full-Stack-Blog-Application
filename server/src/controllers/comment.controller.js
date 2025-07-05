import Comment from "../models/Comment.js";
import AppError from "../utils/app.error.js";
import { NotFoundError } from "../utils/app.error.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;
    // console.log(req.body);

    await Comment.create({ blog: blogId, name, content });
    return res.status(201).json({
      success: true,
      message: "Comment Added for review",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    if (!comments) {
      throw new NotFoundError("No Comment Found");
    }
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};
