import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import bcrypt from "bcryptjs";
import AppError, {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/app.error.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const userRegistrationHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    email.toLowerCase();
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      throw new ConflictError("User Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "creator",
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message:
        "Creator profile submitted for review. You will be notified once approved.",
      user: userObj,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new NotFoundError("User Not Found.");
    }
    if (!user.isApproved) {
      throw new BadRequestError("Your creator profile is pending approval.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: userObj,
    });
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const fetchUserBlogHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await Blog.find({ user: userId });
    if (!blogs) {
      return res.status(200).json({
        success: true,
        message: "No Blog Founds!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        blogs,
      });
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};

export const getCreatorDashboardDataHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const recentBlogs = await Blog.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(6);
    const userBlogIds = await Blog.find({ user: userId }).distinct("_id");
    const totalBlog = userBlogIds.length;

    const totalComment = await Comment.countDocuments({
      blog: { $in: userBlogIds },
    });

    const drafts = await Blog.countDocuments({
      user: userId,
      isPublished: false,
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched",
      dashboardData: {
        recentBlogs,
        totalBlog,
        totalComment,
        drafts,
      },
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};
