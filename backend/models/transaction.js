const mongoose  = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  amount:{
    type:Number,
    required:true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"budget",
    required:true,
  },
  type:{
    type:String,
    required:true,
  },
  createdAt: { 
    type: Date, 
    default: () => new Date().toLocaleDateString('en-GB'),
} ,
});


const transactionModel = mongoose.model("transaction" , transactionSchema);

module.exports=transactionModel ;