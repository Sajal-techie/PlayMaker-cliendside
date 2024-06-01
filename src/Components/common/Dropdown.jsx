import React from 'react'

const Dropdown = ({options,label,onChange}) => {

  return (
    <>
        <label htmlFor={`${label}`} className='text-md font-extralight text-black capitalize'> {label==='sport'  ? 'Favorite sports' :label }  </label> <br />
        <select defaultValue='' id={`${label}`} name={label} className='border-2 py-2 px-4 w-80 rounded-md text-sm outline-none ' onChange={onChange}>
            <option value="" disabled >
              Select a {label}
            </option>
           {options &&<> {options.map((obj,index)=>(
              <option key={index} value={obj}>{obj}</option>
            ))}</>} 
        </select> 
    </>
  )
}
export default Dropdown
