const express = require("express");
const budgetModel = require("../models/budget");


const budgetRouter = express.Router();

// Get All Budgets
budgetRouter.get("/", async (req, res) => {
  try {
    const userId = req.user._id; 
    const budgets = await budgetModel.find({ userId });
    res.json({ status: 1, message: "User-specific budgets", data: budgets });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error fetching budgets", error: error.message });
  }

});

// Create a New Budget
budgetRouter.post("/",async (req, res) => {
  console.log("Request Body:", req.body);  // Debugging
  console.log("User ID from Token:", req.user);  // Debugging
  try {
    const { name, amount } = req.body;

    const userId = req.user._id;
    // Validate input
    if (!name || !amount) {
      return res.status(400).send({ status: 0, message: "Name and amount are required." });
    }

    const newBudget = new budgetModel({ name, amount ,userId });

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

  try {
    const budgetId = req.params.id;
    const { name, amount } = req.body;
    const userId = req.user._id; 

    const budget = await budgetModel.findOne({ _id: budgetId, userId });

    if (!budget) {
      return res.status(403).json({ status: 0, message: "Unauthorized to update this budget" });
    }

    budget.name = name;
    budget.amount = amount;
    await budget.save();

    req.io.emit("budgetUpdated");
    res.status(200).json({ status: 1, message: "Budget updated successfully", data: budget });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error updating budget", error: error.message });
  }
});

//delete budget

budgetRouter.delete("/:id" , async(req,res)=>{

  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await budgetModel.findOne({ _id: budgetId, userId });

    if (!budget) {
      return res.status(403).json({ status: 0, message: "Unauthorized to delete this budget" });
    }

    await budgetModel.deleteOne({ _id: budgetId });

    req.io.emit("budgetUpdated");
    res.status(200).json({ status: 1, message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error deleting budget", error: error.message });
  }
})
module.exports= budgetRouter;
