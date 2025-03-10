const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPass });
        await newUser.save();

        res.json({ status: 1, message: "User account created successfully", data: newUser });
    } catch (error) {
        res.json({ status: 0, message: "Error while creating user", error });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ status: 0, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: 0, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "6d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Change to true in production
            sameSite: "Lax",
        });

        res.json({ status: 1, message: "Login successful", token });

    } catch (error) {
        res.json({ status: 0, message: "Error while logging in", error });
    }
};

// Logout User
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ status: 1, message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
