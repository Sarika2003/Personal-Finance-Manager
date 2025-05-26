import { ChartBarIcon } from "@heroicons/react/24/solid";
import expense from "../../assets/expense.png"
import saving from "../../assets/saving.png"

const Overview = ({ budget, transactions, showSavings }) => {
  // Total Expenses
  const totalExpenses = transactions
    .filter(txn => txn.type === "Expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Total Credits (Savings)
  const totalCredits = transactions
    .filter(txn => txn.type === "Credit")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Top Expense
  const topExpense = transactions
    .filter(txn => txn.type === "Expense")
    .reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), transactions[0]);

  // Top Credit
  const topCredit = transactions
    .filter(txn => txn.type === "Credit")
    .reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), transactions[0]);

  // Check for budget exceed
  const exceeded = totalExpenses > budget.amount;
  const exceededAmount = totalExpenses - budget.amount;

  // Check for saving goal complete
  const goalCompleted = totalCredits >= budget.amount;

  return (
    <div className="budget shadow-sm p-3 mt-4" style={{ maxWidth: "800px" }}>
      <h3 className="fw-bold">
        <ChartBarIcon width={25} style={{ marginBottom: "-5px", marginRight: "4px" }} />
        {showSavings ? "Savings Overview" : "Expenses Overview"}
      </h3>

      {/* Expense Overview */}
      {!showSavings && (
        <>
          <p className="text-primary fw-bold mt-4">
            💸 Total Expenses: ₹{totalExpenses}
          </p>

          {exceeded && (
             <>
             <div className="d-flex align-items-center">
            <p className="text-danger fw-bold fs-5">
              ⚠️ You exceeded your budget by ₹{exceededAmount}!
              {topExpense && (
                <> Major spending: <strong>{topExpense.title}</strong> - ₹{topExpense.amount}</>
              )}
            </p>
            <img 
             src={expense} 
             alt="Sad Wallet"
             className="expenseImg"
           />
            </div>
            </>

          )}

          {topExpense ? (
            <p>
              📉 Top Expense: <strong>{topExpense.title}</strong> - ₹{topExpense.amount}
            </p>
          ) : (
            <p>No expenses recorded yet.</p>
          )}
        </>
      )}

      {/* Savings Overview */}
      {showSavings && (
        <>
          <p className="text-success fw-bold mt-4">
            💰 Total Savings: ₹{totalCredits}
          </p>

          {goalCompleted && (
            <>
            <div className="d-flex align-items-center">
            <p className="text-success fw-bold fs-5">
              🎯 Congratulations! You achieved your saving goal of ₹{budget.amount}! 🎉
            </p>
            <img 
             src={saving} 
             alt="Sad Wallet"
             className="savingImg"
           />
            </div>
          </>
          )}

          {topCredit ? (
            <p>
              🏆 Top Saving: <strong>{topCredit.title}</strong> - ₹{topCredit.amount}
            </p>
          ) : (
            <p>No savings recorded yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Overview;
