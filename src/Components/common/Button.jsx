import React from 'react'

const Button = ({name,role,onClick}) => {
    const color = role==='academy' ?   'bg-indigo-500 hover:bg-indigo-800':'bg-gblue-500 hover:bg-gblue-800'
  return (
    <div>
      <button onClick={onClick} className={`mt-4 mb-3 w-full text-white py-2 rounded-md transition duration-100 ${color}`}>
              {name}
      </button>
    </div>
  )
}

export default Button
