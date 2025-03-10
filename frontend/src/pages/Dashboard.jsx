import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import AddBudgetForm from "../components/other/AddBudgetform";
import AddTransactionForm from "../components/other/AddTransactionForm";
import TransactionTable from "../components/other/TransactionTable";
import BudgetItem from "../components/other/BudgetItem";

const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionResponse, budgetResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/transaction", { withCredentials: true }),
        axios.get("http://localhost:8000/api/budget", { withCredentials: true }),
      ]);
      setTransactions(transactionResponse.data.data);
      setBudgets(budgetResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on("budgetUpdated", fetchData);
    socket.on("transactionUpdated", fetchData);

    return () => {
      socket.off("budgetUpdated", fetchData);
      socket.off("transactionUpdated", fetchData);
    };
  }, []);

  // Handles new transaction added from the form
  const handleTransactionCreated = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  // Handles new budget added from the form
  const handleBudgetCreated = async (newBudget) => {
    setBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <>
      <h1 className="heading">
        <span style={{ color: "#0DB4A7", fontWeight: "bold" }}>Small steps</span>, big savings!
      </h1>

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
            <h2 className="fw-bold fs-1 mb-4">Existing Budgets</h2>
            <div className="d-flex flex-wrap gap-3 align-items-center">
            {budgets.length > 0 ? (
              budgets.map((budget) => <BudgetItem key={budget.id} budget={budget} transactions={transactions} />)
            ) : (
              <p className="text-muted fs-5 text-center">No budgets added yet.</p>
            )}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="fw-bold fs-1 mb-4">Recent Transactions</h2>
            {transactions.length > 0 ? (
              <TransactionTable transactions={transactions} setEditingTransaction={setEditingTransaction} />
            ) : (
              <p className="text-muted fs-5 text-center">No recent transactions</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
