import React from 'react'

const Achievementsection = ({data}) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <div className='flex justify-between items-center w-full  '>
            <h4 className="text-xl text-gray-900 font-bold">Achievements  </h4>
            <div className='flex border border-gblue-700 px-2 py-1 rounded-3xl'>
                create a post 
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg> */}
            </div>
        </div>
            <p className="mt-2 text-gray-700 text-center ">
                { !data ?  data : <button className='border border-gblue-400 px-2 py-1 rounded-full mt-4' > add achievements </button>  }
            </p>
    </div>
  )
}

export default Achievementsection
