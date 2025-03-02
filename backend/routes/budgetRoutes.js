const express = require("express");
const budgetModel = require("../models/budget");


const budgetRouter = express.Router();

// Get All Budgets
budgetRouter.get("/", async (req, res) => {
  const budgets = await budgetModel.find();
  res.json({ status: 1, message: "Budget list", data: budgets });
});

// Create a New Budget
budgetRouter.post("/", async (req, res) => {
  try {
    const { name, amount } = req.body;

    // Validate input
    if (!name || !amount) {
      return res.status(400).send({ status: 0, message: "Name and amount are required." });
    }

    const newBudget = new budgetModel({ name, amount });

    await newBudget.save();
    
    req.io.emit("budgetUpdated");
    
    return res.status(201).send({
      status: 1,
      message: "New budget created successfully",
      data: newBudget,
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: "Error while saving budget",
      error: error.message,
    });
  }
});


//update budget
budgetRouter.put("/:id" , async(req,res)=>{

  try{
    const budgetId = req.params.id;
    const {name , amount} = req.body;

     const updatedObj = {name , amount};

     const updatedRes= await budgetModel.findByIdAndUpdate({_id:budgetId} , updatedObj);
     req.io.emit("budgetUpdated");
     res.status(201).json({status:1 , message: "budget updated successfully" ,data: updatedRes});
  }catch(e){
    res.status(500).json({status:0 , messsage :"error updating budget" , error:e});
  }
});

//delete budget

budgetRouter.delete("/:id" , async(req,res)=>{

  try{
    const budgetId= req.params.id;
     const deleteObj = await budgetModel.deleteOne({_id:budgetId});
     req.io.emit("budgetUpdated");
     res.status(200).json({status:1 , message: "budget deleted successfully" ,data:deleteObj})

  }catch(e){
    res.status(500).json({status:0 , message:"error deleting budget", error:e});
  }
})
module.exports= budgetRouter;
