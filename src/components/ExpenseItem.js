import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md"

function ExpenseItem({ expense, handleEdit, handleDelete }) {
    const { id, charge, amount } = expense;
    return (
        <>
            <li className="item">
                <div className="info">
                    <span className="expense">{charge}</span>
                    <span className="amount">$ {amount}</span>
                </div>
                <div>
                    <button onClick={() => handleEdit(id)} className="edit-btn" arial-label="edit button">
                        <MdEdit />
                    </button>
                    <button onClick={() => handleDelete(id)} className="clear-btn" arial-label="delete button">
                        <MdDelete />
                    </button>
                </div>
            </li>

        </>
    )
}

export default ExpenseItem
