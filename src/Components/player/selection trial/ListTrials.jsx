import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Tabs, Tab,Input } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skelton_profile from '../../../Pages/Skelton_profile';
import { useTrialAcademy } from '../../academy/Custom Hooks/useTrialAcademy';
import Navbar from '../../layouts/navbar/Navbar';
import TrialCard from '../../academy/selection trials/ListOwnTrials/TrialCard';

const ListTrials = () => {
    const {data: trialList,isLoading,isError, error: fetchError} = useTrialAcademy()
    const [searchTerm,setSearchTerm] = useState('')

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
      
    const filteredTrials = trialList?.filter(trial =>
          trial.name.toLowerCase().includes(searchTerm.toLowerCase())) || []
    
    
    console.log(filteredTrials,trialList,searchTerm,isError,isLoading,fetchError);
    if (isLoading) return <><Skelton_profile /></>;
    if (isError) return <><Navigate to={'/home'} /></>;
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search trials"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 4, backgroundColor: 'white',borderRadius:4,}}
        />
        <Grid container spacing={4}>
          {filteredTrials.length > 0 ? (
            filteredTrials.map((trial, index) => (
              <Grid item xs={12} key={index}>
                <TrialCard {...trial} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
              No trials found
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default ListTrials
