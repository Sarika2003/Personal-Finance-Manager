const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const authRouter = express.Router();



//create new user - register
authRouter.post("/register" , async (req,res)=>{
    const {name , email,password} = req.body;
    
    
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.json({ status: 0, message: "Error generating salt", error: err });
        }
    
        bcrypt.hash(password, salt, async function (err, hashedPass) {
            if (err) {
                return res.json({ status: 0, message: "Error hashing password", error: err });
            }
    
            try {
                const newUser = new userModel({ name, email, password: hashedPass });
                await newUser.save();
                res.json({ status: 1, message: "User account created successfully", data: newUser });
            } catch (error) {
                res.json({ status: 0, message: "Error while creating user", error: error });
            }
        });
    });
    
    

})

// loggin in 
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ status: 0, message: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({ status: 0, message: "Error logging in", error: err });
            }

            if (!result) {
                return res.json({ status: 0, message: "Invalid credentials" });
            }
             const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "6d" }
            );

            res.cookie("token", token ,{
                httpOnly: true,   // Prevent access from JavaScript
                secure: false,    // Change to `true` in production with HTTPS
                sameSite: "Lax",  // Ensures cookies are sent with requests
            });
            res.json({ status: 1, message: "Login successful", token });
            
        });

    } catch (e) {
        res.json({ status: 0, message: "Error while logging in", error: e });
    }
});


//update user

//logout user
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ status: 1, message: "Logout successful" });
});


module.exports = authRouter;