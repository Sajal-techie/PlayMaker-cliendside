import React from 'react';
import { Paper, Avatar, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaUserFriends, FaNewspaper, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
}));

const LeftSide = React.memo(({userDetails}) => {
    const {user, profile} = useSelector(state=>state.auth)
    const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledPaper>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} onClick={()=>navigate(`/profile`)} >
            {
              profile  ? <img src={baseUrl+profile} alt={user} onClick={()=>navigate(`/profile`)} />
              :
              <FaUser size={50} />
            }
          </Avatar>
        </motion.div>
        <Typography variant="h5" align="center" onClick={()=>navigate(`/profile`)} >{userDetails.username}</Typography>
        <Typography variant="body2" color="text.secondary" align="center" gutterBottom onClick={()=>navigate(`/profile`)} >{userDetails.bio}</Typography>
        {/* <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Edit Profile</Button> */}
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Friends" secondary={userDetails.friends_count} />
            <FaUserFriends size={24} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Posts" secondary={userDetails.post_count} />
            <FaNewspaper size={24} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Achievements" secondary={userDetails.achievements_count} />
            <FaMedal size={24} />
          </ListItem>
        </List>
      </StyledPaper>
    </motion.div>
  )
}
)
export default LeftSide
