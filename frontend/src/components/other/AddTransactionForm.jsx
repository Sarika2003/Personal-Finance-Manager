import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { showFailureToast, showSuccessToast } from "../../utils/toastConfig";

const AddTransactionForm = ({ handleTransactionCreated, budgets ,editingTransaction,setEditingTransaction }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction?.category?.name || "", // Prevent error if category is null
        type: editingTransaction.type,
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      if (editingTransaction) {
      const response=  await axios.put(
          `http://localhost:8000/api/transaction/${editingTransaction._id}`,
          formData,
          { withCredentials: true }
        );
        setEditingTransaction(null); 
        handleTransactionCreated(response.data.data); 
        showSuccessToast("Transaction updated successfully");
      } else {
      const response=  await axios.post(
          "http://localhost:8000/api/transaction",
          formData,
          { withCredentials: true }
        );

        handleTransactionCreated(response.data.data);
        showSuccessToast("Transaction created successfully");
      }
      
      
      setFormData({ title: "", amount: "", category: "", type: "" });

    } catch (error) {
      showFailureToast("Something went wrong");
      console.error("Error submitting transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div
      className="card p-4 shadow-lg form-container"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h2 className="text-center mb-4 text-dark">
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
              className="form-control"
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
              className="form-control"
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
                  <option key={budget._id} value={budget.name}>
                    {budget.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 d-flex align-items-center justify-content-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <span>Submitting...</span> : <span>{editingTransaction ? "Update" : "Add"} Transaction</span>}
          <PlusCircleIcon width={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;