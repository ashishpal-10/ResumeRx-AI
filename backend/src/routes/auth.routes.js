import express from "express";
import { signup ,login } from "../controllers/auth.controller.js";
import { protectroute } from "../middlewares/auth.middlewares.js";
// import { authenticateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
// router.post("/logout",logout);


router.get("/profile",protectroute, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });

});





export default router;