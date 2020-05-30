import React from 'react'
import Item from "./ExpenseItem"
import { MdDelete } from "react-icons/md"

function ExpenseList({ expenses, clearItems, handleDelete, handleEdit }) {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return <Item handleDelete={handleDelete} handleEdit={handleEdit} key={expense.id} expense={expense} />
                })}
            </ul>

            {expenses.length > 0 && <button onClick={clearItems} className="btn">
                Clear bills <MdDelete className="btn-icon" />
            </button>}
        </>
    )
}

export default ExpenseList
