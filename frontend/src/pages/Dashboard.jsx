import { useState } from "react";
import AddBudgetForm from "../components/other/AddBudgetform";
import AddExpenseForm from "../components/other/AddExpenseForm";
import ExpenseTable from "../components/other/ExpenseTable";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  // Todo -> Track budget 

  return (
    <>
      <h1 className="heading">
        Welcome back, <span style={{ color: "#0DB4A7" }}>Sarika</span>
      </h1>
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-5 mt-5">
        <AddBudgetForm />
        <AddExpenseForm  setExpenses={setExpenses}/>
      </div>
      <div className="mt-5">
      <h2 className="fw-bold fs-1 mb-5">
        Recent Expenses
      </h2>
      <ExpenseTable expenses={expenses} />
      </div>
    </>
  );
};

export default Dashboard;
