import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

const AddExpenseForm = ({setExpenses}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const expenseRef = useRef();
  const amountRef = useRef();
  const budgetRef = useRef();
 

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      expenseRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = (e) => {

    e.preventDefault();
    setIsSubmitting(true);
    const expenseData = {
      name: expenseRef.current.value,
      amount: amountRef.current.value,
      budget: budgetRef.current.value,
      date:  new Date().toLocaleDateString(), //just for checking UI
    };
    setExpenses((prev) => [...prev, expenseData]);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="card p-4 shadow-lg form-container" style={{ width: "100%", maxWidth: "600px" }}>
      <h2 className="text-center mb-4 text-dark">Add New Expense</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="d-flex gap-3 mb-3">
          <div className="w-50">
            <label htmlFor="newExpense" className="form-label fw-bold">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              className="form-control"
              placeholder="e.g., Coffee"
              required
              ref={expenseRef}
            />
          </div>
          <div className="w-50">
            <label htmlFor="newExpenseAmount" className="form-label fw-bold">Amount</label>
            <input
              type="number"
              name="newExpenseAmount"
              id="newExpenseAmount"
              className="form-control"
              placeholder="e.g., 50"
              required
              ref={amountRef}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="newExpenseBudget" className="form-label fw-bold">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" className="form-select" required ref={budgetRef}>
            <option value="groceries">Groceries</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
            <option value="bills">Bills & Utilities</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span className="me-2">Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
