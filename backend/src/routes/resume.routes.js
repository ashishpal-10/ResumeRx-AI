import express from "express"
import multer from "multer"
import { protectroute } from "../middlewares/auth.middlewares.js"
import upload from "../middlewares/upload.middlewares.js"
// import protectroute from "../middlewares/auth.middlewares.js"
import { uploadResume } from "../controllers/resume.controller.js"


const router = express.Router()

router.post("/upload", protectroute,
    upload.single("resume"),
    uploadResume)

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ success: false, message: "File too large. Maximum size is 5MB." });
        }
        return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
    next();
});

export default router;