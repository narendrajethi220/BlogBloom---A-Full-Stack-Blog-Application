import express from "express";
import {
  fetchUserBlogHandler,
  getCreatorDashboardDataHandler,
  userLoginHandler,
  userRegistrationHandler,
} from "../../controllers/user.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/ping", (req, res) => {
  res.send("Pong");
});
userRouter.post("/register", userRegistrationHandler);
userRouter.post("/login", userLoginHandler);
userRouter.get("/blogs", auth, fetchUserBlogHandler);
userRouter.get("/dashboardData", auth, getCreatorDashboardDataHandler);
export default userRouter;
