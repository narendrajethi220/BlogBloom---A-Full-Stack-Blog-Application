import express from "express";
import { subscribeNewsletterHandler } from "../../controllers/newsletter.controller.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", subscribeNewsletterHandler);

export default newsletterRouter;
