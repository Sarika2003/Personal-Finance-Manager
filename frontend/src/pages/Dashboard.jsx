import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import AddBudgetForm from "../components/other/AddBudgetform";
import AddTransactionForm from "../components/other/AddTransactionForm";
import TransactionTable from "../components/other/TransactionTable";


const socket = io("http://localhost:8000"); //connect to server

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionResponse, budgetResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/transaction"), 
        axios.get("http://localhost:8000/api/budget"),
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

  const handleDeleteTransaction =()=>{
console.log("deleted");  }
  // Handles new budget added from the form
  const handleBudgetCreated = async (newBudget) => {
    setBudgets((prev) => [...prev, newBudget]);

    
  };


  return (
    <>
      <h1 className="heading">
     
        Welcome back, <span style={{ color: "#0DB4A7" }}>Sarika</span>
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
      <div className="mt-5">
        <h2 className="fw-bold fs-1 mb-5">Recent Transactions</h2>
        {loading ? (
          <div className="text-center">
            <p>Loading data...</p> 
          </div>
        ) : (
          <TransactionTable transactions={transactions}
          setEditingTransaction={setEditingTransaction} handleDeleteTransaction={handleDeleteTransaction} />
      
        )}
      </div>
    </>
  );
};

export default Dashboard;
