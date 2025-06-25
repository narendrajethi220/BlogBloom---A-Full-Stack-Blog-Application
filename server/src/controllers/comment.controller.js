import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comment.create({ blog, name, content });
    return res.status(201).json({
      success: true,
      message: "Comment Added for review",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    if (!comments) {
      return res.status(200).json({
        success: true,
        message: "No Comments Yet",
      });
    }
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
