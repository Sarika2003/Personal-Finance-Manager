import { Link, useNavigate } from "react-router-dom";
import {
  BanknotesIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import useFinanceStore from "../../store/financeStore";

const BudgetItem = ({
  budget,
  transactions,
  showSavings,
  showDelete = false,
}) => {
  const navigate = useNavigate();
  const { _id, name, amount } = budget;
  const deleteBudget = useFinanceStore((state) => state.deleteBudget);
  const financeLoading = useFinanceStore((state) => state.loading);

  // Filter transactions related to this budget
  const associatedTransactions = transactions.filter(
    (transaction) => transaction.category?._id === _id
  );

  // Separate expenses and credits
  const totalExpenses = associatedTransactions
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalCredits = associatedTransactions
    .filter((txn) => txn.type === "Credit")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // for expense
  const overspending = totalExpenses > amount;
  const remainingAmount = amount - totalExpenses;

  // For savings;
  const savingsPositive = totalCredits >= amount;
  const savingsLeft = amount - totalCredits;

  const handleBudgetDelete = async (id) => {
    try {
      await deleteBudget(id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting budget in component:", error);
    }
  };

  return (
    <div className="card budget-card shadow-sm p-3 mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title fw-bold text-heading">{name}</h5>
          <div className="text-end">
            {showSavings
              ? savingsPositive && (
                  <div className="tooltip-container">
                    <span className="tooltip">Goal Achieved!</span>
                  </div>
                )
              : overspending && (
                  <div className="tooltip-container">
                    <ExclamationTriangleIcon
                      width={24}
                      className="text-danger"
                    />
                    <span className="tooltip">Budget Exceeded</span>
                  </div>
                )}

            <p className="mb-0 fw-bold text-light">₹{amount}</p>
            <small className="text-light opacity-75">Budgeted</small>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress custom-progress my-3">
          <div
            className={`progress-bar ${
              showSavings
                ? savingsPositive
                  ? "bg-success-themed"
                  : "custom-progress-bar"
                : overspending
                ? "bg-danger-themed"
                : "custom-progress-bar"
            }`}
            role="progressbar"
            style={{
              width:
                amount > 0
                  ? `${
                      showSavings
                        ? (totalCredits / amount) * 100
                        : (totalExpenses / amount) * 100
                    }%`
                  : "0%",
            }}
            aria-valuenow={showSavings ? totalCredits : totalExpenses}
            aria-valuemin="0"
            aria-valuemax={amount}
          ></div>
        </div>

        {/* Info Below Progress */}
        <div className="d-flex justify-content-between">
          {showSavings ? (
            <>
              <small className="fw-bold text-light">
                ₹{totalCredits} saved
              </small>
              <small
                className={`fw-bold ${
                  savingsPositive ? "text-success-themed" : "text-light-themed"
                }`}
              >
                {savingsPositive
                  ? "Goal Completed"
                  : `₹${savingsLeft} remaining`}
              </small>
            </>
          ) : (
            <>
              <small className="fw-bold text-light">
                ₹{totalExpenses} spent
              </small>
              <small
                className={`fw-bold ${
                  overspending ? "text-danger-themed" : "text-light-themed"
                }`}
              >
                {overspending
                  ? `₹${Math.abs(remainingAmount)} over`
                  : `₹${remainingAmount} remaining`}
              </small>
            </>
          )}
        </div>

        {/* Buttons */}
        {showDelete ? (
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn text-danger-themed border w-100" 
              onClick={() => handleBudgetDelete(_id)}
              disabled={financeLoading}
            >
              <TrashIcon width={16} className="me-1" />
              {financeLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        ) : (
          <div className="text-center mt-3">
            <Link to={`/budget/${_id}`} className="btn btn-sm view-details-btn">
              <BanknotesIcon width={16} className="me-1" />
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;
