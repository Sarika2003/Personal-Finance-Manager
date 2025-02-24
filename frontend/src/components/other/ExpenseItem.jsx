import { TrashIcon } from "@heroicons/react/24/solid";


const handleDelete =(name)=>{
  console.log(name + " expense deleted");
}

const ExpenseItem = ({ expense}) => {

  return (
    <>
      <td>{expense.name}</td>
      <td>₹{expense.amount}</td>
      <td>{expense.date}</td>
       <td>{expense.budget}</td>
      <td>
        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(expense.name)}>
          <TrashIcon width={20} /> 
        </button>
      </td>
    </>
  );
};

export default ExpenseItem;
