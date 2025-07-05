import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AppError, {
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

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: userObj,
      token,
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
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
