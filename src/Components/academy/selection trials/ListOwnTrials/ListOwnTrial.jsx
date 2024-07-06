import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Tabs, Tab } from '@mui/material';
import TrialCard from './TrialCard';
import Navbar from '../../../layouts/navbar/Navbar';
import { useTrialAcademy } from '../../Custom Hooks/useTrialAcademy';
import Skelton_profile from '../../../../Pages/Skelton_profile';
import { Link, Navigate } from 'react-router-dom';

const ListOwnTrial = () => {
  const { data: trialList, isLoading, isError, error: fetchError } = useTrialAcademy();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterTrials = (trials) => {
    const currentDate = new Date();
    switch (tabValue) {
      case 0:
        // Upcoming
        return trials.filter(trial => new Date(trial.trial_date) > currentDate);
      case 1:
        // Live
        return trials.filter(trial => new Date(trial.trial_date).toDateString() === currentDate.toDateString());
      case 2:
        // Completed
        return trials.filter(trial => new Date(trial.trial_date) < currentDate);
      default:
        return trials;
    }
  };

  const filteredTrials = filterTrials(
    trialList?.filter(trial =>
      trial.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
  );

  if (isLoading) return <><Skelton_profile /></>;
  if (isError) return <><Navigate to={'/academy/home'} /></>;

  return (
    <>
      <Navbar academy={true} />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Selection Trials</Typography>
          <Link to={'/academy/add_trial'}>
            <Button  variant="contained" color="primary" sx={{ backgroundColor: 'rgb(79 70 229)' }}>Add Trials</Button>
          </Link>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search trials"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 1, backgroundColor: 'white' }}
        />
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4}}>
          <Tab label="Upcoming" />
          <Tab label="Live" />
          <Tab label="Completed" />
        </Tabs>
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
  );
};

export default ListOwnTrial;
