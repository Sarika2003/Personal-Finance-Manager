import { Link, useNavigate } from "react-router-dom";
import { BanknotesIcon, ExclamationTriangleIcon, TrashIcon, SparklesIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastConfig";

const BudgetItem = ({ budget, transactions, showSavings, showDelete = false }) => {
    const navigate = useNavigate();
    const { _id, name, amount } = budget;

    // Filter transactions related to this budget
    const associatedTransactions = transactions.filter(
        (transaction) => transaction.category.name === name
    );
    const hasCreditTransaction = associatedTransactions.some(txn => txn.type === "Credit");
    const hasExpenseTransaction = associatedTransactions.some(txn => txn.type === "Expense");

    // Conditionally skip rendering if no transactions of relevant type
    if (showSavings && !hasCreditTransaction) return null;
    if (!showSavings && !hasExpenseTransaction) return null;

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
            const associatedTransactionIds = transactions
                .filter((txn) => txn.category && txn.category._id === _id)
                .map((txn) => txn._id);

            await Promise.all(
                associatedTransactionIds.map((txnId) =>
                    axios.delete(`http://localhost:8000/api/transaction/${txnId}`, {
                        withCredentials: true,
                    })
                )
            );

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
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold">{name}</h5>
                    <div className="text-end">
                        {showSavings ? (
                            savingsPositive && (
                                <div className="tooltip-container">
                                    <SparklesIcon width={24} className="text-warning" />
                                    <span className="tooltip">Goal Achieved!</span>
                                </div>
                            )
                        ) : (
                            overspending && (
                                <div className="tooltip-container">
                                    <ExclamationTriangleIcon width={24} className="text-danger" />
                                    <span className="tooltip">Budget Exceeded</span>
                                </div>
                            )
                        )}

                        <p className="mb-0 fw-bold">₹{amount}</p>
                        <small className="text-muted">Budgeted</small>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress my-3" style={{ height: "8px" }}>
                    <div
                        className={`progress-bar ${
                            showSavings
                                ? (savingsPositive ? "bg-success" : "custom-progress-bar")
                                : (overspending ? "bg-danger" : "custom-progress-bar")
                        }`}
                        role="progressbar"
                        style={{
                            width: amount > 0
                                ? `${(showSavings
                                    ? (totalCredits / amount) * 100
                                    : (totalExpenses / amount) * 100)}%`
                                : "0%",
                        }}
                        aria-valuenow={showSavings ? totalCredits : totalExpenses}
                        aria-valuemin="0"
                        aria-valuemax={amount}
                    ></div>
                </div>

                {/* Info Below Progress */}
                <div className="d-flex justify-content-between text-muted">
                    {showSavings ? (
                        <>
                            <small className="fw-bold">₹{totalCredits} saved</small>
                            <small className={savingsPositive ? "text-success fw-bold" : "text-muted"}>
                                {savingsPositive
                                    ? "Goal Completed 🎉"
                                    : `₹${savingsLeft} remaining`}
                            </small>
                        </>
                    ) : (
                        <>
                            <small className="fw-bold">₹{totalExpenses} spent</small>
                            <small className={overspending ? "text-danger fw-bold" : "text-muted"}>
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
