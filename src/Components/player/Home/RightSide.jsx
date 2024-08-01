import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GiWhistle } from "react-icons/gi";
import { IoMdFootball } from "react-icons/io";


import { motion } from 'framer-motion';
import { baseUrl } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(3),
}));

const SidebarContent = ({ title, icon: Icon, trialDetails, academyDetails, navigate }) => (
  <StyledPaper>
    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon size={24} style={{ marginRight: '8px' }} />
      {title}
    </Typography>
    <List>
      {
        trialDetails &&
        <>
      {trialDetails.map((trial, index) => (
        <motion.div key={index} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
        <ListItem onClick={()=>navigate(`/trial_details/${trial.id}`)}>
            <ListItemAvatar>
            <Avatar>{
              trial.image && <img src={baseUrl+'/media/'+trial.image} alt={trial.name} />
            } </Avatar>
                </ListItemAvatar>
                <ListItemText primary={trial.name} secondary={[trial.district , ', ', trial.state]} />
          </ListItem>
          </motion.div>
        ))}
      </>
      }
      {
        academyDetails &&
        <>
      {academyDetails.map((academy, index) => (
        <motion.div key={index} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
        <ListItem onClick={()=>navigate(`/academy/profile/${academy.id}`)}>
            <ListItemAvatar>
            <Avatar>{
              academy.userprofile__profile_photo && <img src={baseUrl+'/media/'+academy.userprofile__profile_photo} alt={academy.username} />
            } </Avatar>
                </ListItemAvatar>
                <ListItemText primary={academy.username} secondary={[academy.userprofile__district , ', ', academy.userprofile__state]} />
          </ListItem>
          </motion.div>
        ))}
      </>
      }
    </List>
  </StyledPaper>
);

const RightSide = ({trialDetails, academyDetails}) => {
  console.log(trialDetails,academyDetails);
  const navigate = useNavigate()

  return (
    <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <SidebarContent 
      title="Top Trials"
      icon={GiWhistle}
      trialDetails={trialDetails}
      navigate={navigate}
    />
    <SidebarContent 
      title="Top Academies"
      icon={IoMdFootball}
      academyDetails={academyDetails}
      navigate={navigate}
    />
  </motion.div>
  )
}

export default RightSide
