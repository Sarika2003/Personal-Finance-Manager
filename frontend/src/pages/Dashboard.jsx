import { useState, useEffect } from "react";

import AddBudgetForm from "../components/other/AddBudgetform";
import AddTransactionForm from "../components/other/AddTransactionForm";
import TransactionTable from "../components/other/TransactionTable";
import BudgetItem from "../components/other/BudgetItem";
import useFinanceStore from "../store/financeStore";
import { ArrowPathIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const {
    budgets,
    transactions,
    loading,
    fetchBudgetsAndTransactions,
    addBudget,
    addTransaction,
    updateTransaction,
  } = useFinanceStore();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showSavings, setShowSavings] = useState(false);

  useEffect(() => {
    fetchBudgetsAndTransactions();
  }, [fetchBudgetsAndTransactions]);

  const handleTransactionCreated = async (newTransactionData) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, newTransactionData);
      } else {
        await addTransaction(newTransactionData);
      }
      setEditingTransaction(null); // Clear editing state after creation/update
    } catch (error) {
      console.error("Error creating/updating transaction:", error);
    }
  };

  const handleBudgetCreated = async (newBudget) => {
    try {
      await addBudget(newBudget);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-4">
        <h1 className="dashboard-heading text-center">
          <span className="highlight">Small steps</span>, big savings!
        </h1>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap gap-5 mt-5">
        <AddBudgetForm handleBudgetCreated={handleBudgetCreated} />
        <AddTransactionForm
          handleTransactionCreated={handleTransactionCreated}
          budgets={budgets}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
        />
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">Fetching data...</p>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <h2 className="fw-bold fs-1 mb-4 mx-4">Existing Budgets</h2>
              <button
                className="btn btn-outline-dark mb-3 py-1 d-flex align-items-center"
                onClick={() => setShowSavings(!showSavings)}
              >
                {showSavings ? (
                  <CurrencyDollarIcon className="me-1" width={18} />
                ) : (
                  <ArrowPathIcon className="me-1" width={18} />
                )}

                <span className="d-none d-md-inline">
                  {showSavings ? " Expense Budgets" : " Saving Budgets"}
                </span>
              </button>
            </div>

            <div className="d-flex flex-wrap gap-3 align-items-center ">
              {budgets.length > 0 ? (
                budgets.map((budget) => (
                  <BudgetItem
                    key={budget._id}
                    budget={budget}
                    transactions={transactions}
                    showSavings={showSavings}
                  />
                ))
              ) : (
                <div className="center-message">
                  <p className="text-light fs-5 m-0">No budgets added yet.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="fw-bold fs-1 mb-4">Recent Transactions</h2>
            {transactions.length > 0 ? (
              <TransactionTable
                transactions={transactions} // Pass transactions from store
                setEditingTransaction={setEditingTransaction}
              />
            ) : (
              <p className="text-light fs-5 text-center">
                No recent transactions
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
