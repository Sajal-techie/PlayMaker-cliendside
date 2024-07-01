import React from 'react'

const Skelton1 = () => {
  return (
    <div className="card rounded-[12px] m-10 text-xl shadow-2xl p-5 animate-pulse bg-white">
        <div className="w-full h-64 bg-gray-300 rounded mb-3 "></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-bounce"></div>
        <div className="h-1 bg-gray-300 rounded w-full mb-2 "></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-bounce"></div>
    </div>
  )
}

export default Skelton1
