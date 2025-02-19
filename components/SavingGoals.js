import React from 'react'

const SavingGoals = () => {
  return (
    <div className='border-[0.5px] border-gray-500 rounded-3xl px-4 py-4 w-full'>
      <div className=''>
        <p className='text-xl font-semibold mb-3'>Saving Goals</p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between text-sm font-medium'>
            <label>New Car</label>
            <p className='text-[#bebffe]'>$60,000</p>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-[#bebffe]">
            <div className="bg-[#8271fe] h-6 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}> 45%</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between text-sm font-medium'>
            <label>Macbook Pro</label>
            <p className='text-[#bebffe]'>$1,650</p>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-[#bebffe]">
            <div className="bg-[#8271fe] h-6 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '25%' }}> 25%</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between text-sm font-medium'>
            <label>New House</label>
            <p className='text-[#bebffe]'>$150,000</p>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-[#bebffe]">
            <div className="bg-[#8271fe] h-6 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '10%' }}> 10%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingGoals
