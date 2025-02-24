import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseTable = ({ expenses }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Budget</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody className="text-center">
       
          {expenses.map((expense , index) => (
             <tr key={index}>
            <ExpenseItem  expense={expense} />
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
