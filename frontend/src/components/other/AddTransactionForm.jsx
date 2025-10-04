import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import useFinanceStore from "../../store/financeStore"; 

const AddTransactionForm = ({ budgets, editingTransaction, setEditingTransaction }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "", // This will be the _id of the category
    type: "",
  });

  const { addTransaction, updateTransaction, loading: financeLoading } = useFinanceStore();

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction?.category?._id || "", // Use _id for category
        type: editingTransaction.type,
      });
    } else {
      setFormData({ title: "", amount: "", category: "", type: "" });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Find the budget object to get its _id for the category field
      const selectedBudget = budgets.find(b => b._id === formData.category);
      if (!selectedBudget) {
        console.error("Selected budget not found.");
        return;
      }

      const transactionData = {
        title: formData.title,
        amount: parseFloat(formData.amount), 
        category: selectedBudget._id, 
        type: formData.type,
      };

      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, transactionData);
        setEditingTransaction(null); 
      } else {
        await addTransaction(transactionData);
      }

      setFormData({ title: "", amount: "", category: "", type: "" }); 
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div
      className="card p-4 shadow-lg form-container"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h2 className="text-center mb-4 h2">
        {editingTransaction ? "Update Transaction" : "Add New Transaction"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-3 mb-3">
          <div className="w-50">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control "
              placeholder="e.g., Coffee"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-50">
            <label htmlFor="amount" className="form-label fw-bold">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              className="form-control "
              placeholder="e.g., 50"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="d-flex gap-3 mb-3">
          <div className="w-50">
            <label htmlFor="type" className="form-label fw-bold">
              Type
            </label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Credit">Credit</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          {Array.isArray(budgets) && budgets.length > 0 && (
            <div className="w-50">
              <label htmlFor="category" className="form-label fw-bold">
                Budget Category
              </label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}> {/* Use _id as value */}
                    {budget.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn form-container-btn w-100 d-flex align-items-center justify-content-center"
          disabled={financeLoading} 
        >
          {financeLoading ? <span>Submitting...</span> : <span>{editingTransaction ? "Update" : "Add"} Transaction</span>}
          <PlusCircleIcon width={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;