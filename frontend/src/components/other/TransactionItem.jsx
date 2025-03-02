import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";


const TransactionItem = ({ transaction ,setEditingTransaction}) => {
   

const handleTransactionDelete = async (id)=>{
 await axios.delete(`http://localhost:8000/api/transaction/${id}`);
}


  return (
    <>
      <td>{transaction.title}</td>
      <td>₹{transaction.amount}</td>
      <td>{new Date(transaction.createdAt).toLocaleDateString("en-GB")}</td>
      <td
        className={`
          ${transaction.type === "Credit" ? "text-success" : ""}
          ${transaction.type === "Expense" ? "text-danger" : ""}
        `}
      >
        {transaction.type}
      </td>
       <td className="fw-bold fs-5 text-info ">{transaction.category.name}</td>
      <td className="d-flex justify-content-around">
        <button type="button" className="btn btn-outline-success " onClick={() => setEditingTransaction(transaction)}>
          <PencilSquareIcon width={20} /> 
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={()=>handleTransactionDelete(transaction._id)}>
          <TrashIcon width={20} /> 
        </button>
      </td>
    </>
  );
};

export default TransactionItem;
