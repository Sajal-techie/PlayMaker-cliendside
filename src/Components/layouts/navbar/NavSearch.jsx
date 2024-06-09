import React from 'react'

const NavSearch = () => {
  return (
    <div className="md:ml-10 ml-4 bg-slate-100  rounded-full mt-1 ">
        <div className="relative rounded-md ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            
            </div>
            <input 
            type="search" name="search" id="search" 
            className="bg-gray-200 block w-36 sm:w-32 md:w-auto  border-0 py-1.5 pl-10 text-black placeholder:text-black placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            placeholder="Search"/>
        </div>
    </div>
  )
}

export default NavSearch
