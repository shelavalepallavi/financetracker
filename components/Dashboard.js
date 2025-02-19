"use client";

import React from 'react';
import Barchart from './Barchart';
import Pichart from './Pichart';
import RecentTransactions from './RecentTransactions';
import SavingGoals from './SavingGoals';

const Dashboard = ({ transactionsStats, transactions }) => {
  const totalIncome = transactionsStats.totalIncome || 0;
  const totalExpense = transactionsStats.totalExpense || 0;
  const netAmount = transactionsStats.netAmount || 0;


  
  let pieData = transactions.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);

  
    if (acc[transaction.category]) {
        acc[transaction.category] += amount;
    } else {
        acc[transaction.category] = amount;
    }
    return acc;
  }, {});



  let data = Object.entries(pieData).map(([name, amount]) => ({
    name: name,
    value: amount
  }));




  const chartData = transactions?.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "short" }); 

    const existingMonthData = acc.find((item) => item.name === month);

    if (existingMonthData) {
      if (transaction.type === "Income") {
        existingMonthData.income = Number(existingMonthData.income) + Number(transaction.amount);
      } else if (transaction.type === "Expense") {
        existingMonthData.expense = Number(existingMonthData.income) + Number(transaction.amount);
      }

    } else {
      acc.push({
        name: month,
        income: transaction.type === "Income" ? transaction.amount : 0,
        expense: transaction.type === "Expense" ? transaction.amount : 0,
      });
    }
    return acc;
  }, []) || [];

  return (
    <div className='flex flex-col gap-5'>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]  xs:grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4">
        <div className="border-[0.5px] border-gray-500 rounded-3xl px-4 py-4">
          <label className="font-medium">Total Balance</label>
          <p className='mt-7 mb-4 text-xl font-medium'>${netAmount}</p>
        </div>
        <div className="border-[0.5px] border-gray-500 rounded-3xl px-4 py-4">
          <label className="font-medium">Total Income</label>
          <p className='mt-7 mb-4 text-xl font-medium'>${totalIncome}</p>
        </div>
        <div className="border-[0.5px] border-gray-500 rounded-3xl px-4 py-4">
          <label className="font-medium">Total Expense</label>
          <p className='mt-7 mb-4 text-xl font-medium'>${totalExpense}</p>
        </div>
        <div className="border-[0.5px] border-gray-500 rounded-3xl px-4 py-4">
          <label className="font-medium ">Total savings</label>
          <p className='mt-7 mb-4 text-xl font-medium'>${netAmount}</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
      <Barchart chartData={chartData}/>
      <Pichart data={data}/>
      </div>
      
      <div className='flex flex-col lg:flex-row gap-4'>
        
        <RecentTransactions transactions={transactions}/>
        <SavingGoals/>
      </div>
    </div>
  );
};



export default Dashboard;

