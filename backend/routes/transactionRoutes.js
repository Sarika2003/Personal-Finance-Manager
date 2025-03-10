const express = require("express");
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.get("/", getAllTransactions);
transactionRouter.post("/", createTransaction);
transactionRouter.put("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;
