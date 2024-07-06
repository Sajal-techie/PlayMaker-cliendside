import React from 'react'
import { Link } from 'react-router-dom'

const TrialSection = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <div className='flex justify-between items-center w-full  '>
            <h4 className="text-xl text-gray-900 font-bold">Trials  </h4>
            <Link to={'/academy/add_trial'}>
              <div className='flex border border-indigo-700 px-2 py-1 rounded-3xl'>
                  create a Trial 
              </div>
            </Link>
        </div>
            <p className="mt-2 text-gray-700 text-center ">
               <Link to={'/academy/add_trial'} className='border border-indigo-700 px-2 py-1 rounded-full mt-4' > new trial </Link>  
            </p>
    </div>
  )
}

export default TrialSection
