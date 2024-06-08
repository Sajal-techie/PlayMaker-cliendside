import React from 'react'
import { Link } from 'react-router-dom'

const NavbarMenu = () => {
  return (
    <ul id="drawer" role="menu" className="lg:mr-32 text-gray-800  text-lg md:text-xl lg:gap-12 md:gap-4 sm:gap-2 sm:flex hidden  cursor-pointer  min-h-screen  sm:static w-48  bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0  ">
            <li className="font p-3 hover:bg-slate-300 sm:p-0 sm:hover:bg-transparent hover:text-gblue-500 ">
            <Link to={'/home'} className="">Home</Link>
            </li>
            <li className="font p-3 cursor-pointer hover:bg-slate-100 hover:text-gblue-500  sm:p-0 sm:hover:bg-transparent transition-colors">
            <Link to={''} className="">Trials</Link>
            </li>
            <li className="font p-3 cursor-pointer hover:bg-slate-300 hover:text-gblue-500  sm:p-0 sm:hover:bg-transparent transition-colors">
            <Link to={''} className="">Friends</Link>
            </li>
            <li className="font p-3 cursor-pointer hover:bg-slate-300 hover:text-gblue-500  sm:p-0 sm:hover:bg-transparent transition-colors">
            <Link to={''} className="">Messages</Link>
            </li>
        </ul>
  )
}

export default NavbarMenu
