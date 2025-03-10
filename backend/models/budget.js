const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

budgetSchema.index({ name: 1, userId: 1 }, { unique: true });

const budgetModel = mongoose.model("budget", budgetSchema);

module.exports = budgetModel;
