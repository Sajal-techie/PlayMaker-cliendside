// Notifications.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userApi from '../../../api/axiosconfig';
import NotificationList from './NotificationList';
import Navbar from '../../layouts/navbar/Navbar';
import BottomNavbar from '../../layouts/navbar/BottomNavbar';

const Notifications = () => {
  const role = useSelector(state=>state.auth.role)
  return (
    <>
      <Navbar academy={role==='academy'} />
      <NotificationList />
      <BottomNavbar academy={role==='academy'}/>
    </>
  );
};

export default Notifications;
