import express from "express"

import { protectroute } from "../middlewares/auth.middlewares.js"
import { analyseResumeController , getallReports,getSingleReport,deleteReport} from "../controllers/report.controller.js";



const router =express.Router();


router.post(
    "/analyze/:resumeId",
    protectroute,
    analyseResumeController
)

router.get("/",protectroute,getallReports);
router.get("/:id",protectroute,getSingleReport);
router.delete("/:id",protectroute,deleteReport);


export default router;
