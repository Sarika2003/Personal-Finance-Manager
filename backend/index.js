const express = require("express");
const connectToDB = require("./connection/dbConnection");
const budgetRouter = require("./routes/budgetRoutes")
const transactionRouter = require("./routes/transactionRoutes")
const authRouter = require("./routes/authRoutes")
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const cors = require('cors');

const http = require("http");
const { Server } = require("socket.io");

//connect to mongodb
 connectToDB();


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    credentials: true,
  },

}); 

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io; 
  next();
});

app.use("/api/auth/" , authRouter);
 
app.use("/api/budget/" ,verifyToken, budgetRouter);
app.use("/api/transaction/" ,verifyToken, transactionRouter);



server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at port " + process.env.PORT)
);

 module.exports = {io};
