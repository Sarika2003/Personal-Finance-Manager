import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import BudgetItem from "../components/other/BudgetItem";
import AddExpenseForm from "../components/other/AddTransactionForm";
import TransactionTable from "../components/other/TransactionTable";
import Overview from "../components/other/Overview";

const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const BudgetPage = () => {
  const { _id } = useParams();
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionResponse, budgetResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/transaction", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/api/budget", {
          withCredentials: true,
        }),
      ]);
      setTransactions(transactionResponse.data.data || []);
      setBudgets(budgetResponse.data.data || []);
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
    

  const selectedBudget = budgets.find((budget) => budget._id === _id);

  const budgetTransactions = transactions.filter(
    (txn) => txn.category._id === _id
  );

  if (loading) return <p>Loading...</p>;

  if (!selectedBudget) return <p>Budget not found!</p>;
  return (
    <>
    <div className="row align-items-center ">
      <div className="col">
        <BudgetItem
          budget={selectedBudget}
          transactions={budgetTransactions}
          showDelete={true}
        />
      </div>
      <div className="col">
      <Overview budget={selectedBudget} transactions={budgetTransactions}/></div>
      <div className="col">
        <AddExpenseForm budgets={[selectedBudget]} handleTransactionCreated={handleTransactionCreated}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction} />
      </div>
    </div>
    <div className="mt-5">
    <h2 className="fw-bold fs-1 mb-4">Recent Transactions</h2>
    {budgetTransactions.length >0 ?   (
              <TransactionTable transactions={budgetTransactions} setEditingTransaction={setEditingTransaction} />
            ) : (
              <p className="text-muted fs-5 text-center">No recent transactions.</p>
            )}
            </div>
    </>
  );
};

export default BudgetPage;
