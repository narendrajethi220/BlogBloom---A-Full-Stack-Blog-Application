import express from "express";
import {
  userLoginHandler,
  userRegistrationHandler,
} from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", userRegistrationHandler);
userRouter.post("/login", userLoginHandler);

export default userRouter;
