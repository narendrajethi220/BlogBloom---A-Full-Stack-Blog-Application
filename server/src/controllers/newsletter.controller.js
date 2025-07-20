import Newsletter from "../models/newsletter.model.js";
import AppError, {
  BadRequestError,
  ConflictError,
} from "../utils/app.error.js";

export const subscribeNewsletterHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Missing Input fields");
    }
    const isExists = await Newsletter.findOne({ email });
    if (isExists) {
      throw new ConflictError("Already Subscribed to Newsletter");
    }

    await Newsletter.create({
      email,
    });

    return res.status(201).json({
      success: true,
      message: "User Subscribed to Newsletter",
    });
  } catch (err) {
    if (err instanceof AppError) throw err;

    console.error("🔥 Unexpected Error:", err);
    throw new InternalServerError();
  }
};
