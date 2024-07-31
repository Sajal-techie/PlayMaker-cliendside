import React from 'react';
import { Snackbar, Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NotificationSystem = ({ notifications, removeNotification, navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack 
      spacing={2} 
      sx={{
        position: 'fixed',
        top: isMobile ? 0 : 'auto',
        bottom: isMobile ? 'auto' : 24,
        right: isMobile ? 0 : 24,
        left: isMobile ? 0 : 'auto',
        maxWidth: '100%',
        width: isMobile ? '100%' : 300,
        zIndex: 1400,
        padding: isMobile ? '12px' : 0,
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={5000}
          message={notification.message}
          action={
            <Button 
              color="primary" 
              size="small" 

              onClick={() => {
                  removeNotification(notification.id);
                    navigate(notification.action);
              }}
            >
              VIEW
            </Button>
          }
          onClick={() => {
              removeNotification(notification.id);
              navigate(notification.action);
          }}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{
            vertical: isMobile ? 'top' : 'bottom',
            horizontal: 'center'
          }}
          sx={{
            position: 'relative',
            transform: 'none',
            width: '100%',
            '& .MuiSnackbarContent-root': {
              width: '100%',
              minWidth: 'auto',
            }
          }}
        />
      ))}
    </Stack>
  );
};

export default NotificationSystem;