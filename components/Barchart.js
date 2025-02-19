import React from 'react'
import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Barchart = ({ chartData }) => {

  return (
    <div className=" h-72 lg:h-64 lg:flex-1 flex-none border-[0.5px] border-gray-500 rounded-3xl px-4 py-4 pb-14">
      <div className='flex  items-center justify-between mb-4'>
          <p className='font-medium text-lg mt-2 '>MoneyFlow</p>
          <div className='flex items-center gap-2'>
            <div className='px-2 aspect-square bg-[#8271fe] rounded-full'></div>
            <p>Income</p>
            <div className='px-2 aspect-square bg-[#bebffe] rounded-full'></div>
            <p>Expense</p>
          </div>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickMargin={10} padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          
          <Bar dataKey="income" fill="#8271fe" name="Income" barSize={30}/>
          <Bar dataKey="expense" fill="#bebffe" name="Expense" barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Barchart
