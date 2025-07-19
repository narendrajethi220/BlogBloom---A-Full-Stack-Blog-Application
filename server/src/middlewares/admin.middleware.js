import jwt from "jsonwebtoken";
import("dotenv/config");
import AppError, {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/app.error.js";

const adminMiddleware = (req, res, next) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "iAmSecretKey";

  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError("No token Provided");
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decode;
    if (req.user.role !== "admin") {
      throw new ForbiddenError(
        "Oops! You don’t have admin rights to access this."
      );
    }
    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.log("🔥Unexpected Error:", err.message);
    throw new InternalServerError();
  }
};

export default adminMiddleware;
