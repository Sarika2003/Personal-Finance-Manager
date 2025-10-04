import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BudgetItem from "../components/other/BudgetItem";
import AddTransactionForm from "../components/other/AddTransactionForm";
import TransactionTable from "../components/other/TransactionTable";
import Overview from "../components/other/Overview";
import useFinanceStore from "../store/financeStore";

const BudgetPage = () => {
  const { _id } = useParams();
  const {
    budgets,
    transactions,
    loading,
    fetchBudgetsAndTransactions,
    addTransaction,
    updateTransaction,
  } = useFinanceStore();
  const [editingTransaction, setEditingTransaction] = useState(null);

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
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error creating/updating transaction:", error);
    }
  };

  const selectedBudget = budgets.find((budget) => budget._id === _id);
  const budgetTransactions = transactions.filter(
    (txn) => txn.category?._id === _id
  );

  const isSavingBudget = budgetTransactions.some((txn) => txn.type === "Credit");

  if (loading)
    return (
      <div className="text-center mt-5">
        <p className="fs-4 text-muted">Loading budget data...</p>
      </div>
    );

  if (!selectedBudget)
    return (
      <div className="text-center mt-5">
        <p className="fs-5 text-light">Budget not found!</p>
      </div>
    );

  return (
    <>
      {/* Budget Overview Section */}
      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-4">
          <BudgetItem
            budget={selectedBudget}
            transactions={budgetTransactions}
            showDelete={true}
            showSavings={isSavingBudget}
          />
        </div>
        <div className="col-12 col-lg-4">
          <Overview
            budget={selectedBudget}
            transactions={budgetTransactions}
            showSavings={isSavingBudget}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AddTransactionForm
            budgets={[selectedBudget]}
            handleTransactionCreated={handleTransactionCreated}
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="mt-5">
        <h2 className="fw-bold fs-1 mb-4 text-center text-lg-start">
          Recent Transactions
        </h2>
        {budgetTransactions.length > 0 ? (
          <TransactionTable
            transactions={budgetTransactions}
            setEditingTransaction={setEditingTransaction}
          />
        ) : (
          <p className="text-light fs-5 text-center">No recent transactions.</p>
        )}
      </div>
    </>
  );
};

export default BudgetPage;
