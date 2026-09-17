import "dotenv/config";
import express from "express"
import ConnectDB from "./config/db.js";

import app from "./app.js";



const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`Server is running at http://localhost:${PORT}`))