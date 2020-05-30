import React, { useState, useEffect } from 'react';
import './App.css';

//components
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

//unic id
import uuid from "uuid/v4";

// let initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card payment", amount: 1200 }
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  //input charge and amount
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  //alert
  const [alert, setAlert] = useState({ show: false })

  //edit
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("we called useEffect")
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  //functionality
  const handleCharge = e => {
    setCharge(e.target.value);
  }
  const handleAmount = e => {
    setAmount(e.target.value);
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) {
        let tempExpenses = expenses.map(expense => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        })
        setExpenses(tempExpenses)
        setEdit(false)
        handleAlert({ type: "success", text: "Item edited" })
      }
      else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: "success", text: "Item added" })
      }

      setCharge("");
      setAmount("");
    }
    else {
      //danger alert
      handleAlert({ type: "danger", text: "charge can't be empty and amount has to be bigger than zero" })
    }
  }

  //clear items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items has been deleted" })
  }
  //delete single item
  const handleDelete = (id) => {
    const tempExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item has been deleted" })
  }
  // edit single item
  const handleEdit = (id) => {
    const selected = expenses.find(expense => expense.id === id);
    const { charge, amount } = selected;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Bill Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit} />
        <ExpenseList expenses={expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>Total spending : <span className="total">
        ${""}
        {expenses.reduce((acc, curr) => {
          return acc += parseInt(curr.amount);
        }, 0)}
      </span></h1>
    </>
  );
}

export default App;
