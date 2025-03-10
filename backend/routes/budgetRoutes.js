const express = require("express");
const {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} = require("../controllers/budgetController");

const budgetRouter = express.Router();

budgetRouter.get("/", getAllBudgets);
budgetRouter.post("/", createBudget);
budgetRouter.put("/:id", updateBudget);
budgetRouter.delete("/:id", deleteBudget);

module.exports = budgetRouter;
