import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/authSlice'
import NavDropdown from './NavDropdown'
import NavbarMenu from './NavbarMenu'
import NavSearch from './NavSearch'
import Swal from 'sweetalert2'

const Navbar = ({academy}) => {
    const [dropdown,setDropdown] = useState(false)
    const dropdownRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const customColor = academy ? "text-indigo-500 hover:text-black" :""

    const handleClickOutside = (event)=>{
        if (!dropdownRef.current.contains(event.target)){
            setDropdown(false)
        }
    }
    useEffect (()=>{
        document.addEventListener('mousedown', handleClickOutside)
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])
    const toggleDropdown = ()=>{
        setDropdown(prev=>!prev)
    }

    const handleLogout = async ()=>{
        try{
    
          const res = await dispatch(logout()).unwrap()
          console.log(res,'in home');
          Swal.fire({
            icon: 'success',
            title: 'Logout Successfull',
          })
          if (academy){
            navigate('/academy/login')
          } else {
              navigate('/')
            }
        }catch(error){
          console.log(error,'error in home');
        }
      }
  return (
    <>
        <nav className="flex  items-center relative justify-between bg-white px-5 py-5 w-full font-kanit">
        <div className='flex' >
            <span className={`text-4xl ${customColor}`} > PlayMaker </span>  
            {/* searchbar */}
            <NavSearch/>
      
        </div>

        <NavbarMenu academy={academy}/>

        <div className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${customColor} w-7 h-7 mr-2`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"></path>
                </svg>

            <div ref={dropdownRef} onClick={toggleDropdown} className=" h-9 w-9 hover:ring-4 user cursor-pointer relative ring-gblue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]">
            { dropdown && ( <NavDropdown academy={academy} handleLogout={handleLogout}/> ) }
           
            </div>

        </div>
        </nav>
        </>
  )
}

export default Navbar
