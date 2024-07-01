import React from 'react'

const InputField = ({type, name, placeholder,onChange,value,max}) => {
  return (
        <input
              className="px-4 w-80 border-2 border-slate-300 py-2 rounded-md text-sm outline-none"
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              max={max}
        />
  )
}
export default InputField
