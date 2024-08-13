import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import NavDropdown from './NavDropdown';
import NavbarMenu from './NavbarMenu';
import NavSearch from './NavSearch';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const LogoutModal = lazy(() => import('./LogoutModal'));

const Navbar = ({ academy }) => {
  const [dropdown, setDropdown] = useState(false);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate()
  const {profile, notificationCount} = useSelector(state=>state.auth)

  const homeUrl = academy ? '/academy/home' : '/home'
  const customColor = academy ? "text-indigo-500 hover:text-black " : "text-gblue-500 hover:text-black ";
  const iconColor = academy ? 'rgb(99 102 241)' : 'rgb(30 136 229)'

  const handleLogoutModalOpen = () => {
    setLogoutModalIsOpen(!logoutModalIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  console.log(baseUrl+profile, notificationCount);
  return ( 
    <>
      <nav className="flex items-center sticky top-0 justify-between bg-white px-6 py-4 w-full font-kanit z-50 shadow-md">
        <div className='flex items-center'>
          <Link to={homeUrl} className={`text-3xl font-bold ${customColor}`}>xSports</Link>
          <NavSearch academy={academy} />
        </div>
        <NavbarMenu academy={academy} />
        <div className="flex gap-3 items-center"> 
          <IconButton  sx={{color:iconColor}} onClick={()=>navigate('/notification')}>
            <Badge badgeContent={notificationCount} color="error">
              <FaBell />
            </Badge>
          </IconButton>
          <div ref={dropdownRef} onClick={toggleDropdown}  style={{backgroundImage:`url(${ profile ? baseUrl+profile : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"})`}}
              className={`h-9 w-9 hover:ring-4 user cursor-pointer relative ring-gblue-700/30 rounded-full bg-cover bg-center`}> 
            {dropdown && <NavDropdown academy={academy} handleLogoutModalOpen={handleLogoutModalOpen} />}
          </div>
        </div>
      </nav>
      <Suspense fallback={<>loading.....</>}>
        {logoutModalIsOpen && <LogoutModal isOpen={logoutModalIsOpen} closeModal={handleLogoutModalOpen} academy={academy} />}
      </Suspense>
    </>
  );
};

export default Navbar;
