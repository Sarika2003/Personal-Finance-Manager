const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ status: 0, message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Decoded User from Token:", decoded);  
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ status: 0, message: "Token has expired. Please login again." });
        }
        res.status(401).json({ status: 0, message: "Invalid Token" });
    }
};

module.exports= verifyToken;
