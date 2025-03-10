import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { showSuccessToast } from "../../utils/toastConfig";

const AddBudgetForm = ({ handleBudgetCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 
  const formRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    setTimeout(() => focusRef.current?.focus(), 100); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); 

    const newBudget = {
      name: formRef.current.budgetName.value,
      amount: formRef.current.budgetAmount.value,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/budget", newBudget,{
        withCredentials: true, 
      });
      handleBudgetCreated(response.data.data);
      showSuccessToast("Budget created successfully")
      formRef.current.reset();
    } catch (error) {
      console.error("Error adding budget:", error);
      setError("Budget already exists. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="card p-4 shadow-lg flex-grow-1 form-container"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h2 className="text-center mb-3 text-dark">Create Budget</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-3">
          <label htmlFor="budgetName" className="form-label fw-bold">
            Budget Name
          </label>
          <input
            type="text"
            name="budgetName"
            id="budgetName"
            className="form-control"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="budgetAmount" className="form-label fw-bold">
            Amount
          </label>
          <input
            type="number"
            name="budgetAmount"
            id="budgetAmount"
            className="form-control"
            placeholder="e.g., 500"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 d-flex align-items-center justify-content-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyRupeeIcon width={20} className="ms-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
