import React from 'react'

const AboutSection = ({data,academy}) => {
  const bgColor = academy ? "bg-indigo-400":"bg-gblue-400" 
  const textColor = academy ? "text-indigo-500": "text-gblue-500" 
  const borderColor = academy ? "border-indigo-500" : "border-gblue-400"
  return (
    <div className="flex-1  bg-white rounded-lg shadow-xl p-8"> 
        <div className='flex justify-between items-center w-full  '>
            <h4 className="text-xl text-gray-900 font-bold">About</h4>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
        </div>
        <p className="mt-2 text-gray-700 text-center ">
            { data ?  data : <button className={`${borderColor} border px-2 py-1 rounded-full mt-4`} > add about </button>  }
        </p>
    </div>
  )
}

export default AboutSection
