import { useEffect, useRef, useState } from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div
      className="card p-4 shadow-lg flex-grow-1 form-container"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h2 className="text-center mb-4 text-dark">Create Budget</h2>
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
