const express = require("express");
const transactionModel = require("../models/transaction.js");
const budgetModel = require("../models/budget.js");

const transactionRouter = express.Router();

//  Get transaction with Budget Details
transactionRouter.get("/", async (req, res) => {
  try {
    const transactions = await transactionModel.find().populate("category"); 
    res.json({ status: 1, message: "transaction list", data: transactions });
  } catch (e) {
    res.json({ status: 0, message: "error while getting transactions", error: e });
  }
});

//  Add a New transaction Linked to a Budget
transactionRouter.post("/", async (req, res) => {
  const { title, amount, category, type } = req.body;
  const budget = await budgetModel.findOne({ name: category });
  if (!budget) return res.status(400).json({ error: "Invalid budget category" });

  const transaction = new transactionModel({
    title,
    amount,
    category: budget._id,
    type
  });

  try {
    await transaction.save();
    req.io.emit("transactionUpdated"); 
    res.status(201).json({ status: 1, message: "new transaction created", data: transaction});
  } catch (e) {
    res.status(500).json({ status: 0, message: "error while creating transaction", error: e });
  }
});

//update transaction 
transactionRouter.put("/:id" , async (req,res)=>{
  try{
 const transactionID =  req.params.id;
 const { title, amount, category, type } = req.body;

 const budget = await budgetModel.findOne({ name: category });
  if (!budget) return res.status(400).json({ error: "Invalid budget category" });

 const updatedObj ={ 
  title , amount , category:budget._id , type
 }
 const updatedRes = await transactionModel.findByIdAndUpdate(transactionID, updatedObj, { new: true });
 req.io.emit("transactionUpdated"); 

 res.status(200).json({status:1, message: "transaction updated successfully" , data:updatedRes})
  }catch(e){
    res.status(500).json({status:0 , message:"error while updating transaction" , error:e})
  }

});

transactionRouter.delete("/:id" , async (req,res)=>{

  try{
const transactionID = req.params.id;
const deletedObj = await transactionModel.deleteOne({_id:transactionID});
req.io.emit("transactionUpdated"); 

res.status(200).json({status:1, message:"transaction deleted successfully"  , data:deletedObj})
  }catch(e){
    res.status(500).json({status:0, message:"error deleting transaction" , error:e})
  }
})

module.exports = transactionRouter;
