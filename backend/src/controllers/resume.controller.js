import Resume from "../models/resume.model.js"

import { extractResumeText } from "../services/parserService.js"

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        const extractedText = await extractResumeText(req.file);

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                message: "Could not Extract text from this resume"
            });
        }

        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            extractedText,
        });

        res.status(201).json({
            success:true,
            message:"Resume Uploaded and processes successfully",
            resume:{
                id:resume._id,
                originalName:resume.originalName,
                extractedText:resume.extractedText,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Resume Processing failed",
            error: error.message,
        })
    }
}

