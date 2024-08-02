import React from 'react'

const Button = ({name,role,onClick}) => {
    const color = role==='academy' ?   'before:bg-indigo-300 bg-indigo-500 hover:bg-indigo-800 hover:border-indigo-500':'before:bg-gblue-200 bg-gblue-500 hover:bg-gblue-800 hover:border-gblue-500'
  return (
    <div>

      <div className={`${color} group [transform:translateZ(0)] px-6 py-2 rounded-lg overflow-hidden relative before:absolute  before:top-1/2 before:left-1/2 before:h-8 before:w-16 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500 hover:border `}>
      <button onClick={onClick} className={`relative w-full rounded-md transition duration-100 text-white group-hover:text-black`}>
              {name}
      </button>
        {/* <span class="relative z-0 text-white group-hover:text-black transition ease-in-out duration-500">Hover over me</span> */}
      </div>
    </div>
  )
}

export default Button
