const mongoose  = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
  },
  amount:{
    type:Number,
    required:true,
  },
  createdAt: { 
    type: Date, 
    default:() => Date.now(), 
} ,
});


const budgetModel = mongoose.model("budget" , budgetSchema);

module.exports=budgetModel ;