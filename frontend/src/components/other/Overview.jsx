import { ChartBarIcon } from "@heroicons/react/24/solid";

const Overview = ({ budget, transactions }) => {
  // Separate expenses and credits
  const totalExpenses = transactions
    .filter(txn => txn.type === "Expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalCredits = transactions
    .filter(txn => txn.type === "Credit")
    .reduce((acc, txn) => acc + txn.amount, 0);

  // Adjust budget using available credits
  const adjustedBudget = budget.amount + totalCredits;
  const overspending = totalExpenses > adjustedBudget;

  // Identify the top expense and top credit transaction
  const topExpense = transactions
    .filter(txn => txn.type === "Expense")
    .reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), transactions[0]);

  const topCredit = transactions
    .filter(txn => txn.type === "Credit")
    .reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), transactions[0]);

  return (
    <div className="budget shadow-sm p-3 mt-4" style={{ maxWidth: "800px" }}>
      <h3 className="fw-bold">
        <ChartBarIcon width={25} style={{ marginBottom: "-5px", marginRight: "4px" }} />
        Expenses Overview
      </h3>

      {/* Expense Summary */}
      {overspending ? (
        <p className="text-danger fw-bold">
          ⚠️ Your <strong>{budget.name}</strong> budget has been exceeded by ₹{Math.abs(adjustedBudget - totalExpenses)}.
        </p>
      ) : (
        <p className="text-success fw-bold">
          ✅ You are within your budget! Your remaining balance is ₹{adjustedBudget - totalExpenses}. 🎉
        </p>
      )}

      {topExpense && (
        <p>
          💸 The top expense was <strong>{topExpense.title}</strong> with a total of ₹{topExpense.amount} spent.
        </p>
      )}

      {/* Credit Summary */}
      {totalCredits > 0 && (
        <>
          <h4 className="fw-bold mt-3">Credits Overview</h4>
          <p className="text-primary fw-bold">
            💰 Total credited: ₹{totalCredits}
          </p>
          {topCredit && (
            <p>
              🏆 The highest credited transaction was <strong>{topCredit.title}</strong> with ₹{topCredit.amount} added.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Overview;
