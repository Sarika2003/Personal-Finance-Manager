const budgetModel = require("../models/budget");

// Get All Budgets
const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user._id;
    const budgets = await budgetModel.find({ userId });
    res.json({ status: 1, message: "User-specific budgets", data: budgets });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error fetching budgets", error: error.message });
  }
};

// Create a New Budget
const createBudget = async (req, res) => {

    console.log("createBudget: req.body", req.body); // Check what's received
  console.log("createBudget: req.user", req.user); 
  try {
    const { name, amount } = req.body;
    const userId = req.user._id;

    if (!name || !amount) {
      return res.status(400).send({ status: 0, message: "Name and amount are required." });
    }

    const newBudget = new budgetModel({ name, amount, userId });
    await newBudget.save();


    return res.status(201).json({
      status: 1,
      message: "New budget created successfully",
      data: newBudget,
    });
  } catch (error) {
    // Check for Mongoose duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(409).json({ // 409 Conflict indicates resource already exists
        status: 0,
        message: "A budget with this name already exists for your account.",
        error: error.message,
      });
    }

    // Generic 500 for other unexpected errors
    return res.status(500).json({ // Changed .send to .json for consistency
      status: 0,
      message: "Error while saving budget",
      error: error.message,
    });
  }
};

// Update Budget
const updateBudget = async (req, res) => {
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


    res.status(200).json({ status: 1, message: "Budget updated successfully", data: budget });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error updating budget", error: error.message });
  }
};

// Delete Budget
const deleteBudget = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await budgetModel.findOne({ _id: budgetId, userId });

    if (!budget) {
      return res.status(403).json({ status: 0, message: "Unauthorized to delete this budget" });
    }

    await budgetModel.deleteOne({ _id: budgetId });

    res.status(200).json({ status: 1, message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Error deleting budget", error: error.message });
  }
};

module.exports = { getAllBudgets, createBudget, updateBudget, deleteBudget };
