import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getDashboardData,
} from "../../controllers/admin.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboardData);
adminRouter.delete("/comment/:commentId", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

export default adminRouter;
