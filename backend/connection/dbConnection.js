const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB =()=>{

    mongoose
  .connect(process.env.DBURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => {
    console.log(`Error connecting to database: ${e}`);
  });

}

  module.exports=connectToDB;

