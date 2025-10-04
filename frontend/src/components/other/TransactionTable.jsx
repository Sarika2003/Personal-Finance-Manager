import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionTable = ({ transactions ,setEditingTransaction }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Budget</th>
            <th className="px-3 py-2"></th>
           
          </tr>
        </thead>
        <tbody className="text-center">
       
          {transactions?.map((transaction , index) => (
             <tr key={index}>
                <TransactionItem  transaction={transaction} setEditingTransaction={setEditingTransaction} />
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;