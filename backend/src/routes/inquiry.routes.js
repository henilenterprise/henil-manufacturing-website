import { Router } from "express";
import { submitInquiry } from "../controllers/inquiry.controller.js";
import { writeLimiter } from "../config/rateLimit.config.js";

const router = Router();

router.post("/inquiries", writeLimiter, submitInquiry);

export default router;
