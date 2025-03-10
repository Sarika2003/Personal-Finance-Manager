import { Link, useNavigate } from "react-router-dom";
import { BanknotesIcon, ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const BudgetItem = ({ budget, transactions, showDelete = false }) => {
    const navigate = useNavigate();
    const { _id, name, amount } = budget;

    // Filter transactions related to this budget
    const associatedTransactions = transactions.filter(
        (transaction) => transaction.category.name === name
    );

    // Separate expenses and credits
    const totalExpenses = associatedTransactions
        .filter((txn) => txn.type === "Expense")
        .reduce((acc, txn) => acc + txn.amount, 0);

    const totalCredits = associatedTransactions
        .filter((txn) => txn.type === "Credit")
        .reduce((acc, txn) => acc + txn.amount, 0);

    // Adjust budget using credits
    const adjustedBudget = amount + totalCredits;
    const overspending = totalExpenses > adjustedBudget;
    const remainingAmount = adjustedBudget - totalExpenses;

    const handleBudgetDelete = async (id) => {
        try {
            const associatedTransactionIds = transactions
            .filter((txn) => txn.category && txn.category._id === _id)
            .map((txn) => txn._id);
    
            // Delete all transactions in parallel
            await Promise.all(
                associatedTransactionIds.map((txnId) =>
                    axios.delete(`http://localhost:8000/api/transactions/${txnId}`, {
                        withCredentials: true,
                    })
                )
            );
    
            // Delete the budget itself
            await axios.delete(`http://localhost:8000/api/budget/${id}`, {
                withCredentials: true,
            });
    
            navigate("/dashboard");
            showSuccessToast("Budget and all associated transactions deleted successfully");
        } catch (error) {
            console.error("Error deleting budget:", error);
            showErrorToast("Failed to delete budget. Please try again.");
        }
    };
    


    return (
        <div className="card budget-card shadow-sm p-3 mb-4">
            <div className="card-body">
                {/* Title and Budget Info */}
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold">{name}</h5>
                    <div className="text-end">
                        {/* Tooltip for budget exceeded */}
                        {overspending && (
                            <div className="tooltip-container">
                                <ExclamationTriangleIcon width={24} className="text-danger" />
                                <span className="tooltip">Budget Exceeded</span>
                            </div>
                        )}
                        <p className="mb-0 fw-bold">₹{adjustedBudget}</p>
                        <small className="text-muted">Budgeted</small>
                    </div>
                </div>

                {/* Progress Bar - FIXED */}
                <div className="progress my-3" style={{ height: "8px" }}>
                    <div
                        className={`progress-bar ${overspending ? "bg-danger" : "custom-progress-bar"}`}
                        role="progressbar"
                        style={{
                            width: adjustedBudget > 0
                                ? `${(totalExpenses / adjustedBudget) * 100}%`
                                : "0%",
                        }}
                        aria-valuenow={totalExpenses}
                        aria-valuemin="0"
                        aria-valuemax={adjustedBudget}
                    ></div>
                </div>

                {/* Spent & Remaining Amount */}
                <div className="d-flex justify-content-between text-muted">
                    <small className="fw-bold">₹{totalExpenses} spent</small>
                    <small className={overspending ? "text-danger fw-bold" : "text-muted"}>
                        {overspending ? `₹${Math.abs(remainingAmount)} over` : `₹${remainingAmount} remaining`}
                    </small>
                </div>

                {/* Buttons */}
                {showDelete ? (
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-danger w-full" onClick={() => handleBudgetDelete(_id)}>
                            <TrashIcon width={16} className="me-1" />
                            Delete
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
