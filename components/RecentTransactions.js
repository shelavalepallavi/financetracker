"use client";
import Link from 'next/link';
import React from 'react'

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  return formattedDate.replace(/(\d{4})-(\w{3})-(\d{2})/, '$1-$2-$3');
};

const RecentTransactions = ({ transactions}) => {
  
  const sortedTransactions = [...transactions]
  .filter((t) => t.date) 
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const recentTransactions = sortedTransactions.slice(0, 4); 

  return (
    <div className=' border px-6 py-4  rounded-3xl'>
      <div className='flex justify-between items-center mb-3'>
      <p className='text-xl font-semibold'>Recent Transactions</p>
      <Link href="/transaction" className='border-[0.5px] border-gray-500 px-3 py-1 rounded-full text-sm font-medium flex gap-1'>See all <img src="/arrow.svg" alt="" className='w-4' /></Link>
      </div>
      <table className='table-auto  rounded-md overflow-hidden '>
        <thead>
          <tr className=' bg-purple-50 rounded-full text-violet-500 '>
           <th className='px-3 xl:px-12 py-2'>Date</th>
           <th className='px-3 xl:px-12 py-2'>Type</th>
           <th className='px-3 xl:px-12 py-2'>Amount</th>
           <th className='px-3 xl:px-12 py-2'>Description</th>
           <th className='px-3 xl:px-12 py-2'>Category</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.length === 0 ? <tr>
              <td colSpan="5" className="text-center py-4">No transactions yet</td>
            </tr> : (
            recentTransactions.map((transaction, index) => (
              <tr className='text-center font-medium text-sm' key={index}>
                <td className='px-4 py-3'>{formatDate(transaction.date)}</td>
                <td className='px-4 py-3'>{transaction.type}</td>
                <td className='px-4 py-3'>{transaction.amount}</td>
                <td className='px-4 py-3'>{transaction.description}</td>
                <td className='px-4 py-3 '>{transaction.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecentTransactions
