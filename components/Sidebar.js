

"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <p 
        className="text-white bg-black px-3 rounded-full aspect-square py-1 mt-5 ml-2 font-medium cursor-pointer lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        S
      </p>

      <div className={`fixed top-0 left-0 min-h-full w-56 bg-purple-50 p-4 flex flex-col gap-10 transition-transform duration-300 lg:relative lg:translate-x-0 z-10 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:w-56`}>
        
        <div className="flex gap-4 items-center">
          <p 
            className="text-white bg-black px-3 rounded-full aspect-square py-1 font-medium cursor-pointer lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </p>
          <p 
        className="text-white bg-black px-3 rounded-full aspect-square py-1  font-medium cursor-pointer hidden lg:block"
        onClick={() => setIsOpen(!isOpen)}
      >
        S
      </p>  
          <p className="text-lg font-medium cursor-pointer hidden md:inline">SpendLite</p>
        </div>

        <ul className="flex flex-col gap-4">
          <Link href="/" className="flex gap-4 font-medium py-2 px-4 rounded-full hover:bg-[#8271fe] hover:text-white group">
            <img src="/menu-white.svg" alt="" className="hidden group-hover:block"/>
            <img src="/menu.svg" alt="" className="group-hover:hidden"/>
            <span>Dashboard</span>
          </Link>
          <Link href="/transaction" className="flex gap-4 font-medium py-2 px-4 rounded-full hover:bg-[#8271fe] hover:text-white group">
            <img src="/transaction.svg" alt="" className="group-hover:hidden"/>
            <img src="/transaction-white.svg" alt="" className="hidden group-hover:block"/>
            <span>Transaction</span>
          </Link>
          
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
