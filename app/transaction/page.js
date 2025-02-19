"use client"
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const fetchTransactions = async() =>{
    try {
      const response = await fetch('/api/transactions');
      if(!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      setTransactions([...data]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  useEffect(() => {
    
    fetchTransactions()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/transactions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      } else {
        console.error("Error deleting transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleUpdate = async (updatedTransaction) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
       
        await fetchTransactions();
        setTransactionToEdit(null);
        setOpen(false); 
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  
  
  return (
    <div className='pt-5 flex items-start w-full px-6 gap-5'>
      <TransactionList transactions={transactions} handleDelete={handleDelete} setOpen={setOpen} setTransactionToEdit={setTransactionToEdit}/>
      {!open &&
      <button 
      onClick={() => setOpen(true)} 
      className="bg-[#8271fe] md:flex items-center gap-2 px-3 py-3 rounded-full font-medium text-white text-sm \ hidden"
    >
      <img src="/plus.svg" alt="" className="w-4" />
      <span className="hidden lg:inline">Add new transaction</span>
    </button>
    
      }
      
      {open && <TransactionForm setOpen={setOpen} setTransactions={setTransactions} transactionToEdit={transactionToEdit} handleUpdate={handleUpdate} setTransactionToEdit={setTransactionToEdit}/>}
      
    </div>
  )
}

export default page
