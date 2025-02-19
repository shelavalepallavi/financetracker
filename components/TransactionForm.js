"use client"
import React, { useEffect, useState } from 'react'

const TransactionForm = ({ setOpen, setTransactions, transactionToEdit, handleUpdate, setTransactionToEdit }) => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories'));
    setCategories(savedCategories || ["Food", "Transport", "Rent", "Shopping"]);

    if (transactionToEdit) {
      setDate(transactionToEdit.date);
      setType(transactionToEdit.type);
      setAmount(transactionToEdit.amount);
      setDescription(transactionToEdit.description);
      setCategory(transactionToEdit.category);
    } else {
      resetForm()
    }
  }, [transactionToEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (transactionToEdit) {
      const updatedTransaction = { id: transactionToEdit._id, date, type, amount, description, category };
      await handleUpdate(updatedTransaction);
    } else {
      const newTransaction = { date, type, amount, description, category };
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      if (res.ok) {
        const data = await res.json();
        const updatedRes = await fetch('/api/transactions');
        if (updatedRes.ok) {
          const updatedData = await updatedRes.json();
          setTransactions(updatedData);
        }

        setOpen(false);
        resetForm();
      }
    }
  };


  const resetForm = () => {
    setDate('');
    setType('');
    setAmount('');
    setDescription('');
    setCategory('');
    setCustomCategory('');

  }
  const addCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      const updatedCategories = [...categories, customCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories)); 
      setCategory(customCategory);
      setCustomCategory('');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col gap-6 w-[90%] sm:w-[500px] mt-10 mb-10">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Type</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Expense"
                  onChange={(e) => setType(e.target.value)}
                  className="accent-purple-500"
                />
                Expense
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  onChange={(e) => setType(e.target.value)}
                  className="accent-purple-500"
                />
                Income
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 pb-1">Category</label>
            <ul className="flex flex-wrap items-center gap-2 w-full text-sm font-medium text-black rounded-lg sm:flex">
              {categories.map((cat) => (
                <li key={cat} className="flex-shrink-0 w-1/2 sm:w-1/4 md:w-1/3">
                  <div className="flex items-center px-2 bg-purple-200 rounded-xl ">
                    <input
                      id={`horizontal-list-radio-${cat.toLowerCase()}`}
                      type="radio"
                      value={cat}
                      name="category"
                      checked={category === cat}
                      onChange={(e) => setCategory(e.target.value)}
                      className=" w-4 h-4 border-2 border-gray-300 bg-gray-100 peer peer-checked:bg-purple-600 peer-checked:border-purple-600"
                    />

                    <label
                      htmlFor={`horizontal-list-radio-${cat.toLowerCase()}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      {cat}
                    </label>

                  </div>
                </li>
              ))}
            </ul>

          </div>

          <div className="flex items-center mt-1">
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="border p-2 rounded w-full outline-purple-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="ml-2 px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-600"
            >
              Add
            </button>
          </div>


          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
            >
              {transactionToEdit ? "Update Transaction" : "Add Transaction"}
            </button>
            <button
              type="button"
              className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition"
              onClick={() => { setOpen(false); resetForm(); setTransactionToEdit(null); }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default TransactionForm
