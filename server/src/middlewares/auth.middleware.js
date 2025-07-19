import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError, {
  InternalServerError,
  UnauthorizedError,
} from "../utils/app.error.js";

const auth = (req, res, next) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "iAmSecretKey";

  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError("No token Provided");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.log("🔥Unexpected Error:", err.message);
    throw new InternalServerError();
  }
};

export default auth;
