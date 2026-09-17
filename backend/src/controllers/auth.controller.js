// import { json } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exists"
            })
        }


        //Hash Password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create User

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // find the username
        const user = await User.findOne({ email })
        // if user not found then return the error response
        if (!user) return res.status(401).json({ message: "Invaild Username or password" });

        // if found then compare the password
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) return res.status(401).json({ message: "invaild username or password" })


        // apply jwt 

        const token = jwt.sign({ userId: user._id, username: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token, user:
            {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            Error: error.message,
        })
    }

}

// export const logout = async (req,res)=> {
//     try {
//             res.cookie("jwt","",{maxAge:0});
//             res.status(200).json({message:"Logged Out successfully"});

//         } catch (error) {
//             console.log("Error in logout controller:",error.message)
//             res.status(500).json({
//                 message:"Internal Server Error"
//             });
//         }
// }



