const transactionModel = require("../models/transaction");
const budgetModel = require("../models/budget");

// Get All Transactions with Budget Details
const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await transactionModel
      .find({ userId })
      .populate({
        path: "category",
        model: "budget",
      });

    res.json({ status: 1, message: "User-specific transactions", data: transactions });
  } catch (e) {
    res.status(500).json({ status: 0, message: "Error while fetching transactions", error: e.message });
  }
};

// Add a New Transaction Linked to a Budget
const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;
    const userId = req.user._id;

    const budget = await budgetModel.findOne({ name: category, userId });
    if (!budget) return res.status(400).json({ error: "Invalid budget category for user" });

    const transaction = new transactionModel({
      userId,
      title,
      amount,
      category: budget._id,
      type,
    });

    await transaction.save();
    req.io.emit("transactionUpdated");

    res.status(201).json({ status: 1, message: "New transaction created", data: transaction });
  } catch (e) {
    res.status(500).json({ status: 0, message: "Error while creating transaction", error: e.message });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transactionID = req.params.id;
    const { title, amount, category, type } = req.body;
    const userId = req.user._id;

    const budget = await budgetModel.findOne({ name: category, userId });
    if (!budget) return res.status(400).json({ error: "Invalid budget category for user" });

    const transaction = await transactionModel.findOne({ _id: transactionID, userId });
    if (!transaction) {
      return res.status(403).json({ status: 0, message: "Unauthorized to update this transaction" });
    }

    transaction.title = title;
    transaction.amount = amount;
    transaction.category = budget._id;
    transaction.type = type;

    await transaction.save();
    req.io.emit("transactionUpdated");

    res.status(200).json({ status: 1, message: "Transaction updated successfully", data: transaction });
  } catch (e) {
    res.status(500).json({ status: 0, message: "Error while updating transaction", error: e.message });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transactionID = req.params.id;
    const userId = req.user._id;

    const transaction = await transactionModel.findOne({ _id: transactionID, userId });
    if (!transaction) {
      return res.status(403).json({ status: 0, message: "Unauthorized to delete this transaction" });
    }

    await transactionModel.deleteOne({ _id: transactionID });
    req.io.emit("transactionUpdated");

    res.status(200).json({ status: 1, message: "Transaction deleted successfully" });
  } catch (e) {
    res.status(500).json({ status: 0, message: "Error deleting transaction", error: e.message });
  }
};

module.exports = { getAllTransactions, createTransaction, updateTransaction, deleteTransaction };
