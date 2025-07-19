import express from "express";
import {
  approveCommentById,
  approveCreatorById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getAllCreators,
  getDashboardData,
  revokeCreatorApproval,
} from "../../controllers/admin.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import { userLoginHandler } from "../../controllers/user.controller.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", userLoginHandler);
adminRouter.get("/blogs", auth, adminMiddleware, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, adminMiddleware, getDashboardData);

adminRouter.get("/comments", auth, adminMiddleware, getAllCommentsAdmin);
adminRouter.delete(
  "/comment/:commentId",
  auth,
  adminMiddleware,
  deleteCommentById
);
adminRouter.post("/approve-comment", auth, adminMiddleware, approveCommentById);

adminRouter.get("/creators", auth, adminMiddleware, getAllCreators);
adminRouter.post("/approve-creator", auth, adminMiddleware, approveCreatorById);
adminRouter.post(
  "/revoke-creator",
  auth,
  adminMiddleware,
  revokeCreatorApproval
);

export default adminRouter;
