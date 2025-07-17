import express from "express";
import {
  adminLogin,
  approveCommentById,
  approveCreatorById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getAllCreators,
  getDashboardData,
} from "../../controllers/admin.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboardData);

adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.delete("/comment/:commentId", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

adminRouter.get("/creators", auth, getAllCreators);
adminRouter.post("/approve-creator", auth, approveCreatorById);

export default adminRouter;
