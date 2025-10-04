import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon, TrophyIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const Overview = ({ budget, transactions, showSavings }) => {
  // Total Expenses
  const totalExpenses = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Total Credits (Savings)
  const totalCredits = transactions
    .filter((txn) => txn.type === "Credit")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Top Expense
  const topExpense = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce(
      (prev, curr) => (curr.amount > prev.amount ? curr : prev),
      { title: "-", amount: 0 }
    );

  // Top Credit
  const topCredit = transactions
    .filter((txn) => txn.type === "Credit")
    .reduce(
      (prev, curr) => (curr.amount > prev.amount ? curr : prev),
      { title: "-", amount: 0 }
    );

  // Budget status
  const exceeded = totalExpenses > budget.amount;
  const exceededAmount = totalExpenses - budget.amount;
  const goalCompleted = totalCredits >= budget.amount;

  return (
    <div className="budget-card p-4 mt-4 overview-card">
      {/* Header */}
      <h3 className="fw-bold d-flex align-items-center mb-4">
        <ChartBarIcon width={28} className="me-2 text-primary" />
        {showSavings ? "Savings Overview" : "Expenses Overview"}
      </h3>

      {/* Total */}
      <p className={`fw-bold mb-3 ${showSavings ? 'text-success-themed' : 'text-primary'}`}>
        {showSavings ? 'Total Savings' : 'Total Expenses'}: ₹{showSavings ? totalCredits : totalExpenses}
      </p>

      {/* Status */}
      {!showSavings && exceeded && (
        <div className="d-flex align-items-center mb-3">
          <ExclamationTriangleIcon width={22} className="me-2 text-danger-themed" />
          <p className="text-danger-themed fw-bold mb-0">
            You exceeded your budget by ₹{exceededAmount}
          </p>
        </div>
      )}

      {showSavings && goalCompleted && (
        <div className="d-flex align-items-center mb-3">
          <TrophyIcon width={22} className="me-2 text-success-themed" />
          <p className="text-success-themed fw-bold mb-0">
            Goal Achieved! ₹{budget.amount} saved
          </p>
        </div>
      )}

      {/* Top Item */}
      {!showSavings && totalExpenses > 0 && (
        <p className="mb-2 d-flex align-items-center">
          <ArrowDownIcon width={20} className="me-2 text-primary" />
          Top Expense: <strong>{topExpense.title}</strong> - ₹{topExpense.amount}
        </p>
      )}
      {showSavings && totalCredits > 0 && (
        <p className="mb-2 d-flex align-items-center">
          <ArrowUpIcon width={20} className="me-2 text-success-themed" />
          Top Saving: <strong>{topCredit.title}</strong> - ₹{topCredit.amount}
        </p>
      )}

      {/* Fallback */}
      {!showSavings && totalExpenses === 0 && <p>No expenses recorded yet.</p>}
      {showSavings && totalCredits === 0 && <p>No savings recorded yet.</p>}
    </div>
  );
};

export default Overview;
