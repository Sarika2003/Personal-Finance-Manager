const express = require("express");
const connectToDB = require("./connection/dbConnection");
const budgetRouter = require("./routes/budgetRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const authRouter = require("./routes/authRoutes");
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();
const cors = require("cors");

// connect to mongodb
connectToDB();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/budget", verifyToken, budgetRouter);
app.use("/api/transaction", verifyToken, transactionRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname , "../frontend" ,"dist" , "index.html"));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running at port " + PORT));
