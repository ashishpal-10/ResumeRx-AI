import Resume from "../models/resume.model.js";
import Report from "../models/report.model.js";

import { analyseResume } from "../services/aiService.js";

export const analyseResumeController = async (req, res) => {
    try {

        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user.id,
        });


        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }


        const analysis = await analyseResume(resume.extractedText);

        const report = await Report.create({
            user: req.user.id,
            resume: resume._id,
            ...analysis,
        });


        res.status(201).json({
            success: true,
            message: "Resume analysed Successfully",
            report,
        });


    } catch (error) {
        console.log("error analysis resume :", error)
        res.status(500).json({

            success: false,
            message: "failed to analyse resume",
            error: error.message,

        })
    }
}



// get all Reports

export const getallReports = async (req, res) => {
    try {
        const reports = await Report.find({
            user: req.user.id,
        }).populate("resume", "originalName").sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            reports,
            count: reports.length,

        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}



export const getSingleReport = async (req, res) => {
    try {

        const { id } = req.params;

        const report = await Report.findOne({
            _id: id,
            user: req.user.id,

        }).populate("resume", "originalName extractedText");


        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not Found",

            });
        }

        res.status(200).json({
            success: true,
            message: "Report Fetch Successfull",
            report,
        })



    } catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        })
    }
}


export const deleteReport = async (req, res) => {
    try {

        const { id } = req.params;

        const isexist = await Report.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!isexist) {
            return res.status(404).json({
                success: false,
                message: "Report Not Found",
            });
        }

        await Report.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Report Deleted Successfully ✅",

        })


    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
        })
    }
}


