const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async ()=>{

   try{
    const conn = await mongoose.connect(process.env.DBURL);
    console.log(`Mongoose Connected: ${conn.connection.host}`);
  

   }catch(e){
    console.log("Error in connecting to MongoDB" ,e);
    process.exit(1);
   }

}

module.exports= connectToDB;

 

