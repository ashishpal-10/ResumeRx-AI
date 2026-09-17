import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import  ConnectDB  from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import reportRoutes from "./routes/report.routes.js"
import { protectroute } from "./middlewares/auth.middlewares.js";
// import  protectroute  from "./middlewares/auth.middlewares.js";
// import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config(); 
ConnectDB();



const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"AI Resume Roster"
    })
})

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({limit:"50mb"}));

// Routes

app.use("/api/auth",authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/reports",reportRoutes)



// app.get("/profile",protectroute, (req, res) => {

//     res.json({
//         success: true,
//         user: req.user
//     });

// });

export default app;