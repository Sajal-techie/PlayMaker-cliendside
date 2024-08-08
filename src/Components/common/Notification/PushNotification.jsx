import React, { useState, useEffect, act } from 'react';
import { Snackbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationSystem from './NotificationSystem';
import { useDispatch } from 'react-redux';
import { updateNotificationCount } from '../../../redux/slices/authSlice';


const PushNotification = ({userId}) => {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let notificationSocket = null
    console.log(userId,'userid ');

    useEffect(()=>{
        initializeNotificationSocket(userId)

        return ()=> closeNotificationSocket()
    },[userId])

    const initializeNotificationSocket = (userId) =>{
        if(!notificationSocket || notificationSocket.readyState === WebSocket.CLOSED){
            notificationSocket = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/notifications/${userId}/`);
            
            notificationSocket.onopen = () =>{
                console.log('Notification socket connected');
            }

            notificationSocket.onmessage = (event)=>{
                const data = JSON.parse(event.data)
                console.log(data, event, ' in message');
                handleNotification(data)
            }

            notificationSocket.onerror = (error) => {
                console.log("notification socket error ",error);
            }

            notificationSocket.onclose = ()=>{
                console.log("Notificaion socket disconnected");
                setTimeout(()=> initializeNotificationSocket(userId), 1000) // try to reconnect every 5 mins
            }
        }
    }

    const closeNotificationSocket = () => {
        if(notificationSocket) {
            notificationSocket.close()
        }
    }
        
    const handleNotification = (data) =>{
        let newNotification = {
            id: Date.now(),
            message:'',
            action: null,
        }

        newNotification.message = data.text
        newNotification.action = data.link
        setNotifications(prev => [...prev, newNotification])

        dispatch(updateNotificationCount(1)) // to increase the notification count in navbar
    }
    const removeNotification = (id) =>{
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }
    console.log(notifications, 'alll notifications');
  return (
    <NotificationSystem notifications={notifications} removeNotification={removeNotification} navigate={navigate} />
  )
}

export default PushNotification
