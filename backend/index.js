const express = require("express");
const connectToDB = require("./connection/dbConnection");
const budgetRouter = require("./routes/budgetRoutes")
const transactionRouter = require("./routes/transactionRoutes")
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
    origin: "http://localhost:5173", // Make sure this matches frontend URL
  },
}); 

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io; // Attach socket.io instance to req object
  next();
});
 
app.use("/api/budget/" , budgetRouter);
app.use("/api/transaction/" , transactionRouter);



server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at port " + process.env.PORT)
);

 module.exports = {io};
