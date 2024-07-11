import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Tabs, Tab,Input } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../../layouts/navbar/Navbar';
import TrialCard from '../../academy/selection trials/ListOwnTrials/TrialCard';
import userApi from '../../../api/axiosconfig';

const ListTrials = () => {
    const [trialList,setTrialList] = useState([])
    // const {data: trialList,isLoading,isError, error: fetchError} = useTrialAcademy()
    const [searchTerm,setSearchTerm] = useState('')

    useEffect(()=>{
      fetchTrialsList()
    },[])

    const fetchTrialsList =async ()=>{
      try{
        const response = await userApi('trial')
        console.log(response);
        setTrialList(response.data)
      }catch(error){
        console.log(error,'error fetching trial list');
      }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

    const filteredTrials = trialList?.filter(trial =>
          trial.name.toLowerCase().includes(searchTerm.toLowerCase())) || []
    
    
    console.log(filteredTrials,trialList,searchTerm);
  
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
