import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import useFinanceStore from "../../store/financeStore"; 

const TransactionItem = ({ transaction, setEditingTransaction }) => {
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const financeLoading = useFinanceStore((state) => state.loading);

  const handleTransactionDelete = async (id) => {
    try {
      await deleteTransaction(id); 
    } catch (error) {
      console.error("Error deleting transaction in component:", error);
    }
  };

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
      <td className="fw-bold fs-5 text-primary ">{transaction.category?.name || 'N/A'}</td> 
      <td className="d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-outline-success "
          onClick={() => setEditingTransaction(transaction)}
          disabled={financeLoading}
        >
          <PencilSquareIcon width={20} />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => handleTransactionDelete(transaction._id)}
          disabled={financeLoading}
        >
          <TrashIcon width={20} />
        </button>
      </td>
    </>
  );
};

export default TransactionItem;