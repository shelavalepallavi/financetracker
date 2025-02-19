"use client"
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const page = () => {
  const [transactionsStats, setTransactionsStats] = useState([])
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(false)
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); 
    fetchTransactionStats(date);
    fetchTransaction(date);
  };

  const formatDate = (date) => {
    if (!date) return "This month";
    const options = { year: 'numeric', month: 'long'};
    return date.toLocaleDateString(undefined, options);
  };

  const fetchTransactionStats = async(date = '') =>{
    try {

      if(date != '') {
        console.log("date", date, typeof(date));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        date = year+"-"+month+"-"+day;
      }

      const response = await fetch('/api/transactions_stats?date='+date);
      if(!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      setTransactionsStats(data || {});
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  useEffect(() => {
    fetchTransactionStats()
  }, [])

  const fetchTransaction = async(date = '') =>{
    try {
      if(date != '') {
        console.log("date", date, typeof(date));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        date = year+"-"+month+"-"+day;
      }
      const response = await fetch('/api/transactions?date='+date);
      if(!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      setTransactions([...data]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  useEffect(() => {
    
    fetchTransaction()
  }, [])
  


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
    <div className='pt-5  w-full px-9  flex flex-col gap-5'>
      <div>
        <h1 className='text-2xl font-medium'>Welcome back!</h1>
        <p className='text-gray-500'>It is the best time to manage your finances.</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
        <button className='border-[0.5px] border-gray-500 rounded-full px-3 aspect-square'><img src="/calender.svg" alt="" className='w-5'  onClick={() => setShowCalendar(!showCalendar)} /></button>
        <button className='border-[0.5px] border-gray-500 rounded-full px-4 py-2 font-medium'> {formatDate(selectedDate)}</button>
        {showCalendar && (
        <div className="absolute mt-10">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            dateFormat="MMMM yyyy"
            showMonthYearPicker
          />
        </div>
      )}
        </div>
          {!open &&
      <button onClick={() => setOpen(true)} className='bg-[#8271fe] flex gap-2 px-3 py-3 rounded-full font-medium text-white text-sm'>
      <img src="/plus.svg" alt="" className='w-4' />
      Add new transaction</button>
      }
      
      {open && <TransactionForm setOpen={setOpen} setTransactions={setTransactions} transactionToEdit={transactionToEdit} handleUpdate={handleUpdate} setTransactionToEdit={setTransactionToEdit}/>}
      </div>
      <Dashboard transactionsStats={transactionsStats} transactions={transactions}/>
    </div>
  )
}

export default page
