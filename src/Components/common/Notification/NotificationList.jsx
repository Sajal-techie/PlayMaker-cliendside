import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemText, IconButton, Divider, 
  CircularProgress, Button, Paper, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaEnvelope, FaUserPlus, FaBell, FaUserCheck, FaTrash, FaCheckDouble } from 'react-icons/fa';
import { SlUserFollowing } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import userApi from '../../../api/axiosconfig';
import { dateDifference } from '../functions/dateDifference';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotificationCount } from '../../../redux/slices/authSlice';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  position: 'relative',
  color: theme.palette.primary.main,
}));

const UnreadDot = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: -2,
  right: -2,
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
}));

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const notificationCount = useSelector(state=>state.auth.notificationCount)

  useEffect(() => {
    fetchNotifications();
  }, [notificationCount]);

  const fetchNotifications = async () => {
    try {
      const response = await userApi.get('notification');
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error, 'error fetching notifications');
    }
  };

  const markAsRead = async (id) => {
    try {
      const notificationToUpdate = notifications.find(notif => notif.id === id);
    
      if (notificationToUpdate && !notificationToUpdate.seen) {
        await userApi.post(`mark_as_read/${id}`);
        
        setNotifications(notifications.map(notif => 
          notif.id === id ? { ...notif, seen: true } : notif
        ));
        
        dispatch(updateNotificationCount(-1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await userApi.post('mark_all_as_read');
      setNotifications(notifications.map(notif => ({ ...notif, seen: true })));
      dispatch(updateNotificationCount(-notificationCount)) //update notification count
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await userApi.delete(`notification/${id}`);
      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'new_message': return <FaEnvelope />;
      case 'friend_request': return <FaUserPlus />;
      case 'friend_request_accept': return <FaUserCheck />;
      case 'follow': return <SlUserFollowing />;
      default: return <FaBell />;
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingBottom: 7, paddingTop:3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Notifications ({notificationCount})
          </Typography>
          {
            notifications.length > 0 &&
            <Button 
            variant="contained" 
            startIcon={<FaCheckDouble />}
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.seen)}
            >
                Mark All as Read
            </Button>
        }
        </Box>
        <List>
          {notifications.length === 0 ? (
            <Typography variant="body1" textAlign="center" color="text.secondary">
              No notifications to display.
            </Typography>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <StyledListItem>
                  <IconWrapper>
                    {getIcon(notification.notification_type)}
                    {!notification.seen && <UnreadDot />}
                  </IconWrapper>
                  <ListItemText 
                    primary={<Typography variant="body1" fontWeight={notification.seen ? 'normal' : 'bold'}>{notification.text}</Typography>}
                    secondary={dateDifference(notification.created_at)}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.link) {
                        navigate(notification.link);
                      }
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Tooltip title="Delete">
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteNotification(notification.id)}>
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                </StyledListItem>
                {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationList;