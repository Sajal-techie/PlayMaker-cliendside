import React from 'react'

const InputField = ({type, name, placeholder}) => {
  return (
        <input
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type={type}
              name={name}
              placeholder={placeholder}
        />
  )
}
export default InputField
