"use client";
import React from 'react';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const TransactionList = ({ transactions, handleDelete, setOpen, setTransactionToEdit }) => {
  const handleEditClick = (transaction) => {
    setTransactionToEdit(transaction);
    setOpen(true);
  };

  return (
    <div className="flex-1 border px-6 py-4 rounded-3xl">
      <p className="text-xl font-semibold mb-4">All Transactions</p>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-max w-full rounded-md overflow-hidden">
          <thead>
            <tr className="bg-purple-50 text-violet-500">
              <th className="px-2 lg:px-6 py-2 text-left">Date</th>
              <th className="px-2 lg:px-6 py-2 text-left">Type</th>
              <th className="px-2 lg:px-6 py-2 text-left">Amount</th>
              <th className="px-2 lg:px-6 py-2 text-left">Description</th>
              <th className="px-2 lg:px-6 py-2 text-left">Category</th>
              <th className="px-2 lg:px-6 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No transactions yet</td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr className="text-center font-medium text-sm" key={index}>
                  <td className="py-3">{formatDate(transaction.date)}</td>
                  <td className="py-3">{transaction.type}</td>
                  <td className="py-3">{transaction.amount}</td>
                  <td className="py-3">{transaction.description}</td>
                  <td className="py-3">{transaction.category}</td>
                  <td className="py-3 flex justify-center gap-2">
                    <span className="cursor-pointer" onClick={() => handleEditClick(transaction)}>
                      <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "24px", height: "24px" }}></lord-icon>
                    </span>
                    <span className="cursor-pointer" onClick={() => handleDelete(transaction._id)}>
                      <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "24px", height: "24px" }}></lord-icon>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
