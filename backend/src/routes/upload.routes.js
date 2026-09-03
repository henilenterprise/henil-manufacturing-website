import { Router } from "express";
import { uploadMiddleware, postUploadSignatureCheck } from "../middleware/upload.middleware.js";
import { getUploadConfig, handleUpload } from "../controllers/upload.controller.js";
import { writeLimiter } from "../config/rateLimit.config.js";

const router = Router();

// Lets the frontend fetch the real, current server-side limits at runtime
// rather than duplicating them and risking drift.
router.get("/uploads/config", getUploadConfig);

router.post("/uploads", writeLimiter, (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      // multer errors (file too large, too many files) and our own
      // fileFilter errors both land here.
      return res.status(400).json({ status: "error", message: err.message });
    }

    // Content-based check, now that multer has actually buffered the
    // files — catches a renamed/spoofed file that passed the
    // filename+claimed-Content-Type check above. See
    // middleware/upload.middleware.js's postUploadSignatureCheck for
    // why this can't happen any earlier in the pipeline.
    const signatureError = postUploadSignatureCheck(req.files || []);
    if (signatureError) {
      return res.status(400).json({ status: "error", message: signatureError.message });
    }

    next();
  });
}, handleUpload);

export default router;
